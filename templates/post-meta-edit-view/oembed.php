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

$input_attrs = array( 'placeholder="Enter URL"' );
if ($field_required) {
	$input_attrs[] = 'required=required';
}

$field_value = get_post_meta( $ufc_field_post_id, $field_name, true );


if ( isset($field_data['field_value']) ) {
	$field_value = $field_data['field_value'];
}

/* if ( !empty($field_value) ) {
	$field_value_arr = explode('src="', $field_value);
	$field_value_arr2 = explode('"', $field_value_arr[1]);
	$field_value = $field_value_arr2[0];
} */
?>


<?php 
/* echo '<pre>';
print_r( $field_data ); 
echo '</pre>'; */
?>


<div id="<?php esc_attr_e($wrapper_id); ?>" class="<?php esc_attr_e($wrapper_class); ?>"
    <?php esc_attr_e( implode(' ', $wrapper_attrs) ); ?>>
    <div class="acf-label">
        <label for="acf-<?php esc_attr_e($field_key); ?>"><?php esc_html_e($field_label); ?>
            <?php if ($field_required){ ?><span class="acf-required">*</span><?php } ?></label>
        <?php
		if ( !empty($field_instructions) ) {
			?><p class="description"><?php esc_html_e( $field_instructions ); ?></p><?php
		}
		?>
    </div>
    <div class="acf-input acf-<?php echo esc_attr( $field_type ); ?>">
        <div class="acf-input-wrap <?php if( $field_value != '') echo esc_attr('has-value'); ?>">
            <input type="text" id="<?php esc_attr_e('post-'.$ufc_field_post_id.'-acf-'.$field_key); ?>"
                name="acf[<?php esc_attr_e($field_key); ?>]" value="<?php esc_attr_e($field_value); ?>"
                data-key="<?php esc_attr_e($field_key); ?>" <?php echo implode(' ', $input_attrs); ?>>
            <div class="acf-actions -hover">
                <a data-name="clear-button" href="#" class="acf-icon -cancel grey"></a>
            </div>
        </div>
    </div>

    <div class="canvas">
        <div class="canvas-media">
            <?php echo wp_oembed_get( $field_value, array( 'width' => $field_data['width'], 'height'=> $field_data['height'] ) ); ?>
        </div>
    </div>

    <div class="ufc-field-errors">
        <p class="ufc-field-error-required"><?php esc_html_e("This field is required.", "ufcsupport" ); ?></p>
    </div>
</div>