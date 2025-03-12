<?php
/**
 **  
 */
get_header();

/**
 * Template Name: sidebar Post Template
 * Template Post Type: projektyinwestycyjne,
 */
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
                                <?php if (has_excerpt()) {
                                    the_excerpt(); 
                                } ?>
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
                    <div class="col-xl-3">
                        <div class="sidebar">
                            <div class="web-heading">
                                <h2><?php _e('Informacje', 'prow') ?></h2>
                            </div>
                            <div class="sidebar-list style-2">
                                <?php 
                                $dzialanie = get_field('dzialanie_text_with_icon');
                                $poddziałanie = get_field('poddziałanie_text_with_icon');
                                $operacji = get_field('typ_operacji_text_with_icon');
                                $projektu = get_field('projektu_text_with_icon');
                                $beneficjent = get_field('beneficjent_text_with_icon');
                                $powiat = get_field('powiat_text_with_icon');
                                $gmina = get_field('gmina text_with_icon');
                                $valuefunding = get_field('value_of_eafrd_funding');
                                $dofinansowania = get_field('dofinansowania_z_efrrow');
                                $valueprojects = get_field('value_of_projects:');
                                $wartosc = get_field('wartosc_projektu');
                                ?>
                                <ul>
                                <?php if( $dzialanie['title'] ): ?>
                                <li>
									<span><p><?php echo $dzialanie['label']; ?></p></span>
									<span>
										<p><b><?php echo $dzialanie['title']; ?></b></p>
									</span>
								</li>
                                <?php endif; ?>
                                <?php if( $poddziałanie['title'] ): ?>
                                <li>
									<span><p><?php echo $poddziałanie['label']; ?></p></span>
									<span>
										<p><b><?php echo $poddziałanie['title']; ?></b></p>
									</span>
								</li>
                                <?php endif; ?>
                                <?php if( $operacji['title'] ): ?>
                                <li>
									<span><p><?php echo $operacji['label']; ?></p></span>
									<span>
										<p><b><?php echo $operacji['title']; ?></b></p>
									</span>
								</li>
                                <?php endif; ?>
                                <?php if( $projektu['title'] ): ?>
                                <li>
									<span><p><?php echo $projektu['label']; ?></p></span>
									<span>
										<p><b><?php echo $projektu['title']; ?></b></p>
									</span>
								</li>
                                <?php endif; ?>
                                <?php if( $beneficjent['title'] ): ?>
                                <li>
									<span><p><?php echo $beneficjent['label']; ?></p></span>
									<span>
										<p><b><?php echo $beneficjent['title']; ?></b></p>
									</span>
								</li>
                                <?php endif; ?>
                                <?php if( $powiat['title'] ): ?>
                                <li>
									<span><p><?php echo $powiat['label']; ?></p></span>
									<span>
										<p><b><?php echo $powiat['title']; ?></b></p>
									</span>
								</li>
                                <?php endif; ?>
                                <?php if( $gmina['title'] ): ?>
                                <li>
									<span><p><?php echo $gmina['label']; ?></p></span>
									<span>
										<p><b><?php echo $gmina['title']; ?></b></p>
									</span>
								</li>
                                <?php endif; ?>
                                <?php if( $valuefunding ): ?>
                                <li>
									<span><p><?php echo !empty($dofinansowania['label']) ? $dofinansowania['label'] : 'wartość dofinansowania z EFRROW:'; ?></p></span>
									<span>
                                        <p><b>
                                    <?php 
                                        // Remove commas and ensure the value is numeric
                                        $valuefunding = str_replace(',', '', $valuefunding);

                                        // Check if the sanitized value is numeric and format it
                                        echo is_numeric($valuefunding) 
                                            ? number_format($valuefunding, 2, ',', ' ') 
                                            : '0,00'; 
                                    ?> zł
                                    </b></p>
									</span>
								</li>
                                <?php endif; ?>
                                <?php if( $valueprojects ): ?>
                                <li>
									<span><p><?php echo !empty($wartosc['label']) ? $wartosc['label'] : 'wartość całkowita projektu:'; ?></p></span>
									<span>
                                    <p><b>
                                    <?php 
                                        // Remove commas and ensure the value is numeric
                                        $valueprojects = str_replace(',', '', $valueprojects);

                                        // Check if the sanitized value is numeric and format it
                                        echo is_numeric($valueprojects) 
                                            ? number_format($valueprojects, 2, ',', ' ') 
                                            : '0,00'; 
                                    ?> zł
                                    </b></p>

									</span>
								</li>
                                <?php endif; ?>
                                
                                
                                </ul>
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