<?php
$wrapper_id = (!empty($field_data['wrapper']['id'])) ? $field_data['wrapper']['id'] : '';
$wrapper_class = 'acf-field acf-field-'.$field_type.' acf-'.$field_key;
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

$field_val = get_post_meta( $ufc_field_post_id, $field_name, true );
if ( isset($field_data['field_value']) ) {
	$field_val = $field_data['field_value'];
}

$field_reference_group_id = $field_data['ufc_reference_collection'];
$field_select_type = $field_data['field_type'];

$reference_all_field_groups = acf_get_field_groups();

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
		<div class="acf-select-wrap">

			<?php if ( $field_select_type == 'multi_select' ) { ?>
				<input type="hidden" id="acf-<?php esc_attr_e($field_key); ?>-input" name="acf[<?php esc_attr_e($field_key); ?>]">
				<select id="<?php esc_attr_e('post-'.$ufc_field_post_id.'-acf-'.$field_key); ?>" class="ufc-field-view-select2" name="acf[<?php esc_attr_e($field_key); ?>][]" data-ui="0" data-ajax="0" data-multiple="1" data-placeholder="Select" data-allow_null="1" multiple>

			<?php } else /*if ( $field_select_type == 'select' )*/ { ?>
				<select id="<?php esc_attr_e('post-'.$ufc_field_post_id.'-acf-'.$field_key); ?>" class="ufc-field-view-select2" name="acf[<?php esc_attr_e($field_key); ?>]" data-ui="0" data-ajax="0" data-multiple="0" data-placeholder="Select" data-allow_null="1">
				<option value=""><?php esc_html_e("- Select -", "ufcsupport" ); ?></option>
			<?php } ?>

				<?php
				if ( !empty($reference_all_field_groups) ) {
					foreach ($reference_all_field_groups as $reference_field_group_key => $reference_field_group_data) {
						if ( !empty($reference_field_group_data['ID']) && ($field_reference_group_id==$reference_field_group_data['ID']) ) {

							$all_matched_posts_ids = array();
							if ( !empty($reference_field_group_data) ) {

								$field_group_id = $reference_field_group_data['ID'];
								$field_group_key = $reference_field_group_data['key'];
								$field_group_title = $reference_field_group_data['title'];
								$locations_arr = array();
								if ( !empty($reference_field_group_data['location']) ) {
									foreach ($reference_field_group_data['location'] as $locations_data) {

										// Get Posts Prepare
										$post_types_arr = array();
										$include_post_ids_arr = array();
										$exclude_post_ids_arr = array();
										if ( !empty($locations_data) ) {
											foreach ($locations_data as $single_location_data) {
												if ( ($single_location_data['param']=="post_type") && ($single_location_data['operator']=='==') ) {
													$post_types_arr[] = $single_location_data['value'];
												}
												if ( (($single_location_data['param']=="post") || ($single_location_data['param']=="page")) && ($single_location_data['operator']=='==') ) {
													$include_post_ids_arr[] = $single_location_data['value'];
												}
												if ( (($single_location_data['param']=="post") || ($single_location_data['param']=="page")) && ($single_location_data['operator']=='!=') ) {
													$exclude_post_ids_arr[] = $single_location_data['value'];
												}
											}
										}
										// Get Matched Posts
										$matched_post_args = array(
											'post_type'				=> (!empty($post_types_arr)) ? $post_types_arr : 'any',
											'post_status'           => 'publish',
											'ignore_sticky_posts'   => 1,
											'posts_per_page'        => '-1',
										);
										if ( !empty($include_post_ids_arr) ) {
											$matched_post_args['include'] = $include_post_ids_arr;
										}
										if ( !empty($exclude_post_ids_arr) ) {
											$matched_post_args['exclude'] = $exclude_post_ids_arr;
										}
										$matched_posts = get_posts($matched_post_args );

										if ( !empty($matched_posts) ) {

											foreach ($matched_posts as $matched_post) {

												if ( !empty($matched_post) ) {

													$field_post_id = $matched_post->ID;
													$field_post_title = $matched_post->post_title;
													$field_post_type = $matched_post->post_type;
													if ( empty($all_matched_posts_ids) || ( !empty($all_matched_posts_ids) && !in_array($field_post_id, $all_matched_posts_ids) ) ) {

														$all_matched_posts_ids[] = $field_post_id;

														if ( is_array($field_val) ) {
															$selected = (in_array($field_post_id, $field_val)) ? 'selected="selected"' : '';

														} else {
															$selected = ($field_val==$field_post_id) ? 'selected="selected"' : '';
														}
														?><option value="<?php esc_attr_e($field_post_id); ?>" <?php esc_attr_e($selected); ?>><?php esc_html_e( $field_post_title ); ?></option><?php

													}
												}
											}
										}
									}
								}

							}

						}
					}
				}
				?>
			</select>

		</div>
	</div>
	<div class="ufc-field-errors">
		<p class="ufc-field-error-required"><?php esc_html_e("This field is required.", "ufcsupport" ); ?></p>
	</div>
</div>