<?php 
$rule_value = array(
	'param' => 'post_type',
	'operator' => '==',
	'value' => 'post',
);
// vars
$location_rule_types = acf_get_location_rule_types();
// vars
$prefix = 'acf_field_group[location][UFC_Rule_Group_Key][UFC_Rule_Key]';
$location_rule_operators = acf_get_location_rule_operators( $rule_value );
$location_rule_values = acf_get_location_rule_values( $rule_value );
?>
<div class="ufc-field-loc-rule-row">
		
	<div class="ufc-field-loc-rule-param">
		<?php
		// array
		if ( is_array( $location_rule_types ) ) {

			acf_render_field(
				array(
					'type'    => 'select',
					'name'    => 'param',
					'prefix'  => $prefix,
					'value'   => $rule_value['param'],
					'choices' => $location_rule_types,
					'class'   => 'refresh-location-rule',
				)
			);
		}
		?>
	</div>

	<div class="ufc-field-loc-rule-operator">
		<?php
		// array
		if ( is_array( $location_rule_operators ) ) {

			acf_render_field(
				array(
					'type'    => 'select',
					'name'    => 'operator',
					'prefix'  => $prefix,
					'value'   => $rule_value['operator'],
					'choices' => $location_rule_operators,
					'class'   => 'location-rule-operator',
				)
			);

			// custom
		} else {

			esc_html_e( $location_rule_operators );
		}
		?>
	</div>

	<div class="ufc-field-loc-rule-value">
		<?php
		// array
		if ( is_array( $location_rule_values ) ) {

			acf_render_field(
				array(
					'type'    => 'select',
					'name'    => 'value',
					'prefix'  => $prefix,
					'value'   => $rule_value['value'],
					'choices' => $location_rule_values,
					'class'   => 'location-rule-value',
				)
			);

			// custom
		} else {

			esc_html_e($location_rule_values);

		}
		?>
	</div>

	<div class="ufc-field-loc-rule-remove"><span class="ufc-remove-location-rule"><i class="fa fa-times-circle"></i></span></div>
	<div class="ufc-field-loc-rule-add"><span><?php esc_html_e( 'and', 'ufcsupport' ); ?></span></div>
</div>
<?php 
