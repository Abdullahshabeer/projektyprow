<?php
/**
 **  Template Name: page sidebar menu
 */
get_header();
?>
<?php
// Start the Loop.
if (have_posts()) {
    while (have_posts()) {
        the_post(); ?>

<section class="sub-page-header light-bg">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="header-content">
                      <?php custom_breadcrumbs(); ?>
						<div class="page-title d-flex">
                          <h1><?php the_title() ?></h1>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
    <section class="main-wrap">
        <div class="container">
            <div class="row sub-page-row">
                <div class="col-xl-9">
                    <?php
					 the_content()
					?>
                </div>    
                <div class="col-xl-3 d-none d-xl-block">
                    <div class="sidebar">
						<div class="web-heading">
                           <h2><?php _e('Menu' , 'prow'); ?></h2>
						</div>
						<div class="sidebar-menu">
                            <?php
                                wp_nav_menu(
                                    array(
                                        'theme_location' => 'primary',
                                        'container' => '',
                                        'menu_class' => '',	
                                    )
                                );
                            ?>
						</div>	
					</div>
                </div>
            </div>
        </div>
    </section>

        <?php
        }
    }
?>

<?php
get_footer()
?>