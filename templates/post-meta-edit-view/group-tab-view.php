<?php
$wrapper_id = (!empty($field_data['wrapper']['id'])) ? $field_data['wrapper']['id'] : '';
$wrapper_class = 'acf-field acf-field-'.$field_type.' ufc-group-tab-view-wrapper acf-'.$field_key;
$wrapper_class .= (!empty($field_data['wrapper']['class'])) ? ' '.$field_data['wrapper']['class'] : '';
$wrapper_class .= ($field_required) ? ' is-required' : '';

$wrapper_attrs = array();
$wrapper_attrs[] = 'data-name='.$field_name;
$wrapper_attrs[] = 'data-type='.$field_type;
$wrapper_attrs[] = 'data-key='.$field_key;
if ( !empty($field_data['wrapper']['width']) ) {
	$wrapper_width = $field_data['wrapper']['width'];
	$wrapper_attrs[] = 'style=width: '.$wrapper_width.'%;';
	$wrapper_attrs[] = 'data-width='.$wrapper_width;
}
if ($field_required) {
	$wrapper_attrs[] = 'data-required=1';
}

$input_attrs = array();
if ($field_required) {
	$input_attrs[] = 'required=required';
}

$field_parent_value = get_field( $field_name, $ufc_field_post_id );

if ( isset($field_data['field_parent_value']) ) {
	$field_parent_value = $field_data['field_parent_value'];

} else if ( isset($field_data['field_value']) ) {
	$field_parent_value = $field_data['field_value'];

} else {
	$field_data['field_parent_value'] = $field_parent_value;
}

?>
<div id="<?php esc_attr_e($wrapper_id); ?>" class="<?php esc_attr_e($wrapper_class); ?>" <?php esc_attr_e( implode(' ', $wrapper_attrs) ); ?> >
	<div class="acf-label">
		<label for="acf-<?php esc_attr_e($field_key); ?>"><?php esc_html_e($field_label); ?> <?php if ($field_required){ ?><span class="acf-required">*</span><?php } ?></label>
		<?php
		if ( !empty($field_instructions) ) {
			?><p class="description"><?php esc_html_e( $field_instructions ); ?></p><?php
		}
		?>
	</div>
	<div class="acf-input">
		<div class="acf-input-wrap">
			<div class="acf-fields">

				<?php
				$field_parent_data = $field_data;
				$is_tab_stated = false;
				$tab_head_count = 0;
				$tab_content_count = 0;

			    echo '<div class="ufc-tab-wrap">';
			      echo '<div class="ufc-tab-head-wrap">';
			        echo '<ul class="ufc-head-list ufc-tab-group">';
						if ( !empty($field_parent_data['sub_fields']) ) {

							foreach ($field_parent_data['sub_fields'] as $key => $field_data) {

								if ( $field_data['type'] == 'group' ) {

									$tab_head_count++;
									$field_parent_data['sub_fields'][$key] = $field_data;
									$field_parent_data['sub_fields'][$key]['ufc_repeater_field_parent_data'] = $field_parent_data;
									if ( $tab_head_count == 1 ) {
										echo '<li class="active">';
									} else {
										echo '<li>';
									}
									echo '<a href="" class="ufc-tab-button" data-target_key="tab_target_key_'.esc_attr__($field_data['key'].'_'.$key).'">'.esc_html__($field_data['label']).'</a></li>';
									if ( !empty($field_parent_value[$field_data['name']]) ) {
										$field_parent_data['sub_fields'][$key]['field_value'] = $field_parent_value[$field_data['name']];
									}

									$ufc_key = (!empty($field_parent_data['ufc_key'])) ? $field_parent_data['ufc_key'].']' : '';
									if ( !empty($ufc_key) ) { $ufc_key .= '['; }
									$ufc_key .= (!empty($field_parent_data['key'])) ? $field_parent_data['key'] : '';
									$field_parent_data['sub_fields'][$key]['ufc_key'] = $ufc_key;
								}
				            }
				        }
			        echo '</ul>'; // END of .ufc-head-list.ufc-tab-group
			      echo '</div>'; // END of .ufc-tab-head-wrap


				echo '<div class="ufc-group-sub-fields-main">';
					echo '<div class="ufc-group-sub-fields-wrap">';

						if ( !empty($field_parent_data['sub_fields']) ) {
							foreach ($field_parent_data['sub_fields'] as $key => $field_data) {

								$temp_group_tab_parent_field_data = (!empty($field_data['ufc_repeater_field_parent_data'])) ? $field_data['ufc_repeater_field_parent_data'] : $field_parent_data;

								$field_key = (!empty($temp_group_tab_parent_field_data['key'])) ? $temp_group_tab_parent_field_data['key'].']' : '';
								$field_key .= (!empty($field_data['key'])) ? '['.$field_data['key'] : '';

								$field_ID = (!empty($field_data['ID'])) ? $field_data['ID'] : $field_key;
								$field_type = (!empty($field_data['type'])) ? $field_data['type'] : '';
								$field_label = (!empty($field_data['label'])) ? $field_data['label'] : '';
								$field_name = (!empty($field_data['name'])) ? $field_data['name'] : '';
								$field_instructions = (!empty($field_data['instructions'])) ? $field_data['instructions'] : '';
								$field_required = (!empty($field_data['required'])) ? $field_data['required'] : '';
								if ( empty($field_data['field_value']) ) {
									$field_data['field_value'] = (isset($field_parent_value[$field_name])) ? $field_parent_value[$field_name] : '';
								}

								if ( $field_type == 'group' ) {

									$tab_content_count++;
									if ( $is_tab_stated == false ) {
								  		$is_tab_stated = true;
								      echo '<div class="ufc-tab-content-wrap">';
								        echo '<div class="ufc-tab-content-box" id="tab_target_key_'.esc_attr__($field_data['key'].'_'.$key).'" style="display: block;">';
									} else {

								        echo '</div>'; // END of prev .ufc-tab-content-box
								        echo '<div class="ufc-tab-content-box" id="tab_target_key_'.esc_attr__($field_data['key'].'_'.$key).'">';
									}
								}

								/* Check and view based on Group type */
								if ( in_array( $field_type, array('accordion', 'tab') ) ) {
									// empty HTML
								} else if ( $field_type == 'group' && !isset( $field_data['group_accordion_field_open']) && !isset( $field_data['group_tab_field_open']) ) {

									if ( isset( $field_data['ufc_field_video_group'] ) ) {
										include( UFC_TEMPLATES_DIR.'/post-meta-edit-view/group-video-view.php' );

									} else {
										include( UFC_TEMPLATES_DIR.'/post-meta-edit-view/group.php' );
									}

								} else if ( ($field_type != 'group') && file_exists( UFC_TEMPLATES_DIR.'/post-meta-edit-view/'.$field_type.'.php' ) ) {
									include( UFC_TEMPLATES_DIR.'/post-meta-edit-view/'.$field_type.'.php' );

								} else  {

									$file_path = apply_filters( 'ufc_field_post_meta_edit_view_file_path_filter', '', $field_type, $field_data );
									if ( !empty($file_path) && file_exists($file_path) ) { include( $file_path ); }
								}

								$field_parent_data = $temp_group_tab_parent_field_data;
							}
						}

						if ( $is_tab_stated == true ) {
						      echo '</div>'; // END of .ufc-tab-content-box
						    echo '</div>'; // END of .ufc-tab-content-wrap
						}

					echo '</div>';
				echo '</div>';

				if ( $is_tab_stated == true ) {
				  echo '</div>'; // END of .ufc-tab-wrap
				}
				?>

			</div>
		</div>
	</div>
</div>
