<?php
/**
 * Plugin Name:       Ultimate Field Collections
 * Description:       Streamline the entire content management process for your WordPress site.
 * Version:           1.2.0
 * Author:            Ultimate Field Collections
 * Author URI:        https://wpufc.com/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ufc
 */

/**
 * Basic plugin definitions 
 * 
 * @package Ultimate Field Collections
 * @since 1.0.0
 */
if( !defined( 'UFC_DIR' ) ) {
  define( 'UFC_DIR', dirname( __FILE__ ) );      // Plugin dir
}
if( !defined( 'UFC_VERSION' ) ) {
  define( 'UFC_VERSION', '1.1.0' );      // Plugin Version
}
if( !defined( 'UFC_URL' ) ) {
  define( 'UFC_URL', plugin_dir_url( __FILE__ ) );   // Plugin url
}
if( !defined( 'UFC_INC_DIR' ) ) {
  define( 'UFC_INC_DIR', UFC_DIR.'/includes' );   // Plugin include dir
}
if( !defined( 'UFC_INC_URL' ) ) {
  define( 'UFC_INC_URL', UFC_URL.'includes' );    // Plugin include url
}
if( !defined( 'UFC_TEMPLATES_DIR' ) ) {
  define( 'UFC_TEMPLATES_DIR', UFC_DIR.'/templates' );   // Plugin templates dir
}
if(!defined('UFC_PREFIX')) {
  define('UFC_PREFIX', '_UFC_'); // Variable Prefix
}


/**
 * Load Text Domain
 *
 * This gets the plugin ready for translation.
 *
 * @package Ultimate Field Collections
 * @since 1.0.0
 */
load_plugin_textdomain( 'ufcsupport', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );

/**
 * Activation Hook
 *
 * Register plugin activation hook.
 *
 * @package Ultimate Field Collections
 * @since 1.0.0
 */
register_activation_hook( __FILE__, 'UFC_install' );

function UFC_install(){
  //if dependent plugin is not active
  if ( !(is_plugin_active("advanced-custom-fields-pro/acf.php") ) && !(is_plugin_active("advanced-custom-fields/acf.php") ) ) {
    // Deactivating your Plugin if Dependent Plugin is Deactivated
    add_action( 'admin_notices', 'UCF_plugin_deactivate_notice' );
    deactivate_plugins(__FILE__);
  }
}
add_action( 'admin_init', 'UCF_deactivate_plugin_if_acf_deactivate');
function UCF_deactivate_plugin_if_acf_deactivate(){
  //if dependent plugin is not active
  if ( !(is_plugin_active("advanced-custom-fields-pro/acf.php") ) && !(is_plugin_active("advanced-custom-fields/acf.php") ) ) {
    add_action( 'admin_notices', 'UCF_plugin_deactivate_notice' );
    deactivate_plugins(__FILE__);
  }
}

/**
 * Admin Notice on deactivate if ACF plugin not active.
 * @since 0.1.0
 */
function UCF_plugin_deactivate_notice(){
    ?>
    <div class="error notice is-dismissible">
        <p><?php esc_html_e('The Ultimate Field Collections plugin was deactivated, Please activate the Advanced Custom Fields plugin and then retry.', "ufcsupport" ); ?></p>
    </div>
    <?php
}

/**
 * Deactivation Hook
 *
 * Register plugin deactivation hook.
 *
 * @package Ultimate Field Collections
 * @since 1.0.0
 */
register_deactivation_hook( __FILE__, 'UFC_uninstall');

function UFC_uninstall(){
  
}


//if dependent plugin is not active
if ( class_exists( 'ACF' ) ) {

  // Global variables
  global $ufc_scripts, $ufc_admin, $ufc_public, $ufc_bidirectional_relationship;

  // Script class handles most of script functionalities of plugin
  include_once( UFC_INC_DIR.'/ufc-scripts-class.php' );
  if ( class_exists('UFC_Scripts') ) {
    $ufc_scripts = new UFC_Scripts();
    $ufc_scripts->add_hooks();
  }

  include_once( UFC_INC_DIR.'/ufc-admin-class.php' );
  if ( class_exists('UFC_Admin') ) {
    $ufc_admin = new UFC_Admin();
    $ufc_admin->add_hooks();
  }

  include_once( UFC_INC_DIR.'/ufc-public-class.php' );
  if ( class_exists('UFC_Public') ) {
    $ufc_public = new UFC_Public();
    $ufc_public->add_hooks();
  }

  include_once( UFC_INC_DIR.'/ufc-bidirectional-relationship-class.php' );
  if ( class_exists('UFC_Bidirectional_Relationship') ) {
    $ufc_bidirectional_relationship = new UFC_Bidirectional_Relationship();
    $ufc_bidirectional_relationship->add_hooks();
  }


  function ufc_load_acf_include_custom_fields() {
    // Include ACF custom fields here.
    if ( function_exists( 'acf_include' ) ) {
      include_once( UFC_INC_DIR.'/class-acf-field-reference.php' );
    }
  }
  add_action( 'init', 'ufc_load_acf_include_custom_fields' );

}