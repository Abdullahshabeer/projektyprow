<?php 
get_header(); 

if (!is_front_page()) {
    if (have_posts()) {
        while (have_posts()) {
            the_post(); ?>
            <section class="sub-page-header light-bg banner-header">
            <div class="container-fluid">
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
            the_content();?>
       
       <?php			
        }
    }
} else {
    if (have_posts()) {
        while (have_posts()) {
            the_post();
            the_content();
        }
    }
}

get_footer();
?>
 
    