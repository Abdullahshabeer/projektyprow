<?php
/* Template Name: second sidebar */

get_header(); 

if (have_posts()) :
    while (have_posts()) : the_post(); ?>
        <section class="sub-page-header light-bg">
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
        <section class="main-wrap">
            <div class="container">
                <div class="row sub-page-row">
                    <div class="col-xl-9">
                    <?php
                        the_content();
                    ?>
                    </div>
                    <div class="col-xl-3 d-none d-xl-block">
                        <?php if (have_rows('post_excerpt')) : ?>
                            <div class="sidebar">
                                <div class="web-heading">
                                    <h2><?php _e('Główne info o PROW', 'prow') ?></h2>
                                </div>
                                <div class="sidebar-list style-2">
                                    <ul>
                                        <?php while (have_rows('post_excerpt')) : the_row(); 
                                            // Get each subfield value
                                            
                                            $title = get_sub_field('title');
                                            $content = get_sub_field('content');
                                            ?>
                                        <li>
                                            <?php if ($title) : ?>
                                                <span><p><?php echo esc_html($title); ?></p></span>
                                            <?php endif; ?>
                                            <?php if ($content) : ?>
                                                <span><p><b><?php echo $content; ?></b></p></span>
                                            <?php endif; ?>
                                        </li>
                                    <?php endwhile; ?>
                                    </ul>
                                </div>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </section>  
    <?php endwhile;
endif;

get_footer();
?>
