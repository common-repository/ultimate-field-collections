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
if ( !empty($field_data['minlength']) ) {
	$wrapper_attrs[] = 'data-minlength='.$field_data['minlength'];
}
if ( !empty($field_data['maxlength']) ) {
	$wrapper_attrs[] = 'data-maxlength='.$field_data['maxlength'];
}
?>
<div id="<?php esc_attr_e($wrapper_id); ?>" class="<?php esc_attr_e($wrapper_class); ?>"
    <?php esc_attr_e( implode(' ', $wrapper_attrs) ); ?>>
    <div class="acf-label">
        <label for="acf-<?php esc_attr_e($field_key); ?>"><?php esc_html_e($field_label); ?>
            <?php if ($field_required){ ?><span class="acf-required">*</span><?php } ?></label>
    </div>
    <div class="acf-input">
        <div class="acf-input-wrap">
            <?php echo $field_data['message']; ?>
        </div>
    </div>
</div>