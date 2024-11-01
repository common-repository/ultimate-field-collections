<?php

$starred = get_posts(
    array(
        'posts_per_page'         => -1,
        'post_type'              => 'acf-field-group',
        'post_status'            => array( 'publish', 'acf-disabled', 'trash' ),
        'meta_query' => array(
            array(
                'key'     => '_collection_starred',
                'value'   => 1,
                'compare' => '=',
            ),
        ),
    )
);

$all = get_posts(
    array(
        'posts_per_page'         => -1,
        'post_type'              => 'acf-field-group',
        'orderby'                => 'menu_order title',
        'order'                  => 'ASC',
        'post_status'            => array( 'publish', 'acf-disabled', 'trash' ),
    )
);

$active = get_posts(
	array(
		'posts_per_page'         => -1,
		'post_type'              => 'acf-field-group',
		'post_status'            => array( 'publish' ),
	)
);

$disabled = get_posts(
	array(
		'posts_per_page'         => -1,
		'post_type'              => 'acf-field-group',
		'post_status'            => array( 'acf-disabled' ),
	)
);

$trash = get_posts(
    array(
        'posts_per_page'         => -1,
        'post_type'              => 'acf-field-group',
        'post_status'            => array( 'trash' ),
    )
);

$starred_count = count($starred);
$all_count = count($all);
$active_count = count($active);
$disabled_count = count($disabled);
$trash_count = count($trash);
?>
<div class="ultimate-field-collections-page-wrap" data-collection_list="" data-collection_settings="" data-post_list=""
    data-post_content="" data-create_field_collection="">
    <div class="ultimate-field-collections-logo-bar" title="<?php esc_html_e('Ultimate Field Collections', "ufcsupport" ); ?>">
        <?php echo ufc_get_image(UFC_URL.'assets/images/ultimate-field-collections-logo.svg'); ?>
    </div>

    <div class="ultimate-field-collections-sidebar">
        <div class="ufc-field-list-header">
            <div class="ufc-field-list-header-item ufc-list-title">
                <h3><?php esc_html_e('Field Collections', "ufcsupport" ); ?></h3>
                <button type="button" class="button ufc_add_field_collection_btn" id="Add_Field_Collection"><i
                        class="fa fa-plus"></i> <?php esc_html_e('Add', "ufcsupport" ); ?></button>
            </div>
            <div class="ufc-field-list-header-item ufc-list-filters">
                <ul class="subsubsub">
                    <li class="starred<?php if($starred_count === 0 ) echo ' no_starred'; ?>">
                        <a href="#" data-target="starred" class="<?php if($starred_count > 0 ) echo 'current'; ?>">
                            <?php echo ufc_get_image(UFC_URL.'assets/images/star.svg'); ?>
                            <span class="count">(<?php echo esc_attr( $starred_count ); ?>)</span>
                        </a>
                    </li>
                    <li class="publish"><a href="#" data-target="publish"
                            class="<?php if($starred_count == 0 ) echo 'current'; ?>">Active <span
                                class="count">(<?php echo esc_attr( $active_count ); ?>)</span></a></li>
                    <li class="acf-disabled"><a href="#" data-target="acf-disabled">Disabled <span
                                class="count">(<?php echo esc_attr( $disabled_count ); ?>)</span></a></li>
                    <li class="trash"><a href="#" data-target="trash">Trash <span
                                class="count">(<?php echo esc_attr( $trash_count ); ?>)</span></a></li>
                </ul>
                <div class="ufc-field-list-header-item ufc-list-search">
                    <label class="dashicons dashicons-search" for="ufc_list_search_input"></label>
                    <input type="text" class="ufc-list-search-input" id="ufc_list_search_input"
                        placeholder="<?php esc_attr_e('Search', "ufcsupport" ); ?>">
                    <span class="close-search">
                        <?php echo ufc_get_image(UFC_URL.'assets/images/close.svg'); ?>
                    </span>
                </div>
            </div>
        </div>
        <ul class="ufc-fields-list-wrap ufc-filter-result">
            <?php

			if ( !empty($all) ) {
				foreach ($all as $field_group_key => $field_group_data) {

					$field_group_id = $field_group_data->ID;
					$field_group_key = $field_group_data->post_name;
					$field_group_title = $field_group_data->post_title;
					$field_group_content = $field_group_data->post_content;
                    $is_starred = get_post_meta( $field_group_id, '_collection_starred', true );

					$data = unserialize($field_group_content);
					
					$locations_arr = array();

					if ( !empty($data['location']) ) {
						foreach ($data['location'] as $locations_data) {
							if ( !empty($locations_data) ) {
								foreach ($locations_data as $single_location_data) {
									if ( ($single_location_data['operator']=='==') ) {
										if ( is_numeric( $single_location_data['value'] ) ) {
											$locations_arr[] = get_the_title( $single_location_data['value'] );
										} else {
											$locations_arr[] = ucfirst( str_replace( '_', ' ', $single_location_data['value'] ) );
										}
									}
								}
							}
						}
					}


					?>

            <li class="ufc-field-list-item ufc-filter-result-item<?php if( $starred_count > 0){ if($is_starred) { echo ' show'; }else{ echo ' hide'; } }elseif( $field_group_data->post_status == 'publish' ){ echo ' show'; }else{ echo ' hide'; } ?>"
                data-field_group_id="<?php esc_attr_e($field_group_id); ?>"
                data-field_group_key="<?php esc_attr_e($field_group_key); ?>"
                data-status="<?php echo esc_attr( $field_group_data->post_status ); ?>"
                data-starred="<?php echo esc_attr( $is_starred ); ?>">
                <span class="ufc-field-list-item-trigger-starred<?php if( $is_starred ) echo ' active'; ?>">
                    <?php echo ufc_get_image(UFC_URL.'assets/images/star.svg'); ?>
                </span>
                <span class="ufc-field-list-item-name"><?php esc_html_e( $field_group_title ); ?></span>
                <span class="ufc-field-list-item-location">(<?php esc_html_e( implode(', ', $locations_arr) ); ?>)</span>

                <div class="ufc-field-list-item-actions">
                    <span class="ufc-field-list-item-trigger-action">
                        <?php echo ufc_get_image(UFC_URL.'assets/images/settings.svg'); ?>
                    </span>
                    <ul class="ufc-field-list-item-actions-ul">
                        <li class="ufc-field-list-item-actions-li ufc-field-list-item-edit-action"><i
                                class="far fa-edit"></i><?php esc_html_e( 'Edit', 'wcdmdsupport'); ?></li>
                        <li class="ufc-field-list-item-actions-li ufc-field-list-item-duplicate-action"><i
                                class="fa fa-retweet"></i><?php esc_html_e( 'Duplicate', 'wcdmdsupport'); ?></li>
                        <li class="ufc-field-list-item-actions-li ufc-field-list-item-delete-action"><i
                                class="fa fa-trash"></i><?php esc_html_e( 'Delete', 'wcdmdsupport'); ?></li>
                        <li class="ufc-field-list-item-actions-li ufc-field-list-item-trash-restore-action"><i
                                class="fas fa-trash-restore"></i><?php esc_html_e( 'Restore', 'wcdmdsupport'); ?></li>
                    </ul>
                </div>

                <div class="ufc-field-list-item-tab-btns">
                    <button class="button button-primary button-large"
                        id="ufc_field_list_settings_data"><?php esc_html_e( 'Fields', 'wcdmdsupport'); ?></button>
                    <button class="button button-primary button-large"
                        id="ufc_field_list_field_data"><?php esc_html_e( 'Content', 'wcdmdsupport'); ?></button>
                </div>
            </li>

            <?php
				}
			}
			?>
        </ul>
    </div>

    <?php
    $auto_edit_collection_id = !empty($_GET['collection']) ? $_GET['collection'] : '';
    $auto_edit_collection_tab = !empty($_GET['tab']) ? ( ($_GET['tab']=='fields') ? 'settings' : $_GET['tab'] )  : '';
	$auto_edit_collection_post_id = !empty($_GET['post']) ? $_GET['post'] : '';
/*
https://dev1.wpufc.com/wp-admin/admin.php?page=ufc-field-collections&collection=2057&tab=content&post=2196
*/
	?>
    <div class="ultimate-field-collections-content"
        data-auto_edit_collection_id="<?php esc_attr_e($auto_edit_collection_id); ?>"
        data-auto_edit_collection_tab="<?php esc_attr_e($auto_edit_collection_tab); ?>"
        data-auto_edit_collection_post_id="<?php esc_attr_e($auto_edit_collection_post_id); ?>">
    </div>
    <div class="ultimate-field-collections-content-2">
        <form action="post" id="ufc_create_field_collection_form">

            <div class="ufc-group-settings-fields">
                <div class="ufc-settings-field-main Collection_Name_field">
                    <div class="ufc-settings-field">
                        <label class="field-label" for="Collection_Name"><?php esc_html_e('Collection Name', "ufcsupport" ); ?></label>
                        <input type="text" name="ufc_field_group_title" class="ufc-field-input" id="Collection_Name" value="">
                    </div>
                    <div class="submit-wrap">
                        <button type="button" class="button button-secondary button-large"
                            id="ufc_create_field_collection_cancel"><?php esc_html_e('Cancel', "ufcsupport" ); ?></button>
                        <button type="button" class="button button-primary button-large"
                            id="ufc_create_field_collection_submit"><?php esc_html_e('Add', "ufcsupport" ); ?></button>
                    </div>
                </div>
            </div>

        </form>
    </div>
</div>