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
if ( !empty($field_data['center_lat']) ) {
	$center_lat = (!empty($field_data['center_lat'])) ? $field_data['center_lat'] : '-37.81411';
	$input_attrs[] = 'data-lat='.$center_lat;
}
if ( !empty($field_data['center_lng']) ) {
	$center_lng = (!empty($field_data['center_lng'])) ? $field_data['center_lng'] : '144.96328';
	$input_attrs[] = 'data-lng='.$center_lng;
}
if ( !empty($field_data['zoom']) ) {
	$zoom = (!empty($field_data['zoom'])) ? $field_data['zoom'] : '14';
	$input_attrs[] = 'data-zoom='.$zoom;
}
$map_height = (!empty($field_data['height'])) ? $field_data['height'].'px' : '400px';

$field_value = get_post_meta( $ufc_field_post_id, $field_name, true );
if ( isset($field_data['field_value']) ) {
	$field_value = $field_data['field_value'];
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

			<div id="<?php esc_attr_e('post-'.$ufc_field_post_id.'-acf-'.$field_key); ?>" class="acf-google-map" <?php esc_attr_e( implode(' ', $input_attrs) ); ?>>

				<input type="hidden" id="ufc-map-input-<?php esc_attr_e($field_key); ?>" class="ufc-map-field-input" name="acf[<?php esc_attr_e($field_key); ?>]" value="<?php esc_attr_e( !empty($field_value) ? json_encode( $field_value ) : '' ); ?>" >
				
				<div class="ufc-google-map-fields">
					
				</div>

				<div class="title">

					<div class="acf-actions -hover">
						<a href="#" data-name="search" class="acf-icon -search grey" title="Search"></a>
						<a href="#" data-name="clear" class="acf-icon -cancel grey" title="Clear location"></a>
						<a href="#" data-name="locate" class="acf-icon -location grey" title="Find current location"></a>
					</div>

					<input id="ufc-map-search-input-<?php esc_attr_e($field_key); ?>" class="search ufc-map-search-input pac-target-input" type="text" placeholder="Search for address..." value="<?php esc_attr_e( !empty($field_value['address']) ? $field_value['address'] : '' ); ?>"  autocomplete="off">
					<div id="ufc-map-display-<?php esc_attr_e($field_key); ?>" class="ufc-target-map-display" style="height: <?php esc_attr_e($map_height); ?>; position:relative; overflow:hidden; width:100%; border: 1px solid #ccc;"></div>
					<i class="acf-loading" style="display: none;"></i>
				</div>
			</div>


		</div>
	</div>
	<div class="ufc-field-errors">
		<p class="ufc-field-error-required"><?php esc_html_e("This field is required.", "ufcsupport" ); ?></p>
	</div>
</div>

<?php