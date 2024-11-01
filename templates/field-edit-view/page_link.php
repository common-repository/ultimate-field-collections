<?php $displayed_fields = array( 'ID', 'type', 'key', 'required', 'multiple', 'allow_null', 'allow_archives', 'post_type', 'label', 'name', 'instructions', 'parent', 'menu_order', '_name', '_valid', 'conditional_logic' ); ?>
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
        <div class="field-edit-content-row field_required_input_wrap">
            <div class="field-edit-col">
                <label class="ufc-field-checkbox-switch" for="acf_fields[<?php esc_attr_e($field_ID); ?>][required]">
                    <?php esc_html_e('This field is required', "ufcsupport" ); ?>
                    <input type="checkbox" name="acf_fields[<?php esc_attr_e($field_ID); ?>][required]"
                        id="acf_fields[<?php esc_attr_e($field_ID); ?>][required]" class="ufc-field-checkbox" value="1"
                        <?php echo (!empty($field_required)) ? 'checked' : ''; ?>>
                    <span class="ufc-field-checkbox-slider">
                        <span class="ufc-field-checkbox-yes"><?php esc_html_e('Yes', "ufcsupport" ); ?></span>
                        <span class="ufc-field-checkbox-no"><?php esc_html_e('No', "ufcsupport" ); ?></span>
                    </span>
                </label>
            </div>
        </div>

        <div class="field-edit-content-row field_allow_archive_wrap">
            <div class="field-edit-col">
                <label class="ufc-field-checkbox-switch"
                    for="acf_fields[<?php esc_attr_e($field_ID); ?>][allow_archives]">
                    <?php esc_html_e('Allow Archives URLs', "ufcsupport" ); ?>
                    <input type="checkbox" name="acf_fields[<?php esc_attr_e($field_ID); ?>][allow_archives]"
                        id="acf_fields[<?php esc_attr_e($field_ID); ?>][allow_archives]" class="ufc-field-checkbox"
                        value="1" <?php echo (!empty($field_data['allow_archives'])) ? 'checked' : ''; ?>>
                    <span class="ufc-field-checkbox-slider">
                        <span class="ufc-field-checkbox-yes"><?php esc_html_e('Yes', "ufcsupport" ); ?></span>
                        <span class="ufc-field-checkbox-no"><?php esc_html_e('No', "ufcsupport" ); ?></span>
                    </span>
                </label>
                <input type="hidden" name="acf_fields[<?php esc_attr_e($field_ID); ?>][allow_archives]"
                    value="<?php echo (!empty($field_data['allow_archives'])) ? 1 : 0; ?>">
            </div>
        </div>

        <div class="field-edit-content-row">
            <div class="field-edit-col">
                <label class="ufc-field-checkbox-switch" for="acf_fields[<?php esc_attr_e($field_ID); ?>][multiple]">
                    <?php esc_html_e('Select multiple values?', "ufcsupport" ); ?>
                    <input type="checkbox" name="acf_fields[<?php esc_attr_e($field_ID); ?>][multiple]"
                        id="acf_fields[<?php esc_attr_e($field_ID); ?>][multiple]" class="ufc-field-checkbox" value="1"
                        <?php echo (!empty($field_data['multiple'])) ? 'checked' : ''; ?>>
                    <span class="ufc-field-checkbox-slider">
                        <span class="ufc-field-checkbox-yes"><?php esc_html_e('Yes', "ufcsupport" ); ?></span>
                        <span class="ufc-field-checkbox-no"><?php esc_html_e('No', "ufcsupport" ); ?></span>
                    </span>
                </label>
            </div>
        </div>

        <div class="field-edit-content-row field-label-field-name">
            <div class="field-edit-col field-col-half">
                <label class="field-label"
                    for="acf_fields[<?php esc_attr_e($field_ID); ?>][label]"><?php esc_html_e('Field Name', "ufcsupport" ); ?></label>
                <input type="text" name="acf_fields[<?php esc_attr_e($field_ID); ?>][label]"
                    id="acf_fields[<?php esc_attr_e($field_ID); ?>][label]"
                    class="ufc-field-input ufc-field-enter-to-focusout-and-save"
                    value="<?php esc_attr_e($field_label); ?>">
            </div>
            <div class="field-edit-col field-col-half">
                <label class="field-label"
                    for="acf_fields[<?php esc_attr_e($field_ID); ?>][name]"><?php esc_html_e('ID: ', "ufcsupport" ); ?></label>
                <input type="text" name="acf_fields[<?php esc_attr_e($field_ID); ?>][name]"
                    id="acf_fields[<?php esc_attr_e($field_ID); ?>][name]"
                    class="ufc-field-input ufc-field-enter-to-focusout-and-save"
                    value="<?php esc_attr_e($field_name); ?>">
            </div>
        </div>
        <div class="field-edit-content-row">
            <div class="field-edit-col">
                <label class="field-label"
                    for="acf_fields[<?php esc_attr_e($field_ID); ?>][instructions]"><?php esc_html_e('Help Text', "ufcsupport" ); ?></label>
                <input type="text" name="acf_fields[<?php esc_attr_e($field_ID); ?>][instructions]"
                    class="ufc-field-input ufc-field-enter-to-save" value="<?php esc_attr_e($field_instructions); ?>">
            </div>
        </div>

        <?php /* ?>
        <pre>
            <?php print_r( $field_data ); ?>
        </pre>
        <?php */ ?>

        <div class="field-edit-content-row">
            <?php $displayed_fields[] = 'post_type'; ?>
            <div class="field-edit-col">
                <label class="field-label"
                    for="acf_fields[<?php esc_attr_e($field_ID); ?>][post_type][]"><?php esc_html_e('Filter by Post Type', "ufcsupport" ); ?></label>
                <input type="hidden" id="acf_fields-<?php esc_attr_e($field_ID); ?>-post_type-input"
                    name="acf_fields[<?php esc_attr_e($field_ID); ?>][post_type]">
                <select class="ufc-field-select ufc-field-select2"
                    name="acf_fields[<?php esc_attr_e($field_ID); ?>][post_type][]"
                    id="acf_fields[<?php esc_attr_e($field_ID); ?>][post_type][]" data-placeholder="All post types"
                    multiple>
                    <?php
					$post_types = get_post_types( array('public' => true), 'objects' );
					if ( !empty($post_types) ) {
						foreach ($post_types as $post_type_data) {
							if ( !empty($post_type_data->label) ) {
                                $selected = ( !empty($field_data['post_type']) && in_array($post_type_data->name, $field_data['post_type']) ) ? 'selected' : '' ;
								echo '<option value="'.esc_attr($post_type_data->name).'" '.esc_attr($selected).'>'.esc_html__($post_type_data->labels->singular_name).'</option>';
							}
						}
					}
					?>
                </select>
            </div>
        </div>

        <div class="field-edit-content-row">
            <?php $displayed_fields[] = 'taxonomy'; ?>
            <div class="field-edit-col">
                <label class="field-label"
                    for="acf_fields-<?php esc_attr_e($field_ID); ?>-taxonomy-input"><?php esc_html_e('Filter by Taxonomy', "ufcsupport" ); ?></label>
                <input type="hidden" id="acf_fields-<?php esc_attr_e($field_ID); ?>-taxonomy-input"
                    name="acf_fields[<?php esc_attr_e($field_ID); ?>][taxonomy]">
                <select class="ufc-field-select ufc-field-select2"
                    name="acf_fields[<?php esc_attr_e($field_ID); ?>][taxonomy][]"
                    id="acf_fields[<?php esc_attr_e($field_ID); ?>][taxonomy][]" data-placeholder="All taxonomies"
                    multiple>
                    <?php
					$taxonomies = get_taxonomies( array('public' => true), 'objects' );
					if ( !empty($taxonomies) ) {
						foreach ($taxonomies as $taxonomy_key => $taxonomy_data) {
							if ( !empty($taxonomy_data->label) ) {

								$taxonomy_terms = get_terms( array( 'taxonomy' => $taxonomy_data->name, 'hide_empty' => false ) );

								if ( !empty($taxonomy_terms) ) {									
									echo '<optgroup label="'.esc_attr($taxonomy_data->label).'">';
									foreach ($taxonomy_terms as $term_data) {
                                        $selected = ( !empty($field_data['taxonomy']) && in_array($taxonomy_data->name.':'.$term_data->slug, $field_data['taxonomy']) ) ? 'selected' : '' ;
										echo '<option value="'.esc_attr($taxonomy_data->name).':'.esc_attr($term_data->slug).'" '.esc_attr($selected).'>'.esc_html__($term_data->name).'</option>';
									}
									echo '</optgroup>';
								}
							}
						}
					}
					?>
                </select>
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