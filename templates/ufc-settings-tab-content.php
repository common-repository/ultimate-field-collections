<?php
$group_fields_data = (!empty($field_group_data)) ? acf_get_fields( $field_group_data ) : array();

// global
global $field_group;
$field_group = $field_group_data;

// Get all Post type
$include_locations = array();
$exclude_locations = array();
$all_post_types = get_post_types( array( 'show_ui'   => true ) );
if ( isset($all_post_types['attachment']) ) { unset( $all_post_types['attachment'] ); }
if ( isset($all_post_types['wp_block']) ) { unset( $all_post_types['wp_block'] ); }
if ( isset($all_post_types['acf-field-group']) ) { unset( $all_post_types['acf-field-group'] ); }
if ( isset($all_post_types['fl-builder-template']) ) { unset( $all_post_types['fl-builder-template'] ); }
if ( isset($all_post_types['fl-theme-layout']) ) { unset( $all_post_types['fl-theme-layout'] ); }

// Get All Posts for Location
if ( !empty($field_group['location']) ) {
	foreach ($field_group['location'] as $loc_key => $location_arr) {
		
		if ( !empty($location_arr) && is_array($location_arr) ) {
			foreach ($location_arr as $location_key => $location_value) {
				
				if ( $location_value['operator'] == '==' ) {
					$include_locations[] = $location_value['param'].$location_value['operator'].$location_value['value'];
				} else if ( $location_value['operator'] == '!=' ) {
					$exclude_locations[] = $location_value['param'].$location_value['operator'].$location_value['value'];
				}
			}
		}
	}
}

// Global variables
global $ufc_admin;
$all_field_types = $ufc_admin->ufc_get_all_field_types();
?>
<form id="ufc_settings_form">
    <div class="ufc-group-settings-fields">

        <div class="ufc-settings-field-main">

            <span class="ufc-close-field-locations">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M16.0001 14.1539L9.8463 8.00007L8.00016 9.84621L14.154 16L8.00017 22.1538L9.84631 23.9999L16.0001 17.8461L22.1539 23.9999L24 22.1538L17.8462 16L24 9.8462L22.1539 8.00006L16.0001 14.1539Z"
                        fill="#1F1F1F"></path>
                </svg>
            </span>
						
						<div class="field-edit-content-row ">
							<div class="field-edit-col">
								<label class="field-label ufc-field-checkbox-switch" for="ufc_field_group_status">
									<?php esc_html_e("Status", "ufcsupport" ); ?>
									<input type="checkbox" name="ufc_field_group_status" id="ufc_field_group_status"
											class="ufc-field-checkbox" data-id="<?php echo esc_attr( $field_group_data['ID'] ); ?>"
											<?php if ( get_post_status ( $field_group_data['ID'] ) != 'acf-disabled' ) { echo 'checked'; } ?>>
									<span class="ufc-field-checkbox-slider">
										<span class="ufc-field-checkbox-yes"><?php esc_html_e("Enabled", "ufcsupport" ); ?></span>
										<span class="ufc-field-checkbox-no"><?php esc_html_e("Disabled", "ufcsupport" ); ?></span>
									</span>
								</label>
							</div>
						</div>
						


            <div class="field-edit-content-row ufc-settings-field-collection-name">
							<div class="field-edit-col">
                <label class="field-label" for="ufc_field_group_title">
                    <?php esc_html_e('Collection Name', "ufcsupport" ); ?></label>
                <input type="text" name="ufc_field_group_title" class="ufc-field-input" id="Collection_Name"
                    value="<?php esc_attr_e((!empty($field_group_data['title'])) ? $field_group_data['title'] : '' ); ?>"
                    required="required">
							</div>
            </div>

            <div class="ufc-settings-field-locations">
								<div class="field-edit-content-row ufc-settings-field-header">
									<div class="field-edit-col field-col-half">
										<label class="field-label"><?php esc_html_e('Field Locations', "ufcsupport" ); ?></label>
										<span class="field-label-note"><?php esc_html_e('Create rules to determine where the custom fields appear on the site.', "ufcsupport" ); ?></span>
									</div>
								</div>
							
                <?php 
									// vars
									$location_rule_types = acf_get_location_rule_types();
								?>
                <div class="ufc-settings-field-locations-box">
                    <div class="ufc-field-locations-rules-wrap">
                    <?php 
										if ( !empty($field_group['location']) ) {
											foreach ($field_group['location'] as $rule_group_key => $location_arr) {
										?>
                        <div class="ufc-field-loc-rules-group"
                            data-rule_group_key="<?php esc_attr_e($rule_group_key); ?>">
                            <div class="ufc-field-loc-rules-group-wrap">
                                <span class="ufc-field-loc-rule-label">
                                    <?php esc_html_e('Rule Group #', "ufcsupport" ); ?><span
                                        class="ufc-field-loc-rule-number"><?php esc_html_e( ($rule_group_key) + 1 ); ?></span>
                                </span>
                                <div class="ufc-field-loc-rules-group-inner-wrap">
                                    <div class="ufc-field-loc-rule-rows-wrap">
                                        <?php 
												if ( !empty($location_arr) && is_array($location_arr) ) {
													foreach ($location_arr as $rule_key => $rule_value) {
			
														// vars
														$prefix = 'acf_field_group[location][' . $rule_group_key . '][' . $rule_key . ']';
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

                                            <div class="ufc-field-loc-rule-remove"><span
                                                    class="ufc-remove-location-rule"><i
                                                        class="fa fa-times-circle"></i></span></div>
                                            <div class="ufc-field-loc-rule-add">
                                                <span><?php esc_html_e( 'and', 'ufcsupport' ); ?></span>
                                            </div>
                                        </div>
                                        <?php 
													}
												} ?>
                                    </div>
                                    <div class="ufc-field-loc-add-new-rule-row">
                                        <span><i
                                                class="fa fa-plus-square"></i><?php esc_html_e( 'Add condition', 'ufcsupport' ); ?></span>
                                    </div>
                                </div>
                            </div>
                            <div class="ufc-field-loc-rules-group-or">
                                <span><?php esc_html_e( 'or', 'ufcsupport' ); ?></span>
                            </div>
                        </div>
                        <?php
							}
						}
						?>
                    </div>
                    <div class="ufc-field-loc-add-new-rules-group">
                        <button class="button button-secondary button-large ufc_new_rule_group"><i
                                class="fa fa-plus"></i><?php esc_html_e( 'Add rule group', 'ufcsupport' ); ?></button>
                    </div>

                </div>

            </div>

        </div>

    </div>

    <div class="ufc-group-custom-fields">
        <div class="ufc-group-custom-fields-header">
            <?php esc_html_e('Custom Fields', "ufcsupport" ); ?>
        </div>
        <div class="ufc-group-custom-fields-content">
            <?php
			global $group_tab_field_open, $group_accordion_field_open;

			$group_tab_field_open = false;
			$group_accordion_field_open = false;
			if ( !empty($group_fields_data) ) {
				foreach ($group_fields_data as $field_data) {

					if ( !empty($field_data['type']) ) {
						if ( $field_data['type'] == 'tab' ) {
							$group_tab_field_open = true;
						} else if ( $field_data['type'] == 'accordion' ) {
							$group_accordion_field_open = true;
							
						} else if ( $field_data['type'] == 'group' ) {

							if ( $group_tab_field_open == true ) {
								$field_data['group_tab_field_open'] = 1;
								$group_tab_field_open = false;

							} else if ( $group_accordion_field_open == true ) {
								$field_data['group_accordion_field_open'] = 1;
								$group_accordion_field_open = false;
							} 
						}
					}

					$ufc_admin->ufc_get_edit_field_view( $field_data );
				}
			}
			?>
        </div>
        <div class="ufc-group-custom-fields-footer">
            <button
                class="button button-secondary button-large ufc_group_new_field"><?php esc_html_e('New Field', "ufcsupport" ); ?></button>
            <div class="ufc-group-custom-fields-icons">
                <span class="ufc-group-custom-fields-before"><i class="fa fa-caret-up"></i></span>

                <?php if ( !empty($all_field_types) ) {
					foreach ($all_field_types as $field_type_value) {
						if ( !in_array( $field_type_value['field_type'], array( 'date_time_picker', 'time_picker' ) ) ) {
							?>
                <div class="ufc-group-custom-field-row"
                    data-field_type="<?php esc_attr_e($field_type_value['field_type']); ?>">
                    <span
                        class="ufc-group-custom-field-icon"><?php echo wp_kses( $field_type_value['field_icon'], array( 'i'=>array('class' => array()) ) ); ?></span>
                    <span
                        class="ufc-group-custom-field-label"><?php esc_html_e( $field_type_value['field_label'] ); ?></span>
                </div>
                <?php
						}
					}
				}
				do_action( 'ufc_after_show_all_field_types_add_button', $all_field_types );
				?>

            </div>
        </div>
    </div>

    <input type="hidden" name="ufc_field_group_id" id="ufc_field_group_id"
        value="<?php esc_attr_e((!empty($field_group_id)) ? $field_group_id : ''); ?>">
    <input type="hidden" name="ufc_field_group_key" id="ufc_field_group_key"
        value="<?php esc_attr_e((!empty($field_group_key)) ? $field_group_key : ''); ?>">
</form>