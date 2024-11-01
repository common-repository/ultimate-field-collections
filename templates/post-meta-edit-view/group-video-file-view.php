<?php
$wrapper_id = (!empty($field_data['wrapper']['id'])) ? $field_data['wrapper']['id'] : '';
$wrapper_class = 'acf-field acf-field-'.$field_type.' ufc-group-video-file-view acf-'.$field_key;
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
$field_value = get_post_meta( $ufc_field_post_id, $field_name, true );
$field_file_url = '';
$field_file_size = '';
$field_file_name = '';
$field_file_icon = '<img class="acf-edit-icon" src="'.includes_url('images/media/default.png').'" title="" alt="">';

if ( isset($field_data['field_value']) ) {
	$field_value = $field_data['field_value'];
}

if ( !empty($field_value) ) {
	if ( is_array($field_value) && !empty($field_value['ID']) ) {
		$field_value = $field_value['ID'];
	}
	$attachment_url = wp_get_attachment_url( $field_value );
	$attached_file = get_attached_file( $field_value );
	if ( is_file( $attached_file ) ){
		$field_file_size = size_format( filesize( $attached_file ) );
		$field_file_name = basename($attached_file);
		$field_file_icon = wp_get_attachment_image( $field_value, 'thumbnail', "", array( "class" => "acf-edit-icon" ) );
		if ( !empty($field_file_icon_temp) ) {
			$field_file_icon = $field_file_icon_temp;
		}
	}
}

?>
<div id="<?php esc_attr_e($wrapper_id); ?>" class="<?php esc_attr_e($wrapper_class); ?>" <?php esc_attr_e( implode(' ', $wrapper_attrs) ); ?> >
	<div class="acf-input">
		<div class="acf-input-wrap">
			<div class="acf-edit-file-content-main" data-mime_types="<?php esc_attr_e( (!empty($field_data['mime_types'])) ? $field_data['mime_types'] : '' ); ?>">
				<input type="hidden" class="acf-edit-file-id" id="<?php esc_attr_e('post-'.$ufc_field_post_id.'-acf-'.$field_key); ?>" name="acf[<?php esc_attr_e($field_key); ?>]" value="<?php esc_attr_e($field_value); ?>" <?php esc_attr_e( implode(' ', $input_attrs) ); ?> >
				<div class="acf-new-file-content" <?php echo ( !empty($field_value) ) ? 'style="display:none;"' : '' ; ?> >
					<button class="button acf-edit-file-upload"><i class="fa fa-cloud"></i> <?php esc_html_e( 'Media Library', 'wcdmdsupport'); ?></button>
				</div>
				<div class="acf-edit-file-content" style="<?php esc_attr_e( ( empty($field_value) ) ? 'display:none;' : '' ); ?>" >
					<div class="acf-edit-file-wrap">
						<?php echo wp_kses( $field_file_icon, array( 'img'=>array( 'class' => array(), 'src' => array(), 'title' => array(), 'alt' => array() ) ) ); ?>
						<div class="acf-edit-file-details">
							<div class="acf-edit-file-name"><?php esc_html_e($field_file_name); ?></div>
							<div class="acf-edit-file-info"><?php esc_html_e($field_file_size); ?></div>
						</div>
					</div>
					<div class="acf-edit-file-footer">
						<button class="button acf-edit-file-upload"><i class="fa fa-repeat"></i> <?php esc_html_e( 'Replace', 'wcdmdsupport'); ?></button>
						<button class="button acf-edit-file-remove"><i class="fa fa-trash"></i> <?php esc_html_e( 'Remove', 'wcdmdsupport'); ?></button>
					</div>
				</div>
			</div>

		</div>
	</div>
</div>
