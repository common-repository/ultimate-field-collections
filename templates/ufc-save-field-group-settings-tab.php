<?php
// Global variables
global $ufc_admin;

$response = array();

if ( !empty($_POST['nonce']) && wp_verify_nonce( sanitize_text_field($_POST['nonce']), 'ufc_ajax_nonce' ) ) {

	if ( !empty($_POST['ufc_field_group_id']) ) {

		$ufc_group_data = $ufc_admin->ufc_field_post_data_sanitize_array($_POST);

		// May have been posted. Remove slashes.
		$ufc_group_data = wp_unslash( $ufc_group_data );

		// Parse types (converts string '0' to int 0).
		$ufc_group_data = acf_parse_types( $ufc_group_data );

		$save_field_group_status = (!empty($ufc_group_data['status'])) ? $ufc_group_data['status'] : '';
		$save_field_group_id = (!empty($ufc_group_data['ufc_field_group_id'])) ? $ufc_group_data['ufc_field_group_id'] : '';
		$save_field_group_title = (!empty($ufc_group_data['ufc_field_group_title'])) ? $ufc_group_data['ufc_field_group_title'] : '';
		$save_field_group_key = (!empty($ufc_group_data['ufc_field_group_key'])) ? sanitize_title( $save_field_group_title ) : '';
		$save_field_group = (!empty($ufc_group_data['acf_field_group'])) ? $ufc_group_data['acf_field_group'] : '';
		$save_field_group_acf_fields = (!empty($ufc_group_data['acf_fields'])) ? $ufc_group_data['acf_fields'] : '';
		$save_field_group_include_locations = (!empty($ufc_group_data['ufc_field_group_include_locations'])) ? $ufc_group_data['ufc_field_group_include_locations'] : '';
		$save_field_group_exclude_locations = (!empty($ufc_group_data['ufc_field_group_exclude_locations'])) ? $ufc_group_data['ufc_field_group_exclude_locations'] : '';

		// Save selected Locations
		$save_acf_field_group = (!empty($ufc_group_data['acf_field_group'])) ? $ufc_group_data['acf_field_group'] : '';
		$save_new_locations = array();


		$location_rule_group_count = 0;

		if ( !empty($save_acf_field_group['location']) ) {
			foreach ($save_acf_field_group['location'] as $location_rule_group) {

				$location_rule_row_count = 0;
				if ( !empty($location_rule_group) ) {
					foreach ($location_rule_group as $location_rule_row) {

						$save_new_locations[$location_rule_group_count][$location_rule_row_count] = $location_rule_row;
						$location_rule_row_count++;
					}
				}
				$location_rule_group_count++;
			}
		}

		// disable filters to ensure ACF loads raw data from DB
		acf_disable_filters();

		// Before save fields make filter data for each fields
		if ( ! empty( $save_field_group_acf_fields ) ) {

			foreach ( $save_field_group_acf_fields as $field_key => $field_data ) {

				$save_field_group_acf_fields[$field_key]['choices'] = array();

				if ( !empty($field_data['type']) && in_array($field_data['type'], array('select', 'checkbox', 'radio', 'button_group') ) ) {
					if ( isset($field_data['choice_keys']) && is_array($field_data['choice_keys']) ) {
							
						foreach ($field_data['choice_keys'] as $key => $choice_key) {
							$save_field_group_acf_fields[$field_key]['choices'][$choice_key] = isset($field_data['choice_values'][$key]) ? $field_data['choice_values'][$key] : '';
						}
					}
					unset($save_field_group_acf_fields[$field_key]['choice_keys']);
					unset($save_field_group_acf_fields[$field_key]['choice_values']);

				} else if ( $field_data['type'] == 'flexible_content' ) {


// echo "<pre>_POST 1 = "; print_r($_POST); echo "</pre>";

// echo "<pre>field_data 1 = "; print_r($field_data); echo "</pre>";

// echo "<pre>_REQUEST 1 = "; print_r($_REQUEST); echo "</pre>";
// exit();

				}
			}
		}

		// save fields
		if ( ! empty( $save_field_group_acf_fields ) ) {

			// loop
			foreach ( $save_field_group_acf_fields as $field ) {

				// Set slug if name is empty
				if ( empty($field['name']) ) {
					$field['name'] = str_replace( '-', '_', sanitize_title( $field['label'] ) );
				}

				// vars
				$specific = false;
				$save     = acf_extract_var( $field, 'save' );

				// only saved field if has changed
				if ( $save == 'meta' ) {
					$specific = array(
						'menu_order',
						'post_parent',
					);
				}

				// set parent
				if ( ! $field['parent'] ) {
					$field['parent'] = $save_field_group_id;
				}


// if ( $field['type'] == 'flexible_content' ) {
// 	continue;
// }
				// save field
				acf_update_field( $field, $specific );
			}
		}

		// delete fields
		if ( isset($ufc_group_data['_acf_delete_fields']) && !empty($ufc_group_data['_acf_delete_fields']) ) {

			// loop
			foreach ( $ufc_group_data['_acf_delete_fields'] as $delete_field_id ) {

				// bai early if no id
				if ( ! $delete_field_id ) {
					continue;
				}

				// delete
				acf_delete_field( $delete_field_id );
			}
		}


		// Get old Data
		$old_field_group_data = get_post( $save_field_group_id, ARRAY_A );
		$old_field_group_content = maybe_unserialize($old_field_group_data['post_content']);
		// Update hide_on_screen on data
		// $old_field_group_content['hide_on_screen'] = (isset($save_field_group['hide_on_screen'])) ? $save_field_group['hide_on_screen'] : array();
		if ( !empty($old_field_group_content) && is_array($old_field_group_content) ) {
			$old_field_group_content['location'] = $save_new_locations;
		} else {
			$old_field_group_content = array( 'location'=>$save_new_locations );
		}


		$save_status = 'publish';

		if( $save_field_group_status == 0 ){
			$save_status = 'acf-disabled';
		}

		// Create array of data to save.
		$save = array(
			'ID'             => $save_field_group_id,
			'post_type'      => 'acf-field-group',
			'post_status'	 => $save_status,
			'post_title'     => $save_field_group_title,
			'post_name'      => $save_field_group_key,
			'post_excerpt'   => $save_field_group_key,
			'post_content'   => maybe_serialize( $old_field_group_content ),
		);

		// Slash data.
		$save = wp_slash( $save );
		
		// Update or Insert.
		if ( $save_field_group_id ) {
			wp_update_post( $save );
		} else {
			// $save_field_group_id = wp_insert_post( $save );
		}

		$field_group = $old_field_group_content;
		$field_group['ID'] = $save_field_group_id;
		$field_group['title'] = $save_field_group_title;
		$field_group['key'] = $save_field_group_key;


		// Flush field group cache.
		acf_flush_field_group_cache( $field_group );

		/**
		 * Fires immediately after a field group has been updated.
		 *
		 * @param   array $field_group The field group array.
		 */
		do_action( 'acf/update_field_group', $field_group );

		// Validate field group.
		// $ufc_group_data = acf_get_valid_field_group( $ufc_group_data );


		$starred = get_posts(
			array(
				'posts_per_page'         => -1,
				'post_type'              => 'acf-field-group',
				'post_status'            => array( 'publish', 'acf-disabled', 'trash' ),
				'meta_query' => array(
					array(
						'key'     => '_collection_starred',
						'value'   => 1,
						'compare' => '=',
					),
				),
			)
		);
		
		$all = get_posts(
			array(
				'posts_per_page'         => -1,
				'post_type'              => 'acf-field-group',
				'orderby'                => 'menu_order title',
				'order'                  => 'ASC',
				'post_status'            => array( 'publish', 'acf-disabled', 'trash' ),
			)
		);
		
		$active = get_posts(
			array(
				'posts_per_page'         => -1,
				'post_type'              => 'acf-field-group',
				'post_status'            => array( 'publish' ),
			)
		);
		
		$disabled = get_posts(
			array(
				'posts_per_page'         => -1,
				'post_type'              => 'acf-field-group',
				'post_status'            => array( 'acf-disabled' ),
			)
		);
		
		$trash = get_posts(
			array(
				'posts_per_page'         => -1,
				'post_type'              => 'acf-field-group',
				'post_status'            => array( 'trash' ),
			)
		);

		$starred_count = count($starred);
		$all_count = count($all);
		$active_count = count($active);
		$disabled_count = count($disabled);
		$trash_count = count($trash);

		$response['starred_count'] = $starred_count;
		$response['all_count'] = $all_count;
		$response['active_count'] = $active_count;
		$response['disabled_count'] = $disabled_count;
		$response['trash_count'] = $trash_count;

		$response['post_id'] = $save_field_group_id;
		$response['post_status'] = get_post_status( $save_field_group_id );

		$response['success'] = 1;

	} else {
		$response['error'] = 1;
	}
}
echo json_encode($response);
exit;