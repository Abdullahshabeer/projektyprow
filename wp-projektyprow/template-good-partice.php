<?php

/* Template Name: Dobre praktyki */

get_header();

if (have_posts()) {
    while (have_posts()) {
        the_post(); ?>
        <section class="sub-page-header light-bg ">
            <div class="container">
                <div class="row">
                    <?php $featureimage = get_the_post_thumbnail(); ?>
                    <div class="col-xl-<?php echo !empty($featureimage) ? '7' : '12'; ?>">
                        <div class="header-content">
                        <?php custom_breadcrumbs(); ?>
                            <div class="page-title d-flex">
                                <h1><?php the_title() ?></h1>
                            </div>
                        </div>
                    </div>
                    <?php
                    if (!empty($featureimage)) {
                    ?>
                        <div class="col-xl-5">
                            <div class="banner-img">
                                <?php the_post_thumbnail(); ?>
                            </div>
                        </div>
                    <?php
                    }
                    ?>
                </div>
            </div>
        </section>
   <?php			
    }
}

$args = array(
   'post_type' => array('projektyinwestycyjne', 'projekty_leader'), // Specify both post types
    'posts_per_page' => 12,
);

$custom_query = new WP_Query($args);
?>
    <section class="main-wrap">
        <div class="container">
			<div class="filter-sec d-flex align-items-center">
                <div class="search-sec">
                    <input type="text" id="post-search" placeholder="<?php _e('Wpisz wyszukiwaną frazę', 'prow'); ?>" aria-label="<?php _e('Wyszukaj', 'prow'); ?>" />
                    <div class="search-icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M12.5974 13.7356C9.72399 16.0369 5.51799 15.8558 2.85439 13.1923C-0.00354749 10.3345 -0.00354749 5.70102 2.85439 2.84321C5.71233 -0.0146098 10.346 -0.0146092 13.2039 2.84321C15.8675 5.50668 16.0486 9.71249 13.7473 12.5857L19.3369 18.1751C19.6545 18.4927 19.6545 19.0075 19.3369 19.325C19.0194 19.6426 18.5045 19.6426 18.187 19.325L12.5974 13.7356ZM4.00434 12.0424C1.7815 9.81963 1.7815 6.21585 4.00434 3.9931C6.22718 1.77036 9.83112 1.77036 12.054 3.9931C14.2752 6.21422 14.2768 9.81434 12.0589 12.0375C12.0572 12.0391 12.0556 12.0407 12.0539 12.0423C12.0523 12.044 12.0507 12.0456 12.0491 12.0473C9.82584 14.2651 6.22555 14.2635 4.00434 12.0424Z" fill="#1B1B1B"/>
						</svg>
						<span class="screen-reader-text"><?php _e('Wyszukaj' , 'prow') ?></span>
                    </div>
                </div>
				
                <div class="filter-btn d-flex">
                    <button type="button" class="btn btn-secondary filter-post" data-postype='projektyinwestycyjne'><?php _e('Projekty inwestycyjne ', 'prow') ?></button>
                    <button type="button" class="btn btn-primary filter-post"   data-postype='projekty_leader'><?php _e('Projekty leader', 'prow') ?> </button>
                </div>
            </div>

            <!-- Posts Display Section -->
            <div class="fetchdata">
                    <?php echo fetch_poststype($args['post_type'], $args['posts_per_page']); ?>
            </div>

        </div>  
    </section>      

<?php

get_footer()
?>