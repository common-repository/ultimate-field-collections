<?php
$wrapper_id = (!empty($field_data['wrapper']['id'])) ? $field_data['wrapper']['id'] : '';
$wrapper_class = 'acf-field ufc-group-video-view acf-'.$field_key;
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

			<div class="ufc-group-table">
				<div class="ufc-group-list-body">

					<?php
					$field_parent_data = $field_data;
					$field_child_row = 0;

					$field_child_row++;
					echo '<div class="acf-row" data-id="row-'.esc_attr($field_child_row).'">';
						echo '<div class="acf-fields">';
							echo '<div class="ufc-group-sub-fields-main">';
								echo '<div class="ufc-group-sub-fields-wrap">';

									$ufc_video_sub_fields = array();
									$ufc_video_type = '';

									if ( !empty($field_parent_data['sub_fields']) ) {
										foreach ($field_parent_data['sub_fields'] as $key => $field_data) {

											if ( empty($ufc_video_type) ) {
												if ( (!empty($field_data['name'])) && (!empty($field_parent_value[$field_data['name']])) ) {
													$ufc_video_type = $field_data['type'];
												}
											}
											$ufc_video_sub_fields[$field_data['type']] = $field_data;
											$ufc_video_sub_fields[$field_data['type']]['ufc_repeater_field_parent_data'] = $field_parent_data;
											if ( !empty($field_parent_value[$field_data['name']]) ) {
												$ufc_video_sub_fields['sub_fields'][$key]['field_value'] = $field_parent_value[$field_data['name']];
											}

											$ufc_key = (!empty($ufc_video_sub_fields['ufc_key'])) ? $ufc_video_sub_fields['ufc_key'].']' : '';
											if ( !empty($ufc_key) ) { $ufc_key .= '['; }
											$ufc_key .= (!empty($ufc_video_sub_fields['key'])) ? $ufc_video_sub_fields['key'] : '';
											$ufc_video_sub_fields['sub_fields'][$key]['ufc_key'] = $ufc_key;
										}
									}

									echo '<div class="ufc-group-video-type" style="'. esc_attr( (!empty($ufc_video_type)) ? 'display:none;' : '' ) .'">';
									echo '<button class="button ufc-video-type-button" data-video_type="file"><i class="fa fa-cloud"></i> '. esc_html__( 'Media Library', 'wcdmdsupport') .'</button><span class="separator">' . esc_html__( ' OR ', 'wcdmdsupport') . '</span>';
									echo '<button class="button ufc-video-type-button" data-video_type="oembed"><i class="fa fa-link"></i> '. esc_html__( 'Video Link', 'wcdmdsupport') .'</button>';
									echo '</div>';

									if ( !empty($ufc_video_sub_fields) ) {
										foreach ($ufc_video_sub_fields as $video_type => $field_data) {

											echo '<div class="ufc-group-video-field-'.esc_attr($video_type).'" style="'. esc_attr( (empty($ufc_video_type) || ($video_type!=$ufc_video_type) ) ? 'display:none;' : '' ) .'">';

												$temp_parent_field_data = (!empty($field_data['ufc_repeater_field_parent_data'])) ? $field_data['ufc_repeater_field_parent_data'] : $field_parent_data;

												$field_key = (!empty($temp_parent_field_data['key'])) ? $temp_parent_field_data['key'].']' : '';
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

												if ( $video_type == 'file' ) {
													if ( file_exists( UFC_TEMPLATES_DIR.'/post-meta-edit-view/group-video-file-view.php' ) ) {
													  include( UFC_TEMPLATES_DIR.'/post-meta-edit-view/group-video-file-view.php' );
													}
													echo '<div class="ufc-group-video-type">';
													echo '<button class="button ufc-video-type-button" data-video_type="oembed"><i class="fa fa-repeat"></i> '. esc_html__( 'Switch to Video Link', 'wcdmdsupport') .'</button>';
													echo '</div>';

												} else if ( $video_type == 'oembed' ) {
													if ( file_exists( UFC_TEMPLATES_DIR.'/post-meta-edit-view/group-video-oembed-view.php' ) ) {
													  include( UFC_TEMPLATES_DIR.'/post-meta-edit-view/group-video-oembed-view.php' );
													}
													echo '<div class="ufc-group-video-type">';
													echo '<button class="button ufc-video-type-button" data-video_type="file"><i class="fa fa-repeat"></i> '. esc_html__( 'Switch to Media Library', 'wcdmdsupport') .'</button>';
													echo '</div>';

												}
												$field_parent_data = $temp_parent_field_data;

											echo '</div>';
										}
									}

								echo '</div>';
							echo '</div>';
						echo '</div>';
					echo '</div>';
					?>

				</div>
			</div>

		</div>
	</div>
</div>