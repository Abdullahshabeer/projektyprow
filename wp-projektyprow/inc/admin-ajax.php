<?php
function ajax_fetch_filtered_posts() {
    // Retrieve category and post type from AJAX request
    $post_type = isset($_POST['post_type']) && $_POST['post_type'] ? sanitize_text_field($_POST['post_type']) : array('projektyinwestycyjne', 'projekty_leader');
    $posts_per_page = isset($_POST['posts_per_page']) ? intval($_POST['posts_per_page']) : 3;

    // Prepare query arguments
    $args = array(
        'post_type' => is_array($post_type) ? $post_type : array($post_type),
        'posts_per_page' => $posts_per_page,
        'meta_query'     => array(
            array(
                'key'     => 'praktyki', // ACF field name
                'value'   => 'Nie', // Value to check for
                'compare' => '!=', // Exclude posts with this value
            ),
        ),
    );

    // Query the posts
    $custom_query = new WP_Query($args);

    ob_start();

    if ($custom_query->have_posts()) :
        while ($custom_query->have_posts()) : $custom_query->the_post();

        $thumbnail_id = get_post_thumbnail_id( get_the_ID() );
            
        // Get the alt text for the thumbnail image
        $thumbnail_alt = get_post_meta( $thumbnail_id, '_wp_attachment_image_alt', true );
        
        // Fallback to post title if alt text is not set
        $alt_text = $thumbnail_alt ? $thumbnail_alt : '';
        $categories = get_the_category(get_the_ID());
            
        $post_type = get_post_type();  
                $custom_value = ''; 
				$class 			= '';
                if ($post_type == 'projektyinwestycyjne') {  
                    $custom_value 	= '#7E115E';
					$class 			= "projekty-inwestycyjne";
                } elseif ($post_type == 'projekty_leader') {  
                    $custom_value 	= '#004A48';  
					$class 			= "projekty-leader";
                }  
            ?>
             <div class="item">
                <div class="article-card <?php echo $class; ?>">
                    <a href="<?php the_permalink(); ?>" class="d-flex flex-column-reverse">
                        <div class="article-featured-img">
                            <?php the_post_thumbnail('custom-thumbnail', array('alt' => esc_attr($alt_text),'aria-hidden' => 'true')); ?>
                        </div>
                        <div class="article-content">
                            <div class="article-top">
                                <div class="title-icon">
                                    <h3><?php the_title(); ?></h3>
                                    <div class="icon">
                                        <svg width="24" height="29" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.78003 23.4658L8.31636 28.1002C8.2727 28.2388 8.14436 28.3332 7.9987 28.3332H1.9987C1.8927 28.3332 1.7927 28.2825 1.7297 28.1968C1.6667 28.1112 1.6487 28.0008 1.68103 27.8995L4.0457 20.4115C4.12603 20.5988 4.19936 20.8088 4.2717 21.0165C4.5167 21.7212 4.79436 22.5195 5.49703 22.9262C6.19003 23.3272 7.01437 23.1708 7.7407 23.0338C8.1997 22.9468 8.67403 22.8575 8.97836 22.9388C9.2107 23.0005 9.49437 23.2228 9.78003 23.4658ZM19.9517 20.4112C19.8714 20.5985 19.7977 20.8088 19.7254 21.0168C19.4804 21.7212 19.2027 22.5198 18.5004 22.9262C17.8074 23.3272 16.983 23.1715 16.2567 23.0338C15.797 22.9468 15.3227 22.8582 15.019 22.9385C14.7867 23.0008 14.503 23.2228 14.2174 23.4658L15.6807 28.1002C15.7247 28.2388 15.853 28.3332 15.9987 28.3332H21.9987C22.1047 28.3332 22.2047 28.2825 22.2677 28.1968C22.3307 28.1112 22.3487 28.0008 22.3164 27.8995L19.9517 20.4112ZM18.9987 11.6665C18.9987 15.5262 15.8584 18.6665 11.9987 18.6665C8.13903 18.6665 4.9987 15.5262 4.9987 11.6665C4.9987 7.80685 8.13903 4.66651 11.9987 4.66651C15.8584 4.66651 18.9987 7.80685 18.9987 11.6665ZM16.3147 10.2832C16.275 10.1648 16.1724 10.0785 16.049 10.0595L13.4607 9.66385L12.3004 7.19151C12.2454 7.07485 12.128 6.99985 11.9987 6.99985C11.8694 6.99985 11.752 7.07485 11.697 7.19151L10.5367 9.66385L7.94836 10.0595C7.82503 10.0785 7.72236 10.1645 7.6827 10.2832C7.64303 10.4018 7.67303 10.5322 7.76003 10.6218L9.63303 12.5415L9.00703 15.2585C8.97803 15.3848 9.02503 15.5165 9.12703 15.5965C9.22903 15.6762 9.3687 15.6895 9.4837 15.6302L11.9987 14.3412L14.5134 15.6295C14.561 15.6545 14.6137 15.6665 14.6654 15.6665C14.7384 15.6665 14.8107 15.6428 14.87 15.5962C14.9724 15.5165 15.019 15.3845 14.99 15.2582L14.364 12.5412L16.237 10.6215C16.3247 10.5322 16.3544 10.4015 16.3147 10.2832ZM21.9824 14.3435C21.8227 14.9402 21.941 15.5665 22.0557 16.1725C22.15 16.6708 22.257 17.2362 22.104 17.5005C21.9457 17.7738 21.396 17.9655 20.9107 18.1338C20.334 18.3345 19.737 18.5418 19.3064 18.9725C18.8744 19.4048 18.667 20.0015 18.4664 20.5785C18.2974 21.0638 18.1064 21.6132 17.8334 21.7715C17.8 21.7905 17.7004 21.8482 17.4414 21.8482C17.1664 21.8482 16.8304 21.7848 16.5054 21.7232C16.1327 21.6525 15.711 21.5728 15.3057 21.5728C15.0764 21.5728 14.8707 21.5978 14.678 21.6488C14.099 21.8042 13.6277 22.2115 13.1717 22.6058C12.758 22.9638 12.331 23.3332 11.9987 23.3332C11.6657 23.3332 11.2387 22.9638 10.8254 22.6058C10.3694 22.2115 9.8977 21.8038 9.32136 21.6502C9.12803 21.5985 8.92103 21.5735 8.6897 21.5735C8.2857 21.5735 7.86403 21.6532 7.49203 21.7238C7.16536 21.7855 6.82936 21.8488 6.5547 21.8488C6.2967 21.8488 6.1967 21.7908 6.16403 21.7722C5.89036 21.6135 5.6987 21.0638 5.53036 20.5785C5.3297 20.0018 5.12236 19.4048 4.6917 18.9742C4.25936 18.5422 3.6627 18.3348 3.0857 18.1342C2.60036 17.9652 2.05103 17.7742 1.8927 17.5012C1.74003 17.2368 1.8467 16.6722 1.94103 16.1735C2.05603 15.5642 2.1737 14.9395 2.0147 14.3438C1.86036 13.7675 1.4527 13.2958 1.0587 12.8402C0.701365 12.4258 0.332031 11.9988 0.332031 11.6665C0.332031 11.3335 0.701365 10.9065 1.05936 10.4932C1.4537 10.0372 1.86136 9.56551 2.01503 8.98918C2.1747 8.39251 2.05636 7.76618 1.9417 7.16018C1.84736 6.66185 1.74036 6.09651 1.89336 5.83218C2.0517 5.55885 2.60136 5.36718 3.0867 5.19885C3.66336 4.99818 4.26036 4.79085 4.69103 4.36018C5.12303 3.92785 5.33036 3.33118 5.53103 2.75418C5.70003 2.26885 5.89103 1.71951 6.16403 1.56118C6.19736 1.54218 6.29736 1.48418 6.55637 1.48418C6.83203 1.48418 7.16736 1.54785 7.4917 1.60951C7.8637 1.67985 8.28436 1.75951 8.6917 1.75951C8.92036 1.75951 9.12436 1.73518 9.31636 1.68451C9.89837 1.52851 10.3697 1.12118 10.8254 0.726847C11.2394 0.369181 11.6664 -0.000152588 11.9987 -0.000152588C12.3317 -0.000152588 12.7587 0.369181 13.172 0.727181C13.628 1.12151 14.0997 1.52918 14.676 1.68285C14.869 1.73418 15.0754 1.75951 15.3067 1.75951C15.709 1.75951 16.1317 1.67985 16.5044 1.60951C16.8307 1.54751 17.1674 1.48418 17.442 1.48418C17.7 1.48418 17.8004 1.54218 17.833 1.56085C18.1067 1.71951 18.2984 2.26918 18.4667 2.75451C18.6674 3.33118 18.8747 3.92818 19.3054 4.35885C19.7377 4.79085 20.3344 4.99818 20.9114 5.19885C21.3967 5.36785 21.946 5.55885 22.1044 5.83185C22.257 6.09618 22.1504 6.66085 22.056 7.15951C21.941 7.76885 21.8234 8.39351 21.9824 8.98918C22.1367 9.56551 22.5444 10.0372 22.9384 10.4928C23.296 10.9072 23.6654 11.3342 23.6654 11.6665C23.6654 11.9995 23.296 12.4265 22.938 12.8398C22.544 13.2958 22.136 13.7675 21.9824 14.3435ZM20.332 11.6665C20.332 7.07151 16.5937 3.33318 11.9987 3.33318C7.4037 3.33318 3.66536 7.07151 3.66536 11.6665C3.66536 16.2615 7.4037 19.9998 11.9987 19.9998C16.5937 19.9998 20.332 16.2615 20.332 11.6665Z" fill="<?php echo esc_attr($custom_value); ?>"/>
                                        </svg>
                                    </div>
                                </div>
                                <?php 
                                $beneficjent = get_field('beneficjent_text_with_icon', get_the_ID());
                                $dofinansowania = get_field('dofinansowania_z_efrrow', get_the_ID());
                                $valueprojects = get_field('value_of_projects:', get_the_ID());
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
                            <div class="web-btn d-flex link-btn">
                                    <span><?php esc_html_e('zobacz szczegóły', 'prow'); ?></span>
                                <div class="icon">
                                    <img decoding="async" src="<?php echo get_stylesheet_directory_uri(); ?>/images/right.svg" alt="<?php _e('icon', 'prow') ?>" aria-hidden="true">
                                </div>    
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <?php
        endwhile;
    else :
        echo '<div class="parentnone">No posts found.</div>';
    endif;

    wp_reset_postdata();
    $output = ob_get_clean();
    echo $output;
    wp_die();
}

add_action('wp_ajax_fetch_filtered_posts', 'ajax_fetch_filtered_posts');
add_action('wp_ajax_nopriv_fetch_filtered_posts', 'ajax_fetch_filtered_posts');


function ajax_fetch_filtered_poststype() {
    // Retrieve category, post type, and search query from AJAX request
    $post_type = isset($_POST['post_type']) && $_POST['post_type'] ? sanitize_text_field($_POST['post_type']) : array('projektyinwestycyjne', 'projekty_leader');
    $search_query = isset($_POST['search_query']) ? sanitize_text_field($_POST['search_query']) : '';
    $paged = isset($_POST['paged']) ? intval($_POST['paged']) : 1;

    $args = array(
        'post_type'      => is_array($post_type) ? $post_type : array($post_type),
        'posts_per_page' => 12,
        's'              => $search_query,
        'paged'          => $paged,
        'meta_query'     => array(
            array(
                'key'     => 'praktyki', // ACF field name
                'value'   => 'Nie', // Value to check for
                'compare' => '!=', // Exclude posts with this value
            ),
        ),
    );

    // Query the posts
    $custom_query = new WP_Query($args);

    if ($custom_query->have_posts()) : ?>
        <div class="articles-wrap">
            <div class="row">
                <?php while ($custom_query->have_posts()) : $custom_query->the_post(); 
                    $post_type = get_post_type();  
                    $custom_color = ($post_type == 'projektyinwestycyjne') ? '#7E115E' : '#004A48'; 
                    $class 		  = ($post_type == 'projektyinwestycyjne') ? 'projekty-inwestycyjne' : 'projekty-leader'; 
                    $thumbnail_id = get_post_thumbnail_id(get_the_ID());
                    $alt_text = get_post_meta($thumbnail_id, '_wp_attachment_image_alt', true) ?: get_the_title();
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
                                            <p><span><span><?php echo !empty($dofinansowania['label']) ? $dofinansowania['label'] : 'wartość dofinansowania z EFRROW:'; ?></span><?php 
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
                <?php endwhile; ?>
            </div>
        </div>
        <div class="pagination-wrap">
            <div class="pagination-inner justify-content-center" role="navigation">
                <?php
                echo paginate_links(array(
                    'total'     => $custom_query->max_num_pages,
                    'current'   => $paged,
                    'format'    => '?paged=%#%',
                    'prev_text' => __('&#8592;', 'prow'),
                    'next_text' => __('&#8594;', 'prow'),
                    'base'      => '#',
                    'add_args'  => array(
                        'action'       => 'fetch_filtered_poststype',
                        'post_type'    => $post_type,
                        'search_query' => $search_query,
                    ),
                ));
                ?>
            </div>
        </div>
    <?php else :
        echo '<div class="parentnone">No posts found.</div>';
    endif;

    wp_die();
}
add_action('wp_ajax_fetch_filtered_poststype', 'ajax_fetch_filtered_poststype');
add_action('wp_ajax_nopriv_fetch_filtered_poststype', 'ajax_fetch_filtered_poststype');

add_action('wp_ajax_fetch_child_categories', 'fetch_child_categories');
add_action('wp_ajax_nopriv_fetch_child_categories', 'fetch_child_categories');

function fetch_child_categories() {
    if (!isset($_POST['parent_category']) || empty($_POST['parent_category'])) {
        wp_send_json_error('Invalid category.');
    }

    $parent_slug = sanitize_text_field($_POST['parent_category']);
    $taxonomy = 'inwestycyjne-categories'; // Replace with your taxonomy slug

    $parent_term = get_term_by('name', $parent_slug, $taxonomy);

    if (!$parent_term) {
        wp_send_json_error('Parent category not found.');
    }

    $child_terms = get_terms([
        'taxonomy' => $taxonomy,
        'parent' => $parent_term->term_id,
        'hide_empty' => false,
    ]);

    if (is_wp_error($child_terms) || empty($child_terms)) {
        wp_send_json_error('No child categories found.');
    }

    $data = [];
    foreach ($child_terms as $term) {
        $data[] = [
            'id' => $term->term_id,
            'slug' => $term->slug,
            'name' => $term->name,
        ];
    }

    wp_send_json_success($data);
}
add_action('wp_ajax_fetch_child_categories_second_postype', 'fetch_child_categories_second_postype');
add_action('wp_ajax_nopriv_fetch_child_categories_second_postype', 'fetch_child_categories_second_postype');
function fetch_child_categories_second_postype() {
    if (!isset($_POST['parent_category']) || empty($_POST['parent_category'])) {
        wp_send_json_error('Invalid category.');
    }

    $parent_slug = sanitize_text_field($_POST['parent_category']);
    $taxonomy = 'leader_categories'; // Replace with your taxonomy slug

    $parent_term = get_term_by('name', $parent_slug, $taxonomy);

    if (!$parent_term) {
        wp_send_json_error('Parent category not found.');
    }

    $child_terms = get_terms([
        'taxonomy' => $taxonomy,
        'parent' => $parent_term->term_id,
        'hide_empty' => false,
    ]);

    if (is_wp_error($child_terms) || empty($child_terms)) {
        wp_send_json_error('No Gmina found.');
    }

    $data = [];
    foreach ($child_terms as $term) {
        $data[] = [
            'id' => $term->term_id,
            'slug' => $term->slug,
            'name' => $term->name,
        ];
    }

    wp_send_json_success($data);
}

?>