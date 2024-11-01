<?php $displayed_fields = array( 'ID', 'type', 'key', 'required', 'label', 'name', 'instructions', 'parent', 'menu_order', '_name', '_valid', 'conditional_logic', 'message' ); ?>
<div class="field-edit-view-wrap field-type-<?php esc_attr_e($field_type); ?>"
    data-acf_field_id="<?php esc_attr_e($field_ID); ?>">
    <input type="hidden" name="acf_fields[<?php esc_attr_e($field_ID); ?>][ID]" value="<?php esc_attr_e($field_ID); ?>">
    <input type="hidden" name="acf_fields[<?php esc_attr_e($field_ID); ?>][type]"
        value="<?php esc_attr_e($field_type); ?>">
    <input type="hidden" name="acf_fields[<?php esc_attr_e($field_ID); ?>][key]"
        value="<?php esc_attr_e($field_key); ?>">
    <input type="hidden" name="acf_fields[<?php esc_attr_e($field_ID); ?>][parent]"
        value="<?php esc_attr_e($field_parent); ?>">
    <input type="hidden" name="acf_fields[<?php esc_attr_e($field_ID); ?>][menu_order]"
        value="<?php esc_attr_e($field_menu_order); ?>">
    <div class="edit-field-header">
        <span class="edit-field-trigger-reorder"><i class="fa fa-bars"></i></span>
        <span
            class="edit-field-icon-header"><?php echo ($all_field_types[$field_type]['field_icon']) ? wp_kses($all_field_types[$field_type]['field_icon'], array( 'i'=>array('class' => array()) ) ) : ''; ?></span>
        <span class="edit-field-name-header"><?php esc_html_e($field_label); ?></span>
        <span
            class="edit-field-type-header"><?php esc_html_e( ($all_field_types[$field_type]['field_label']) ? '('.$all_field_types[$field_type]['field_label'].')' : '' ); ?></span>
        <div class="edit-field-actions">
            <span class="edit-field-trigger-action"><i class="fa fa-ellipsis-v"></i></span>
            <ul class="edit-field-actions-ul">
                <li class="edit-field-actions-li edit-field-duplicate-action"><i
                        class="fa fa-retweet"></i><?php esc_html_e( 'Duplicate', 'wcdmdsupport'); ?></li>
                <li class="edit-field-actions-li edit-field-delete-action"><i
                        class="fa fa-trash"></i><?php esc_html_e( 'Delete', 'wcdmdsupport'); ?></li>
            </ul>
        </div>
        <span class="edit-field-toggle-header dashicons dashicons-arrow-down-alt2"></span>
    </div>
    <div class="field-edit-content-main">

        <div class="field-edit-content-row field-label-field-name">
            <div class="field-edit-col field-col-half">
                <label class="field-label"
                    for="acf_fields[<?php esc_attr_e($field_ID); ?>][label]"><?php esc_html_e('Field Name', "ufcsupport" ); ?></label>
                <input type="text" name="acf_fields[<?php esc_attr_e($field_ID); ?>][label]"
                    id="acf_fields[<?php esc_attr_e($field_ID); ?>][label]"
                    class="ufc-field-input ufc-field-enter-to-focusout-and-save"
                    value="<?php esc_attr_e($field_label); ?>">
            </div>
            <div class="field-edit-col field-col-half"></div>
        </div>

        <div class="field-edit-content-row">
            <div class="field-edit-col">
                <label class="field-label" for="acf_fields[<?php esc_attr_e($field_ID); ?>][message]">
                    <?php esc_html_e('Message', "ufcsupport" ); ?>
                </label>
                <textarea id="acf_fields[<?php esc_attr_e($field_ID); ?>][message]"
                    name="acf_fields[<?php esc_attr_e($field_ID); ?>][message]"
                    rows="8"><?php echo esc_textarea( $field_message ); ?></textarea>
            </div>
        </div>
    </div>

    <?php
	// Show remaning data on hidden fields
	if ( !empty($field_data) ) {
		foreach ($field_data as $field_key => $field_value) {

			if ( !in_array($field_key, $displayed_fields) ) {
				
				if ( is_array($field_value) ) {
					foreach ($field_value as $f_key => $f_value) {
						echo '<input type="hidden" name="acf_fields['.esc_attr($field_ID).']['.esc_attr($field_key).']['.esc_attr($f_key).']" value="'.esc_attr($f_value).'">';
					}
				} else {
					echo '<input type="hidden" name="acf_fields['.esc_attr($field_ID).']['.esc_attr($field_key).']" value="'.esc_attr($field_value).'">';
				}
			}
		}
	}

	// Show Conditional Logic data on hidden fields
	if ( !empty($field_data['conditional_logic']) && is_array($field_data['conditional_logic']) ) {
		foreach ($field_data['conditional_logic'] as $logic_group_no => $logic_group_arr) {
			
			if ( is_array($logic_group_arr) ) {
				foreach ($logic_group_arr as $logic_no => $logic_arr) {
					if ( isset($logic_arr['field']) && isset($logic_arr['operator']) ) {
						?>
    <input type="hidden"
        name="acf_fields[<?php esc_attr_e($field_ID); ?>][<?php esc_attr_e($logic_group_no); ?>][<?php esc_attr_e($logic_no); ?>][field]"
        value="<?php esc_attr_e($logic_arr['field']); ?>">
    <input type="hidden"
        name="acf_fields[<?php esc_attr_e($field_ID); ?>][<?php esc_attr_e($logic_group_no); ?>][<?php esc_attr_e($logic_no); ?>][operator]"
        value="<?php esc_attr_e($logic_arr['operator']); ?>">
    <?php
					}
				}
			}
		}
	}
	?>
</div>