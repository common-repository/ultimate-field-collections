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

$field_val = get_post_meta( $ufc_field_post_id, $field_name, true );

$field_name = 'acf['.esc_attr($field_key).']';
if( $field_data['multiple'] ){
	$field_name = 'acf['.esc_attr($field_key).'][]';
}

if( ! is_array($field_val) ){
	$field_val = array( $field_val );
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
        <div class="acf-select-wrap">
            <select id="acf-<?php esc_attr_e($field_key); ?>" class="ufc-field-view-select2"
                name="<?php echo esc_attr( $field_name ); ?>" data-ui="1" data-ajax="0"
                data-placeholder="<?php esc_html_e("Select", "ufcsupport" ); ?>"
                data-multiple="<?php echo esc_attr( $field_data['multiple'] ); ?>"
                <?php if( $field_data['multiple'] ) echo 'multiple'; ?>>
                <option value="">- <?php esc_html_e("Select", "ufcsupport" ); ?> -</option>
                <?php
					$roles = acf_get_user_role_labels();
					if ( !empty($roles) ) {
						foreach ($roles as $role_key => $role) {
							
							if ( !empty($field_data['role']) && in_array($role_key, $field_data['role']) ) {

                                $users = get_users( array( 'role__in' => array( $role_key ) ) );
								if ( !empty($users) ) {									
									echo '<optgroup label="'.esc_attr($role).'">';
									foreach ($users as $user) {
										$selected = ( !empty($field_val) && in_array($user->ID, $field_val) ) ? 'selected' : '' ;
										$name = $user->display_name ? $user->user_login.' ( '.$user->display_name.' )' : $user->user_login;
										echo '<option value="'.esc_attr($user->ID).'" '.esc_attr($selected).'>'.esc_html__($name).'</option>';
									}
									echo '</optgroup>';
								}
							} elseif( empty($field_data['role']) ){
								$users = get_users( array( 'role__in' => array( $role_key ) ) );
								if ( !empty($users) ) {									
									echo '<optgroup label="'.esc_attr($role).'">';
									foreach ($users as $user) {
										$selected = ( !empty($field_val) && in_array($user->ID, $field_val) ) ? 'selected' : '' ;
										$name = $user->display_name ? $user->user_login.' ( '.$user->display_name.' )' : $user->user_login;
										echo '<option value="'.esc_attr($user->ID).'" '.esc_attr($selected).'>'.esc_html__($name).'</option>';
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
    <div class="ufc-field-errors">
        <p class="ufc-field-error-required"><?php esc_html_e("This field is required.", "ufcsupport" ); ?></p>
    </div>
</div>