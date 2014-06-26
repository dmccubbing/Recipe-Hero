<?php
/**
 * Recipe Hero Settings / Options Fields
 *
 * @package   Recipe Hero
 * @author    Captain Theme <info@captaintheme.com>
 * @license   GPL-2.0+
 * @link      http://captaintheme.com
 * @copyright 2014 Captain Theme
 */

class Recipe_Hero_Admin_Settings {

    /**
     * Option key, and option page slug
     * @var string
     */
    protected static $key = 'recipe_hero_options';

    /**
     * Array of metaboxes/fields
     * @var array
     */
    protected static $plugin_options = array();

    /**
     * Options Page title
     * @var string
     */
    protected $title = '';

    /**
     * Constructor
     * @since 0.5.0
     */
    public function __construct() {
        // Set our title
        $this->title = __( 'Settings', 'recipe-hero' );
    }

    /**
     * Initiate our hooks
     * @since 0.5.0
     */
    public function hooks() {
        add_action( 'admin_init', array( $this, 'init' ) );
        add_action( 'admin_menu', array( $this, 'add_options_page' ) );
    }

    /**
     * Register our setting to WP
     * @since  0.5.0
     */
    public function init() {
        register_setting( self::$key, self::$key );
    }

    /**
     * Add menu options page
     * @since 0.5.0
     */
    public function add_options_page() {
        $this->options_page = add_submenu_page( 'edit.php?post_type=recipe', $this->title, $this->title, 'manage_options', self::$key, array( $this, 'admin_page_display' ) );
    }

    /**
     * Admin page markup. Mostly handled by CMB
     * @since  0.5.0
     */
    public function admin_page_display() {
        ?>
        <div class="wrap cmb_options_page <?php echo self::$key; ?>">
            <h2><?php echo esc_html( get_admin_page_title() ); ?></h2>
            <?php cmb_metabox_form( self::option_fields(), self::$key ); ?>
        </div>
        <?php
    }

    /**
     * Defines the theme option metabox and field configuration
     * @since  0.6.0
     * @return array
     */
    public static function option_fields() {

        // Only need to initiate the array once per page-load
        if ( ! empty( self::$plugin_options ) )
            return self::$plugin_options;

        self::$plugin_options = array(
            'id'         => 'plugin_options',
            'show_on'    => array( 'key' => 'options-page', 'value' => array( self::$key, ), ),
            'show_names' => true,
            'fields'     => array(
                array(
                    'name' => '<h3>' . __( 'Basic Settings', 'recipe-hero' ) . '</h2>',
                    'id'   => 'rh-basic-title',
                    'type' => 'html',
                ),
                array(
                    'name' => __( 'Class for Main Content', 'recipe-hero' ),
                    'desc' => __( 'The wrapper class for the content area.', 'recipe-hero' ),
                    'id'   => 'rh-content-class',
                    'type' => 'text_small',
                    'attributes' => array(
                            'placeholder' => 'eg. site-content',
                        ),
                ),
                array(
                    'name' => '<h3>' . __( 'Custom Text', 'recipe-hero' ) . '</h2>',
                    'id'   => 'rh-custom-text-title',
                    'type' => 'html',
                ),
                array(
                    'name' => __( '\'Serves\' Text', 'recipe-hero' ),
                    'desc' => __( 'Part of the Recipe Details area', 'recipe-hero' ),
                    'id'   => 'rh-serves-text',
                    'type' => 'text_small',
                ),
                array(
                    'name' => __( '\'Equipment\' Text', 'recipe-hero' ),
                    'desc' => __( 'Part of the Recipe Details area', 'recipe-hero' ),
                    'id'   => 'rh-equipment-text',
                    'type' => 'text_small',
                ),
                array(
                    'name' => __( '\'Prep Time\' Text', 'recipe-hero' ),
                    'desc' => __( 'Part of the Recipe Details area', 'recipe-hero' ),
                    'id'   => 'rh-prep-text',
                    'type' => 'text_small',
                ),
                array(
                    'name' => __( '\'Cook Time\' Text', 'recipe-hero' ),
                    'desc' => __( 'Part of the Recipe Details area', 'recipe-hero' ),
                    'id'   => 'rh-cook-text',
                    'type' => 'text_small',
                ),
                array(
                    'name' => __( '\'Total Time\' Text', 'recipe-hero' ),
                    'desc' => __( 'Part of the Recipe Details area', 'recipe-hero' ),
                    'id'   => 'rh-total-text',
                    'type' => 'text_small',
                ),
                array(
                    'name' => '<h3>' . __( 'Styling', 'recipe-hero' ) . '</h2>',
                    'id'   => 'rh-styling-title',
                    'type' => 'html',
                ),
                array(
                    'name' => __( 'Disable Recipe Hero Styles', 'recipe-hero' ),
                    'desc' => __( 'Selecting this will stop the plugin loading the default styles used in Recipe Hero for layout and styling.', 'recipe-hero' ),
                    'id'   => 'rh-disable-styles',
                    'type' => 'checkbox',
                    'default' => 0,
                ),
                array(
                    'name' => __( 'Disable Lightbox', 'recipe-hero' ),
                    'desc' => __( 'Selecting this will disable the lightbox used in Recipe Hero', 'recipe-hero' ),
                    'id'   => 'rh-disable-lightbox',
                    'type' => 'checkbox',
                ),
            ),
        );
        return self::$plugin_options;
    }

    /**
     * Make public the protected $key variable.
     * @since  0.5.0
     * @return string  Option key
     */
    public static function key() {
        return self::$key;
    }

}

// Get it started
$Recipe_Hero_Admin_Settings = new Recipe_Hero_Admin_Settings();
$Recipe_Hero_Admin_Settings->hooks();

/**
 * Wrapper function around cmb_get_option
 * @since  0.5.0
 * @param  string  $key Options array key
 * @return mixed        Option value
 */
function recipe_hero_get_option( $key = '' ) {
    return cmb_get_option( Recipe_Hero_Admin_Settings::key(), $key );
}