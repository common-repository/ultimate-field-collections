<?php
$wrapper_id = (!empty($field_data['wrapper']['id'])) ? $field_data['wrapper']['id'] : '';
$wrapper_class = 'acf-field acf-field-'.$field_type.' acf-'.$field_key;
$wrapper_class .= (!empty($field_data['wrapper']['class'])) ? ' '.$field_data['wrapper']['class'] : '';
$wrapper_class .= ($field_required) ? ' is-required' : '';

$wrapper_attrs = array();
$wrapper_attrs[] = 'data-ufc_field_post_id="'.$ufc_field_post_id.'"';
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
// $field_parent_value = get_field( $field_name, $ufc_field_post_id );
if ( !empty($field_data['field_value']) ) {
	$field_val = $field_data['field_value'];
} else if ( !empty($field_data['value']) ) {
	$field_val = $field_data['value'];
}

// vars
$field_post_type = acf_get_array( $field_data['post_type'] );
$field_taxonomy  = acf_get_array( $field_data['taxonomy'] );
$filters   = acf_get_array( $field_data['filters'] );

// filters
$filter_count = count( $filters );
$filter_post_type_choices = array();
$filter_taxonomy_choices  = array();

// post_type filter
if ( in_array( 'post_type', $filters ) ) {

	$filter_post_type_choices = array(
		'' => __( 'Select post type', 'acf' ),
	) + acf_get_pretty_post_types( $field_post_type );
}

// taxonomy filter
if ( in_array( 'taxonomy', $filters ) ) {

	$term_choices            = array();
	$filter_taxonomy_choices = array(
		'' => __( 'Select taxonomy', 'acf' ),
	);

	// check for specific taxonomy setting
	if ( $field_taxonomy ) {
		$terms        = acf_get_encoded_terms( $field_taxonomy );
		$term_choices = acf_get_choices_from_terms( $terms, 'slug' );

		// if no terms were specified, find all terms
	} else {

		// restrict taxonomies by the post_type selected
		$term_args = array();
		if ( $field_post_type ) {
			$term_args['taxonomy'] = acf_get_taxonomies(
				array(
					'post_type' => $field_post_type,
				)
			);
		}

		// get terms
		$terms        = acf_get_grouped_terms( $term_args );
		$term_choices = acf_get_choices_from_grouped_terms( $terms, 'slug' );
	}

	// append term choices
	$filter_taxonomy_choices = $filter_taxonomy_choices + $term_choices;
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
	<div class="acf-input acf-relationship">
		<input type="hidden" class="ufc_relationship_hidden_input" id="acf-<?php esc_attr_e($field_key); ?>-input" name="acf[<?php esc_attr_e($field_key); ?>][]">
		<div class="acf-relationship-wrap">
			<?php if ( $filter_count ) { ?>
				<div class="filters -f<?php esc_attr_e($filter_count); ?> acf-relationship-head" style="display: flow-root;">
					<?php if ( in_array( 'search', $filters ) ) { ?>
						<div class="filter acf-relationship-filter-search">
							<input type="text" placeholder="Search..." data-filter="s">
						</div>
					<?php } ?>
					<?php if ( in_array( 'post_type', $filters ) ) { ?>
						<div class="filter acf-relationship-filter-post_type">
							<select data-filter="post_type">
								<?php
								if ( !empty($filter_post_type_choices) ) {
									foreach ($filter_post_type_choices as $key => $value) {
										?><option value="<?php esc_attr_e($key); ?>"><?php esc_html_e( $value ); ?></option><?php
									}
								}
								?>
							</select>
						</div>
					<?php } ?>
					<?php if ( in_array( 'taxonomy', $filters ) ) { ?>
						<div class="filter acf-relationship-filter-taxonomy">
							<select data-filter="taxonomy">
								<?php
								if ( !empty($filter_taxonomy_choices) ) {
									foreach ($filter_taxonomy_choices as $taxonomy_label => $taxonomy_data) {
										if ( is_array($taxonomy_data) ) {
											echo '<optgroup label="'.esc_attr($taxonomy_label).'">';
											foreach ($taxonomy_data as $key => $value) {
												?><option value="<?php esc_attr_e($key); ?>"><?php esc_html_e( $value ); ?></option><?php
											}
											echo '</optgroup>';
										} else {
											?><option value="<?php esc_attr_e($taxonomy_label); ?>"><?php esc_html_e( $taxonomy_data ); ?></option><?php
										}
									}
								}
								?>
							</select>
						</div>
					<?php } ?>
				</div>
			<?php } ?>

			<div class="selection">
				<div class="choices">
					<ul class="acf-bl list choices-list"></ul>
				</div>
				<div class="values">
					<ul class="acf-bl list values-list">
						<?php
						
						if ( ! empty( $field_val ) ) :
							// get posts
							$posts_data = acf_get_posts(
								array(
									'post__in'  => $field_val,
									'post_type' => $field_data['post_type'],
								)
							);
							
							// loop
							if ( !empty($posts_data) ) {
								foreach ( $posts_data as $single_post ) : ?>
									<li><?php
										acf_hidden_input(
											array(
												'name'  => 'acf['.$field_key . '][]',
												'value' => $single_post->ID,
											)
										);
										?>
										<span data-id="<?php esc_attr_e( $single_post->ID ); ?>" class="acf-rel-item">
											<?php esc_html_e( $single_post->post_title ); ?>
											<a href="#" class="acf-icon -minus small dark" data-name="remove_item"></a>
										</span>
									</li>
									<?php
								endforeach;
							}
						endif;
						?>
					</ul>
				</div>
			</div>

		</div>
	</div>
	<div class="ufc-field-errors">
		<p class="ufc-field-error-required"><?php esc_html_e("This field is required.", "ufcsupport" ); ?></p>
	</div>
</div>

<?php