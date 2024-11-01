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
if ( !empty($field_data['mime_types']) ) {
	$wrapper_attrs[] = 'data-mime_types='. str_replace(' ', '', $field_data['mime_types']);
}
if ( !empty($field_data['min_width']) ) {
	$wrapper_attrs[] = 'data-min_width='.$field_data['min_width'];
}
if ( !empty($field_data['max_width']) ) {
	$wrapper_attrs[] = 'data-max_width='.$field_data['max_width'];
}
if ( !empty($field_data['min_height']) ) {
	$wrapper_attrs[] = 'data-min_height='.$field_data['min_height'];
}
if ( !empty($field_data['max_height']) ) {
	$wrapper_attrs[] = 'data-max_height='.$field_data['max_height'];
}
if ( !empty($field_data['min_size']) ) {
	$wrapper_attrs[] = 'data-min_size='.$field_data['min_size'];
}
if ( !empty($field_data['max_size']) ) {
	$wrapper_attrs[] = 'data-max_size='.$field_data['max_size'];
}

$input_attrs = array();
if ($field_required) {
	$input_attrs[] = 'required=required';
}
$field_value = get_post_meta( $ufc_field_post_id, $field_name, true );
$field_image_url = '';
$field_image_size = '';
$field_image_name = '';

if ( isset($field_data['field_value']) ) {
	$field_value = $field_data['field_value'];
}

if ( is_array($field_value) && !empty($field_value['ID']) ) {
	$field_value = $field_value['ID'];
}

if ( !empty($field_value) ) {
	$attachment_image_src = wp_get_attachment_image_src( $field_value, 'full' );
	$attachment_size = ufc_get_attachment_size($field_value);
	if ( !empty($attachment_image_src) ) {
		$field_image_url = $attachment_image_src[0];
		$field_image_name = basename($attachment_image_src[0]);
		$field_image_size = $attachment_image_src[1] .' x '. $attachment_image_src[2] . ' • '; // 380 x 126 • 819 kb
	}
	$field_image_size .= $attachment_size;
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
			<div class="acf-edit-image-content-main" data-file_height="" data-file_width="" data-file_type="" data-file_subtype="" data-file_sizeinbytes="" 
			data-mime_types="<?php esc_attr_e( (!empty($field_data['mime_types'])) ? $field_data['mime_types'] : '' ); ?>" >

				<input type="hidden" class="acf-edit-image-id" id="<?php esc_attr_e('post-'.$ufc_field_post_id.'-acf-'.$field_key); ?>" name="acf[<?php esc_attr_e($field_key); ?>]" value="<?php esc_attr_e($field_value); ?>" <?php esc_attr_e( implode(' ', $input_attrs) ); ?> >
				<div class="acf-new-image-content" <?php echo ( !empty($field_value) ) ? 'style="display:none;"' : '' ; ?> >
					<button class="button acf-edit-image-upload"><i class="fa fa-cloud"></i> <?php esc_html_e( 'Media Library', 'wcdmdsupport'); ?></button>
				</div>
				<div class="acf-edit-image-content" <?php echo ( empty($field_value) ) ? 'style="display:none;"' : '' ; ?> >
					<div class="acf-edit-image-wrap">
						<img class="acf-edit-image" src="<?php echo esc_url( $field_image_url ); ?>">
						<div class="acf-edit-image-details">
							<div class="acf-edit-image-name"><?php esc_html_e($field_image_name); ?></div>
							<div class="acf-edit-image-info"><?php esc_html_e($field_image_size); ?></div>
						</div>
					</div>
					<div class="acf-edit-image-footer">
						<button class="button acf-edit-image-upload"><i class="fa fa-retweet"></i> <?php esc_html_e( 'Replace', 'wcdmdsupport'); ?></button>
						<button class="button acf-edit-image-remove"><i class="fa fa-trash"></i> <?php esc_html_e( 'Remove', 'wcdmdsupport'); ?></button>
					</div>
				</div>
			</div>

		</div>
	</div>
	<div class="ufc-field-errors">
		<p class="ufc-field-error-required"><?php esc_html_e("This field is required.", "ufcsupport" ); ?></p>
		<p class="ufc-field-error-min_width"><?php esc_html_e( sprintf("This image needs minimum width is %s px.", $field_data['min_width'] ), "ufcsupport" ); ?></p>
		<p class="ufc-field-error-max_width"><?php esc_html_e( sprintf("This image limits maximum width is %s px.", $field_data['max_width'] ), "ufcsupport" ); ?></p>
		<p class="ufc-field-error-min_height"><?php esc_html_e( sprintf("This image needs minimum height is %s px.", $field_data['min_height'] ), "ufcsupport" ); ?></p>
		<p class="ufc-field-error-max_height"><?php esc_html_e( sprintf("This image limits maximum height is %s px.", $field_data['max_height'] ), "ufcsupport" ); ?></p>
		<p class="ufc-field-error-min_size"><?php esc_html_e( sprintf("This image needs minimum size is %s MB.", $field_data['min_size'] ), "ufcsupport" ); ?></p>
		<p class="ufc-field-error-max_size"><?php esc_html_e( sprintf("This image limits maximum size is %s MB.", $field_data['max_size'] ), "ufcsupport" ); ?></p>
	</div>
</div>