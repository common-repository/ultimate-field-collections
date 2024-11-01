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
if ( !empty($field_data['min']) ) {
	$input_attrs[] = 'min='.$field_data['min'];
	$wrapper_attrs[] = 'data-minlength='.$field_data['min'];
}else{
    $input_attrs[] = 'min=0';
}
if ( !empty($field_data['max']) ) {
	$input_attrs[] = 'max='.$field_data['max'];
	$wrapper_attrs[] = 'data-maxlength='.$field_data['max'];
}else{
    $input_attrs[] = 'max=100';
}
if ( !empty($field_data['step']) ) {
	$input_attrs[] = 'step='.$field_data['step'];
}else{
    $input_attrs[] = 'step=1';
}
if ($field_required) {
	$input_attrs[] = 'required=required';
}

$field_value = get_post_meta( $ufc_field_post_id, $field_name, true );
if ( isset($field_data['field_value']) ) {
	$field_value = $field_data['field_value'];
}

if( $field_value ){
    $input_attrs[] = 'value='.$field_value;
}elseif( !empty($field_data['default_value']) ){
    $input_attrs[] = 'value='.$field_data['default_value'];
}else{
    $input_attrs[] = 'value=0';
}

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
    <div class="acf-input">
        <div class="acf-range-wrap">
            <input type="range" id="<?php esc_attr_e('acf-'.$field_key); ?>"
                name="acf[<?php esc_attr_e($field_key); ?>]" <?php esc_attr_e( implode(' ', $input_attrs) ); ?>>
            <input type="number" id="<?php esc_attr_e('acf-'.$field_key.'-alt'); ?>"
                <?php esc_attr_e( implode(' ', $input_attrs) ); ?>>
        </div>
    </div>
    <div class="ufc-field-errors">
        <p class="ufc-field-error-required"><?php esc_html_e("This field is required.", "ufcsupport" ); ?></p>
        <p class="ufc-field-error-minlength">
            <?php esc_html_e( sprintf("This field needs minimum value is %s.", $field_data['min'] ), "ufcsupport" ); ?>
        </p>
        <p class="ufc-field-error-maxlength">
            <?php esc_html_e( sprintf("This field limits maximum value is %s.", $field_data['max'] ), "ufcsupport" ); ?>
        </p>
    </div>
</div>