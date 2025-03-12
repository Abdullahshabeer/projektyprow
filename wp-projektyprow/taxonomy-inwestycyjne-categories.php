<?php
/*
Template Name: Inwestycyjne Categories
*/

get_header(); // Include the header

$term = get_queried_object();

$query_args = array(
    'post_type' => 'projektyinwestycyjne',
    'posts_per_page' => -1,
    'tax_query' => array(
        array(
            'taxonomy' => 'inwestycyjne-categories',
            'field' => 'term_id',
            'terms' => $term->term_id,
        ),
    ),
);

$term_query = new WP_Query($query_args);
$child_terms = get_terms(array(
    'taxonomy' => 'inwestycyjne-categories',
    'parent' => $term->term_id,
    'hide_empty' => false, // Include terms even if they have no posts
));

$is_first_level = true;
$is_second_level = true;

if (!empty($child_terms) && !is_wp_error($child_terms)) {
    foreach ($child_terms as $child_term) {
        // Check the parent term of each child term
        $parent_term = get_term($child_term->parent);

        if ($parent_term && $parent_term->parent != 0) {
            $is_first_level = false; // Not first level if the parent has a parent
        }
        if ($parent_term && $parent_term->parent != 0 && $parent_term->parent != 1) {
            $is_second_level = false; // Not second level if the grandparent exists
        }
    }
}
$parent_id="";
if ($term->parent != 0) {
    // $classid = "has-parent"; // Add class if the term itself has a parent
    $parent_id = $term->parent; // Get the parent term ID
    // echo '<p>Parent ID: ' . esc_html($parent_id) . '</p>'; // Display the parent ID
}

if ($is_first_level) {
    $message = __('województwo łódzkie', 'prow');
    $messageu = __('województwo łódzki', 'prow');
} elseif ($is_second_level) {
    $message = sprintf(__('powiat %s', 'prow'), esc_html($term->name));
    $messageu = sprintf(__('powiatu %s', 'prow'), esc_html($term->name));
} else {
    $message = sprintf(__('powiat %s', 'prow'), esc_html($term->name));
    $messageu = sprintf(__('powiatu %s', 'prow'), esc_html($term->name));
}

// Prepare taxonomy counts
$taxonomy_counts = array();
$class="";
if (!empty($child_terms) && !is_wp_error($child_terms)) {
    foreach ($child_terms as $location) {
        $query_args = array(
            'post_type' => 'projektyinwestycyjne',
            'tax_query' => array(
                'relation' => 'AND',
                array(
                    'taxonomy' => 'inwestycyjne-categories',
                    'field' => 'term_id',
                    'terms' => $location->term_id,
                ),
            ),
        );

        $location_query = new WP_Query($query_args);
        $taxonomy_counts[$location->term_id] = $location_query->found_posts;

        wp_reset_postdata(); // Reset post data to prevent conflicts
    }
} else {
    $message = sprintf(__('gmina %s', 'prow'), esc_html($term->name));
    $messageu = sprintf(__('gminy %s', 'prow'), esc_html($term->name));
    $class="gminy";
    // No child terms, count posts for the current category
    $query_args = array(
        'post_type' => 'projektyinwestycyjne',
        'tax_query' => array(
            array(
                'taxonomy' => 'inwestycyjne-categories',
                'field' => 'term_id',
                'terms' => $term->term_id,
            ),
        ),
    );

    $location_query = new WP_Query($query_args);
    $taxonomy_counts[$term->term_id] = $location_query->found_posts;

    wp_reset_postdata(); // Reset post data to prevent conflicts
}

// Pass taxonomy counts to JavaScript
echo '<script>const taxonomyCounts = ' . json_encode($taxonomy_counts) . ';</script>';

?>
<section class="sub-page-header light-bg">
          <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    <div class="header-content">
                        <div class="bread-crumbs">
                            <ul>
                                <li>
                                    <a href="<?php echo get_home_url(); ?>/leader-categories/lokalne-grupy-dzialania/">
                                        <span class="visually-hidden">Home</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.12931 0.185732C5.30287 0.0121657 5.58428 0.0121657 5.75785 0.185732L10.2023 4.63018C10.2856 4.71353 10.3325 4.82657 10.3325 4.94445V10.5C10.3325 10.7455 10.1335 10.9444 9.88802 10.9444H0.999132C0.753672 10.9444 0.554688 10.7455 0.554688 10.5V4.94445C0.554688 4.82657 0.601513 4.71353 0.684862 4.63018L5.12931 0.185732ZM1.44358 5.12854V10.0556H9.44358V5.12854L5.44358 1.12854L1.44358 5.12854Z" fill="#1B1B1B"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.77951 6.5V10.5C4.77951 10.7455 4.58053 10.9444 4.33507 10.9444C4.08961 10.9444 3.89062 10.7455 3.89062 10.5V6.5C3.89062 6.32539 3.91853 6.13927 3.99866 5.97902C4.07845 5.81944 4.25714 5.61111 4.55729 5.61111H6.33507C6.63522 5.61111 6.81392 5.81944 6.8937 5.97902C6.97383 6.13927 7.00174 6.32539 7.00174 6.5V10.5C7.00174 10.7455 6.80275 10.9444 6.55729 10.9444C6.31183 10.9444 6.11285 10.7455 6.11285 10.5V6.5H4.77951Z" fill="#1B1B1B"/>
                                        </svg>
                                    </a>
                                </li>
                                <li>Projekty inwestycyjne dofinansowane w ramach PROW 2014-2020</li>
                            </ul>
                        </div>
                        <div class="page-title d-flex">
                            <h1>Projekty inwestycyjne dofinansowane w ramach PROW 2014-2020</h1>
                        </div>
                    </div>
                </div>

             </div>
            </div>
        </section> 
    <section class="main-wrap">
        <div class="container">
            <div class="map-wrap">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="map-left-sec">
                            <div class="map-top-sec parent-id-<?php echo esc_html($parent_id) ?>">
                            <?php 
                           
                                if ($term && !is_wp_error($term)) {
                                    echo '<div class="web-heading"><h2>' . $message . '</h2></div>';
                                
                                    $term_image = get_field('add_svg', $term);
                                
                                    if ($term_image) {
                                        $term_svg_url = $term_image['url'];
                                    
                                        // Fetch the SVG content using WordPress HTTP API
                                        $response = wp_remote_get($term_svg_url, array('sslverify' => false));
                                    
                                        // Check for errors
                                        if (is_wp_error($response)) {
                                            error_log('SVG Fetch Error: ' . $response->get_error_message());
                                            echo 'Error retrieving SVG content.';
                                        } else {
                                            // Get the body of the response (SVG content)
                                            $svg_content = wp_remote_retrieve_body($response);
                                    
                                            if (!empty($svg_content)) {
                                                // Add the SVG and the buttons
                                                echo '<div class="svg-container d-none d-lg-block '.$class.'">';
                                                
                                                // Zoom and print buttons
                                                echo '<div class="svg-controls">';
                                                echo '<div class="svg-control-left">';
                                                echo '<button class="btn btn-zoom-in" title="Powiększ mapę"><span>+</span></button>';
                                                echo '<button class="btn btn-zoom-out" title="Pomniejsz mapę"><span>-</span></button>';
                                                echo '</div>';
                                                echo '<div class="svg-control-right">';
												echo '<button class="btn-print"><img src=" '. get_stylesheet_directory_uri().'/images/print-icon.svg" alt="drukuj"></button>';
                                                echo '</div>';
                                                echo '</div>';
                                                
                                                // SVG content
                                                echo '<div class="map-view-wrap" aria-hidden="true" role="presentation"><div class="map-view svg-wrapper">' . $svg_content . '</div> </div>';
                                                
                                                echo '</div>';
                                            } else {
                                                echo 'SVG content is empty.';
                                            }
                                        }
                                    }
                                    
                                ?>
                                  <?php
                                    if (!empty($child_terms) && !is_wp_error($child_terms)) { ?>
                                        <div class="information-sec">
                                        <div class="web-heading">
                                            <h2><?php _e('Informacje', 'prow') ?></h2>
                                        </div>
                                        <ul>
                                        <?php
                                            $area = get_field('area', $term);
                                            $population = get_field('population', $term);
                                            $weblink = get_field('website_:_link_url_link', $term);
                                            if ($area) {
                                            echo '<li> <span>powierzchnia</span><span><b>'.($area).'</b></span> </li>  ';
                                            }
                                            if ($population) {
                                                echo '<li> <span>liczba ludności</span><span><b>'.($population).'</b></span> </li>  ';
                                            }
                                            if ($weblink) { ?> 
                                            <li>
                                                <span><?php _e('strona internetowa:', 'prow') ?></span>
                                                <span>
                                                    <div class="web-btn d-flex">
                                                        <a href=" <?php echo $weblink ?> " class="link-btn">
                                                            <span><?php _e('Przejdź:', 'prow') ?></span>
                                                            <div class="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                <path d="M7.25 17.875H3.75C3.28587 17.875 2.84075 17.6906 2.51256 17.3624C2.18437 17.0342 2 16.5891 2 16.125V3.875C2 3.41087 2.18437 2.96575 2.51256 2.63756C2.84075 2.30937 3.28587 2.125 3.75 2.125H7.25" stroke="#004A48" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                                                <path d="M13.375 14.375L17.75 10L13.375 5.625" stroke="#004A48" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                                                <path d="M17.75 10H7.25" stroke="#004A48" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                                                </svg>
                                                            </div>    
                                                        </a>
                                                    </div>
                                                </span>
                                            </li>
                                            <?php }?>
                                        </ul>
                                    </div>
                                    <?php
                                    }?>
                                
                                <?php } ?>
                                <?php 
                                // Get the current category's term_id from the URL
                                $term_id = get_queried_object_id(); // This gets the current term_id (category) being viewed
                                if ($term_id == 28) {
                                    // Query for all posts of type 'projektyinwestycyjne' without taxonomy filtering
                                    $result = $wpdb->get_row("
                                    SELECT 
                                           COUNT(DISTINCT p.ID) AS total_posts,
                                            SUM(CAST(REPLACE(pm.meta_value, ',', '') AS DECIMAL(15, 2))) AS total_eafrd_funding,
                                            SUM(CAST(REPLACE(pm2.meta_value, ',', '') AS DECIMAL(15, 2))) AS total_project_value
                                        FROM {$wpdb->posts} p
                                        LEFT JOIN {$wpdb->postmeta} pm ON pm.post_id = p.ID AND pm.meta_key = 'value_of_eafrd_funding'
                                        LEFT JOIN {$wpdb->postmeta} pm2 ON pm2.post_id = p.ID AND pm2.meta_key = 'value_of_projects:'
                                        WHERE p.post_type = 'projektyinwestycyjne'
                                        AND p.post_status = 'publish';
                                    ");
                                } else {
                                // Prepare a list of term IDs to include in the query (parent + child terms)
                                $term_ids = array($term_id); // Start with the parent term ID

                                // Add child term IDs to the list
                                foreach ($child_terms as $child_term) {
                                    $term_ids[] = $child_term->term_id;
                                }

                                // Query for the total values of posts, EAFRD funding, and project value filtered by the term IDs (parent + child terms)
                                $result = $wpdb->get_row("
                                SELECT 
                                       COUNT(DISTINCT p.ID) AS total_posts,
                                        SUM(CAST(REPLACE(CASE WHEN pm.meta_key = 'value_of_eafrd_funding' THEN pm.meta_value ELSE 0 END, ',', '') AS DECIMAL(15, 2))) AS total_eafrd_funding,
                                        SUM(CAST(REPLACE(CASE WHEN pm.meta_key = 'value_of_projects:' THEN pm.meta_value ELSE 0 END, ',', '') AS DECIMAL(15, 2))) AS total_project_value
                                    FROM {$wpdb->postmeta} pm
                                    INNER JOIN {$wpdb->posts} p ON pm.post_id = p.ID
                                    LEFT JOIN {$wpdb->term_relationships} tr ON p.ID = tr.object_id
                                    LEFT JOIN {$wpdb->term_taxonomy} tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
                                    WHERE pm.meta_key IN ('value_of_eafrd_funding', 'value_of_projects:')
                                    AND p.post_type = 'projektyinwestycyjne'
                                    AND p.post_status = 'publish'
                                    AND tt.term_id IN (" . implode(",", $term_ids) . ");
                                   
                                ");
                            }
                            function format_number_custom($number) {
                                // Format the number with PHP's number_format() function
                                $formatted = number_format($number, 2, ',', ' ');
                                return $formatted;
                            }
                                ?>

                                <div class="map-bottom-content">
                                    <p>
                                        <?php _e('Całkowita wartość projektów:', 'prow'); ?> 
                                        <b><?php echo format_number_custom($result->total_project_value, 2, ',', ' '); ?><?php _e(' zł', 'prow'); ?></b>
                                    </p>
                                    <p>
                                        <?php _e('Całkowita wartość dofinansowania z EFRROW:', 'prow'); ?> 
                                        <b><?php echo format_number_custom($result->total_eafrd_funding, 2, ',', ' '); ?><?php _e(' zł', 'prow'); ?></b>
                                    </p>
                                    <p><?php _e('Na obszarze ', 'prow'); echo $messageu;?>ego <?php_e(' zrealizowano', 'prow'); ?>  <b><?php echo number_format($result->total_posts); ?></b><?php _e(' projektów:', 'prow'); ?></p>
                                    
                                    <div class="map-projects-list">
                                        <ul class="disnone">
                                            <?php
                                                $term = get_queried_object();
                                                if ($term_id == 28) {
                                                    echo '<li></li>';
                                                    // Prepare the query without filtering by `leader_categories`
                                                    $query = "
                                                     SELECT   
                                                pt.name AS project_category,   
                                                tm_icon.meta_value AS category_icon,  -- Fetch the icon from termmeta
                                                tm_order.meta_value AS project_oder, -- Fetch the order from termmeta
                                                COUNT(p.ID) AS total_posts,         -- Count of posts in each category
                                               SUM(
                                                    (SELECT CAST(REPLACE(REPLACE(pm.meta_value, ',', ''), '.', '.') AS DECIMAL(10,2)) 
                                                    FROM {$wpdb->postmeta} pm 
                                                    WHERE pm.post_id = p.ID AND pm.meta_key = 'value_of_projects:')
                                                ) AS total_project_value,             
                                                SUM(
                                                    (SELECT CAST(REPLACE(REPLACE(pm.meta_value, ',', ''), '.', '.') AS DECIMAL(10,2)) 
                                                    FROM {$wpdb->postmeta} pm 
                                                    WHERE pm.post_id = p.ID AND pm.meta_key = 'value_of_eafrd_funding')
                                                ) AS total_eafrd_funding    
                                            FROM   
                                                {$wpdb->posts} p   
                                            INNER JOIN   
                                                {$wpdb->term_relationships} ptr ON p.ID = ptr.object_id   
                                            INNER JOIN   
                                                {$wpdb->term_taxonomy} ptt ON ptr.term_taxonomy_id = ptt.term_taxonomy_id AND ptt.taxonomy = 'project-categories'   
                                            INNER JOIN   
                                                {$wpdb->terms} pt ON ptt.term_id = pt.term_id   
                                            LEFT JOIN   
                                                {$wpdb->termmeta} tm_icon ON pt.term_id = tm_icon.term_id AND tm_icon.meta_key = 'categgories_icon' -- Join termmeta for icon
                                            LEFT JOIN   
                                                {$wpdb->termmeta} tm_order ON pt.term_id = tm_order.term_id AND tm_order.meta_key = 'project_oder' -- Join termmeta for order
                                            WHERE   
                                                p.post_status = 'publish' AND   
                                                p.post_type = 'projektyinwestycyjne'
                                            GROUP BY   
                                                pt.name, tm_icon.meta_value, tm_order.meta_value
                                                    ";
                                                } else {
                                                $child_terms = get_terms(array(
                                                    'taxonomy' => 'inwestycyjne-categories',
                                                    'parent' => $term->term_id,
                                                    'hide_empty' => false,
                                                ));
                                                
                                                $term_ids = array($term->term_id);
                                                foreach ($child_terms as $child_term) {
                                                    $term_ids[] = $child_term->term_id;
                                                }
                                                // Ensure you correctly generate placeholders for term IDs
                                                $placeholders = implode(',', array_fill(0, count($term_ids), '%d'));

                                                // Prepare the query
                                                $query = $wpdb->prepare(
                                                    "
                                                         SELECT   
                                                        pt.name AS project_category,   
                                                    tm_icon.meta_value AS category_icon,  -- Fetch the icon from termmeta
                                                    tm_order.meta_value AS project_oder, -- Fetch the order from termmeta
                                                    COUNT(p.ID) AS total_posts,          -- Count of posts in each category
                                                   SUM(
                                                    (SELECT CAST(REPLACE(REPLACE(pm.meta_value, ',', ''), '.', '.') AS DECIMAL(10,2)) 
                                                    FROM {$wpdb->postmeta} pm 
                                                    WHERE pm.post_id = p.ID AND pm.meta_key = 'value_of_projects:')
                                                ) AS total_project_value,             
                                                SUM(
                                                    (SELECT CAST(REPLACE(REPLACE(pm.meta_value, ',', ''), '.', '.') AS DECIMAL(10,2)) 
                                                    FROM {$wpdb->postmeta} pm 
                                                    WHERE pm.post_id = p.ID AND pm.meta_key = 'value_of_eafrd_funding')
                                                ) AS total_eafrd_funding    
                                                FROM   
                                                    {$wpdb->posts} p   
                                                INNER JOIN   
                                                    {$wpdb->term_relationships} tr ON p.ID = tr.object_id   
                                                INNER JOIN   
                                                    {$wpdb->term_taxonomy} tt ON tr.term_taxonomy_id = tt.term_taxonomy_id   
                                                INNER JOIN   
                                                    {$wpdb->terms} t ON tt.term_id = t.term_id   
                                                LEFT JOIN   
                                                    {$wpdb->term_relationships} ptr ON p.ID = ptr.object_id   
                                                LEFT JOIN   
                                                    {$wpdb->term_taxonomy} ptt ON ptr.term_taxonomy_id = ptt.term_taxonomy_id AND ptt.taxonomy = 'project-categories'   
                                                LEFT JOIN   
                                                    {$wpdb->terms} pt ON ptt.term_id = pt.term_id   
                                                LEFT JOIN   
                                                    {$wpdb->termmeta} tm_icon ON pt.term_id = tm_icon.term_id AND tm_icon.meta_key = 'categgories_icon' -- Join termmeta for icon
                                                LEFT JOIN   
                                                    {$wpdb->termmeta} tm_order ON pt.term_id = tm_order.term_id AND tm_order.meta_key = 'project_oder' -- Join termmeta for order
                                                WHERE   
                                                    p.post_status = 'publish' AND   
                                                    p.post_type = 'projektyinwestycyjne' AND   
                                                    tt.taxonomy = 'inwestycyjne-categories' AND   
                                                    tt.term_id IN ($placeholders)   
                                                GROUP BY   
                                                    pt.name, tm_icon.meta_value, tm_order.meta_value
                                                    ",
                                                    ...$term_ids // Unpack the array to pass as individual values to the placeholders
                                                );
                                            }
                                                // Execute the query and get the results
                                               $results = $wpdb->get_results($query);

                                                // Sort the results by `project_order`
                                                usort($results, function($a, $b) {
                                                    return $a->project_oder <=> $b->project_oder;
                                                });
                                                
                                                // Display the results
                                                foreach ($results as $category) {
                                                    // Skip the entry if it's the "all" category
                                                    if (empty($category->project_category) || strtolower(trim($category->project_category)) === 'all') {
                                                        continue;
                                                    }   
                                                
                                                    // Get category icon URL
                                                    $icon_url = wp_get_attachment_url($category->category_icon);
                                                
                                                    // Display category details
                                                   
                                                    echo '<li>';  
                                                    if ($icon_url) {
                                                        echo '<div class="icon "><img src="' . esc_url($icon_url) . '" alt="" aria-hidden="true"></div>';
                                                    }
                                                    echo '<div class="content">
                                                            <p><b>' . number_format($category->total_posts) . '</b> ' . esc_html($category->project_category) . '<br>
                                                            Wartość projektów: <b>' . number_format($category->total_project_value, 2, ',', ' ') . ' zł</b><br>
                                                            Wartość dofinansowania z EFRROW: <b>' . number_format($category->total_eafrd_funding, 2, ',', ' ') . ' zł</b></p>
                                                          </div>';
                                                    echo '</li>';
                                                   
                                                }
                                                
                                            ?>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                   
                    <div class="col-lg-4 d-none d-lg-block">
                        <div class="map-right-sec">
                            <div class="map-sidebar">

                            <?php

                            if (!empty($child_terms) && !is_wp_error($child_terms)) { 
                              
                           

                            // Display heading based on the level
                            if ($is_first_level) { ?>
                                <div class="web-heading">
                                    <h2><?php _e('Powiaty', 'prow'); ?></h2>
                                </div>
                            <?php } else { ?>
                                <div class="web-heading">
                                    <h2><?php _e('Gminy', 'prow'); ?></h2>
                                </div>
                                 <?php }
                                ?>
                                <div class="map-menu"> 
                                    <?php 
                                        echo '<ul>';
                                        foreach ($child_terms as $child) {
                                            // Fetch all descendant terms (child + sub-child)
                                            $descendant_terms = get_term_children($child->term_id, 'inwestycyjne-categories');

                                            // Include the current term in the list
                                            $all_terms = array_merge(array($child->term_id), $descendant_terms);
                                            
                                            // Count posts for the current term and its descendants
                                            $post_count = (int) wp_count_posts_in_term('projektyinwestycyjne', $all_terms, 'inwestycyjne-categories');

                                            echo '<li>';
                                            echo '<a href="' . esc_url(get_term_link($child)) . '">' . esc_html($child->name) . ' (' . $post_count . ')</a>';
                                            echo '</li>';
                                        }
                                        echo '</ul>';
                                   
                                    ?>
                                </div>
                                    <?php 
                            }else{ ?>
                                <div class="information-sec">
                                <div class="web-heading">
                                    <h2><?php _e('Informacje', 'prow') ?></h2>
                                </div>
                                <ul>
                                   <?php
                                    $area = get_field('area', $term);
                                    $population = get_field('population', $term);
                                    $weblink = get_field('website_:_link_url_link', $term);
                                    if ($area) {
                                       echo '<li> <span>powierzchnia</span><span><b>'.($area).'</b></span> </li>  ';
                                    }
                                    if ($population) {
                                        echo '<li> <span>liczba ludności</span><span><b>'.($population).'</b></span> </li>  ';
                                     }
                                     if ($weblink) { ?> 
                                    <li>
                                        <span><?php _e('strona internetowa:', 'prow') ?></span>
                                        <span>
                                            <div class="web-btn d-flex">
                                                <a href=" <?php echo $weblink ?> " class="link-btn">
                                                    <span><?php _e('Przejdź:', 'prow') ?></span>
                                                    <div class="icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                        <path d="M7.25 17.875H3.75C3.28587 17.875 2.84075 17.6906 2.51256 17.3624C2.18437 17.0342 2 16.5891 2 16.125V3.875C2 3.41087 2.18437 2.96575 2.51256 2.63756C2.84075 2.30937 3.28587 2.125 3.75 2.125H7.25" stroke="#004A48" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M13.375 14.375L17.75 10L13.375 5.625" stroke="#004A48" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M17.75 10H7.25" stroke="#004A48" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </svg>
                                                    </div>    
                                                </a>
                                            </div>
                                        </span>
                                    </li>
                                    <?php }?>
                                </ul>
                            </div>
                            <?php } 
                                    // Check if the current page is a taxonomy page
                                    if (is_tax('inwestycyjne-categories')) {
                                        $term = get_queried_object(); // Get the current term object
                                        
                                        // If the term has a parent (parent term ID is not 0)
                                        if ($term->parent != 0) {
                                            $parent_term = get_term($term->parent, 'inwestycyjne-categories'); // Get the parent term
                                            
                                            if ($parent_term && !is_wp_error($parent_term)) {
                                                $parent_term_link = get_term_link($parent_term); // Get the parent term's URL
                                                echo '<div class="backbutton"><button class="back-button" onclick="window.location.href=\'' . esc_url($parent_term_link) . '\'">Wróć do ' . esc_html($parent_term->name) . '</button></div>';
                                            }
                                        }
                                    }
                                    ?>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="data-table-block">
                    <table class="table data-table" id="project-table">
                        <thead>
                            <tr>
                                <th class="all"><?php _e('Tytuł projektu', 'prow') ?></th>
								<th class="bigdesktop middesktop lg-none"><?php _e('Powiat', 'prow') ?></th>
                                <th class="bigdesktop middesktop lg-none"><?php _e('Gmina', 'prow') ?></th>
                                <th class="bigdesktop middesktop"><?php _e('Działanie', 'prow') ?></th>
                                <th class="bigdesktop middesktop"><?php _e('Typ operacji', 'prow') ?></th>
                                <th class="bigdesktop middesktop"><?php _e('Beneficjent', 'prow') ?></th>
                            </tr>
                        </thead>
                        <tbody>
                       <?php
                           if ($term_query->have_posts()) {
                                while ($term_query->have_posts()) {
                                    $term_query->the_post(); 
                                        $titleprojektu = get_field('projektu_text_with_icon', get_the_ID());
                                        $dzialanie = get_field('dzialanie_text_with_icon', get_the_ID());
                                        $typoperacji = get_field('typ_operacji_text_with_icon', get_the_ID());
                                        $beneficjent = get_field('beneficjent_text_with_icon', get_the_ID());
                                        $powiat = get_field('powiat_text_with_icon', get_the_ID());
                                        $gmina = get_field('gmina text_with_icon', get_the_ID());
                                        $zrealizowane = get_field('zrealizowane-', get_the_ID());
                                        $includes_photos = get_field('includes_photos', get_the_ID());
                                        $praktykios = get_field('praktyki', get_the_ID());

                                    if( !empty($titleprojektu['title'])){   
                                    ?>
                                  <tr class="<?php echo ($praktykios == 'Tak') ? 'secondary' : 'primary'; ?>">
                                   	
                                        <td>
                                            <?php if ($praktykios == 'Tak'): ?>
                                                <div class="success-icon">
                                                    <svg width="24" height="29" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9.78003 23.4658L8.31636 28.1002C8.2727 28.2388 8.14436 28.3332 7.9987 28.3332H1.9987C1.8927 28.3332 1.7927 28.2825 1.7297 28.1968C1.6667 28.1112 1.6487 28.0008 1.68103 27.8995L4.0457 20.4115C4.12603 20.5988 4.19936 20.8088 4.2717 21.0165C4.5167 21.7212 4.79436 22.5195 5.49703 22.9262C6.19003 23.3272 7.01437 23.1708 7.7407 23.0338C8.1997 22.9468 8.67403 22.8575 8.97836 22.9388C9.2107 23.0005 9.49437 23.2228 9.78003 23.4658ZM19.9517 20.4112C19.8714 20.5985 19.7977 20.8088 19.7254 21.0168C19.4804 21.7212 19.2027 22.5198 18.5004 22.9262C17.8074 23.3272 16.983 23.1715 16.2567 23.0338C15.797 22.9468 15.3227 22.8582 15.019 22.9385C14.7867 23.0008 14.503 23.2228 14.2174 23.4658L15.6807 28.1002C15.7247 28.2388 15.853 28.3332 15.9987 28.3332H21.9987C22.1047 28.3332 22.2047 28.2825 22.2677 28.1968C22.3307 28.1112 22.3487 28.0008 22.3164 27.8995L19.9517 20.4112ZM18.9987 11.6665C18.9987 15.5262 15.8584 18.6665 11.9987 18.6665C8.13903 18.6665 4.9987 15.5262 4.9987 11.6665C4.9987 7.80685 8.13903 4.66651 11.9987 4.66651C15.8584 4.66651 18.9987 7.80685 18.9987 11.6665ZM16.3147 10.2832C16.275 10.1648 16.1724 10.0785 16.049 10.0595L13.4607 9.66385L12.3004 7.19151C12.2454 7.07485 12.128 6.99985 11.9987 6.99985C11.8694 6.99985 11.752 7.07485 11.697 7.19151L10.5367 9.66385L7.94836 10.0595C7.82503 10.0785 7.72236 10.1645 7.6827 10.2832C7.64303 10.4018 7.67303 10.5322 7.76003 10.6218L9.63303 12.5415L9.00703 15.2585C8.97803 15.3848 9.02503 15.5165 9.12703 15.5965C9.22903 15.6762 9.3687 15.6895 9.4837 15.6302L11.9987 14.3412L14.5134 15.6295C14.561 15.6545 14.6137 15.6665 14.6654 15.6665C14.7384 15.6665 14.8107 15.6428 14.87 15.5962C14.9724 15.5165 15.019 15.3845 14.99 15.2582L14.364 12.5412L16.237 10.6215C16.3247 10.5322 16.3544 10.4015 16.3147 10.2832ZM21.9824 14.3435C21.8227 14.9402 21.941 15.5665 22.0557 16.1725C22.15 16.6708 22.257 17.2362 22.104 17.5005C21.9457 17.7738 21.396 17.9655 20.9107 18.1338C20.334 18.3345 19.737 18.5418 19.3064 18.9725C18.8744 19.4048 18.667 20.0015 18.4664 20.5785C18.2974 21.0638 18.1064 21.6132 17.8334 21.7715C17.8 21.7905 17.7004 21.8482 17.4414 21.8482C17.1664 21.8482 16.8304 21.7848 16.5054 21.7232C16.1327 21.6525 15.711 21.5728 15.3057 21.5728C15.0764 21.5728 14.8707 21.5978 14.678 21.6488C14.099 21.8042 13.6277 22.2115 13.1717 22.6058C12.758 22.9638 12.331 23.3332 11.9987 23.3332C11.6657 23.3332 11.2387 22.9638 10.8254 22.6058C10.3694 22.2115 9.8977 21.8038 9.32136 21.6502C9.12803 21.5985 8.92103 21.5735 8.6897 21.5735C8.2857 21.5735 7.86403 21.6532 7.49203 21.7238C7.16536 21.7855 6.82936 21.8488 6.5547 21.8488C6.2967 21.8488 6.1967 21.7908 6.16403 21.7722C5.89036 21.6135 5.6987 21.0638 5.53036 20.5785C5.3297 20.0018 5.12236 19.4048 4.6917 18.9742C4.25936 18.5422 3.6627 18.3348 3.0857 18.1342C2.60036 17.9652 2.05103 17.7742 1.8927 17.5012C1.74003 17.2368 1.8467 16.6722 1.94103 16.1735C2.05603 15.5642 2.1737 14.9395 2.0147 14.3438C1.86036 13.7675 1.4527 13.2958 1.0587 12.8402C0.701365 12.4258 0.332031 11.9988 0.332031 11.6665C0.332031 11.3335 0.701365 10.9065 1.05936 10.4932C1.4537 10.0372 1.86136 9.56551 2.01503 8.98918C2.1747 8.39251 2.05636 7.76618 1.9417 7.16018C1.84736 6.66185 1.74036 6.09651 1.89336 5.83218C2.0517 5.55885 2.60136 5.36718 3.0867 5.19885C3.66336 4.99818 4.26036 4.79085 4.69103 4.36018C5.12303 3.92785 5.33036 3.33118 5.53103 2.75418C5.70003 2.26885 5.89103 1.71951 6.16403 1.56118C6.19736 1.54218 6.29736 1.48418 6.55637 1.48418C6.83203 1.48418 7.16736 1.54785 7.4917 1.60951C7.8637 1.67985 8.28436 1.75951 8.6917 1.75951C8.92036 1.75951 9.12436 1.73518 9.31636 1.68451C9.89837 1.52851 10.3697 1.12118 10.8254 0.726847C11.2394 0.369181 11.6664 -0.000152588 11.9987 -0.000152588C12.3317 -0.000152588 12.7587 0.369181 13.172 0.727181C13.628 1.12151 14.0997 1.52918 14.676 1.68285C14.869 1.73418 15.0754 1.75951 15.3067 1.75951C15.709 1.75951 16.1317 1.67985 16.5044 1.60951C16.8307 1.54751 17.1674 1.48418 17.442 1.48418C17.7 1.48418 17.8004 1.54218 17.833 1.56085C18.1067 1.71951 18.2984 2.26918 18.4667 2.75451C18.6674 3.33118 18.8747 3.92818 19.3054 4.35885C19.7377 4.79085 20.3344 4.99818 20.9114 5.19885C21.3967 5.36785 21.946 5.55885 22.1044 5.83185C22.257 6.09618 22.1504 6.66085 22.056 7.15951C21.941 7.76885 21.8234 8.39351 21.9824 8.98918C22.1367 9.56551 22.5444 10.0372 22.9384 10.4928C23.296 10.9072 23.6654 11.3342 23.6654 11.6665C23.6654 11.9995 23.296 12.4265 22.938 12.8398C22.544 13.2958 22.136 13.7675 21.9824 14.3435ZM20.332 11.6665C20.332 7.07151 16.5937 3.33318 11.9987 3.33318C7.4037 3.33318 3.66536 7.07151 3.66536 11.6665C3.66536 16.2615 7.4037 19.9998 11.9987 19.9998C16.5937 19.9998 20.332 16.2615 20.332 11.6665Z" fill="#fff"></path>
                                                    </svg>
                                                </div>
                                            <?php endif; ?>
                                            <div class="table-content">
                                                <?php if ($includes_photos == 'Tak, projekt zawiera zdjęcia.'): ?>
                                                    <div class="icon">
                                                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/img-placeholder.svg" aria-hidden="true" alt="">
                                                    </div>
                                                <?php endif; ?>
                                                <div class="content">
                                                   <a href="<?php echo get_permalink() ?>"> <?php echo isset($titleprojektu['title']) ? $titleprojektu['title'] : ''; ?></a>
                                                </div>
                                            </div>
                                        </td>
                                        <td><?php echo isset($powiat['title']) ? $powiat['title'] : ''; ?></td>
                                    	<td><?php echo isset($gmina['title']) ? $gmina['title'] : ''; ?></td>
                                        <td> <?php echo isset($dzialanie['title']) ? $dzialanie['title'] : ''; ?></td>
                                        <td> <?php echo isset($typoperacji['title']) ? $typoperacji['title'] : ''; ?></td>
                                        <td> <?php echo isset($beneficjent['title']) ? $beneficjent['title'] : ''; ?></td>
									  	
                                    </tr>

                               <?php }
                               }
                               
                            } else {
                                echo '<p>No posts found in this category.</p>';
                            }

                            wp_reset_postdata();
                        ?>
                        </tbody>
                    </table>
                </div>
            </div>
           
        </div>
    </section>
    <script>
            document.addEventListener("DOMContentLoaded", function() {
            const svg = document.getElementById("map");
            const circlesWithId = svg.querySelectorAll("circle[id]");
            const pathsWithId = svg.querySelectorAll("path[id]");

            circlesWithId.forEach(circle => {
                const circleId = circle.id; // Get the ID of the circle
                
                // Get the count from taxonomyCounts based on circleId
                const count = taxonomyCounts[circleId] ; // Default to 0 if no match is found

                // Get the center coordinates of the circle
                const cx = circle.getAttribute("cx");
                const cy = circle.getAttribute("cy");

                // Create a new <text> element
                const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
                textElement.setAttribute("x", cx); // Set x position to the circle's center
                textElement.setAttribute("y", cy); // Set y position to the circle's center
                textElement.setAttribute("font-size", "14");
                textElement.setAttribute("fill", "white");
                textElement.setAttribute("text-anchor", "middle"); // Center align the text horizontally
                textElement.setAttribute("dominant-baseline", "middle"); // Center align the text vertically
                textElement.textContent = count; // Set the text content to the count value

                // Append the text to the SVG
                svg.appendChild(textElement);

                
            });
            pathsWithId.forEach(path => {
                const pathId = path.id; // Get the ID of the path
                const categoryUrl = getCategoryUrl(pathId);
                // Add a click event listener to each path
                path.addEventListener("click", function() {
                    // Redirect to the category page based on the path's ID
                    // Assuming the URL structure is something like `/category/[pathId]`
                    window.location.href = categoryUrl;
                });
            });
            function getCategoryUrl(termId) {
                let categoryUrl = ''; // Default value for category URL
                <?php
                // Add PHP code to retrieve the category URL for a given taxonomy term ID
                $terms = get_terms( array(
                    'taxonomy' => 'inwestycyjne-categories', // Replace with your taxonomy slug
                    'hide_empty' => false,
                ) );

                // Pass the term URLs to JavaScript
                foreach ( $terms as $term ) {
                    echo "if (termId === '$term->term_id') { categoryUrl = '" . get_term_link($term) . "'; }";
                }
                ?>
                return categoryUrl;
            }

        });
        
    </script>
    
<?php get_footer(); ?>
    