<?php
// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

/**
 * Scripts Class
 *
 * Handles adding scripts functionality to the admin pages
 * as well as the front pages.
 *
 * @package Ultimate Field Collections
 * @since 1.0.0
 */
class UFC_Scripts {

	//class constructor
	function __construct()
	{
		
	}
	
	/**
	 * Enqueue Scripts on Public Side
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 */
	public function ufc_public_scripts(){

		//Register & Enqueue Script Demo
		wp_enqueue_style( 'ufc-public-style', UFC_URL.'includes/css/ufc-public.css', array(), UFC_VERSION);
		wp_enqueue_script( 'ufc-public-script', UFC_URL . 'includes/js/ufc-public.js', array('jquery'), UFC_VERSION, true );

		//localize script to pass some variable to javascript file from php file
		//pass ajax url to access wordpress ajax file at front side
		wp_localize_script( 'ufc-public-script','UFC_Ajax',array('ajax_url' => admin_url( 'admin-ajax.php', ( is_ssl() ? 'https' : 'http' ) )));

	}
	
	/**
	 * Print Scripts on Admin Side
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 */
	public function ufc_admin_page_print_scripts( $hook_suffix ){

		$ufc_admin_page_args = array(
			'acf_nonce' => wp_create_nonce( 'acf_nonce' ),
			'ufc_ajax_nonce' => wp_create_nonce( 'ufc_ajax_nonce' ),
			'site_url' => site_url(),
			'ajax_url' => admin_url( 'admin-ajax.php', ( is_ssl() ? 'https' : 'http' ) ),
			'ufc_admin_page_url' => admin_url( 'admin.php?page=ufc-field-collections', ( is_ssl() ? 'https' : 'http' ) ),
		);

		echo "<script type='text/javascript'>\n";
		echo 'var UFC_Admin_Page_args = ' . wp_json_encode( $ufc_admin_page_args ) . ';'; 
		echo "\n</script>"; 
	}
	
	/**
	 * Enqueue Scripts on Admin Side
	 * 
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 */
	public function ufc_admin_scripts( $hook_suffix ){
		
		if ( is_admin() ) {
			wp_enqueue_style( 'ufc-wp-admin-style', UFC_URL.'includes/css/ufc-wp-admin.css', array(), UFC_VERSION);
			wp_enqueue_script("ufc-wp-admin-script", UFC_URL . 'includes/js/ufc-wp-admin.js', array( 'jquery' ), UFC_VERSION, true );
		}

		$page_hook_suffix = array(
			'toplevel_page_ufc-field-collections',
			'toplevel_page_ufc-settings',
			'ultimate-field-collections_page_ufc-settings',
		);

		// If hook suffix consists our settings page
		if( in_array($hook_suffix, $page_hook_suffix) ) {

			//Register & Enqueue Script Demo
			wp_enqueue_style( 'wp-color-picker' );
			wp_enqueue_script( 'wp-color-picker' );
			wp_enqueue_script( 'jquery-ui-core' );
			wp_enqueue_script( 'jquery-ui-datepicker' );
			wp_enqueue_media();

			wp_enqueue_style( 'ufc-jquery-ui-style', UFC_URL.'includes/css/libs/jquery-ui.min.css', false, '1.13.2', 'all' );
			wp_enqueue_style( 'ufc-jquery-ui-timepicker-style', UFC_URL.'includes/css/libs/jquery-ui-timepicker-addon.min.css', false, '1.6.3', 'all' );
			wp_enqueue_style( 'ufc-select2-style', UFC_URL.'includes/css/libs/select2/select2.css', false, '3.4.8', 'all' );
			wp_enqueue_style( 'fontawesome-style', UFC_URL.'includes/css/libs/fontawesome-all.css' );
			// Load Editor.js's Style
			wp_enqueue_style( 'ufc-admin-editorjs-demo-style', UFC_URL . 'includes/js/libs/editorjs/assets/demo.css' );
			wp_enqueue_script( 'ufc-admin-editorjs-json-preview', UFC_URL . 'includes/js/libs/editorjs/assets/json-preview.js', array( 'jquery' ), '2.26.2', true );

			wp_enqueue_style( 'ufc-admin-style', UFC_URL.'includes/css/ufc-admin.css', array(), UFC_VERSION . time() );

			wp_enqueue_script( 'ufc-jquery-ui-timepicker-script', UFC_URL . 'includes/js/libs/jquery-ui-timepicker-addon.min.js', array( 'jquery' ), '1.6.3', true );
			wp_enqueue_script( 'ufc-select2-script', UFC_URL . 'includes/js/libs/select2.js', array( 'jquery' ), '3.4.8', true );
			wp_enqueue_script( 'ufc-admin-ckeditor', UFC_URL . 'includes/js/libs/ckeditor/ckeditor.js', array( 'jquery' ), '4.17.2', true );


			// Load Editor.js's Tools
			wp_enqueue_script( 'ufc-admin-editorjs-header', UFC_URL . 'includes/js/libs/editorjs/tools/header.js', array( 'jquery' ), '2.26.2', true );
			wp_enqueue_script( 'ufc-admin-editorjs-simple-image', UFC_URL . 'includes/js/libs/editorjs/tools/simple-image.js', array( 'jquery' ), '2.26.2', true );
			wp_enqueue_script( 'ufc-admin-editorjs-delimiter', UFC_URL . 'includes/js/libs/editorjs/tools/delimiter.js', array( 'jquery' ), '2.26.2', true );
			wp_enqueue_script( 'ufc-admin-editorjs-list', UFC_URL . 'includes/js/libs/editorjs/tools/list.js', array( 'jquery' ), '2.26.2', true );
			wp_enqueue_script( 'ufc-admin-editorjs-checklist', UFC_URL . 'includes/js/libs/editorjs/tools/checklist.js', array( 'jquery' ), '2.26.2', true );
			wp_enqueue_script( 'ufc-admin-editorjs-quote', UFC_URL . 'includes/js/libs/editorjs/tools/quote.js', array( 'jquery' ), '2.26.2', true );
			wp_enqueue_script( 'ufc-admin-editorjs-code', UFC_URL . 'includes/js/libs/editorjs/tools/code.js', array( 'jquery' ), '2.26.2', true );
			wp_enqueue_script( 'ufc-admin-editorjs-embed', UFC_URL . 'includes/js/libs/editorjs/tools/embed.js', array( 'jquery' ), '2.26.2', true );
			wp_enqueue_script( 'ufc-admin-editorjs-table', UFC_URL . 'includes/js/libs/editorjs/tools/table.js', array( 'jquery' ), '2.26.2', true );
			wp_enqueue_script( 'ufc-admin-editorjs-link', UFC_URL . 'includes/js/libs/editorjs/tools/link.js', array( 'jquery' ), '2.26.2', true );
			wp_enqueue_script( 'ufc-admin-editorjs-warning', UFC_URL . 'includes/js/libs/editorjs/tools/warning.js', array( 'jquery' ), '2.26.2', true );
			wp_enqueue_script( 'ufc-admin-editorjs-marker', UFC_URL . 'includes/js/libs/editorjs/tools/marker.js', array( 'jquery' ), '2.26.2', true );
			wp_enqueue_script( 'ufc-admin-editorjs-inline-code', UFC_URL . 'includes/js/libs/editorjs/tools/inline-code.js', array( 'jquery' ), '2.26.2', true );

			// Load Editor.js's Core
			wp_enqueue_script( 'ufc-admin-editorjs-editorjs', UFC_URL . 'includes/js/libs/editorjs/editorjs.js', array( 'jquery' ), '2.26.2', true );
			// Reference: https://github.com/pavittarx/editorjs-html
			wp_enqueue_script( 'ufc-admin-editorjs-edjsHTML', 'https://cdn.jsdelivr.net/npm/editorjs-html@3.4.0/build/edjsHTML.js', array( 'jquery' ), '3.4.0', true );

			wp_enqueue_script( 'jquery-sortable-script', UFC_URL . 'includes/js/libs/Sortable.js', array(), '1.0.1', 'all' );
			wp_enqueue_script( 'ufc-admin-script', UFC_URL . 'includes/js/ufc-admin.js', array('jquery', 'ufc-select2-script', 'jquery-sortable-script' ), UFC_VERSION . time(), true );
			wp_enqueue_script( 'ufc-admin-extra-script', UFC_URL . 'includes/js/ufc-admin-extra-script.js', array('jquery'), UFC_VERSION . time(), true );


			// ACF MAP vars
			$acf_map_api_args = array(
				'key'       => acf_get_setting( 'google_api_key' ),
				'client'    => acf_get_setting( 'google_api_client' ),
				'libraries' => 'places',
				'ver'       => 3,
				'callback'  => '',
				// 'language'  => acf_get_locale(),
			);
			// filter
			$acf_map_api_args = apply_filters( 'acf/fields/google_map/api', $acf_map_api_args );
			// remove empty
			if ( empty( $acf_map_api_args['key'] ) ) { unset($acf_map_api_args['key']); }
			if ( empty( $acf_map_api_args['client'] ) ) { unset( $acf_map_api_args['client'] ); }
			// construct url
			$acf_map_api_url = add_query_arg( $acf_map_api_args, 'https://maps.googleapis.com/maps/api/js' );

			wp_enqueue_script( 'ufc-admin-map-api', $acf_map_api_url, array( 'jquery' ), '', true );

			$ufc_admin_ajax_args = array(
				'acf_nonce' => wp_create_nonce( 'acf_nonce' ),
				'ufc_ajax_nonce' => wp_create_nonce( 'ufc_ajax_nonce' ),
				'acf_map_api' => $acf_map_api_url,
				'site_url' => site_url(),
				'ajax_url' => admin_url( 'admin-ajax.php', ( is_ssl() ? 'https' : 'http' ) ),
				'ufc_admin_page_url' => admin_url( 'admin.php?page=ufc-field-collections', ( is_ssl() ? 'https' : 'http' ) ),
			);

			ob_start();
			if ( file_exists( UFC_TEMPLATES_DIR.'/field-location-rule-row-placeholder.php' ) ) {
				include( UFC_TEMPLATES_DIR.'/field-location-rule-row-placeholder.php' );
			}
			$ufc_admin_ajax_args['field_location_rule_row_placeholder_html'] = ob_get_contents();
			ob_end_clean();

			ob_start();
			?>
<div class="ufc-field-loc-rules-group" data-rule_group_key="UFC_Rule_Group_Key">
    <div class="ufc-field-loc-rules-group-wrap">
        <span class="ufc-field-loc-rule-label">
            Rule Group #<span class="ufc-field-loc-rule-number"></span>
        </span>
        <div class="ufc-field-loc-rules-group-inner-wrap">
            <div class="ufc-field-loc-rule-rows-wrap">
                <?php
						$ufc_admin_ajax_args['field_location_rules_group_start_html'] = ob_get_contents();
						ob_end_clean();
						
						ob_start();
						?>
            </div>
            <div class="ufc-field-loc-add-new-rule-row">
                <span><i class="fa fa-plus-square"></i><?php esc_html_e( 'Add condition', 'ufcsupport' ); ?></span>
            </div>
        </div>
    </div>
    <div class="ufc-field-loc-rules-group-or"><span><?php esc_html_e( 'or', 'ufcsupport' ); ?></span></div>
</div>
<?php
			$ufc_admin_ajax_args['field_location_rules_group_end_html'] = ob_get_contents();
			ob_end_clean();

			wp_localize_script( 'ufc-admin-script', 'UFC_Admin_Ajax', $ufc_admin_ajax_args );
		}

	}

	/**
	 * Adding Hooks
	 *
	 * Adding hooks for the styles and scripts.
	 *
	 * @package Ultimate Field Collections
	 * @since 1.0.0
	 */
	function add_hooks(){
		
		//add admin scripts
		add_action('admin_enqueue_scripts', array($this, 'ufc_admin_scripts') );
		add_action('admin_print_scripts-toplevel_page_ufc-field-collections', array($this, 'ufc_admin_page_print_scripts') );
		add_action('admin_print_scripts-toplevel_page_ufc-settings', array($this, 'ufc_admin_page_print_scripts') );
		add_action('admin_print_scripts-ultimate-field-collections_page_ufc-settings', array($this, 'ufc_admin_page_print_scripts') );
		add_action('wp_enqueue_scripts', array( $this, 'ufc_public_scripts' ) );

	}
}