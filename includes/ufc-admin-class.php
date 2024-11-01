<?php
// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

/**
 * Admin Class
 *
 * Handles adding scripts functionality to the admin pages
 *
 * @package Ultimate Field Collections
 * @since 1.0.0
 */
class UFC_Admin {

	//class constructor
	function __construct(){
		
	}
	
	/**
	 * Create Menu on Admin sidebar
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 */
	public function ufc_admin_menus(){

		add_menu_page(
			esc_html__('Ultimate Field Collections', "ufcsupport" ), 
			esc_html__('Ultimate Field Collections', "ufcsupport" ), 
			'manage_options', 
			'ufc-field-collections', 
			array( $this, 'ufc_page_ultimate_field_collections' ),
			'none',
			4.9999999
		);
		
		add_submenu_page(
			'ufc-field-collections',
			esc_html__('Field Collections', "ufcsupport" ),
			esc_html__('Field Collections', "ufcsupport" ),
			'manage_options',
			'ufc-field-collections', 
			array( $this, 'ufc_page_ultimate_field_collections' )
		);
		
		add_submenu_page(
			'ufc-field-collections',
			esc_html__('Settings', "ufcsupport" ),
			esc_html__('Settings', "ufcsupport" ),
			'manage_options',
			'ufc-settings',
			array( $this, 'ufc_settings_page_content' )
		);
	}
	
	/**
	 * Show the HTML of Ultimate Field Collections Page
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 */
	public function ufc_page_ultimate_field_collections(){

		include( UFC_TEMPLATES_DIR.'/ultimate-field-collections-page.php' );

	}
	
	/**
	 * Show the HTML of Settings Page
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 */
	public function ufc_settings_page_content(){

		?>
<h1><?php esc_html_e( 'Ultimate Field Collections Settings', 'ufcsupport' ); ?> </h1>
<form method="POST" action="options.php">
    <?php
			settings_fields( 'ufc-settings-page' );
			do_settings_sections( 'ufc-settings-page' );
			submit_button();
			?>
</form>
<?php
	}
	
	/**
	 * Plugin Settings Define
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 */
	public function ufc_admin_settings_init(){

		add_settings_section(
			'ufc_settings_gmap_section',
			esc_html__('Google Map Settings', "ufcsupport" ),
			'',
			'ufc-settings-page'
		);

		add_settings_field(
			'ufc_settings_gmap_api_key',
			esc_html__('Google Map API Key', "ufcsupport" ),
			array( $this, 'ufc_settings_gmap_api_key_callback' ),
			'ufc-settings-page',
			'ufc_settings_gmap_section'
		);
		register_setting( 'ufc-settings-page', 'ufc_settings_gmap_api_key' );
	}
	
	/**
	 *  Plugin Settings: Google Map Field callback
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 */
	public function ufc_settings_gmap_api_key_callback(){
		$gmap_api_key = get_option( 'ufc_settings_gmap_api_key' );
		?>
<input type="text" class="regular-text" id="ufc_settings_gmap_api_key" name="ufc_settings_gmap_api_key"
    value="<?php esc_attr_e($gmap_api_key); ?>">
<?php
	}

	/**
	 * AFC update MAP API key
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 * @reference https://www.advancedcustomfields.com/blog/google-maps-api-settings/ 
	 */
	public function ufc_admin_update_acf_init($value=''){
		$gmap_api_key = get_option( 'ufc_settings_gmap_api_key' );
		if ( !empty($gmap_api_key) ) {
			acf_update_setting( 'google_api_key', $gmap_api_key );
		}
	}

	/**
	 * All field types Label and icons
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 */
	public function ufc_get_all_field_types(){
		$all_field_types = array(
			'text' => array(
				'field_type' => 'text',
				'field_label' => esc_html__('Plain Text', "ufcsupport" ),
				'field_icon' => '<i class="fa fa-font"></i>',
			),
			'textarea' => array(
				'field_type' => 'textarea',
				'field_label' => esc_html__('Text Area', "ufcsupport" ),
				'field_icon' => '<i class="fa fa-text"></i>',
			),
			'message' => array(
				'field_type' => 'message',
				'field_label' => esc_html__('Message', "ufcsupport" ),
				'field_icon' => '<i class="fa fa-comment-exclamation"></i>',
			),
			'password' => array(
				'field_type' => 'password',
				'field_label' => esc_html__('Password', "ufcsupport" ),
				'field_icon' => '<i class="fa fa-lock"></i>',
			),
			'url' => array(
				'field_type' => 'url',
				'field_label' => esc_html__('URL', "ufcsupport" ),
				'field_icon' => '<i class="fa fa-globe-americas"></i>',
			),
			'wysiwyg' => array(
				'field_type' => 'wysiwyg',
				'field_label' => esc_html__('Visual Editor', "ufcsupport" ),
				'field_icon' => '<i class="fas fa-paragraph"></i>',
			),
			'image' => array(
				'field_type' => 'image',
				'field_label' => esc_html__('Image', "ufcsupport" ),
				'field_icon' => '<i class="fa fa-image"></i>',
			),
			'file' => array(
				'field_type' => 'file',
				'field_label' => esc_html__('File', "ufcsupport" ),
				'field_icon' => '<i class="fas fa-upload"></i>',
			),
			'oembed' => array(
				'field_type' => 'oembed',
				'field_label' => esc_html__('oEmbed', "ufcsupport" ),
				'field_icon' => '<i class="fa fa-photo-video"></i>',
			),
			'link' => array(
				'field_type' => 'link',
				'field_label' => esc_html__('Link', "ufcsupport" ),
				'field_icon' => '<i class="fa fa-link"></i>',
			),
			'page_link' => array(
				'field_type' => 'page_link',
				'field_label' => esc_html__('Page Link', "ufcsupport" ),
				'field_icon' => '<i class="fa fa-anchor"></i>',
			),
			'email' => array(
				'field_type' => 'email',
				'field_label' => esc_html__('Email', "ufcsupport" ),
				'field_icon' => '<i class="fa fa-envelope"></i>',
			),
			'number' => array(
				'field_type' => 'number',
				'field_label' => esc_html__('Number', "ufcsupport" ),
				'field_icon' => '<i class="fa fa-hashtag"></i>',
			),
			'range' => array(
				'field_type' => 'range',
				'field_label' => esc_html__('Range', "ufcsupport" ),
				'field_icon' => '<i class="fa fa-tachometer-alt-average"></i>',
			),
			'google_map' => array(
				'field_type' => 'google_map',
				'field_label' => esc_html__('Map', "ufcsupport" ),
				'field_icon' => '<i class="fa fa-map-marker-alt"></i>',
			),
			'color_picker' => array(
				'field_type' => 'color_picker',
				'field_label' => esc_html__('Color', "ufcsupport" ),
				'field_icon' => '<i class="fa fa-fill-drip"></i>',
			),
			'date_picker' => array(
				'field_type' => 'date_picker',
				'field_label' => esc_html__('Date/Time', "ufcsupport" ),
				'field_icon' => '<i class="far fa-calendar-alt"></i>',
			),
			'date_time_picker' => array(
				'field_type' => 'date_time_picker',
				'field_label' => esc_html__('Date/Time', "ufcsupport" ),
				'field_icon' => '<i class="far fa-calendar-alt"></i><i class="fas fa-clock"></i>',
			),
			'time_picker' => array(
				'field_type' => 'time_picker',
				'field_label' => esc_html__('Date/Time', "ufcsupport" ),
				'field_icon' => '<i class="far fa-clock"></i>',
			),
			'true_false' => array(
				'field_type' => 'true_false',
				'field_label' => esc_html__('Switch', "ufcsupport" ),
				'field_icon' => '<i class="fa fa-toggle-on"></i>',
			),
			'select' => array(
				'field_type' => 'select',
				'field_label' => esc_html__('Dropdown', "ufcsupport" ),
				'field_icon' => '<i class="fas fa-caret-square-down"></i>',
			),
			'checkbox' => array(
				'field_type' => 'checkbox',
				'field_label' => esc_html__('Checkbox', "ufcsupport" ),
				'field_icon' => '<i class="fas fa-tasks"></i>',
			),
			'radio' => array(
				'field_type' => 'radio',
				'field_label' => esc_html__('Radio', "ufcsupport" ),
				'field_icon' => '<i class="fas fa-dot-circle"></i>',
			),
			'button_group' => array(
				'field_type' => 'button_group',
				'field_label' => esc_html__('Button Group', "ufcsupport" ),
				'field_icon' => '<i class="fas fa-layer-group"></i>',
			),
			'group' => array(
				'field_type' => 'group',
				'field_label' => esc_html__('Group', "ufcsupport" ),
				'field_icon' => '<i class="fa fa-vector-square"></i>',
			),
			'taxonomy' => array(
				'field_type' => 'taxonomy',
				'field_label' => esc_html__('Taxonomy', "ufcsupport" ),
				'field_icon' => '<i class="fa fa-copy"></i>',
			),
			// 'ufc_reference' => array(
			// 	'field_type' => 'ufc_reference',
			// 	'field_label' => esc_html__('Reference', "ufcsupport" ),
			// 	'field_icon' => '<i class="fa fa-copy"></i>',
			// ),
			'post_object' => array(
				'field_type' => 'post_object',
				'field_label' => esc_html__('Post Object', "ufcsupport" ),
				'field_icon' => '<i class="fa fa-folder-tree"></i>',
			),
			'relationship' => array(
				'field_type' => 'relationship',
				'field_label' => esc_html__('Relationship', "ufcsupport" ),
				'field_icon' => '<i class="fas fa-repeat"></i>',
			),
			'user' => array(
				'field_type' => 'user',
				'field_label' => esc_html__('User', "ufcsupport" ),
				'field_icon' => '<i class="fas fa-user"></i>',
			),
	        'tab' => array(
	            'field_type' => 'tab',
	            'field_label' => esc_html__('Tab', "ufcsupport" ),
	            'field_icon' => '<i class="fas fa-folder"></i>',
	        ),
	        'accordion' => array(
	            'field_type' => 'accordion',
	            'field_label' => esc_html__('Accordion', "ufcsupport" ),
	            'field_icon' => '<i class="fas fa-stream"></i>',
	        ),
		);

		return apply_filters( 'ufc_get_all_field_types_filter', $all_field_types );
	}

	/**
	 * All field types Label and icons
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 */
	public function ufc_get_edit_field_view( $field_data ){

		$all_field_types = $this->ufc_get_all_field_types();

		$field_key = (!empty($field_data['key'])) ? $field_data['key'] : '';
		$field_ID = (!empty($field_data['ID'])) ? $field_data['ID'] : $field_key;
		$field_type = (!empty($field_data['type'])) ? $field_data['type'] : '';

		if ( (!empty($field_ID) || ($field_ID==0) ) && !empty($field_type) ) {

			$field_label = (!empty($field_data['label'])) ? $field_data['label'] : '';
			$field_name = (!empty($field_data['name'])) ? $field_data['name'] : '';
			$field_instructions = (!empty($field_data['instructions'])) ? $field_data['instructions'] : '';
			$field_required = (!empty($field_data['required'])) ? $field_data['required'] : '';
			$field_maxlength = (!empty($field_data['maxlength'])) ? $field_data['maxlength'] : '';
			$field_minlength = (!empty($field_data['minlength'])) ? $field_data['minlength'] : '';
			$field_menu_order = (!empty($field_data['menu_order'])) ? $field_data['menu_order'] : '';
			$field_parent = (!empty($field_data['parent'])) ? $field_data['parent'] : '';
			$field_message = (!empty($field_data['message'])) ? $field_data['message'] : '';

			if ( file_exists( UFC_TEMPLATES_DIR.'/field-edit-view/'.$field_type.'.php' ) ) {
				include( UFC_TEMPLATES_DIR.'/field-edit-view/'.$field_type.'.php' );

			} else if ( in_array( $field_type, array('image', 'gallery') ) ) {
				if ( file_exists( UFC_TEMPLATES_DIR.'/field-edit-view/image.php' ) ) {
					include( UFC_TEMPLATES_DIR.'/field-edit-view/image.php' );
				}

			} else if ( in_array( $field_type, array('text', 'number', 'email', 'url', 'color_picker', 'true_false', 'date_picker', 'date_time_picker', 'time_picker' ) ) ) {
				if ( file_exists( UFC_TEMPLATES_DIR.'/field-edit-view/text.php' ) ) {
					include( UFC_TEMPLATES_DIR.'/field-edit-view/text.php' );
				}

			} else if ( in_array( $field_type, array('oembed', 'file') ) ) {
				if ( file_exists( UFC_TEMPLATES_DIR.'/field-edit-view/file.php' ) ) {
					include( UFC_TEMPLATES_DIR.'/field-edit-view/file.php' );
				}

			} else {

				$file_path = apply_filters( 'ufc_field_edit_view_file_path_filter', '', $field_type );
				if ( !empty($file_path) && file_exists($file_path) ) { include( $file_path ); }
			}
		}
	}

	/**
	 * All field types Label and icons
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.2
	 */
	public function ufc_get_post_meta_edit_field_view( $field_data, $ufc_field_group_id, $ufc_field_group_key, $ufc_field_post_id, $all_field_groups, $all_field_types, $ufc_field_post, $ufc_field_group, $ufc_field_group_fields, $field_parent_data = '', $ufc_repeater_row = '' ){
  
		$field_key = (!empty($field_data['key'])) ? $field_data['key'] : '';
		$field_ID = (!empty($field_data['ID'])) ? $field_data['ID'] : $field_key;
		$field_type = (!empty($field_data['type'])) ? $field_data['type'] : '';
		$field_label = (!empty($field_data['label'])) ? $field_data['label'] : '';
		$field_name = (!empty($field_data['name'])) ? $field_data['name'] : '';
		$field_instructions = (!empty($field_data['instructions'])) ? $field_data['instructions'] : '';
		$field_required = (!empty($field_data['required'])) ? $field_data['required'] : '';

		if ( !empty($field_parent_data) && ( is_int($ufc_repeater_row) || str_contains($ufc_repeater_row, 'ufc_repeater_clone_index') ) ) {

			$temp_repeater_parent_field_data = (!empty($field_data['ufc_repeater_field_parent_data'])) ? $field_data['ufc_repeater_field_parent_data'] : $field_parent_data;

			$ufc_repeater_row = (!empty($field_data['ufc_repeater_row'])) ? $field_data['ufc_repeater_row'] : $ufc_repeater_row;

			// $field_data['ufc_key'] = $field_key . '[row-'.$ufc_repeater_row;
			if ( !empty($temp_repeater_parent_field_data['ufc_key']) ) {
				$field_key = $temp_repeater_parent_field_data['ufc_key'].']';

				$field_key .= (!empty($temp_repeater_parent_field_data['key'])) ? '['.$temp_repeater_parent_field_data['key'].']' : '';

			} else {
				$field_key = (!empty($temp_repeater_parent_field_data['key'])) ? $temp_repeater_parent_field_data['key'].']' : '';
			}

			$field_key .= '[row-'.$ufc_repeater_row.']';
			$field_key .= (!empty($field_data['key'])) ? '['.$field_data['key'] : '';
		}

		/* START Field */
		/* Check and view based on Group type */
		if ( $field_type == 'group' ) {

			if ( isset( $field_data['ufc_field_video_group'] ) ) {
				include( UFC_TEMPLATES_DIR.'/post-meta-edit-view/group-video-view.php' );

			} else {
				include( UFC_TEMPLATES_DIR.'/post-meta-edit-view/group.php' );
			}

		} else if ( ($field_type != 'group') && file_exists( UFC_TEMPLATES_DIR.'/post-meta-edit-view/'.$field_type.'.php' ) ) {

		    include( UFC_TEMPLATES_DIR.'/post-meta-edit-view/'.$field_type.'.php' );

		} else  {

		  $file_path = apply_filters( 'ufc_field_post_meta_edit_view_file_path_filter', '', $field_type, $field_data );
		  if ( !empty($file_path) && file_exists($file_path) ) {
		    include( $file_path );
		  }
		}
		/* END Field */

		if ( !empty($field_parent_data) && ( is_int($ufc_repeater_row) || str_contains($ufc_repeater_row, 'ufc_repeater_clone_index') ) ) {

			if ( !empty($temp_repeater_parent_field_data) ) {
				$field_parent_data = $temp_repeater_parent_field_data;
			}

			$ufc_repeater_row = (!empty($field_parent_data['ufc_repeater_parent_row'])) ? $field_parent_data['ufc_repeater_parent_row'] : ( (!empty($field_data['ufc_repeater_row'])) ? $field_data['ufc_repeater_row'] : $ufc_repeater_row );
		}

	}
	
	/**
	 * Select field group and get the HTML of Setting Tab
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 */
	public function ufc_select_field_group_callback(){
		$response = array();

		if ( !empty($_POST['nonce']) && wp_verify_nonce( sanitize_text_field($_POST['nonce']), 'ufc_ajax_nonce' ) ) {

			if ( !empty($_POST['ufc_field_group_id']) ) {

				$ufc_field_group_id = isset($_POST['ufc_field_group_id']) ? sanitize_text_field($_POST['ufc_field_group_id']) : '';
				$ufc_field_group_key = isset($_POST['ufc_field_group_key']) ? sanitize_text_field($_POST['ufc_field_group_key']) : '';

				$all_field_groups = acf_get_field_groups();

				ob_start();
				if ( !empty($all_field_groups) ) {
					foreach ($all_field_groups as $field_group_key => $field_group_data) {
						if ( !empty($field_group_data['ID']) && ($ufc_field_group_id==$field_group_data['ID']) ) {
							
							$field_group_id = $field_group_data['ID'];
							?>

<div class="ufc-content-header-title"
    title="<?php esc_attr_e((!empty($field_group_data['title'])) ? $field_group_data['title'] : '' ); ?>">
    <div class="home"><i class="fa fa-home"></i></div>
    <div class="divider"><?php esc_html_e('/', "ufcsupport" ); ?></div>
    <div class="title">
        <span><?php esc_attr_e((!empty($field_group_data['title'])) ? $field_group_data['title'] : '' ); ?></span>
    </div>
    <!-- <span class="divider"><?php esc_html_e('/', "ufcsupport" ); ?></span> -->
    <!-- <span class="tab-name"></span> -->
    <div class="post">
        <span class="divider"><?php esc_html_e('/', "ufcsupport" ); ?></span>
        <span class="post-name"></span>
    </div>
</div>
<div class="ufc-content-header-wrap">
    <div class="ufc-content-tabs-wrap">
        <div class="ufc-content-tab" data-target_tab="settings_data"><?php esc_html_e('Fields', "ufcsupport" ); ?></div>
        <div class="ufc-content-tab" data-target_tab="field_data"><?php esc_html_e('Content', "ufcsupport" ); ?></div>
    </div>
    <div class="ufc-content-btns">
				<button type="button" class="button ufc_add_field_collection_btn" id="Add_New_Item">
						<i class="fa fa-plus"></i> <?php esc_html_e('Add', "ufcsupport" ); ?>
				</button>
        <button class="button button-secondary button-large"
            id="ufc_content_cancel"><?php esc_html_e('Cancel', "ufcsupport" ); ?></button>
        <button class="button button-primary button-large"
            id="ufc_content_save"><?php esc_html_e('Save', "ufcsupport" ); ?></button>
        <div class="ufc-settings-actions">
            <span class="ufc-settings-trigger-action"><svg width="18" height="18" viewBox="0 0 16 16" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M14.5465 5.56641C14.6559 5.8125 14.5739 6.05859 14.3825 6.25L13.2067 7.31641C13.234 7.53516 13.2614 7.78125 13.2614 8C13.2614 8.24609 13.234 8.49219 13.2067 8.71094L14.3825 9.77734C14.5739 9.96875 14.6559 10.2148 14.5465 10.4609C14.4372 10.7891 14.3005 11.0898 14.1364 11.3906L13.9997 11.6094C13.8083 11.9102 13.6169 12.2109 13.3981 12.4844C13.234 12.6758 12.9606 12.7305 12.7145 12.6484L11.2106 12.1836C10.8278 12.457 10.4176 12.6758 10.0075 12.8672L9.65202 14.4258C9.59733 14.6719 9.40592 14.8633 9.15983 14.918C8.77702 14.9727 8.3942 15 7.98405 15C7.60124 15 7.21842 14.9727 6.83561 14.918C6.58952 14.8633 6.39811 14.6719 6.34342 14.4258L5.98795 12.8672C5.5778 12.6758 5.16764 12.457 4.78483 12.1836L3.28092 12.6484C3.03483 12.7305 2.76139 12.6758 2.59733 12.4844C2.37858 12.2109 2.18717 11.9102 1.99577 11.6094L1.85905 11.3906C1.69499 11.0898 1.55827 10.7891 1.44889 10.4609C1.33952 10.2148 1.42155 9.96875 1.61295 9.77734L2.78874 8.71094C2.76139 8.49219 2.76139 8.24609 2.76139 8C2.76139 7.78125 2.76139 7.53516 2.78874 7.31641L1.61295 6.25C1.42155 6.05859 1.33952 5.8125 1.44889 5.56641C1.55827 5.23828 1.69499 4.9375 1.85905 4.63672L1.99577 4.41797C2.18717 4.11719 2.37858 3.81641 2.59733 3.54297C2.76139 3.35156 3.03483 3.29688 3.28092 3.37891L4.78483 3.84375C5.16764 3.57031 5.5778 3.32422 5.98795 3.16016L6.34342 1.60156C6.39811 1.35547 6.58952 1.16406 6.83561 1.10938C7.21842 1.05469 7.60124 1 8.01139 1C8.3942 1 8.77702 1.05469 9.15983 1.10938C9.40592 1.16406 9.59733 1.35547 9.65202 1.60156L10.0075 3.16016C10.4176 3.32422 10.8278 3.57031 11.2106 3.84375L12.7145 3.37891C12.9606 3.29688 13.234 3.35156 13.3981 3.54297C13.6169 3.81641 13.8083 4.11719 13.9997 4.41797L14.1364 4.63672C14.3005 4.9375 14.4372 5.23828 14.5465 5.56641ZM8.01139 10.1875C9.21452 10.1875 10.1989 9.23047 10.1989 8C10.1989 6.79688 9.21452 5.8125 8.01139 5.8125C6.78092 5.8125 5.82389 6.79688 5.82389 8C5.82389 9.23047 6.78092 10.1875 8.01139 10.1875Z"
                        fill="#A8A8A8" />
                </svg></span>
            <ul class="ufc-settings-actions-ul">
                <li class="ufc-settings-actions-li ufc-settings-actions-field-locations-action"><i
                        class="far fa-file-alt"></i><?php esc_html_e( 'Settings', 'wcdmdsupport'); ?></li>
                <li class="ufc-settings-actions-li ufc-settings-actions-duplicate-action"><i
                        class="fa fa-retweet"></i><?php esc_html_e( 'Duplicate', 'wcdmdsupport'); ?></li>
                <li class="ufc-settings-actions-li ufc-settings-actions-delete-action"><i
                        class="fa fa-trash"></i><?php esc_html_e( 'Delete', 'wcdmdsupport'); ?></li>
            </ul>
        </div>
    </div>
    <div class="ufc-content-notification-message">
        <div class="ufc-notification-success-message"><?php esc_html_e('Saved Successfully.', "ufcsupport" ); ?></div>
        <div class="ufc-notification-error-message">
            <?php esc_html_e('Please check errors and try again.', "ufcsupport" ); ?></div>
    </div>
</div>

<div class="ufc-tab-content ufc-active-tab" id="ufc_settings_tab_content">
    <?php include( UFC_TEMPLATES_DIR.'/ufc-settings-tab-content.php' ); ?>
</div>
<div class="ufc-tab-content" id="ufc_field_data_tab_content"></div>
<?php
						}
					}
				}
				$response['field_group_html'] = ob_get_contents();
				ob_end_clean();
			}
		}
    echo json_encode($response);
    exit;
	}
	
	/**
	 * Delete field group
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 */
	public function ufc_delete_field_group_callback(){
		$response = array();

		if ( !empty($_POST['nonce']) && wp_verify_nonce( sanitize_text_field($_POST['nonce']), 'ufc_ajax_nonce' ) ) {

			if ( !empty($_POST['ufc_field_group_id']) ) {

				$ufc_field_group_id = isset($_POST['ufc_field_group_id']) ? sanitize_text_field($_POST['ufc_field_group_id']) : '';
				$ufc_field_group_key = isset($_POST['ufc_field_group_key']) ? sanitize_text_field($_POST['ufc_field_group_key']) : '';

				$ufc_field_group_post = get_post( $ufc_field_group_id );

				if ( !empty($ufc_field_group_post->post_status) && ($ufc_field_group_post->post_status == 'trash') ) {

					$deletion_result = wp_delete_post( $ufc_field_group_id, false); // Set to False if you want to send them to Trash.
					if ( $deletion_result ) {
						$response['field_delete'] = 1;
					}

				} else {

					$deletion_result = wp_trash_post( $ufc_field_group_id );
					update_post_meta( $ufc_field_group_id, '_collection_starred', false );
					if ( $deletion_result ) {
						$response['field_trash'] = 1;
					}
				}
			}

			if ( !empty($_POST['is_post']) && $_POST['is_post'] == 1) {
				$star_query = json_decode(stripslashes($_POST['star_query']), true);
				$starred_posts = get_posts( $star_query );

				unset($star_query['meta_query']);
				$star_query['post_status'] = array( 'any', 'trash' );
				$ufc_field_group_all = get_posts( $star_query );

				$star_query['post_status'] = array( 'publish' );
				$ufc_field_group_publish = get_posts( $star_query );

				$star_query['post_status'] = array( 'private' );
				$ufc_field_group_private = get_posts( $star_query );

				$star_query['post_status'] = array( 'draft' );
				$ufc_field_group_draft = get_posts( $star_query );

				$star_query['post_status'] = array( 'trash' );
				$ufc_field_group_trash = get_posts( $star_query );

				$response['ufc_field_group_starred_count'] = "(" . count($starred_posts) . ")";
				$response['ufc_field_group_all_count'] = "(" . count($ufc_field_group_all) . ")";
				$response['ufc_field_group_active_count'] = "(" . count($ufc_field_group_publish) . ")";
				$response['ufc_field_group_private_count'] = "(" . count($ufc_field_group_private) . ")";
				$response['ufc_field_group_draft_count'] = "(" . count($ufc_field_group_draft) . ")";
				$response['ufc_field_group_trash_count'] = "(" . count($ufc_field_group_trash) . ")";

			}else{

				$ufc_field_group_args = array(
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
				);
				$ufc_field_group_starred = get_posts( $ufc_field_group_args );

				unset($ufc_field_group_args['meta_query']);
				$ufc_field_group_all = get_posts( $ufc_field_group_args );

				$ufc_field_group_args['post_status'] = array( 'publish' );
				$ufc_field_group_active = get_posts( $ufc_field_group_args );

				$ufc_field_group_args['post_status'] = array( 'acf-disabled' );
				$ufc_field_group_disabled = get_posts( $ufc_field_group_args );

				$ufc_field_group_args['post_status'] = array( 'trash' );
				$ufc_field_group_trash = get_posts( $ufc_field_group_args );

				$response['ufc_field_group_starred_count'] = "(" . count($ufc_field_group_starred) . ")";
				$response['ufc_field_group_all_count'] = "(" . count($ufc_field_group_all) . ")";
				$response['ufc_field_group_active_count'] = "(" . count($ufc_field_group_active) . ")";
				$response['ufc_field_group_disabled_count'] = "(" . count($ufc_field_group_disabled) . ")";
				$response['ufc_field_group_trash_count'] = "(" . count($ufc_field_group_trash) . ")";
			}
			
		}
        echo json_encode($response);
        exit;
	}
	
	/**
	 * Restore Field Collection from Trash
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 */
	public function ufc_trash_restore_field_group_callback(){
		$response = array();

		if ( !empty($_POST['nonce']) && wp_verify_nonce( sanitize_text_field($_POST['nonce']), 'ufc_ajax_nonce' ) ) {

			if ( !empty($_POST['ufc_field_group_id']) ) {

				$ufc_field_group_id = isset($_POST['ufc_field_group_id']) ? sanitize_text_field($_POST['ufc_field_group_id']) : '';
				$ufc_field_group_key = isset($_POST['ufc_field_group_key']) ? sanitize_text_field($_POST['ufc_field_group_key']) : '';

				$trash_restore_result = wp_untrash_post( $ufc_field_group_id );
				if ( $trash_restore_result ) {
					$response['field_restore'] = 1;
				}

				$ufc_field_group_post = get_post( $ufc_field_group_id );
				if ( !empty($ufc_field_group_post->post_status) ) {
					$response['field_post_status'] = $ufc_field_group_post->post_status;
				}
			}


			if ( !empty($_POST['is_post']) && $_POST['is_post'] == 1) {
				$star_query = json_decode(stripslashes($_POST['star_query']), true);
				$starred_posts = get_posts( $star_query );

				unset($star_query['meta_query']);
				$star_query['post_status'] = array( 'any', 'trash' );
				$ufc_field_group_all = get_posts( $star_query );

				$star_query['post_status'] = array( 'publish' );
				$ufc_field_group_publish = get_posts( $star_query );

				$star_query['post_status'] = array( 'private' );
				$ufc_field_group_private = get_posts( $star_query );

				$star_query['post_status'] = array( 'draft' );
				$ufc_field_group_draft = get_posts( $star_query );

				$star_query['post_status'] = array( 'trash' );
				$ufc_field_group_trash = get_posts( $star_query );

				$response['ufc_field_group_starred_count'] = "(" . count($starred_posts) . ")";
				$response['ufc_field_group_all_count'] = "(" . count($ufc_field_group_all) . ")";
				$response['ufc_field_group_active_count'] = "(" . count($ufc_field_group_publish) . ")";
				$response['ufc_field_group_private_count'] = "(" . count($ufc_field_group_private) . ")";
				$response['ufc_field_group_draft_count'] = "(" . count($ufc_field_group_draft) . ")";
				$response['ufc_field_group_trash_count'] = "(" . count($ufc_field_group_trash) . ")";

			}else{

				$ufc_field_group_args = array(
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
				);
				$ufc_field_group_starred = get_posts( $ufc_field_group_args );
	
				unset($ufc_field_group_args['meta_query']);
				$ufc_field_group_all = get_posts( $ufc_field_group_args );
	
				$ufc_field_group_args['post_status'] = array( 'publish' );
				$ufc_field_group_active = get_posts( $ufc_field_group_args );
	
				$ufc_field_group_args['post_status'] = array( 'acf-disabled' );
				$ufc_field_group_disabled = get_posts( $ufc_field_group_args );
	
				$ufc_field_group_args['post_status'] = array( 'trash' );
				$ufc_field_group_trash = get_posts( $ufc_field_group_args );
	
				$response['ufc_field_group_starred_count'] = "(" . count($ufc_field_group_starred) . ")";
				$response['ufc_field_group_all_count'] = "(" . count($ufc_field_group_all) . ")";
				$response['ufc_field_group_active_count'] = "(" . count($ufc_field_group_active) . ")";
				$response['ufc_field_group_disabled_count'] = "(" . count($ufc_field_group_disabled) . ")";
				$response['ufc_field_group_trash_count'] = "(" . count($ufc_field_group_trash) . ")";
			}

			
			
		}
        echo json_encode($response);
        exit;
	}
	
	/**
	 * Duplicate field group
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 */
	public function ufc_duplicate_field_group_callback(){
		$response = array();

		if ( !empty($_POST['nonce']) && wp_verify_nonce( sanitize_text_field($_POST['nonce']), 'ufc_ajax_nonce' ) ) {

			if ( !empty($_POST['ufc_field_group_id']) && $_POST['is_post'] == 0 ) {

				$ufc_field_group_id = isset($_POST['ufc_field_group_id']) ? sanitize_text_field($_POST['ufc_field_group_id']) : '';
				$ufc_field_group_key = isset($_POST['ufc_field_group_key']) ? sanitize_text_field($_POST['ufc_field_group_key']) : '';

				$new_field_group = acf_duplicate_field_group( $ufc_field_group_id );

				if ( !empty($new_field_group) && is_array($new_field_group) && !empty($new_field_group['ID']) ) {
					$response['field_duplicate'] = 1;

					ob_start();
					$field_group_id = $new_field_group['ID'];
					$field_group_key = $new_field_group['key'];
					$field_group_status = get_post_status ( $field_group_id );
					$field_group_title = $new_field_group['title'];

					if( get_post_meta( $ufc_field_group_id, '_collection_starred', true ) == 1 ){
						update_post_meta( $field_group_id, '_collection_starred', 1 );
					}

					$is_starred = get_post_meta( $field_group_id, '_collection_starred', true );

					$locations_arr = array();
					if ( !empty($new_field_group['location']) ) {
						foreach ($new_field_group['location'] as $locations_data) {
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
					<li class="ufc-field-list-item ufc-filter-result-item" data-field_group_id="<?php esc_attr_e($field_group_id); ?>"
						data-field_group_key="<?php esc_attr_e($field_group_key); ?>"
						data-status="<?php echo esc_attr( $field_group_status ); ?>" data-starred="<?php echo esc_attr( $is_starred ); ?>">
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
							</ul>
						</div>
					</li>
					<?php
					$response['duplicated_field_group_html'] = ob_get_contents();
					ob_end_clean();
				}

				$ufc_field_group_args = array(
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
				);
				$ufc_field_group_starred = get_posts( $ufc_field_group_args );
	
				unset($ufc_field_group_args['meta_query']);
				$ufc_field_group_all = get_posts( $ufc_field_group_args );
	
				$ufc_field_group_args['post_status'] = array( 'publish' );
				$ufc_field_group_active = get_posts( $ufc_field_group_args );
	
				$ufc_field_group_args['post_status'] = array( 'acf-disabled' );
				$ufc_field_group_disabled = get_posts( $ufc_field_group_args );
	
				$ufc_field_group_args['post_status'] = array( 'trash' );
				$ufc_field_group_trash = get_posts( $ufc_field_group_args );
	
				$response['ufc_field_group_starred_count'] = "(" . count($ufc_field_group_starred) . ")";
				$response['ufc_field_group_all_count'] = "(" . count($ufc_field_group_all) . ")";
				$response['ufc_field_group_active_count'] = "(" . count($ufc_field_group_active) . ")";
				$response['ufc_field_group_disabled_count'] = "(" . count($ufc_field_group_disabled) . ")";
				$response['ufc_field_group_trash_count'] = "(" . count($ufc_field_group_trash) . ")";

			}
			else if ( !empty($_POST['is_post']) && $_POST['is_post'] == 1 && !empty($_POST['post_id']) && !empty($_POST['ufc_field_group_id']) ) {

				$field_group_id = $_POST['ufc_field_group_id'];
				$field_group_key = $_POST['ufc_field_group_key'];
				$new_post_id = $this->ufc_duplicate_post( $_POST['post_id'] );
				$matched_post = get_post( $new_post_id );
				if ( !empty($matched_post) ) {
					$response['field_duplicate'] = 1;

					ob_start();
					$field_post_id = $matched_post->ID;
					$field_post_status = $matched_post->post_status;
					$field_post_title = $matched_post->post_title;
					$field_post_type = $matched_post->post_type;
					$is_starred = get_post_meta( $field_post_id, '_collection_starred', true );
					if ( empty($all_matched_posts_ids) || ( !empty($all_matched_posts_ids) && !in_array($field_post_id, $all_matched_posts_ids) ) ) {
						$all_matched_posts_ids[] = $field_post_id;
						?>
						<li class="ufc-field-post-list-item ufc-filter-result-item" 
							data-field_group_id="<?php esc_attr_e( $field_group_id ); ?>"
							data-field_group_key="<?php esc_attr_e( $field_group_key ); ?>"
							data-status="<?php echo esc_attr( $field_post_status ); ?>"
							data-starred="<?php echo esc_attr( $is_starred ); ?>"
							data-field_post_id="<?php esc_attr_e( $field_post_id ); ?>">

							<span class="ufc-field-list-item-trigger-starred">
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
					$response['duplicated_field_group_html'] = ob_get_contents();
					ob_end_clean();
				}

				$star_query = json_decode(stripslashes($_POST['star_query']), true);
				$starred_posts = get_posts( $star_query );

				unset($star_query['meta_query']);
				$star_query['post_status'] = array( 'any', 'trash' );
				$ufc_field_group_all = get_posts( $star_query );

				$star_query['post_status'] = array( 'publish' );
				$ufc_field_group_publish = get_posts( $star_query );

				$star_query['post_status'] = array( 'private' );
				$ufc_field_group_private = get_posts( $star_query );

				$star_query['post_status'] = array( 'draft' );
				$ufc_field_group_draft = get_posts( $star_query );

				$star_query['post_status'] = array( 'trash' );
				$ufc_field_group_trash = get_posts( $star_query );

				$response['ufc_field_group_starred_count'] = "(" . count($starred_posts) . ")";
				$response['ufc_field_group_all_count'] = "(" . count($ufc_field_group_all) . ")";
				$response['ufc_field_group_active_count'] = "(" . count($ufc_field_group_publish) . ")";
				$response['ufc_field_group_private_count'] = "(" . count($ufc_field_group_private) . ")";
				$response['ufc_field_group_draft_count'] = "(" . count($ufc_field_group_draft) . ")";
				$response['ufc_field_group_trash_count'] = "(" . count($ufc_field_group_trash) . ")";

			}
			
		}
        echo json_encode($response);
        exit;
	}


	/*
	* Function for post duplication.
	*/
	function ufc_duplicate_post( $post_id ){
	
		global $wpdb;
	
		/*
		* and all the original post data from post id
		*/
		$post = get_post( $post_id );
	
		/*
		* if post data exists, create the post duplicate
		*/
		if (isset( $post ) && $post != null) {
	
		/*
		* new post data array
		*/
		$args = array(
			'comment_status' => $post->comment_status,
			'ping_status'    => $post->ping_status,
			'post_author'    => $post->post_author,
			'post_content'   => $post->post_content,
			'post_excerpt'   => $post->post_excerpt,
			'post_name'      => $post->post_name,
			'post_parent'    => $post->post_parent,
			'post_password'  => $post->post_password,
			'post_status'    => $post->post_status,
			'post_title'     => $post->post_title.' (copy)',
			'post_type'      => $post->post_type,
			'to_ping'        => $post->to_ping,
			'menu_order'     => $post->menu_order
		);
	
		/*
		* insert the post by wp_insert_post() function
		*/
		$new_post_id = wp_insert_post( $args );
	
		/*
		* get all current post terms ad set them to the new post draft
		*/
		$taxonomies = get_object_taxonomies($post->post_type);
		foreach ($taxonomies as $taxonomy) {
			$post_terms = wp_get_object_terms($post_id, $taxonomy, array('fields' => 'slugs'));
			wp_set_object_terms($new_post_id, $post_terms, $taxonomy, false);
		}
	
		/*
		* duplicate all post meta just in two SQL queries
		*/
		$post_meta_infos = $wpdb->get_results("SELECT meta_key, meta_value FROM $wpdb->postmeta WHERE post_id=$post_id");
		if (count($post_meta_infos)!=0) {
			$sql_query = "INSERT INTO $wpdb->postmeta (post_id, meta_key, meta_value) ";
			foreach ($post_meta_infos as $meta_info) {
			$meta_key = $meta_info->meta_key;
			if( $meta_key == '_wp_old_slug' ) continue;
			$meta_value = addslashes($meta_info->meta_value);
			$sql_query_sel[]= "SELECT $new_post_id, '$meta_key', '$meta_value'";
			}
			$sql_query.= implode(" UNION ALL ", $sql_query_sel);
			$wpdb->query($sql_query);
		}
	
	
		return $new_post_id;
		} else {
			return false;
		}
	}

	
	/**
	 * Swich Field Data Tab and get Mached Posts Lists
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 */
	public function ufc_select_group_field_data_callback(){
		$response = array();

		if ( !empty($_POST['nonce']) && wp_verify_nonce( sanitize_text_field($_POST['nonce']), 'ufc_ajax_nonce' ) ) {

			ob_start();
			if ( !empty($_POST['ufc_field_group_id']) ) {

				$ufc_field_group_id = isset($_POST['ufc_field_group_id']) ? sanitize_text_field($_POST['ufc_field_group_id']) : '';
				$ufc_field_group_key = isset($_POST['ufc_field_group_key']) ? sanitize_text_field($_POST['ufc_field_group_key']) : '';

				$all_field_groups = acf_get_field_groups();

				if ( !empty($all_field_groups) ) {
					foreach ($all_field_groups as $field_group_key => $field_group_data) {
						if ( !empty($field_group_data['ID']) && ($ufc_field_group_id==$field_group_data['ID']) ) {
							
							$field_group_id = $field_group_data['ID'];
							include( UFC_TEMPLATES_DIR.'/ufc-field-data-tab-content.php' );
						}
					}
				}
			}
			$response['field_group_html'] = ob_get_contents();
			ob_end_clean();
		}

        echo json_encode($response);
        exit;
	}
	
	/**
	 * Select Post Item and get the HTML of All Custom Field for specific post
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 */
	public function ufc_select_field_group_post_item_callback(){
		$response = array();

		if ( !empty($_POST['nonce']) && wp_verify_nonce( sanitize_text_field($_POST['nonce']), 'ufc_ajax_nonce' ) ) {

			if ( !empty($_POST['ufc_field_post_id']) && !empty($_POST['ufc_field_group_id']) ) {

				$ufc_field_group_id = isset($_POST['ufc_field_group_id']) ? sanitize_text_field($_POST['ufc_field_group_id']) : '';
				$ufc_field_group_key = isset($_POST['ufc_field_group_key']) ? sanitize_text_field($_POST['ufc_field_group_key']) : '';
				$ufc_field_post_id = isset($_POST['ufc_field_post_id']) ? sanitize_text_field($_POST['ufc_field_post_id']) : '';

				$all_field_groups = acf_get_field_groups();

				ob_start();
				if ( !empty($ufc_field_group_id) && !empty($ufc_field_post_id) ) {
					include( UFC_TEMPLATES_DIR.'/ufc-post-fields-content.php' );
				}
				$response['post_field_html'] = ob_get_contents();
				ob_end_clean();
			}
		}
        echo json_encode($response);
        exit;
	}
	
	/**
	 * Save Field Group: Settings Tab Form
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 */
	public function ufc_save_field_group_settings_tab_callback(){
		if ( !empty($_POST['nonce']) && wp_verify_nonce( sanitize_text_field($_POST['nonce']), 'ufc_ajax_nonce' ) ) {
			include( UFC_TEMPLATES_DIR.'/ufc-save-field-group-settings-tab.php' );
		}
	}
	
	/**
	 * Save Field Group: Post Meta Tab Form
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 */
	public function ufc_save_field_group_post_meta_tab_callback(){
		include( UFC_TEMPLATES_DIR.'/ufc-save-field-group-post-meta-tab.php' );
	}
	
	/**
	 * Edited Field Collection : Duplicate Field
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 */
	public function ufc_duplicate_field_item_callback(){
		// ini_set('max_execution_time', '0'); // for infinite time of execution , Setting an unlimited maximum executing period

		global $wpdb;
		$post_table = $wpdb->prefix .'posts';
		$response = array();

		if ( !empty($_POST['nonce']) && wp_verify_nonce( sanitize_text_field($_POST['nonce']), 'ufc_ajax_nonce' ) ) {

			if ( !empty($_POST['ufc_field_id']) && !empty($_POST['ufc_field_group_id']) ) {

				// Get data
				$ufc_field_group_id = isset($_POST['ufc_field_group_id']) ? sanitize_text_field($_POST['ufc_field_group_id']) : '';
				$ufc_field_id = isset($_POST['ufc_field_id']) ? sanitize_text_field($_POST['ufc_field_id']) : '';
				$ufc_field_type = isset($_POST['ufc_field_type']) ? sanitize_text_field($_POST['ufc_field_type']) : '';
				$ufc_field_key = isset($_POST['ufc_field_key']) ? sanitize_text_field($_POST['ufc_field_key']) : '';
				$ufc_field_parent = isset($_POST['ufc_field_parent']) ? sanitize_text_field($_POST['ufc_field_parent']) : 0;


				// Duplicate field
				$keys = array( $ufc_field_key => uniqid( 'field_' ) );
				acf_append_data( 'generated_keys', $keys );
				$duplicated_field = acf_duplicate_field( $ufc_field_id, $ufc_field_parent );
				// Change field label and name
				$duplicated_field['label'] .= ' (Copy)';
				$duplicated_field['name'] .= '_copy';
				$duplicated_field['_name'] .= '_copy';

				// save field
				$updated_field = acf_update_field( $duplicated_field );

				// Wait for Duplicate group, repeater sub_fields 
				if ( in_array( $ufc_field_type, array( 'group', 'repeater' ) ) ) {

					$new_field_id = $updated_field['ID'];

					$old_rows_count = $wpdb->query( $wpdb->prepare( "SELECT count(ID) as rows_count FROM {$post_table} WHERE `post_type` = 'acf-field' AND ( `post_parent` IN ( SELECT ID FROM {$post_table} WHERE `post_type` = 'acf-field' AND ( `post_parent` = %d OR `post_parent` IN ( SELECT ID FROM {$post_table} WHERE `post_parent` = %d AND `post_type` = 'acf-field' ) ) ) OR `ID` IN ( SELECT ID FROM {$post_table} WHERE `post_type` = 'acf-field' AND ( `post_parent` = %d OR `post_parent` IN ( SELECT ID FROM {$post_table} WHERE `post_parent` = %d AND `post_type` = 'acf-field' ) ) ) )", array( $ufc_field_id, $ufc_field_id, $ufc_field_id, $ufc_field_id ) ) );

					if ( !empty($wpdb->last_result[0]) ) {
						$old_rows_count = $wpdb->last_result[0]->rows_count;
					}

					if ( $old_rows_count > 0 ) {

						// wait for 2 seconds for untill Duplicate sub-fields
						wait_duplicate_sub_fields:

						$new_rows_count = $wpdb->query( $wpdb->prepare( "SELECT count(ID) as rows_count FROM {$post_table} WHERE `post_type` = 'acf-field' AND ( `post_parent` IN ( SELECT ID FROM {$post_table} WHERE `post_type` = 'acf-field' AND ( `post_parent` = %d OR `post_parent` IN ( SELECT ID FROM {$post_table} WHERE `post_parent` = %d AND `post_type` = 'acf-field' ) ) ) OR `ID` IN ( SELECT ID FROM {$post_table} WHERE `post_type` = 'acf-field' AND ( `post_parent` = %d OR `post_parent` IN ( SELECT ID FROM {$post_table} WHERE `post_parent` = %d AND `post_type` = 'acf-field' ) ) ) )", array( $post_table, $post_table, $new_field_id, $new_field_id, $new_field_id, $new_field_id ) ) );

						if ( !empty($wpdb->last_result[0]) ) {
							$new_rows_count = $wpdb->last_result[0]->rows_count;
						}

						if ( $old_rows_count != $new_rows_count ) {
							sleep(2);
							goto wait_duplicate_sub_fields;
						}
						// wait for 30 seconds for untill Duplicate sub-fields
						sleep(1);
					}
				}

				ob_start();
				if ( !empty($updated_field['ID']) ) {
					$all_field_groups = acf_get_field_groups();
					if ( !empty($all_field_groups) ) {
						foreach ($all_field_groups as $field_group_key => $field_group_data) {
							if ( !empty($field_group_data['ID']) && ($ufc_field_group_id==$field_group_data['ID']) ) {

								$group_fields_data = (!empty($field_group_data)) ? acf_get_fields( $field_group_data ) : array();
								if ( !empty($group_fields_data) ) {
									foreach ($group_fields_data as $field_data) {

										if ( !empty($field_data['ID']) && ($field_data['ID'] == $updated_field['ID']) ) {
											$duplicated_field = $field_data;
										}
									}
								}
							}
						}
					}
					if ( !empty($duplicated_field) ) {
						$this->ufc_get_edit_field_view( $duplicated_field );
					}
					// wp_update_post( array( 'ID' => $updated_field['ID'], 'post_status' => 'pending' ) );
					wp_update_post( array( 'ID' => $updated_field['ID'], 'post_status' => 'draft' ) );

				} else if ( !empty($duplicated_field) ) {
					$this->ufc_get_edit_field_view( $duplicated_field );
				}
				$response['duplicated_field_html'] = ob_get_contents();
				ob_end_clean();
			}

		}
        echo json_encode($response);
        exit;
	}

	/**
	 * Edited Field Collection : Create New Field
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 */
	public function ufc_create_field_item_callback(){

		$response = array();

		if ( !empty($_POST['nonce']) && wp_verify_nonce( sanitize_text_field($_POST['nonce']), 'ufc_ajax_nonce' ) ) {

			if ( !empty($_POST['ufc_field_type']) && !empty($_POST['ufc_field_group_id']) ) {

				// Get data
				$ufc_field_group_id = isset($_POST['ufc_field_group_id']) ? sanitize_text_field($_POST['ufc_field_group_id']) : '';
				$ufc_field_type = isset($_POST['ufc_field_type']) ? sanitize_text_field($_POST['ufc_field_type']) : '';

				ob_start();

				// Create New field
				$new_field = array( 'parent' => $ufc_field_group_id, 'type' => $ufc_field_type, 'key' => uniqid( 'field_' ) );

				if ( !empty($new_field['type']) && ( $new_field['type'] == 'taxonomy' ) ) {
					$new_field['allow_null'] = 1;
					$new_field['field_type'] = "multi_select";
				}
				if ( !empty($new_field['type']) && ( $new_field['type'] == 'post_object' ) ) {
					$new_field['allow_null'] = 1;
					$new_field['multiple'] = 1;
				}
				if ( !empty($new_field['type']) && ( $new_field['type'] == 'date_picker' ) ) {
					$new_field['display_format'] = 'd/m/Y g:i a';
					$new_field['return_format'] = 'd/m/Y g:i a';
					$new_field['type'] = 'date_time_picker';
				}
				// Validate field.
				$created_field = acf_validate_field( $new_field );

				if ( !empty($created_field) ) {
					$this->ufc_get_edit_field_view( $created_field );
				}
				$response['created_field_html'] = ob_get_contents();
				ob_end_clean();
			}
		}
        echo json_encode($response);
        exit;
	}
	
	/**
	 * Select field group and get the HTML of Setting Tab
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 */
	public function ufc_create_field_group_submit_callback(){
		$response = array();

		if ( !empty($_POST['nonce']) && wp_verify_nonce( sanitize_text_field($_POST['nonce']), 'ufc_ajax_nonce' ) ) {

			if ( !empty($_POST['field_collection_name']) ) {

				$save_field_group_title = isset($_POST['field_collection_name']) ? sanitize_text_field($_POST['field_collection_name']) : '';

				$save_new_locations = array( 'location' => array( 
					array( array(
						'param' => 'post_type',
						'operator' => '==',
						'value' => 'post',
					) )
				) );

				// Create array of data to save.
				$save = array(
					'post_type'      => 'acf-field-group',
					'post_status'    => 'publish',
					'post_title'     => $save_field_group_title,
					// 'post_name'      => $save_field_group_key,
					'post_excerpt'   => sanitize_title( $save_field_group_title ),
					'post_content'   => maybe_serialize( $save_new_locations ),
				);

				// Slash data.
				$save = wp_slash( $save );

				// Insert.
				$save_field_group_id = wp_insert_post( $save );
				$response['save_field_group_id'] = $save_field_group_id;

				if ( $save_field_group_id ) {

					$field_group['ID'] = $save_field_group_id;
					$field_group['title'] = $save_field_group_title;
					$field_group['key'] = sanitize_title( $save_field_group_title );

					// Flush field group cache.
					acf_flush_field_group_cache( $field_group );

					/**
					 * Fires immediately after a field group has been updated.
					 *
					 * @date    12/02/2014
					 * @since   5.0.0
					 *
					 * @param   array $field_group The field group array.
					 */
					do_action( 'acf/update_field_group', $field_group );

					$save_field_group = get_post( $save_field_group_id );

					ob_start();
					?>
					<li class="ufc-field-list-item ufc-filter-result-item" data-field_group_id="<?php esc_attr_e($save_field_group->ID); ?>"
						data-field_group_key="<?php esc_attr_e($save_field_group->post_name); ?>">
						<span class="ufc-field-list-item-name"><?php esc_html_e($save_field_group->post_title); ?></span>
						<span class="ufc-field-list-item-location"></span>
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
							</ul>
						</div>
					</li>
					<?php
					$response['field_group_list_item_html'] = ob_get_contents();
					ob_end_clean();
				}
			}
		}
        echo json_encode($response);
        exit;
	}
	
	/**
	 * Get Terms Options by Taxonomy slug 
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 */
	public function ufc_field_get_add_taxonomy_options_callback(){
		$response = array();
		if ( !empty($_POST['nonce']) && wp_verify_nonce( sanitize_text_field($_POST['nonce']), 'ufc_ajax_nonce' ) ) {
			if ( !empty($_POST['taxonomy_slug']) ) {

				$taxonomy_slug = sanitize_text_field($_POST['taxonomy_slug']);

				// args
				$args = array(
					'taxonomy'   => $taxonomy_slug,
					'hide_empty' => false,
				);
				// get terms
				$terms = acf_get_terms( $args );

				// append to r
				foreach ( $terms as $term ) {

					// add to json
					$title = acf_get_term_title( $term );
					$response['results'][$term->term_id] = $title;
				}
			}
		}
        echo json_encode($response);
        exit;
	}
	
	/**
	 * Save the popup and create the Taxonomy term
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 */
	public function ufc_field_add_new_taxonomy_term_callback(){
		$response = array();
		if ( !empty($_POST['nonce']) && wp_verify_nonce( sanitize_text_field($_POST['nonce']), 'ufc_ajax_nonce' ) ) {

			$term_post_id = (!empty($_POST['term_post_id'])) ? sanitize_text_field($_POST['term_post_id']) : '';
			$ufc_field_key = (!empty($_POST['ufc_field_key'])) ? sanitize_text_field($_POST['ufc_field_key']) : '';
			$taxonomy_slug = (!empty($_POST['taxonomy_slug'])) ? sanitize_text_field($_POST['taxonomy_slug']) : '';
			$term_name = (!empty($_POST['term_name'])) ? sanitize_text_field($_POST['term_name']) : '';
			$term_parent = (!empty($_POST['term_parent'])) ? sanitize_text_field($_POST['term_parent']) : '';

			if ( !empty($term_name) && !empty($taxonomy_slug) ) {

				// vars
				$taxonomy_obj   = get_taxonomy( $taxonomy_slug );
				$taxonomy_label = $taxonomy_obj->labels->singular_name;
				// validate cap
				// note: this situation should never occur due to condition of the add new button
				if ( ! current_user_can( $taxonomy_obj->cap->manage_terms ) ) {
					$response['error'] = sprintf( esc_html__( 'User unable to add new %s', 'ufcsupport' ), $taxonomy_label );
					echo json_encode($response); exit;
				}

				// exists
				if ( term_exists( $term_name, $taxonomy_slug, $term_parent ) ) {
					$response['error'] = sprintf( esc_html__( '%s already exists', 'ufcsupport' ), $taxonomy_label );
					echo json_encode($response); exit;
				}

				// vars
				$extra = array();
				if ( $term_parent ) {
					$extra['parent'] = (int) $term_parent;
				}

				// insert
				$data = wp_insert_term( $term_name, $taxonomy_slug, $extra );

				// error
				if ( is_wp_error( $data ) ) {
					$response['error'] = $data->get_error_message();
					echo json_encode($response); exit;
				}

				// load term
				$term = get_term( $data['term_id'] );

				// prepend ancenstors count to term name
				$prefix    = '';
				$ancestors = get_ancestors( $term->term_id, $term->taxonomy );
				if ( ! empty( $ancestors ) ) {
					$prefix = str_repeat( '- ', count( $ancestors ) );
				}

				// success
				$response['success'] = true;
				$response['message'] = sprintf( esc_html__( '%s added', 'ufcsupport' ), $taxonomy_label );
				$response['term_id'] = $term->term_id;
				$response['term_name'] = $term->name;
				$response['term_label'] = $prefix . $term->name;
				$response['term_parent'] = $term->parent;
				echo json_encode($response); exit;

			} else if ( empty($term_name) ) {
				$response['error'] = esc_html__( 'Please enter term name.', 'ufcsupport' );
			} else if ( empty($taxonomy_slug) ) {
				$response['error'] = esc_html__( 'Invalid taxonomy', 'ufcsupport' );
			}
	        echo json_encode($response);
	    }
        exit;
	}

	/**
	 * Field Locations : Get location rule value options on rule change
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 */
	public function ufc_field_get_location_rule_value_options_callback(){

		if ( !empty($_POST['nonce']) && wp_verify_nonce( sanitize_text_field($_POST['nonce']), 'ufc_ajax_nonce' ) ) {

			$response = array( 'location_rule_value_options'=>'' );
			$loc_post_data = $this->ufc_field_post_data_sanitize_array($_POST);
			$loc_rule_param = (!empty($loc_post_data['loc_rule_param'])) ? $loc_post_data['loc_rule_param'] : '';
			$loc_rule_operator = (!empty($loc_post_data['loc_rule_operator'])) ? $loc_post_data['loc_rule_operator'] : '==';

			if ( !empty( $loc_rule_param ) ) {

				// success
				$response['success'] = true;

				$rule_value = array(
					'param' => $loc_rule_param,
					'operator' => $loc_rule_operator,
					'value' => '',
				);
				$location_rule_values = acf_get_location_rule_values( $rule_value );
				// array
				if ( is_array( $location_rule_values ) ) {
					foreach ($location_rule_values as $key => $value) {

						if ( is_array($value) ) {

							$response['location_rule_value_options'] .= '<optgroup label="'.$key.'">';
							foreach ($value as $sub_key => $sub_value) {
								$response['location_rule_value_options'] .= '<option value="'.$sub_key.'">'.$sub_value.'</option>';
							}
							$response['location_rule_value_options'] .= '</optgroup>';

						} else {

							$response['location_rule_value_options'] .= '<option value="'.$key.'">'.$value.'</option>';
						}
						
					}
				}

			} else if ( empty($loc_rule_param) ) {
				$response['error'] = esc_html__( 'Invalid argument', 'ufcsupport' );
			}

			echo json_encode($response);
		}
        exit;
	}

	/**
	 * Bidirectional Relationships
	 * Reference Document: https://www.advancedcustomfields.com/resources/bidirectional-relationships/
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 */
	public function ufc_bidirectional_acf_update_callback( $value, $post_id, $field  ) {
		
		// vars
		$field_name = $field['name'];
		$field_key = $field['key'];
		$global_name = 'is_updating_' . $field_name;

		// bail early if this filter was triggered from the update_field() function called within the loop below
		// - this prevents an inifinte loop
		if( !empty($GLOBALS[ $global_name ]) ) return $value;

		// set global variable to avoid inifite loop
		// - could also remove_filter() then add_filter() again, but this is simpler
		$GLOBALS[ $global_name ] = 1;

		// loop over selected posts and add this $post_id
		if( is_array($value) ) {

			foreach( $value as $post_id2 ) {

				// load existing related posts
				$value2 = get_field($field_name, $post_id2, false);

				// allow for selected posts to not contain a value
				if( empty($value2) ) {
					$value2 = array();
				}

				// bail early if the current $post_id is already found in selected post's $value2
				if( in_array($post_id, $value2) ) continue;

				// append the current $post_id to the selected post's 'field_name' value
				$value2[] = $post_id;

				// update the selected post's value (use field's key for performance)
				update_field($field_key, $value2, $post_id2);
			}
		}

		// find posts which have been removed
		$old_value = get_field($field_name, $post_id, false);

		if( is_array($old_value) ) {

			foreach( $old_value as $post_id2 ) {

				// bail early if this value has not been removed
				if( is_array($value) && in_array($post_id2, $value) ) continue;

				// load existing related posts
				$value2 = get_field($field_name, $post_id2, false);

				// bail early if no value
				if( empty($value2) ) continue;

				// find the position of $post_id within $value2 so we can remove it
				$pos = array_search($post_id, $value2);

				// remove
				unset( $value2[ $pos] );

				// update the un-selected post's value (use field's key for performance)
				update_field($field_key, $value2, $post_id2);
			}
		}

		// reset global varibale to allow this filter to function as per normal
		$GLOBALS[ $global_name ] = 0;

		// return
	    return $value;
	}

	/**
	 * Show the pro field types placeholder button
	 **/
	public function ufc_show_pro_field_types_placeholder_button($all_field_types){

		if ( !class_exists('UFC_Pro_Admin') ) {
			$pro_field_types = array(
				array(
					'field_label' => esc_html__('Repeater', "ufcsupport" ),
					'field_icon' => '<i class="fas fa-layer-group"></i>',
				),
				array(
		            'field_label' => esc_html__('Flexible Content', "ufcsupport" ),
		            'field_icon' => '<i class="fas fa-list"></i>',
				),
			);
			foreach ($pro_field_types as $field_type_value) {
				?>
<div class="ufc-group-pro-field-row">
    <span class="ufc-pro-field-tag"><?php esc_html_e('PRO', "ufcsupport" ); ?></span>
    <span
        class="ufc-group-custom-field-icon"><?php echo wp_kses( $field_type_value['field_icon'], array( 'i'=>array('class' => array()) ) ); ?></span>
    <span class="ufc-group-custom-field-label"><?php esc_html_e( $field_type_value['field_label'] ); ?></span>
</div>
<?php
			}
		}
	}

	/**
	 * Sanitize Multidimensional Array
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 */
	public function ufc_field_post_data_sanitize_array( &$array ) {

		if( !is_array($array) )	{

				foreach ($array as &$value) {	

				if( !is_array($value) )	{

					// sanitize if value is not an array
					// $value = sanitize_text_field( $value );
					$value = sanitize_textarea_field( $value );

				}  else {

					// go inside this function again
					$this->ufc_field_post_data_sanitize_array($value);
				}
			}
		}

		return $array;
    }

	/**
	 * Make Starred Field Collection Item
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	*/
	public function ufc_check_available_post_permalink_callback(){
		$response = array();
		if ( !empty($_POST['nonce']) && wp_verify_nonce( sanitize_text_field($_POST['nonce']), 'ufc_ajax_nonce' ) ) {
			if ( !empty($_POST['ufc_post_id']) ) {

				$response['success'] = 1;

				$ufc_post_id = isset( $_POST['ufc_post_id'] ) ? (int) sanitize_text_field($_POST['ufc_post_id']) : 0;
				$title   = isset( $_POST['new_title'] ) ? sanitize_text_field($_POST['new_title']) : '';
				$slug    = isset( $_POST['new_slug'] ) ? sanitize_text_field($_POST['new_slug']) : null;

				$response['sample_permalink_html'] = get_sample_permalink_html( $ufc_post_id, $title, $slug ) ;
			}
		}
		echo json_encode($response);
		die();
	}


	/* Field Collection Make Starred  Added By DM*/

	/**
	 * Make Starred Field Collection Item
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	*/
	public function ufc_make_starred_callback(){
		$response = array();
		if ( !empty($_POST['nonce']) && wp_verify_nonce( sanitize_text_field($_POST['nonce']), 'ufc_ajax_nonce' ) ) {

			if ( !empty($_POST['ufc_field_group_id']) ) {
				$post_id = isset($_POST['ufc_field_group_id']) ? sanitize_text_field($_POST['ufc_field_group_id']) : '';
				$is_starred = get_post_meta( $post_id, '_collection_starred', true );
				$response['type'] = "success";

				if( $is_starred ){
					update_post_meta( $post_id, '_collection_starred', 0 );
					$response['is_starred'] = false;
				}else{
					update_post_meta( $post_id, '_collection_starred', 1 );
					$response['is_starred'] = true;
				}
			}

			if ( !empty($_POST['is_post']) && $_POST['is_post'] == true) {
				$star_query = json_decode(stripslashes($_POST['star_query']), true);
				$starred_posts = get_posts( $star_query );
				$starred_count = count($starred_posts);

			}else{
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
		
				$starred_count = count($starred);
			}

			$response['starred_count'] = $starred_count;
			echo json_encode($response);
		}
		
        die();

	}


	public function ufc_get_embedded_callback(){

		$response = array();
		if ( !empty($_POST['nonce']) && wp_verify_nonce( sanitize_text_field($_POST['nonce']), 'ufc_ajax_nonce' ) ) {

			$ufc_field_group_id = (!empty($_POST['ufc_field_group_id'])) ? sanitize_text_field($_POST['ufc_field_group_id']) : false;
			$url = (!empty($_POST['value'])) ? esc_url($_POST['value']) : false;
			$key = (!empty($_POST['key'])) ? sanitize_text_field($_POST['key']) : false;

			$field = acf_get_field( $key );

			$args = array( 'width' => $field['width'], 'height'=> $field['height'] );

			$embed = wp_oembed_get( $url, $args);

			// try shortcode
			if ( ! $embed ) {
				global $wp_embed;
				$embed = $wp_embed->shortcode( $args, $url );
			}

			$response['url'] = $url;
			$response['html'] = $embed;
		}

		echo json_encode($response);
        die();

	}


	public function ufc_filtering_list_callback(){
		
		if ( !empty($_POST['nonce']) && wp_verify_nonce( sanitize_text_field($_POST['nonce']), 'ufc_ajax_nonce' ) ) {
			$response = array();

			ob_start();
			include( UFC_TEMPLATES_DIR.'/ufc-field-data-tab-content.php' );
			$html = ob_get_clean();
			$response['html'] = $html;

			echo json_encode($response);

		}

		die();

	}


	public function ufc_add_new_item_callback(){

		if ( !empty($_POST['nonce']) && wp_verify_nonce( sanitize_text_field($_POST['nonce']), 'ufc_ajax_nonce' ) ) {
			$response = array();

			if( !empty($_POST['selected_post_type']) && !empty($_POST['post_title']) ){

				$args = array(
					'post_title' 	=> $_POST['post_title'],
					'post_type' 	=> $_POST['selected_post_type'],
					'post_status'   => 'publish',
				);
			  	$post_id = wp_insert_post($args);
				$response['new_post'] = $post_id;
			}

			ob_start();
			include( UFC_TEMPLATES_DIR.'/ufc-field-data-tab-content.php' );
			$html = ob_get_clean();
			$response['html'] = $html;

			echo json_encode($response);

		}

		die();
		
	}

	/* End Field Collection Make Starred  Added By DM*/


	/**
	 * Adding Hooks
	 *
	 * Adding hooks for the admin pages
	 *
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 */
	function add_hooks(){
		add_action( 'admin_menu', array( $this, 'ufc_admin_menus' ) ); // admin menus
		add_action( 'admin_init', array( $this, 'ufc_admin_settings_init' ) ); // admin settings init
		add_action( 'acf/init', array( $this, 'ufc_admin_update_acf_init' ) ); // admin menus

        /* Select field group and get the HTML of Setting Tab */
        add_action('wp_ajax_ufc_select_field_group', array($this, 'ufc_select_field_group_callback') );
        add_action('wp_ajax_nopriv_ufc_select_field_group', array($this, 'ufc_select_field_group_callback') );

        /* Delete field group */
        add_action('wp_ajax_ufc_delete_field_group', array($this, 'ufc_delete_field_group_callback') );
        add_action('wp_ajax_nopriv_ufc_delete_field_group', array($this, 'ufc_delete_field_group_callback') );

        /* Restore Field Collection from Trash */
        add_action('wp_ajax_ufc_trash_restore_field_group', array($this, 'ufc_trash_restore_field_group_callback') );
        add_action('wp_ajax_nopriv_ufc_trash_restore_field_group', array($this, 'ufc_trash_restore_field_group_callback') );

        /* Duplicate field group */
        add_action('wp_ajax_ufc_duplicate_field_group', array($this, 'ufc_duplicate_field_group_callback') );
        add_action('wp_ajax_nopriv_ufc_duplicate_field_group', array($this, 'ufc_duplicate_field_group_callback') );

        /* Switch Field Data Tab and get Mached Posts Lists */
        add_action('wp_ajax_ufc_select_group_field_data', array($this, 'ufc_select_group_field_data_callback') );
        add_action('wp_ajax_nopriv_ufc_select_group_field_data', array($this, 'ufc_select_group_field_data_callback') );

        /* Select Post Item and get the HTML of All Custom Field for specific post */
        add_action('wp_ajax_ufc_select_field_group_post_item', array($this, 'ufc_select_field_group_post_item_callback') );
        add_action('wp_ajax_nopriv_ufc_select_field_group_post_item', array($this, 'ufc_select_field_group_post_item_callback') );

        /* Save Field Group: Settings Tab Form */
        add_action('wp_ajax_ufc_save_field_group_settings_tab', array($this, 'ufc_save_field_group_settings_tab_callback') );
        add_action('wp_ajax_nopriv_ufc_save_field_group_settings_tab', array($this, 'ufc_save_field_group_settings_tab_callback') );

        /* Save Field Group: Post Meta Tab Form */
        add_action('wp_ajax_ufc_save_field_group_post_meta_tab', array($this, 'ufc_save_field_group_post_meta_tab_callback') );
        add_action('wp_ajax_nopriv_ufc_save_field_group_post_meta_tab', array($this, 'ufc_save_field_group_post_meta_tab_callback') );

		/* Edited Field Collection : Duplicate Field */
        add_action('wp_ajax_ufc_duplicate_field_item', array($this, 'ufc_duplicate_field_item_callback') );
        add_action('wp_ajax_nopriv_ufc_duplicate_field_item', array($this, 'ufc_duplicate_field_item_callback') );

		/* Edited Field Collection : Create New Field */
        add_action('wp_ajax_ufc_create_field_item', array($this, 'ufc_create_field_item_callback') );
        add_action('wp_ajax_nopriv_ufc_create_field_item', array($this, 'ufc_create_field_item_callback') );

        /* Select field group and get the HTML of Setting Tab */
        add_action('wp_ajax_ufc_create_field_group_submit', array($this, 'ufc_create_field_group_submit_callback') );
        add_action('wp_ajax_nopriv_ufc_create_field_group_submit', array($this, 'ufc_create_field_group_submit_callback') );

        /* Get Terms Options by Taxonomy slug */
        add_action('wp_ajax_ufc_field_get_add_taxonomy_options', array($this, 'ufc_field_get_add_taxonomy_options_callback') );
        add_action('wp_ajax_nopriv_ufc_field_get_add_taxonomy_options', array($this, 'ufc_field_get_add_taxonomy_options_callback') );

        /* Save the popup and create the Taxonomy term */
        add_action('wp_ajax_ufc_field_add_new_taxonomy_term', array($this, 'ufc_field_add_new_taxonomy_term_callback') );
        add_action('wp_ajax_nopriv_ufc_field_add_new_taxonomy_term', array($this, 'ufc_field_add_new_taxonomy_term_callback') );

        /* Field Locations : Get location rule value options on rule change  */
        add_action('wp_ajax_ufc_field_get_location_rule_value_options', array($this, 'ufc_field_get_location_rule_value_options_callback') );
        add_action('wp_ajax_nopriv_ufc_field_get_location_rule_value_options', array($this, 'ufc_field_get_location_rule_value_options_callback') );

		/* Bidirectional Relationships */
		/*
		if ( function_exists('acf_get_field_groups') && function_exists('acf_get_fields') ) {

			$ufc_field_groups = acf_get_field_groups();

			if ( !empty($ufc_field_groups) ) {
				foreach ($ufc_field_groups as $ufc_field_group_data) {

					$ufc_field_group_id = $ufc_field_group_data['ID'];
					$ufc_field_group_fields = acf_get_fields( array(
						'ID'  => $ufc_field_group_id,
						'key' => "group_$ufc_field_group_id",
					) );

				    if ( !empty($ufc_field_group_fields) ) {
				    	foreach ($ufc_field_group_fields as $key => $field_data) {

					        if ( !empty($field_data['type']) && !empty($field_data['name']) && ($field_data['type'] == 'relationship') ) {

					        	add_filter('acf/update_value/name='.$field_data['name'], array($this, 'ufc_bidirectional_acf_update_callback'), 10, 3);
					        }
					    }
					}
				}
			}
		}
		*/

		add_action( 'ufc_after_show_all_field_types_add_button', array($this, 'ufc_show_pro_field_types_placeholder_button'), 10, 1 );
		add_action( 'ufc_group_after_show_all_field_types_add_button', array($this, 'ufc_show_pro_field_types_placeholder_button'), 10, 1 );

		/* Field Collection Make Starred  Added By DM*/
		add_action('wp_ajax_ufc_make_starred', array($this, 'ufc_make_starred_callback') );
		add_action('wp_ajax_nopriv_uufc_make_starred', array($this, 'ufc_make_starred_callback') );

		add_action('wp_ajax_ufc_get_embedded', array($this, 'ufc_get_embedded_callback') );
		add_action('wp_ajax_nopriv_uufc_get_embedded', array($this, 'ufc_get_embedded_callback') );

		add_action('wp_ajax_ufc_filtering_list', array($this, 'ufc_filtering_list_callback') );
		add_action('wp_ajax_nopriv_uufc_filtering_list', array($this, 'ufc_filtering_list_callback') );

		add_action('wp_ajax_ufc_add_new_item', array($this, 'ufc_add_new_item_callback') );
		add_action('wp_ajax_nopriv_uufc_add_new_item', array($this, 'ufc_add_new_item_callback') );

		/* End Field Collection Make Starred  Added By DM*/

		
		add_action('wp_ajax_ufc_check_available_post_permalink', array($this, 'ufc_check_available_post_permalink_callback') );
		add_action('wp_ajax_nopriv_ufc_check_available_post_permalink', array($this, 'ufc_check_available_post_permalink_callback') );
	


	}
}



/* Get Attachment size from attachment ID path */
function ufc_get_attachment_size($attachment_id){
	$file = get_attached_file( $attachment_id );
	$bytes = filesize($file);
	if ( empty($bytes) ) { return ''; }
	$s = array('b', 'Kb', 'Mb', 'Gb');
	$e = floor(log($bytes)/log(1024));
	return sprintf('%.2f '.$s[$e], ($bytes/pow(1024, floor($e))));
}



function ufc_get_svg_file($svg){
	return file_get_contents($svg);
}


function ufc_get_image_type($image){
	return pathinfo(parse_url($image, PHP_URL_PATH), PATHINFO_EXTENSION);
}


function ufc_get_image($url, $alt = ""){
	$type = ufc_get_image_type($url);
	if ($type == 'svg') {
		$image = ufc_get_svg_file($url);
	} else {
		$image = '<img src="' . $url . '" alt="' . $alt ? $alt : bloginfo('name') . '">';
	}
	return $image;
}