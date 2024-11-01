<div class="postbox acf-postbox">
  <form id="ufc_field_post_meta_form">

    <div id="acf-form-data" class="acf-hidden">
      <input type="hidden" name="action" value="ufc_save_field_group_post_meta_tab">
      <input type="hidden" name="ufc_field_post_id" value="<?php esc_attr_e( $ufc_field_post_id ); ?>">
      <input type="hidden" name="ufc_field_group_id" value="<?php esc_attr_e( $ufc_field_group_id ); ?>">
      <input type="hidden" id="_acf_screen" name="_acf_screen" value="acf_form">
      <input type="hidden" id="_acf_post_id" name="_acf_post_id" value="<?php esc_attr_e( $ufc_field_post_id ); ?>">
      <input type="hidden" id="_acf_validation" name="_acf_validation" value="1">
      <input type="hidden" id="_acf_nonce" name="_acf_nonce" value="<?php esc_attr_e( wp_create_nonce( 'ufc_post_meta' ) ); ?>">
      <input type="hidden" id="_acf_changed" name="_acf_changed" value="0">
      <?php /* <input type="hidden" id="_acf_form" name="_acf_form" value=""> */ ?>
    </div>

    <?php
    $ufc_post_title = '';
    $ufc_post_name = '';
    if ( !empty($ufc_field_post_id) ) {
      $ufc_field_post = get_post( $ufc_field_post_id );
      if ( !empty($ufc_field_post) ) {
        $ufc_post_title = $ufc_field_post->post_title;
        $ufc_post_name = $ufc_field_post->post_name;
      }
    }
    ?>
    
    <div class="ufc-group-custom-field-content">
      <div class="ufc-group-custom-field-content-wrap">
        <div class="acf-field acf-field-text ufc-post-title is-required" data-required="1">
          <div class="acf-label">
            <label for="ufc_post_title_input"><?php esc_html_e("Title", "ufcsupport" ); ?> <span class="acf-required">*</span></label>
          </div>
          <div class="acf-input">
            <div class="acf-input-wrap">
              <input type="text" id="ufc_post_title_input" name="ufc_post_title_input" value="<?php esc_attr_e( get_the_title( $ufc_field_post_id ) ); ?>" required="required">
            </div>
          </div>
          <div class="ufc-slug-edit-wrap">
            <div id="edit-slug-box" class="hide-if-no-js">
              <?php echo get_sample_permalink_html( $ufc_field_post_id ); ?>
            </div>
            <div id="slugdiv" class="" style="display:none;">
              <div class="inside">
                <label class="screen-reader-text" for="ufc_post_name_input">Slug</label>
                <input name="ufc_post_name_input" type="text" size="13" id="ufc_post_name_input" class="ufc-field-input" value="<?php esc_attr_e($ufc_post_name); ?>">
              </div>
            </div>
          </div>
          <div class="ufc-field-errors">
            <p class="ufc-field-error-required"><?php esc_html_e("This field is required.", "ufcsupport" ); ?></p>
          </div>
        </div>
        <?php
        if ( !empty($ufc_field_group_id) && !empty($ufc_field_post_id) ) {
    
          // Global variables
          global $ufc_admin;
          $all_field_types = $ufc_admin->ufc_get_all_field_types();
          $ufc_field_post = get_post( $ufc_field_post_id );
    
          if( function_exists('acf_get_field_groups') ) {
    
            $ufc_field_group = acf_get_field_group($ufc_field_group_id);
            $ufc_field_group_fields = acf_get_fields( array(
              'ID'  => $ufc_field_group_id,
              'key' => "group_$ufc_field_group_id",
            ) );
    
            $is_tab_stated = false;
            $is_accordion_stated = false;
    
            if ( !empty($ufc_field_group_fields) ) {
              foreach ($ufc_field_group_fields as $key => $field_data) {
  
                $ufc_admin->ufc_get_post_meta_edit_field_view( $field_data, $ufc_field_group_id, $ufc_field_group_key, $ufc_field_post_id, $all_field_groups, $all_field_types, $ufc_field_post, $ufc_field_group, $ufc_field_group_fields, '', '' );
  
              }
            }
    
          }
    
        }
        ?>
      </div>
    </div>
  </form>

</div>

<?php
$args = array();
$args['posts_per_page'] = -1;
$args['post_type'] = acf_get_post_types( array( 'exclude'=>array('attachment', 'shop_order', 'shop_order_refund', 'shop_coupon', 'fl-builder-template', 'fl-theme-layout') ) );

// filters
$args = apply_filters( 'acf/fields/relationship/query', $args, $field_data, $ufc_field_post_id );
$args = apply_filters( 'acf/fields/relationship/query/name=' . $field_data['name'], $args, $field_data, $ufc_field_post_id );
$args = apply_filters( 'acf/fields/relationship/query/key=' . $field_data['key'], $args, $field_data, $ufc_field_post_id );

// get posts grouped by post type
$groups = acf_get_grouped_posts( $args );
?>
<div id="wp-link-backdrop"></div>
<div id="wp-link-wrap" class="wp-core-ui has-text-field" role="dialog" aria-labelledby="link-modal-title">
  <div id="wp-link">
    <h1 id="link-modal-title">Insert/edit link</h1>
    <button type="button" id="wp-link-close"><span class="screen-reader-text">Close</span></button>
    <div id="link-selector">
      <div id="link-options">
        <p class="howto" id="wplink-enter-url">Enter the destination URL</p>
        <input id="wp-link-key" type="hidden">
        <div>
          <label><span>URL</span>
          <input id="wp-link-url" type="text" aria-describedby="wplink-enter-url"></label>
        </div>
        <div class="wp-link-text-field">
          <label><span>Link Text</span>
          <input id="wp-link-text" type="text"></label>
        </div>
        <div class="link-target">
          <label><span></span>
          <input type="checkbox" id="wp-link-target"> Open link in a new tab</label>
        </div>
      </div>
      <p class="howto" id="wplink-link-existing-content">Or link to existing content</p>
      <div id="search-panel">
        <div class="link-search-wrapper">
          <label>
            <span class="search-label">Search</span>
            <input type="search" id="wp-link-search" class="link-search-field" autocomplete="off" aria-describedby="wplink-link-existing-content">
            <span class="spinner"></span>
          </label>
        </div>
        <div id="search-results" class="query-results" tabindex="0" style="">
          <ul>
            <?php
            $item_count = 0;
            if ( !empty($groups) ) {
              foreach ($groups as $post_type_name => $posts_arr) {
                if ( !empty($posts_arr) ) {
                  foreach ($posts_arr as $post_data) {

                    $item_count++;
                    if( $item_count % 2 == 0){
                      echo '<li class="alternate">'; 
                    } else {
                      echo "<li>";
                    }
                      $item_title = (!empty($post_data->post_title)) ? $post_data->post_title : $post_data->ID;
                      $item_permalink = get_permalink( $post_data->ID );
                      ?>
                      <input type="hidden" class="item-permalink" value="<?php esc_attr_e($item_permalink); ?>">
                      <span class="item-title"><?php esc_html_e( $item_title ); ?></span>
                      <span class="item-info"><?php esc_html_e( $post_type_name ); ?></span>
                    </li>
                    <?php
                  }
                }
              }
            }
            ?>
          </ul>
        </div>
      </div>
    </div>
    <div class="submitbox">
      <div id="wp-link-cancel">
        <button type="button" class="button"><?php esc_html_e('Cancel', "ufcsupport" ); ?></button>
      </div>
      <div id="wp-link-update">
        <input type="submit" value="Update" class="button button-primary" id="wp-link-submit" name="wp-link-submit">
      </div>
    </div>
  </div>
</div>


<div id="ufc-taxonomy-popup">
  <div class="ufc-taxonomy-popup-box ufc-box" style="width: 300px;">
    <div class="title">
      <h3><?php esc_html_e('Add new category', "ufcsupport" ); ?></h3>
      <span class="acf-icon -cancel grey" data-event="close"></span>
    </div>
    <div class="inner">
      <form method="post">
        <input type="hidden" id="ufc_term_post_id" name="ufc_term_post_id">
        <input type="hidden" id="ufc_field_key" name="ufc_field_key">
        <input type="hidden" id="taxonomy_slug" name="taxonomy_slug">
        <div class="ufc-field ufc-field-text" data-name="term_name" data-type="text">
          <div class="ufc-label">
            <label for="term_name"><?php esc_html_e('Name', "ufcsupport" ); ?></label>
          </div>
          <div class="ufc-input">
            <div class="ufc-input-wrap">
              <input type="text" id="term_name" name="term_name">
            </div>
          </div>
        </div>
        <div class="ufc-field ufc-field-select" data-name="term_parent" data-type="select">
          <div class="ufc-label">
            <label for="term_parent"><?php esc_html_e('Parent', "ufcsupport" ); ?></label>
          </div>
          <div class="ufc-input">
            <select id="term_parent" class="" name="term_parent" data-ui="0" data-ajax="0" data-multiple="0" data-placeholder="Select" data-allow_null="1">
              <option value="" selected="selected" data-i="0"><?php esc_html_e('- Select -', "ufcsupport" ); ?></option>
            </select>
          </div>
        </div>
        <p class="ufc-submit">
          <button id="ufc_create_new_term" class="ufc-submit-button button button-primary" type="submit"><?php esc_html_e('Add', "ufcsupport" ); ?></button>
        </p>
      </form>
    </div>
    <div class="loading" style="display: none;"><i class="acf-loading"></i></div>
  </div>
  <div class="bg" data-event="close"></div>
</div>


<?php


/* End of file */