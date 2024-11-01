<?php
$wrapper_id = (!empty($field_data['wrapper']['id'])) ? $field_data['wrapper']['id'] : '';
$wrapper_class = 'acf-field acf-field-'.$field_type.' acf-'.$field_key;
$wrapper_class .= (!empty($field_data['wrapper']['class'])) ? ' '.$field_data['wrapper']['class'] : '';


$wrapper_attrs = array();
$wrapper_attrs[] = 'data-name='.( empty($field_name) ? $field_key : $field_name );
$wrapper_attrs[] = 'data-type='.$field_type;
$wrapper_attrs[] = 'data-key='.$field_key;
if ( !empty($field_data['wrapper']['width']) ) {
	$wrapper_width = $field_data['wrapper']['width'];
	$wrapper_attrs[] = 'style=width: '.$wrapper_width.'%;';
	$wrapper_attrs[] = 'data-width='.$wrapper_width;
}
if ( !empty($field_data['endpoint']) ) {
	$wrapper_class .= ' is_'.$field_type.'_endpoint';
}


$input_attrs = array();
$input_attrs[] = 'data-placement=top';
$input_attrs[] = 'data-endpoint=0';
$input_attrs[] = 'class=acf-tab-button';
$input_attrs[] = 'data-key='.$field_key;

$field_value = get_post_meta( $ufc_field_post_id, $field_name, true );
if ( isset($field_data['field_value']) ) {
	$field_value = $field_data['field_value'];
}

?>
<div id="<?php esc_attr_e($wrapper_id); ?>" class="<?php esc_attr_e($wrapper_class); ?>"
    <?php esc_attr_e( implode(' ', $wrapper_attrs) ); ?>>
    <div class="acf-label acf-accordion-title">
    	<i class="acf-accordion-icon dashicons dashicons-arrow-down"></i>
        <label for="acf-<?php esc_attr_e($field_key); ?>"><?php esc_html_e($field_label); ?></label>
        <?php
		if ( !empty($field_instructions) ) {
			?><p class="description"><?php esc_html_e( $field_instructions ); ?></p><?php
		}
		?>
    </div>
    <div class="acf-input acf-accordion-content">
        <div class="acf-fields ufc-accordion-sub-fields-wrap">
        </div>
    </div>
</div>