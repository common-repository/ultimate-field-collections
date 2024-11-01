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
$wrapper_attrs[] = 'data-ufc_field_post_id="'.$ufc_field_post_id.'"';

$input_attrs = array();
if ($field_required) {
	$input_attrs[] = 'required=required';
}

$field_val = get_post_meta( $ufc_field_post_id, $field_name, true );
if ( isset($field_data['field_value']) ) {
	$field_val = $field_data['field_value'];
}

$field_taxonomy_slug = $field_data['taxonomy'];
$field_select_type = $field_data['field_type'];

$field_taxonomy_terms = get_terms( $field_taxonomy_slug, array( 'hide_empty' => false ) );

?>
<div id="<?php esc_attr_e($wrapper_id); ?>" class="<?php esc_attr_e($wrapper_class); ?>" <?php esc_attr_e( implode(' ', $wrapper_attrs) ); ?> >
	<div class="acf-label">
		<label for="acf-<?php esc_attr_e($field_key); ?>"><?php esc_html_e($field_label); ?> <?php if ($field_required){ ?><span class="acf-required">*</span><?php } ?></label>
		<?php
		if ( !empty($field_instructions) ) {
			?><p class="description"><?php esc_html_e( $field_instructions ); ?></p><?php
		}
		?>
		<div class="acf-actions -hover">
			<span class="acf-icon -plus acf-js-tooltip small" data-name="add" data-taxonomy_slug="<?php esc_attr_e($field_taxonomy_slug); ?>" title="<?php esc_attr_e('Add new category', 'wcdmdsupport'); ?>"></span>
		</div>
	</div>
	<div class="acf-input">
		<div class="acf-select-wrap">

			<?php if ( $field_select_type == 'multi_select' ) { ?>
				<input type="hidden" id="acf-<?php esc_attr_e($field_key); ?>-input" name="acf[<?php esc_attr_e($field_key); ?>][]">
				<select id="<?php esc_attr_e('post-'.$ufc_field_post_id.'-acf-'.$field_key); ?>" class="ufc-field-view-select2" name="acf[<?php esc_attr_e($field_key); ?>][]" data-ui="0" data-ajax="0" data-multiple="1" data-placeholder="Select" data-allow_null="1" multiple>

			<?php } else /*if ( $field_select_type == 'select' )*/ { ?>
				<select id="<?php esc_attr_e('post-'.$ufc_field_post_id.'-acf-'.$field_key); ?>" class="ufc-field-view-select2" name="acf[<?php esc_attr_e($field_key); ?>]" data-ui="0" data-ajax="0" data-multiple="0" data-placeholder="Select" data-allow_null="1">
				<option value=""><?php esc_html_e("- Select -", "ufcsupport" ); ?></option>
			<?php } ?>

				<?php
				if ( !empty($field_taxonomy_terms) ) {
					foreach ($field_taxonomy_terms as $key => $taxonomy_term) {
						if ( is_array($field_val) ) {
							$selected = (in_array($taxonomy_term->term_id, $field_val)) ? 'selected="selected"' : '';

						} else {
							$selected = ($field_val==$taxonomy_term->term_id) ? 'selected="selected"' : '';
						}
						?><option value="<?php esc_attr_e($taxonomy_term->term_id); ?>" <?php esc_attr_e($selected); ?>><?php esc_html_e( $taxonomy_term->name ); ?></option><?php
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