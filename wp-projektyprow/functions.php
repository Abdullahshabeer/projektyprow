<?php
include_once 'inc/post-type-shortcode.php';
include_once 'inc/coustom-post-types.php';
include_once 'inc/admin-ajax.php';
add_theme_support( 'title-tag' );
if (!function_exists('prow_theme_setup')) {
    /**
     * Sets up theme defaults and registers support for various WordPress features.
     *
     * Note that this function is hooked into the after_setup_theme hook, which
     * runs before the init hook. The init hook is too late for some features, such
     * as indicating support for post thumbnails.
     *
     
     *
     * @return void
     */
    function prow_theme_setup()
    {
        /*
         * Make theme available for translation.
         * Translations can be filed in the /languages/ directory.
         * If you're building a theme based on Twenty Twenty-One, use a find and replace
         * to change 'prow' to the name of your theme in all the template files.
         */
        load_theme_textdomain('prow', get_template_directory() . '/languages');

        // Add default posts and comments RSS feed links to head.
        add_theme_support('automatic-feed-links');

        /*
         * Let WordPress manage the document title.
         * This theme does not use a hard-coded <title> tag in the document head,
         * WordPress will provide it for us.
         */
        add_theme_support('title-tag');

        /**
         * Add post-formats support.
         */
        add_theme_support(
            'post-formats',
            array(
                'link',
                'aside',
                'gallery',
                'image',
                'quote',
                'status',
                'video',
                'audio',
                'chat',
            )
        );

        /*
         * Enable support for Post Thumbnails on posts and pages.
         *
         * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
         */
        add_theme_support('post-thumbnails');
        set_post_thumbnail_size(475, 200);
        add_image_size( 'custom-thumbnail', 475, 9999 ); // Custom thumbnail size
        set_post_thumbnail_size( 475, 9999 ); // Optional: Default size
        

        register_nav_menus(
            array(
                'primary' => esc_html__('header menu', 'prow'),
                'footer-bottom-menu' => esc_html__('footer bottom menu', 'prow'),
                'footermenu' => esc_html__('footer menu', 'prow'),
                'languagechange' => esc_html__('language changer', 'prow'), 
            )
        );

        /*
         * Switch default core markup for search form, comment form, and comments
         * to output valid HTML5.
         */
        add_theme_support(
            'html5',
            array(
                'comment-form',
                'comment-list',
                'gallery',
                'caption',
                'style',
                'script',
                'navigation-widgets',
            )
        );

        /*
         * Add support for core custom logo.
         *
         * @link https://codex.wordpress.org/Theme_Logo
         */
        add_theme_support(
            'custom-logo',
            array(
                'flex-width' => true,
                'flex-height' => true,
                'unlink-homepage-logo' => true,
            )
        );

        // Add theme support for selective refresh for widgets.
        add_theme_support('customize-selective-refresh-widgets');

        // Add support for Block Styles.
        add_theme_support('wp-block-styles');

        // Add support for full and wide align images.
        add_theme_support('align-wide');
        add_filter('wpcf7_autop_or_not', '__return_false');
        // Add support for editor styles.
        add_theme_support('editor-styles');
        add_post_type_support('page', 'excerpt');
        // Add support for responsive embedded content.
        add_theme_support('responsive-embeds');

        // Add support for custom line height controls.
        add_theme_support('custom-line-height');

        // Add support for experimental link color control.
        add_theme_support('experimental-link-color');

        // Add support for experimental cover block spacing.
        add_theme_support('custom-spacing');

        // Add support for custom units.
        // This was removed in WordPress 5.6 but is still required to properly support WP 5.5.
        add_theme_support('custom-units');

        // Remove feed icon link from legacy RSS widget.
        add_filter('rss_widget_feed_link', '__return_empty_string');
        add_post_type_support('post', 'page-attributes');
    }
}
add_action('after_setup_theme', 'prow_theme_setup');

// function cc_mime_types($mimes) {
//     $mimes['svg'] = 'image/svg+xml';
//     return $mimes;
//   }
function custom_mime_types($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'custom_mime_types');

// Sanitize SVG before uploading
function sanitize_svg($svg) {
    $svg = simplexml_load_string($svg);
    return $svg->asXML();
}



  function prow_enqueue_scripts()
{
    
  	
    wp_enqueue_script('jquery');
    wp_enqueue_media();
    wp_enqueue_script('wp-tinymce');
    wp_enqueue_style('owl-carousel-css', get_stylesheet_directory_uri() . '/owl-carousel/assets/owl.carousel.min.css');
    wp_enqueue_style('bootstrap-css', get_stylesheet_directory_uri() . '/css/bootstrap.min.css', array(), '1.0', 'all');
    wp_enqueue_style('datatable-css-table', get_stylesheet_directory_uri() . '/data-table/css/dataTables.css');
    wp_enqueue_style('datatable-css-responsive', get_stylesheet_directory_uri() . '/data-table/css/responsive.dataTables.css');
    
    wp_enqueue_style('select2css', get_stylesheet_directory_uri() . '/select2/select2.min.css');
    wp_enqueue_style('admin-css', get_stylesheet_directory_uri() . '/css/admin.css', array(), '1.0', 'all');
    wp_enqueue_script('bootstrap-script', get_stylesheet_directory_uri() . '/js/bootstrap.min.js', '1.0', true);
    wp_enqueue_script('owl-carousel-script', get_stylesheet_directory_uri() . '/owl-carousel/owl.carousel.min.js');
    wp_enqueue_script('datatable-script-table', get_stylesheet_directory_uri() . '/data-table/js/dataTables.js',);
    wp_enqueue_script('select2js', get_stylesheet_directory_uri() . '/select2/select2.min.js',);
    
    wp_enqueue_script('datatable-script-responsive', get_stylesheet_directory_uri() . '/data-table/js/dataTables.responsive.js',);
    wp_enqueue_script('datatable-script-dataTables', get_stylesheet_directory_uri() . '/data-table/js/responsive.dataTables.js',);
	 wp_enqueue_script('fancybox-script', get_stylesheet_directory_uri() . '/fancybox/jquery.fancybox.min.js');
    wp_register_script('custom-script', get_stylesheet_directory_uri() . '/js/scripts.js', array('jquery'), '1.0', true);
    wp_enqueue_script('custom-script');
    wp_enqueue_script('admin-script', get_stylesheet_directory_uri() . '/js/admin.js',);
    wp_localize_script('admin-script', 'ajax_params', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'post_type' => 'post', // Default post type
        'posts_per_page' => 3 // Default posts per page
    ));
    
    wp_localize_script('admin-script', 'myScriptData', array(
        'siteUrl' => get_site_url(),
    ));
    wp_enqueue_style('main-css', get_stylesheet_directory_uri() . '/style.css', array(), '1.0', 'all'); 

}

add_action('wp_enqueue_scripts', 'prow_enqueue_scripts');
function prow_admin_enqueue()
{
    $current_screen = get_current_screen();
    wp_enqueue_media();
    // Check if we are on the Gutenberg editor screen
    if ($current_screen && 'post' === $current_screen->base && post_type_supports($current_screen->post_type, 'editor')) {
    wp_enqueue_script('jquery');
    
    wp_enqueue_style('owl-carousel-css', get_stylesheet_directory_uri() . '/owl-carousel/assets/owl.carousel.min.css');
    wp_enqueue_style('bootstrap-css', get_stylesheet_directory_uri() . '/css/bootstrap.min.css', array(), '1.0', 'all');
    wp_enqueue_style('datatable-css-table', get_stylesheet_directory_uri() . '/data-table/css/dataTables.css');
    wp_enqueue_style('datatable-css-responsive', get_stylesheet_directory_uri() . '/data-table/css/responsive.dataTables.css');
    wp_enqueue_style('main-css', get_stylesheet_directory_uri() . '/style.css', array(), '1.0', 'all');
    wp_enqueue_style('admin-css', get_stylesheet_directory_uri() . '/css/admin.css', array(), '1.0', 'all');
    wp_enqueue_script('datatable-script-table', get_stylesheet_directory_uri() . '/data-table/js/dataTables.js',);
    wp_enqueue_script('select2js', get_stylesheet_directory_uri() . '/select2/select2.min.js',);
    wp_enqueue_script('datatable-script-responsive', get_stylesheet_directory_uri() . '/data-table/js/dataTables.responsive.js',);
    wp_enqueue_script('datatable-script-dataTables', get_stylesheet_directory_uri() . '/data-table/js/responsive.dataTables.js',);
    wp_enqueue_script('bootstrap-script', get_stylesheet_directory_uri() . '/js/bootstrap.min.js', '1.0', true);
    wp_enqueue_script('owl-carousel-script', get_stylesheet_directory_uri() . '/owl-carousel/owl.carousel.min.js',  '1.0', true);
    wp_enqueue_script('custom-script', get_stylesheet_directory_uri() . '/js/scripts.js',);
    
    }
    wp_enqueue_script('wp-tinymce');
    wp_enqueue_script('admin-script', get_stylesheet_directory_uri() . '/js/admin.js',);
}
add_action('admin_enqueue_scripts', 'prow_admin_enqueue');
function prow_customize_register( $wp_customize ) {
     // Top Header Section
     $wp_customize->add_section(
        'top_min_header_section',
        array(
            'title'         => __('UE Logo Bar + text', 'prow'),
            'priority'      => 30,
        )
    );

    // Define settings and controls for the top header section
    $settings_and_controls = array(
        'first_logo'            => __(' logo first', 'prow'),
        // 'polish_first_logo'     => __('Polish logo', 'prow'),
        'first_link_control'    => __('Custom link', 'prow'),
        'second_logo'           => __(' logo second', 'prow'),
        // 'polish_second_logo'    => __('Polish logo', 'prow'),
        'second_link_control'   => __('Custom link', 'prow'),
        'Third_logo'            => __(' logo second', 'prow'),
        // 'polish_Third_logo'     => __('Polish logo', 'prow'),
        'Third_link_control'    => __('Custom link', 'prow'),
        'Four_logo'             => __(' logo second', 'prow'),
        // 'polish_Four_logo'      => __('Polish logo', 'prow'),
        'Four_link_control'     => __('Custom link', 'prow')
    );

    foreach ($settings_and_controls as $setting_name => $control_label) {
        $sanitize_callback = (strpos($setting_name, '_logo') !== false) ? 'esc_url_raw' : 'esc_attr';

        $wp_customize->add_setting(
            $setting_name,
            array(
                'default' => '',
                'sanitize_callback' => $sanitize_callback,
            )
        );

        if (strpos($setting_name, '_logo') !== false) {
            $wp_customize->add_control(
                new WP_Customize_Image_Control(
                    $wp_customize,
                    $setting_name,
                    array(
                        'label'         =>      __($control_label, 'prow'),
                        'section'       =>      'top_min_header_section',
                        'settings'      =>      $setting_name,
                    )
                )
            );
        } else {
            $wp_customize->add_control(
                $setting_name,
                array(
                    'label'             => $control_label,
                    'section'           => 'top_min_header_section',
                    'type'              => (strpos($setting_name, '_logo') !== false) ? 'image' : 'text',
                    'settings'          => $setting_name,
                    'input_attrs'       => array(
                        'placeholder'   => __('Enter link', 'prow'),
                    ),
                )
            );
        }
    }

    $wp_customize->add_setting( 'discription_text', array(
        'default'   => '',
        'transport' => 'refresh',
    ) );

    // Social Media 1 Link Control
    $wp_customize->add_control( 'discription_text_control', array(
        'label'    => __( 'Text  ', 'prow' ),
        'section'  => 'top_min_header_section',
        'settings' => 'discription_text',
        'type'     => 'text',
    ) );



}
add_action( 'customize_register', 'prow_customize_register' );

function theme_footer_widgets_init()
{
    register_sidebar(
        array(
            'name' => __(' Footer image', 'prow'),
            'id' => 'footer-sidebar',
            'description' => __('Widgets added here will appear in the footer.', 'prow'),
            'before_widget' => '<div id="%1$s" class=" image widget %2$s">',
            'after_widget' => '</div>',
            'before_title' => '<h3 class="widget-title">',
            'after_title' => '</h3>',
        )
    );
    register_sidebar(
        array(
            'name' => __('Footer social media', 'prow'),
            'id' => 'footer-sidebar-2',
            'description' => __('Widgets added here will appear in the footer.', 'prow'),
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'after_widget' => '</div>',
            'before_title' => '<h3 class="widget-title">',
            'after_title' => '</h3>',
        )
    );
    register_sidebar(
        array(
            'name' => __('copyright info', 'prow'),
            'id' => 'copyright-sidebar',
            'description' => __('Widgets added here will appear in the footer.', 'prow'),
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'after_widget' => '</div>',
            'before_title' => '<h3 class="widget-title">',
            'after_title' => '</h3>',
        )
    );
    register_sidebar(
        array(
            'name' => __('About sidebar', 'prow'),
            'id' => 'about-sidebar',
            'description' => __('Widgets added here will appear in the footer.', 'prow'),
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'after_widget' => '</div>',
            'before_title' => '<h3 class="widget-title">',
            'after_title' => '</h3>',
        )
    );
   
}

add_action('widgets_init', 'theme_footer_widgets_init');

function custom_search_filter($query) {
    if (!is_admin() && $query->is_search && $query->is_main_query()) {
        // Check if category is set and filter by it
        if (isset($_GET['category']) && !empty($_GET['category'])) {
            $query->set('cat', sanitize_text_field($_GET['category']));
        }

        // Initialize date_query if it is not already set
        $date_query = array();

        // Check if date_from is set and filter by it
        if (isset($_GET['date_from']) && !empty($_GET['date_from'])) {
            $date_query[] = array(
                'after' => sanitize_text_field($_GET['date_from']),
                'inclusive' => true,
            );
        }

        // Check if date_to is set and filter by it
        if (isset($_GET['date_to']) && !empty($_GET['date_to'])) {
            $date_query[] = array(
                'before' => sanitize_text_field($_GET['date_to']),
                'inclusive' => true,
            );
        }

        // Set the date_query if there are date filters
        if (!empty($date_query)) {
            $query->set('date_query', $date_query);
        }

        // Set the number of results per page
        if (isset($_GET['results_per_page']) && !empty($_GET['results_per_page'])) {
            $query->set('posts_per_page', intval($_GET['results_per_page']));
        }
    }
}

add_action('pre_get_posts', 'custom_search_filter');

function custom_breadcrumbs() {
    global $post;
    echo '<div class="bread-crumbs"><ul>';
    echo '<li><a href="' . get_home_url() . '"><span class="visually-hidden">Home</span><svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.12931 0.185732C5.30287 0.0121657 5.58428 0.0121657 5.75785 0.185732L10.2023 4.63018C10.2856 4.71353 10.3325 4.82657 10.3325 4.94445V10.5C10.3325 10.7455 10.1335 10.9444 9.88802 10.9444H0.999132C0.753672 10.9444 0.554688 10.7455 0.554688 10.5V4.94445C0.554688 4.82657 0.601513 4.71353 0.684862 4.63018L5.12931 0.185732ZM1.44358 5.12854V10.0556H9.44358V5.12854L5.44358 1.12854L1.44358 5.12854Z" fill="#1B1B1B"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.77951 6.5V10.5C4.77951 10.7455 4.58053 10.9444 4.33507 10.9444C4.08961 10.9444 3.89062 10.7455 3.89062 10.5V6.5C3.89062 6.32539 3.91853 6.13927 3.99866 5.97902C4.07845 5.81944 4.25714 5.61111 4.55729 5.61111H6.33507C6.63522 5.61111 6.81392 5.81944 6.8937 5.97902C6.97383 6.13927 7.00174 6.32539 7.00174 6.5V10.5C7.00174 10.7455 6.80275 10.9444 6.55729 10.9444C6.31183 10.9444 6.11285 10.7455 6.11285 10.5V6.5H4.77951Z" fill="#1B1B1B"/>
    </svg></a></li>';
    if (is_single()) {
       
        $referer_url = wp_get_referer();
        $referer_parts = parse_url($referer_url);
       
       
          
        function get_title_from_url($url) {
            $response = wp_remote_get($url);
        
            if (is_wp_error($response) || wp_remote_retrieve_response_code($response) != 200) {
                // Error handling here
                return 'Error in fetching URL';
            }
        
            $html = wp_remote_retrieve_body($response);
            $dom = new DOMDocument();
        
            // Load the HTML and suppress warnings/errors
            @$dom->loadHTML($html);
        
            // Extract the title
            $titles = $dom->getElementsByTagName('title');
            if ($titles->length > 0) {
                $fullTitle = $titles[0]->nodeValue;
                // Remove site title and trim the result
                $specificTitle = str_replace('| Punkt dla Przyrody', '', $fullTitle);
                return trim($specificTitle);
            }
        
            return 'Title not found';
        }
        
           
            if (isset($referer_parts['path'])) {
                $path_parts = explode('/', $referer_parts['path']);
                $parent_page_title = '';
                
                // Check if there is a parent page title in the URL
              $parent_page_title_second_last ='';
                if (count($path_parts) > 3) {
                    $parent_page_title_second_last = $path_parts[count($path_parts) - 3];
                  
                    $third_last_url = home_url('/' . $parent_page_title_second_last . '/');
                    $page_title = get_title_from_url($third_last_url);
                }
                 
                   if (count($path_parts) > 2) {
                    $parent_page_title_last = $path_parts[count($path_parts) - 2]; 
                  
                    $parent_page_title_last_url = home_url('/' . $parent_page_title_second_last . '/' . $parent_page_title_last . '/');
                    $page_titlee = get_title_from_url($parent_page_title_last_url);
                }
               
                if(!empty( $parent_page_title_second_last)) {
                    echo '<li><a href="'.$third_last_url.'">' . ucfirst($page_title) . '</a></li>';
                }
                
                if (!empty($parent_page_title_last)) {
                    echo '<li><a href="' . esc_url($referer_url) . '">' . ucfirst($page_titlee) . '</a></li>';
                }
            }
            // print_r( $referer_url);
            echo '<li>' . get_the_title() . '</li>';
        }  
    
           
    
    
    
    elseif (is_category()) {
        $category = get_queried_object();

        echo $category->name;
    }
    elseif (is_tag()) {
        $tag = get_queried_object();
        echo '<li>Tag: ' . $tag->name . '</li>';
    }
    elseif (is_post_type_archive()) {
        echo post_type_archive_title();
    }
    elseif (is_page()) {
        $ancestors = get_post_ancestors($post);
        if ($ancestors) {
            $ancestors = array_reverse($ancestors);
            foreach ($ancestors as $ancestor) {
                echo '<li><a href="' . get_permalink($ancestor) . '">' . get_the_title($ancestor) . '</a></li>';
            }
        }
        echo '<li><span>'.get_the_title() .'</span></li>';
    }
    elseif (is_search()) {
        echo '<li>Search Results for "' . get_search_query() . '" </li>';
    }
    elseif (is_404()) {
        echo '<li>404 Not Found</li>';
    }
    echo '</ul></div>';
}


function fetch_poststype($post_type = array('projektyinwestycyjne', 'projekty_leader'), $posts_per_page = 12, $category_id = 0) {
    $paged = get_query_var('paged') ? get_query_var('paged') : 1;
    $args = array(
        'post_type'      => $post_type,
        'posts_per_page' => $posts_per_page,
        'paged'          => $paged,
        'meta_query'     => array(
            array(
                'key'     => 'praktyki', // ACF field name
                'value'   => 'Nie', // Value to check for
                'compare' => '!=', // Exclude posts with this value
            ),
        ),
    );
    $custom_query = new WP_Query($args);
   

    if ($custom_query->have_posts()) :?>
    <div class="articles-wrap ">
        <div class="row">
            <?php while ($custom_query->have_posts()) : $custom_query->the_post();
                $post_type = get_post_type();  
                $custom_color 	= ''; 
				$class 			= '';
                if ($post_type == 'projektyinwestycyjne') {  
                    $custom_value 	= '#7E115E';
					$class 			= "projekty-inwestycyjne";
                } elseif ($post_type == 'projekty_leader') {  
                    $custom_value 	= '#004A48';  
					$class 			= "projekty-leader";
                }  
                
                $thumbnail_id = get_post_thumbnail_id( get_the_ID() );
                    
                // Get the alt text for the thumbnail image
                $thumbnail_alt = get_post_meta( $thumbnail_id, '_wp_attachment_image_alt', true );
                
                // Fallback to post title if alt text is not set
                $alt_text = $thumbnail_alt ? $thumbnail_alt : '';
                $categories = get_the_category(get_the_ID());
                $fieldtest= get_field('praktyki');
                    ?>
                    <div class="col-xl-3 col-lg-4 col-md-6 <?php echo $fieldtest; ?>">
                        <div class="article-card <?php echo $class; ?>">
                            <a href="<?php the_permalink(); ?>">
                                <div class="article-featured-img">
                                    <?php the_post_thumbnail('set_post_thumbnail_size', array('alt' => esc_attr($alt_text),'aria-hidden' => 'true')); ?>
                                </div>
                                <div class="article-content">
                                    <div class="article-top">
                                        <div class="title-icon">
                                            <h2><?php the_title(); ?></h2>
                                            <div class="icon"> 
                                                <svg width="24" height="29" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9.78003 23.4658L8.31636 28.1002C8.2727 28.2388 8.14436 28.3332 7.9987 28.3332H1.9987C1.8927 28.3332 1.7927 28.2825 1.7297 28.1968C1.6667 28.1112 1.6487 28.0008 1.68103 27.8995L4.0457 20.4115C4.12603 20.5988 4.19936 20.8088 4.2717 21.0165C4.5167 21.7212 4.79436 22.5195 5.49703 22.9262C6.19003 23.3272 7.01437 23.1708 7.7407 23.0338C8.1997 22.9468 8.67403 22.8575 8.97836 22.9388C9.2107 23.0005 9.49437 23.2228 9.78003 23.4658ZM19.9517 20.4112C19.8714 20.5985 19.7977 20.8088 19.7254 21.0168C19.4804 21.7212 19.2027 22.5198 18.5004 22.9262C17.8074 23.3272 16.983 23.1715 16.2567 23.0338C15.797 22.9468 15.3227 22.8582 15.019 22.9385C14.7867 23.0008 14.503 23.2228 14.2174 23.4658L15.6807 28.1002C15.7247 28.2388 15.853 28.3332 15.9987 28.3332H21.9987C22.1047 28.3332 22.2047 28.2825 22.2677 28.1968C22.3307 28.1112 22.3487 28.0008 22.3164 27.8995L19.9517 20.4112ZM18.9987 11.6665C18.9987 15.5262 15.8584 18.6665 11.9987 18.6665C8.13903 18.6665 4.9987 15.5262 4.9987 11.6665C4.9987 7.80685 8.13903 4.66651 11.9987 4.66651C15.8584 4.66651 18.9987 7.80685 18.9987 11.6665ZM16.3147 10.2832C16.275 10.1648 16.1724 10.0785 16.049 10.0595L13.4607 9.66385L12.3004 7.19151C12.2454 7.07485 12.128 6.99985 11.9987 6.99985C11.8694 6.99985 11.752 7.07485 11.697 7.19151L10.5367 9.66385L7.94836 10.0595C7.82503 10.0785 7.72236 10.1645 7.6827 10.2832C7.64303 10.4018 7.67303 10.5322 7.76003 10.6218L9.63303 12.5415L9.00703 15.2585C8.97803 15.3848 9.02503 15.5165 9.12703 15.5965C9.22903 15.6762 9.3687 15.6895 9.4837 15.6302L11.9987 14.3412L14.5134 15.6295C14.561 15.6545 14.6137 15.6665 14.6654 15.6665C14.7384 15.6665 14.8107 15.6428 14.87 15.5962C14.9724 15.5165 15.019 15.3845 14.99 15.2582L14.364 12.5412L16.237 10.6215C16.3247 10.5322 16.3544 10.4015 16.3147 10.2832ZM21.9824 14.3435C21.8227 14.9402 21.941 15.5665 22.0557 16.1725C22.15 16.6708 22.257 17.2362 22.104 17.5005C21.9457 17.7738 21.396 17.9655 20.9107 18.1338C20.334 18.3345 19.737 18.5418 19.3064 18.9725C18.8744 19.4048 18.667 20.0015 18.4664 20.5785C18.2974 21.0638 18.1064 21.6132 17.8334 21.7715C17.8 21.7905 17.7004 21.8482 17.4414 21.8482C17.1664 21.8482 16.8304 21.7848 16.5054 21.7232C16.1327 21.6525 15.711 21.5728 15.3057 21.5728C15.0764 21.5728 14.8707 21.5978 14.678 21.6488C14.099 21.8042 13.6277 22.2115 13.1717 22.6058C12.758 22.9638 12.331 23.3332 11.9987 23.3332C11.6657 23.3332 11.2387 22.9638 10.8254 22.6058C10.3694 22.2115 9.8977 21.8038 9.32136 21.6502C9.12803 21.5985 8.92103 21.5735 8.6897 21.5735C8.2857 21.5735 7.86403 21.6532 7.49203 21.7238C7.16536 21.7855 6.82936 21.8488 6.5547 21.8488C6.2967 21.8488 6.1967 21.7908 6.16403 21.7722C5.89036 21.6135 5.6987 21.0638 5.53036 20.5785C5.3297 20.0018 5.12236 19.4048 4.6917 18.9742C4.25936 18.5422 3.6627 18.3348 3.0857 18.1342C2.60036 17.9652 2.05103 17.7742 1.8927 17.5012C1.74003 17.2368 1.8467 16.6722 1.94103 16.1735C2.05603 15.5642 2.1737 14.9395 2.0147 14.3438C1.86036 13.7675 1.4527 13.2958 1.0587 12.8402C0.701365 12.4258 0.332031 11.9988 0.332031 11.6665C0.332031 11.3335 0.701365 10.9065 1.05936 10.4932C1.4537 10.0372 1.86136 9.56551 2.01503 8.98918C2.1747 8.39251 2.05636 7.76618 1.9417 7.16018C1.84736 6.66185 1.74036 6.09651 1.89336 5.83218C2.0517 5.55885 2.60136 5.36718 3.0867 5.19885C3.66336 4.99818 4.26036 4.79085 4.69103 4.36018C5.12303 3.92785 5.33036 3.33118 5.53103 2.75418C5.70003 2.26885 5.89103 1.71951 6.16403 1.56118C6.19736 1.54218 6.29736 1.48418 6.55637 1.48418C6.83203 1.48418 7.16736 1.54785 7.4917 1.60951C7.8637 1.67985 8.28436 1.75951 8.6917 1.75951C8.92036 1.75951 9.12436 1.73518 9.31636 1.68451C9.89837 1.52851 10.3697 1.12118 10.8254 0.726847C11.2394 0.369181 11.6664 -0.000152588 11.9987 -0.000152588C12.3317 -0.000152588 12.7587 0.369181 13.172 0.727181C13.628 1.12151 14.0997 1.52918 14.676 1.68285C14.869 1.73418 15.0754 1.75951 15.3067 1.75951C15.709 1.75951 16.1317 1.67985 16.5044 1.60951C16.8307 1.54751 17.1674 1.48418 17.442 1.48418C17.7 1.48418 17.8004 1.54218 17.833 1.56085C18.1067 1.71951 18.2984 2.26918 18.4667 2.75451C18.6674 3.33118 18.8747 3.92818 19.3054 4.35885C19.7377 4.79085 20.3344 4.99818 20.9114 5.19885C21.3967 5.36785 21.946 5.55885 22.1044 5.83185C22.257 6.09618 22.1504 6.66085 22.056 7.15951C21.941 7.76885 21.8234 8.39351 21.9824 8.98918C22.1367 9.56551 22.5444 10.0372 22.9384 10.4928C23.296 10.9072 23.6654 11.3342 23.6654 11.6665C23.6654 11.9995 23.296 12.4265 22.938 12.8398C22.544 13.2958 22.136 13.7675 21.9824 14.3435ZM20.332 11.6665C20.332 7.07151 16.5937 3.33318 11.9987 3.33318C7.4037 3.33318 3.66536 7.07151 3.66536 11.6665C3.66536 16.2615 7.4037 19.9998 11.9987 19.9998C16.5937 19.9998 20.332 16.2615 20.332 11.6665Z" fill="<?php echo $custom_color ?>"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <?php 
                                        $beneficjent = get_field('beneficjent_text_with_icon', get_the_ID());
                                        $dofinansowania = get_field('dofinansowania_z_efrrow', get_the_ID());
                                        $valueprojects = get_field('value_of_projects:',get_the_ID());
                                        ?>
                                        <div class="excerpt-sec">
                                            <p><span><?php echo $beneficjent['label']; ?></span><?php echo $beneficjent['title']; ?></p>
                                            <p><span><?php echo !empty($dofinansowania['label']) ? $dofinansowania['label'] : 'wartość dofinansowania z EFRROW:'; ?></span><?php 
                                            // Remove commas and ensure the value is numeric
                                            $valueprojects = str_replace(',', '', $valueprojects);
                                            // Check if the sanitized value is numeric and format it
                                            echo is_numeric($valueprojects) 
                                                ? number_format($valueprojects, 2, ',', ' ') 
                                                : '0,00'; 
                                        ?> zł</p>   
                                        </div>
                                        
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <?php
                endwhile;?>
        </div>
    </div>
    <div class="pagination-wrap">
        <div class="pagination-inner justify-content-center" role="navigation">
            <?php
            echo paginate_links([
                'total'     => $custom_query->max_num_pages,
                'current'   => $paged,
                'format'       => '?paged=%#%',
                'prev_text'    => __('&#8592;', 'prow'),
                'next_text'    => __('&#8594;', 'prow'),
            ]);
            ?>
        </div>
    </div>
    <?php else :
        echo '<div class="parentnone">No posts found.</div>';
    endif;

    wp_reset_postdata();
    return ob_get_clean();
}



function wp_count_posts_in_term($post_type, $term_ids, $taxonomy) {
    global $wpdb;

    if (!is_array($term_ids)) {
        $term_ids = array($term_ids);
    }

    // Query to count posts in all provided terms
    $query = $wpdb->prepare("
        SELECT COUNT(DISTINCT p.ID)
        FROM {$wpdb->posts} p
        INNER JOIN {$wpdb->term_relationships} tr ON p.ID = tr.object_id
        INNER JOIN {$wpdb->term_taxonomy} tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
        WHERE p.post_status = 'publish'
          AND p.post_type = %s
          AND tt.term_id IN (" . implode(',', array_map('absint', $term_ids)) . ")
    ", $post_type);

    return (int) $wpdb->get_var($query);
}

function custom_video_shortcode($atts) {
    $attsr = shortcode_atts(
        [
            'poster' => '', // Path to the poster image
            'webm' => '',   // Path to the .webm video file
            'mp4' => '',    // Path to the .mp4 video file
            'captions' => '', // Path to the captions file
            'descriptions' => '', // Path to the descriptions file
            'width' => '1200px',  // Default width
            'height' => '610px',  // Default height
        ],
        $atts
    );

    ob_start();
// 	var_dump($atts);
    ?>

    <video 
        id="video1" 
        data-able-player 
        preload="auto" 
        style="max-width: <?php echo esc_attr($atts['width']); ?>; height: <?php echo esc_attr($atts['height']); ?>;" 
        poster="<?php echo esc_url($atts['poster']); ?>">
        <?php if (!empty($atts['webm'])) : ?>
            <source type="video/webm" src="<?php echo esc_url($atts['webm']); ?>" data-desc-src="<?php echo esc_url($atts['descriptions']); ?>"/>
        <?php endif; ?>
        <?php if (!empty($atts['mp4'])) : ?>
            <source type="video/mp4" src="<?php echo esc_url($atts['mp4']); ?>" data-desc-src="<?php echo esc_url($atts['descriptions']); ?>"/>
        <?php endif; ?>
        <?php if (!empty($atts['captions'])) : ?>
            <track kind="captions" src="<?php echo esc_url($atts['captions']); ?>"/>
        <?php endif; ?>
        <?php if (!empty($atts['descriptions'])) : ?>
            <track kind="descriptions" src="<?php echo esc_url($atts['descriptions']); ?>"/>
        <?php endif; ?>
        Your browser does not support the video tag.
    </video>
    <?php
    return ob_get_clean();
}
add_shortcode('custom_video', 'custom_video_shortcode');
add_action('wp_ajax_fetch_attachment_id_by_url', 'fetch_attachment_id_by_url');

function fetch_attachment_id_by_url() {
    if (isset($_POST['image_url'])) {
        global $wpdb;

        $image_url = esc_url_raw($_POST['image_url']);
        $query = $wpdb->prepare("SELECT ID FROM {$wpdb->posts} WHERE guid = %s", $image_url);
        $attachment_id = $wpdb->get_var($query);

        if ($attachment_id) {
            wp_send_json_success(['id' => $attachment_id]);
        } else {
            wp_send_json_error('Attachment not found');
        }
    }
    wp_die();
}
