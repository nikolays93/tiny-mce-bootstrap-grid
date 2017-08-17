<?php

/*
Plugin Name: TinyMCE Bootstrap GRID
Description: Add Bootstrap GRID CSS and insert button tinyMCE.
Plugin URI: https://github.com/nikolays93/tiny-mce-bootstrap-grid
Version: 1.0.0
Author: NikolayS93
Author URI: https://vk.com/nikolays_93
Author EMAIL: nikolayS93@ya.ru
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

namespace MCEGRID;

if ( ! defined( 'ABSPATH' ) )
    exit;

define('MCEGRID_DIR', rtrim(plugin_dir_path( __FILE__ ), '/') );

add_action( 'admin_init', function(){
    /** MCE Editor only */
    if ( !user_can_richedit() && !current_user_can('edit_posts') && !current_user_can('edit_pages') )
        return;

    add_action( 'admin_head', __NAMESPACE__ . '\_icon' );
    add_filter( "mce_external_plugins", __NAMESPACE__ . '\mce_button_script' );
    add_filter( "mce_buttons", __NAMESPACE__ . '\mce_register_button' );
}, 20 );

/** Register Button MCE */
function mce_button_script($plugin_array){
    $plugin_array['grid_shortcode'] = plugins_url( 'assets/grid_button.js', __FILE__ );
    return $plugin_array;
}

function mce_register_button($buttons){
    $buttons[] = 'grid_shortcode';
    return $buttons;
}

/** Set dashicons icon */
function _icon(){
    ?>
    <style type="text/css">
        i.mce-i-screenoptions {
            font: normal 20px/1 'dashicons';
            padding: 0;
            vertical-align: top;
            speak: none;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            margin-left: -2px;
            padding-right: 2px;
        }
    </style>
    <?php
}