<?php 
$field_group_data = acf_get_field_group( $_REQUEST['ufc_field_group_id'] ); 

$all_matched_posts_ids = array();
if ( !empty($field_group_data) ) {

	// Get Posts Prepare
	$field_group_id = $field_group_data['ID'];
	$field_group_key = $field_group_data['key'];
	$field_group_title = $field_group_data['title'];
	$locations_arr = array();
	$post_types_arr = array();
	$post_types_arr_str = array();
	$include_post_ids_arr = array();
	$exclude_post_ids_arr = array();
	if ( !empty($field_group_data['location']) ) {

		foreach ($field_group_data['location'] as $locations_data) {

			if ( !empty($locations_data) ) {
				foreach ($locations_data as $single_location_data) {
					if ( ($single_location_data['param']=="post_type") && ($single_location_data['operator']=='==') ) {
						$post_types_arr[] = $single_location_data['value'];
						$post_types_arr_str[] = ucfirst($single_location_data['value']);
					}
					if ( (($single_location_data['param']=="post") || ($single_location_data['param']=="page")) && ($single_location_data['operator']=='==') ) {
						$include_post_ids_arr[] = $single_location_data['value'];
					}
					if ( (($single_location_data['param']=="post") || ($single_location_data['param']=="page")) && ($single_location_data['operator']=='!=') ) {
						$exclude_post_ids_arr[] = $single_location_data['value'];
					}
				}
			}
		}

		$post_type_str = implode("s, ", $post_types_arr_str);
		$post_types = $post_types_arr;
		if( !empty($_REQUEST['post_type']) ){
			$post_types = $_REQUEST['post_type'];
			$post_types_new = [];
			foreach($post_types as $post_type){
				$post_types_new[] = ucfirst($post_type);
			}
			$post_type_str = implode("s, ", $post_types_new);
		}

		$order_by = 'modified';
		$order = 'desc';

		if( !empty($_REQUEST['order_by']) ){
			$order_by  = $_REQUEST['order_by'];
		}

		if( !empty($_REQUEST['order']) ){
			$order  = $_REQUEST['order'];
		}

		// Get Matched Posts
		$matched_post_args = array(
			'post_type'				=> (!empty($post_types)) ? $post_types : 'any',
			'post_status'           => ['any','trash'],
			'ignore_sticky_posts'   => 1,
			'posts_per_page'        => '-1',
			'orderby'     			=> $order_by,
			'order'       			=> $order,
		);

		if ( !empty($include_post_ids_arr) ) {
			$matched_post_args['include'] = $include_post_ids_arr;
		}
		if ( !empty($exclude_post_ids_arr) ) {
			$matched_post_args['exclude'] = $exclude_post_ids_arr;
		}

		$matched_posts = get_posts( $matched_post_args );

		$matched_post_args['post_status'] = 'publish';
		$publish_posts = get_posts( $matched_post_args );

		$matched_post_args['post_status'] = 'private';
		$private_posts = get_posts( $matched_post_args );

		$matched_post_args['post_status'] = 'draft';
		$draft_posts = get_posts( $matched_post_args );

		$matched_post_args['post_status'] = 'trash';
		$trash_posts = get_posts( $matched_post_args );

		$matched_post_args['post_status'] = ['any'];
		$matched_post_args['meta_query'] = [
			[
				'key'     => '_collection_starred',
				'value'   => 1,
				'compare' => '=',
			],
		];

		$star_query = $matched_post_args;
		$star_query = json_encode( $star_query );
		

		$starred_posts = get_posts( $matched_post_args );

		$all_count 			= count($matched_posts);
		$published_count 	= count($publish_posts);
		$draft_count 		= count($draft_posts);
		$trash_count 		= count($trash_posts);
		$private_count 		= count($private_posts);
		$starred_count		= count($starred_posts);

		
	}
}

?>


<div class="ufc-field-data-section-wrap">

    <div class="ultimate-field-collections-sidebar ufc-field-data-section-sidebar" data-star-query="<?php echo esc_attr($star_query); ?>">

        <?php if( empty( $include_post_ids_arr ) ) : ?>
        <div class="ufc-field-list-header">
            <!-- <div class="ufc-field-list-header-item ufc-list-title">
                <div><?php echo 'All '.$post_type_str.'s'; ?></div>
            </div> -->
            <div class="ufc-field-list-header-item ufc-list-filters">
                <ul class="subsubsub">

                    <li class="starred<?php if($starred_count === 0 ) echo ' no_starred'; ?>">
                        <a href="#" data-target="starred" class="<?php if($starred_count > 0 ) echo 'current'; ?>">
                            <?php echo ufc_get_image(UFC_URL.'assets/images/star.svg'); ?>
                            <span class="count">(<?php echo esc_attr( $starred_count ); ?>)</span>
                        </a>
                    </li>

                    <li class="all<?php if( $all_count === 0 ) echo ' count_zero'; ?>">
                        <a href="#" data-target="all" class="<?php if($starred_count == 0 ) echo 'current'; ?>">All
                            <span class="count">(<?php echo esc_attr( $all_count ); ?>)</span>
                        </a>
                    </li>

					<li class="publish<?php if( $published_count === 0 ) echo ' count_zero'; ?>">
                        <a href="#" data-target="publish">Published
                            <span class="count">(<?php echo esc_attr( $published_count ); ?>)</span>
                        </a>
                    </li>

					<li class="private<?php if( $private_count === 0 ) echo ' count_zero'; ?>">
                        <a href="#" data-target="private">Private
                            <span class="count">(<?php echo esc_attr( $private_count ); ?>)</span>
                        </a>
                    </li>

					<li class="draft<?php if( $draft_count === 0 ) echo ' count_zero'; ?>">
                        <a href="#" data-target="draft">Draft
                            <span class="count">(<?php echo esc_attr( $draft_count ); ?>)</span>
                        </a>
                    </li>

					<li class="trash<?php if( $trash_count === 0 ) echo ' count_zero'; ?>">
                        <a href="#" data-target="trash">Trash
                            <span class="count">(<?php echo esc_attr( $trash_count ); ?>)</span>
                        </a>
                    </li>
                </ul>
                <div class="ufc-field-list-header-item ufc-list-search">
                    <label class="dashicons dashicons-search" for="ufc_posts_list_search_input"></label>
                    <input type="text" class="ufc-list-search-input" id="ufc_posts_list_search_input" placeholder="<?php esc_attr_e('Search', "ufcsupport" ); ?>">
                    <span class="close-search">
                        <?php echo ufc_get_image(UFC_URL.'assets/images/close.svg'); ?>
                    </span>
                </div>

				<div class="filters<?php if( !empty($_REQUEST['action']) && $_REQUEST['action'] == 'ufc_filtering_list') echo ' active'; ?>">
					<span class="filter-trigger">
						<?php echo ufc_get_image(UFC_URL.'assets/images/filter.svg'); ?>
					</span>
					
					<div class="filter-action-list">
					
						<?php if( $post_types_arr ) : ?>
						<div class="filtering">
							<h6>Post Type</h6>
							<ul>
								<?php
								foreach( $post_types_arr  as $post_type ) :
								$checked = ''; 
								if( !empty($_REQUEST['post_type']) && in_array($post_type, $_REQUEST['post_type'])){ 
									$checked = 'checked';
								}
								?>
								<li>
									<input type="checkbox" id="<?php echo $post_type; ?>" name="post_type" value="<?php echo $post_type; ?>" <?php echo $checked; ?>>
									<label for="<?php echo $post_type; ?>"><?php echo ucfirst( $post_type ); ?></label>
								</li>
								<?php endforeach; ?>
							</ul>
						</div>
						<?php endif; ?>
					
						<div class="filtering">
							<h6>Sort</h6>
							<div class="acf-button-group">
								<label class="acf-radio-choices<?php if( !empty($_REQUEST['order_by']) && $_REQUEST['order_by'] == 'title' ){ echo ' selected'; } ?>" data-order="<?php if( !empty($_REQUEST['order_by']) && !empty($_REQUEST['order']) && $_REQUEST['order_by'] == 'title' ){ echo $_REQUEST['order']; }else{ echo 'asc'; } ?>">
									<input type="radio" id="title" name="sort" value="title"<?php if( !empty($_REQUEST['order_by']) && $_REQUEST['order_by'] == 'title' ){ echo ' checked'; } ?> data-order="<?php if( !empty($_REQUEST['order_by']) && !empty($_REQUEST['order']) && $_REQUEST['order_by'] == 'title' ){ echo $_REQUEST['order']; }else{ echo 'asc'; } ?>">Alphabetical
										<span class="sort_icon desc"><?php echo ufc_get_image(UFC_URL.'assets/images/sort_alpha_up.svg'); ?></span>
										<span class="sort_icon asc"><?php echo ufc_get_image(UFC_URL.'assets/images/sort_alpha_down.svg'); ?></span>
								</label>
								<label class="acf-radio-choices<?php if( !empty($_REQUEST['order_by']) && $_REQUEST['order_by'] == 'modified' ){ echo ' selected'; }elseif( empty( $_REQUEST['order_by'] ) ){ echo ' selected'; } ?>" data-order="<?php if( !empty($_REQUEST['order_by']) && !empty($_REQUEST['order']) && $_REQUEST['order_by'] == 'modified' ){ echo $_REQUEST['order']; }else{ echo 'desc';} ?>">
									<input type="radio" id="modified" name="sort" value="modified"<?php if( !empty($_REQUEST['order_by']) && $_REQUEST['order_by'] == 'modified' ){ echo ' checked'; } ?> data-order="<?php if( !empty($_REQUEST['order_by']) && !empty($_REQUEST['order']) && $_REQUEST['order_by'] == 'modified' ){ echo $_REQUEST['order']; }else{ echo 'desc';} ?>">Modified Date
										<span class="sort_icon desc"><?php echo ufc_get_image(UFC_URL.'assets/images/sort_amount_down.svg'); ?></span>
										<span class="sort_icon asc"><?php echo ufc_get_image(UFC_URL.'assets/images/sort_amount_up.svg'); ?></span>
								</label>
							</div>
						</div>
					
					</div>

				</div>
            </div>
        </div>
				<?php endif; ?>

        <ul class="ufc-field-posts-list-wrap ufc-filter-result">
            <?php
			if ( !empty($matched_posts) ) {

				foreach ($matched_posts as $matched_post) {

					if ( !empty($matched_post) ) {

						$field_post_id = $matched_post->ID;
						$field_post_status = $matched_post->post_status;
						$field_post_title = $matched_post->post_title;
						$field_post_type = $matched_post->post_type;
						$is_starred = get_post_meta( $field_post_id, '_collection_starred', true );
						
						if ( empty($all_matched_posts_ids) || ( !empty($all_matched_posts_ids) && !in_array($field_post_id, $all_matched_posts_ids) ) ) {
							$all_matched_posts_ids[] = $field_post_id;
							?>
							<li class="ufc-field-post-list-item ufc-filter-result-item <?php if( $starred_count > 0){ if($is_starred) { echo ' show'; }else{ echo ' hide'; } } ?>" 
								data-field_group_id="<?php esc_attr_e( $field_group_id ); ?>"
								data-field_group_key="<?php esc_attr_e( $field_group_key ); ?>"
								data-status="<?php echo esc_attr( $field_post_status ); ?>"
								data-starred="<?php echo esc_attr( $is_starred ); ?>"
								data-field_post_id="<?php esc_attr_e( $field_post_id ); ?>"
								data-post_type="<?php echo $field_post_type; ?>">

								<span class="ufc-field-list-item-trigger-starred<?php if( $is_starred ) echo ' active'; ?>">
                    				<?php echo ufc_get_image(UFC_URL.'assets/images/star.svg'); ?>
                				</span>

								<span class="ufc-field-post-list-item-name"><?php esc_html_e( $field_post_title ); ?></span>
								<span class="ufc-field-post-list-item-location">
									(<?php esc_html_e( ucfirst( str_replace( '_', ' ', $field_post_type ) ) ); ?>)
								</span>

								<div class="ufc-field-list-item-actions">
									<span class="ufc-field-list-item-trigger-action">
										<?php echo ufc_get_image(UFC_URL.'assets/images/settings.svg'); ?>
									</span>
									<ul class="ufc-field-list-item-actions-ul">
										<li class="ufc-field-list-item-actions-li ufc-field-list-item-edit-action">
											<i class="far fa-edit"></i><?php esc_html_e( 'Edit', 'wcdmdsupport'); ?>
										</li>
										<li class="ufc-field-list-item-actions-li ufc-field-list-item-duplicate-action">
											<i class="fa fa-retweet"></i><?php esc_html_e( 'Duplicate', 'wcdmdsupport'); ?>
										</li>
										<li class="ufc-field-list-item-actions-li ufc-field-list-item-delete-action">
											<i class="fa fa-trash"></i><?php esc_html_e( 'Delete', 'wcdmdsupport'); ?>
										</li>
										<li class="ufc-field-list-item-actions-li ufc-field-list-item-trash-restore-action">
											<i class="fas fa-trash-restore"></i><?php esc_html_e( 'Restore', 'wcdmdsupport'); ?>
										</li>
									</ul>
								</div>
								
							</li>
							<?php
						}
					}
				}
			}
			?>
        </ul>
    </div>

    <div class="ufc-field-data-section-content"></div>

	<div class="ufc-add-new-item">
		<form action="post" id="ufc_create_post_form">
			<div class="ufc-group-settings-fields">
				<div class="ufc-settings-field-main">
					<div class="ufc-settings-field">
						<label class="field-label" for="ufc_post_title"><?php esc_html_e('Title', "ufcsupport" ); ?></label>
						<input type="text" name="ufc_field_group_title" class="ufc-field-input" id="ufc_post_title" value="">
					</div>
					<?php if( $post_types_arr ) : $otal = count($post_types_arr); ?>
					<div class="post_type_list" <?php if( $otal <= 1 ){ echo ' style="display:none"'; } ?>>
						<label class="field-label"><?php esc_html_e('Select Post Type', "ufcsupport" ); ?></label>
						<div class="acf-button-group">
							<select name="post_type" class="ufc-field-select2">
							<?php
							$i = 1;
							foreach( $post_types_arr  as $post_type ) :
							$checked = ''; 
							if( $i === 1 ){ 
								$checked = 'checked';
							}
							/*
							?>
							<label class="acf-radio-choices<?php if( $checked ) echo ' selected'; ?>">
								<input type="radio" id="selec-post-<?php echo $post_type; ?>" name="post_type" value="<?php echo $post_type; ?>" <?php echo $checked; ?>>
								<?php echo ucfirst( $post_type ); ?>
							</label>
							<?php */ ?>

							<option value="<?php echo $post_type; ?>" <?php if( $checked ) echo ' selected'; ?>>
								<?php echo ucfirst( $post_type ); ?>
							</option>
							<?php $i++; endforeach; ?>
							</select>
						</div>
					</div>
					<?php endif; ?>
					<div class="submit-wrap">
						<button type="button" class="button button-secondary button-large" id="ufc_create_item_cancel">
							<?php esc_html_e('Cancel', "ufcsupport" ); ?>
						</button>
						<button type="button" class="button button-primary button-large" id="ufc_create_item_submit">
							<?php esc_html_e('Add', "ufcsupport" ); ?>
						</button>
					</div>
				</div>
			</div>
		</form>
	</div>

</div>