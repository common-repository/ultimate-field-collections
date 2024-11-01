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

$field_value = get_post_meta( $ufc_field_post_id, $field_name, true );
if ( isset($field_data['field_value']) ) {
	$field_value = $field_data['field_value'];
}

// vars
$div = array(
	'id'    => $field_data['id'],
	'class' => $field_data['class'] . ' acf-link',
);

// render scripts/styles
acf_enqueue_uploader();

// classes
if ( isset($field_value['url']) ) {
	$div['class'] .= ' -value';
}

if ( isset($field_value['target']) && $field_value['target'] === '_blank' ) {
	$div['class'] .= ' -external';
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
			<div <?php acf_esc_attr_e( $div ); ?>>

				<div class="acf-hidden">
					<a class="link-node" href="<?php echo esc_url( !empty($field_value['url']) ? $field_value['url'] : '' ); ?>" target="<?php esc_attr_e( !empty($field_value['target']) ? $field_value['target'] : '' ); ?>"><?php esc_html_e( !empty($field_value['title']) ? $field_value['title'] : '' ); ?></a>
					<input type="hidden" class="input-title" name="acf[<?php esc_attr_e($field_key); ?>][title]" value="<?php esc_attr_e( !empty($field_value['title']) ? $field_value['title'] : '' ); ?>">
					<input type="hidden" class="input-url" name="acf[<?php esc_attr_e($field_key); ?>][url]" value="<?php esc_attr_e( !empty($field_value['url']) ? $field_value['url'] : '' ); ?>">
					<input type="hidden" class="input-target" name="acf[<?php esc_attr_e($field_key); ?>][target]" value="<?php esc_attr_e( !empty($field_value['target']) ? $field_value['target'] : '' ); ?>">
				</div>

				<a href="#" class="button" data-name="add" target="">Select Link</a>
				<div class="link-wrap">
					<span class="link-title"><?php esc_html_e( !empty($field_value['title']) ? $field_value['title'] : '' ); ?></span>
					<a class="link-url" href="<?php echo esc_url( !empty($field_value['url']) ? $field_value['url'] : '' ); ?>" target="_blank"><?php esc_html_e( !empty($field_value['url']) ? $field_value['url'] : '' ); ?></a>
					<i class="acf-icon -link-ext acf-js-tooltip" title="Opens in a new window/tab"></i>
					<a class="acf-icon -pencil -clear acf-js-tooltip" data-name="edit" href="#" title="Edit"></a>
					<a class="acf-icon -cancel -clear acf-js-tooltip" data-name="remove" href="#" title="Remove"></a>
				</div>

			</div>
		</div>
	</div>
	<div class="ufc-field-errors">
		<p class="ufc-field-error-required"><?php esc_html_e("This field is required.", "ufcsupport" ); ?></p>
	</div>
</div>
<?php
