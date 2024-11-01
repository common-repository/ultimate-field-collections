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
if ( isset($field_data['field_value']) ) {
	$field_val = $field_data['field_value'];
}

// paged
$post_object_args['posts_per_page'] = -1;

// post_type
if ( ! empty( $field_data['post_type'] ) ) {
	$post_object_args['post_type'] = acf_get_array( $field_data['post_type'] );
} else {
	$post_object_args['post_type'] = acf_get_post_types();
}

// taxonomy
if ( ! empty( $field_data['taxonomy'] ) ) {
	$terms = acf_decode_taxonomy_terms( $field_data['taxonomy'] );
	// append to $post_object_args
	$post_object_args['tax_query'] = array();
	// now create the tax queries
	foreach ( $terms as $k => $v ) {
		$post_object_args['tax_query'][] = array(
			'taxonomy' => $k,
			'field'    => 'slug',
			'terms'    => $v,
		);
	}
}

// filters
$post_object_args = apply_filters( 'acf/fields/post_object/query', $post_object_args, $field_data, $ufc_field_post_id );
$post_object_args = apply_filters( 'acf/fields/post_object/query/name=' . $field_data['name'], $post_object_args, $field_data, $ufc_field_post_id );
$post_object_args = apply_filters( 'acf/fields/post_object/query/key=' . $field_data['key'], $post_object_args, $field_data, $ufc_field_post_id );

// add archives to $results
$archive_results = [];
if ( $field_data['allow_archives'] ) {

	// Generate unique list of URLs.
	$links   = array();
	$links[] = home_url();
	foreach ( $post_object_args['post_type'] as $post_type ) {
		$links[] = get_post_type_archive_link( $post_type );
	}
	$links = array_filter( $links );
	$links = array_unique( $links );

	// Convert list into choices.
	$children = array();
	foreach ( $links as $link ) {

		// Ignore if search does not match.
		if ( $is_search && stripos( $link, $s ) === false ) {
			continue;
		}
		$children[] = array(
			'id'   => $link,
			'text' => $link,
		);
	}
	if ( $children ) {
		$archive_results[] = array(
			'text'     => __( 'Archives', 'acf' ),
			'children' => $children,
		);
	}
}

// get posts grouped by post type
$post_object_groups = acf_get_grouped_posts( $post_object_args );

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

            <?php if ( !empty($field_data['multiple']) ) { ?>
            <input type="hidden" id="acf-<?php esc_attr_e($field_key); ?>-input"
                name="acf[<?php esc_attr_e($field_key); ?>]">
            <select id="<?php esc_attr_e('post-'.$ufc_field_post_id.'-acf-'.$field_key); ?>"
                class="ufc-field-view-select2" name="acf[<?php esc_attr_e($field_key); ?>][]" data-ui="0" data-ajax="0"
                data-multiple="1" data-placeholder="Select" data-allow_null="1" multiple>

                <?php } else { ?>
                <select id="<?php esc_attr_e('post-'.$ufc_field_post_id.'-acf-'.$field_key); ?>"
                    class="ufc-field-view-select2" name="acf[<?php esc_attr_e($field_key); ?>]" data-ui="0"
                    data-ajax="0" data-multiple="0" data-placeholder="Select" data-allow_null="1">
                    <option value="">- Select -</option>
                    <?php }

				if( !empty( $archive_results ) ){
					foreach( $archive_results as $result ){
						if( !empty($result['children']) ){
							echo '<optgroup label="'.esc_attr($result['text']).'">';
								foreach( $result['children'] as $children ){
									if ( is_array($field_val) ) {
										$selected = (in_array($children['id'], $field_val)) ? 'selected="selected"' : '';

									} else {
										$selected = ($field_val==$children['id']) ? 'selected="selected"' : '';
									}
									echo '<option value="'.esc_attr($children['id']).'" '.esc_attr($selected).'>'.esc_html__( $children['text'] ).'</option>';
								}
							echo '</optgroup>';
						}
					}
				}
				if ( !empty( $post_object_groups ) ) {

					foreach ( $post_object_groups as $group_title => $posts_data ) {
						if ( !empty($posts_data) ) {
							echo '<optgroup label="'.esc_attr($group_title).'">';
							foreach ($posts_data as $post_data) {

								if ( !empty($post_data) ) {
									if ( is_array($field_val) ) {
										$selected = (in_array($post_data->ID, $field_val)) ? 'selected="selected"' : '';

									} else {
										$selected = ($field_val==$post_data->ID) ? 'selected="selected"' : '';
									}
									echo '<option value="'.esc_attr($post_data->ID).'" '.esc_attr($selected).'>'.esc_html__( (!empty($post_data->post_title)) ? $post_data->post_title : $post_data->ID ).'</option>';
								}
							}
							echo '</optgroup>';
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