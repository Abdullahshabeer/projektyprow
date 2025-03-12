<?php
/**
 **  
 */
get_header();
?>
<?php
if (have_posts()) {
    while (have_posts()) {
        the_post(); ?>
        <?php $featureimage = get_the_post_thumbnail(); ?>
        <section class="sub-page-header light-bg <?php echo !empty($featureimage) ? 'banner-header' : ''; ?>">
          <div class="<?php echo !empty($featureimage) ? 'container-fluid' : 'container'; ?>">
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
                <div class="block-icon-lists">
                    <ul>
                        <?php
                            $dzialanie = get_field('dzialanie_text_with_icon');
                            $poddziałanie = get_field('poddziałanie_text_with_icon');
                            $operacji = get_field('typ_operacji_text_with_icon');
                            $projektu = get_field('projektu_text_with_icon');
                            $celprojektu = get_field('celprojektu_text_with_icon_copy');
                            $beneficjent = get_field('beneficjent_text_with_icon');
                            $powiat = get_field('powiat_text_with_icon');
                            $gmina = get_field('gmina text_with_icon');
                            $valuefunding = get_field('value_of_eafrd_funding');
                            $dofinansowania = get_field('dofinansowania_z_efrrow');
                            $valueprojects = get_field('value_of_projects:');
                            $wartosc = get_field('wartosc_projektu');
                            $includesphotos = get_field('includes_photos');
                        ?>
                        <?php if( $dzialanie['title'] ): ?>
                            <li class="list-row d-flex">
                                <div class="icon d-flex align-items-center">
                                <?php if ($includesphotos == 'Nie, projekt nie zawiera zdjęć'): ?>
                                    <img src="<?php echo esc_url( ! empty( $dzialanie['icon']['url'] ) ? $dzialanie['icon']['url'] : get_stylesheet_directory_uri() . '/images/działanie.png' ); ?>" aria-hidden="true" alt="">
                                <?php endif; ?>    
                                    <span><?php echo $dzialanie['label']; ?></span>
                                </div>
                                <div class="list-content">
                                    <p><?php echo $dzialanie['title']; ?></p>
                                </div>
                            </li>
                        <?php endif; ?>
                        <?php if( $poddziałanie['title'] ): ?>
                            <li class="list-row d-flex">
                                <div class="icon d-flex align-items-center">
                                <?php if ($includesphotos == 'Nie, projekt nie zawiera zdjęć'): ?>
                                    <img src="<?php echo esc_url( ! empty( $poddziałanie['icon']['url'] ) ? $poddziałanie['icon']['url'] : get_stylesheet_directory_uri() . '/images/poddziałanie.png' ); ?>" aria-hidden="true" alt="">
                                <?php endif; ?>    
                                    <span><?php echo $poddziałanie['label']; ?></span>
                                </div>
                                <div class="list-content">
                                    <p><?php echo $poddziałanie['title']; ?></p>
                                </div>
                            </li>
                        <?php endif; ?>
                        <?php if( $operacji['title'] ): ?>
                            <li class="list-row d-flex">
                                <div class="icon d-flex align-items-center">
                                <?php if ($includesphotos == 'Nie, projekt nie zawiera zdjęć'): ?>    
                                    <img src="<?php echo esc_url( ! empty( $operacji['icon']['url'] ) ? $operacji['icon']['url'] : get_stylesheet_directory_uri() . '/images/typoperacji.png' ); ?>" aria-hidden="true" alt="">
                                <?php endif; ?>    
                                    <span><?php echo $operacji['label']; ?></span>
                                </div>
                                <div class="list-content">
                                    <p><?php echo $operacji['title']; ?></p>
                                </div>
                            </li>
                        <?php endif; ?>
                        <?php if( $projektu['title'] ): ?>
                            <li class="list-row d-flex">
                                <div class="icon d-flex align-items-center">
                                <?php if ($includesphotos == 'Nie, projekt nie zawiera zdjęć'): ?>     
                                    <img src="<?php echo esc_url( ! empty( $projektu['icon']['url'] ) ? $projektu['icon']['url'] : get_stylesheet_directory_uri() . '/images/tytułprojektu.png' ); ?>" aria-hidden="true" alt="">
                                <?php endif; ?>     
                                    <span><?php echo $projektu['label']; ?></span>
                                </div>
                                <div class="list-content">
                                    <p><?php echo $projektu['title']; ?></p>
                                </div>
                            </li>
                        <?php endif; ?>
                        <?php if( $celprojektu['title'] ): ?>
                            <li class="list-row d-flex">
                                <div class="icon d-flex align-items-center">
                                <?php if ($includesphotos == 'Nie, projekt nie zawiera zdjęć'): ?>    
                                    <img src="<?php echo esc_url( ! empty( $celprojektu['icon']['url'] ) ? $celprojektu['icon']['url'] : get_stylesheet_directory_uri() . '/images/celprojektu.png' ); ?>" aria-hidden="true" alt="">
                                <?php endif; ?>    
                                    <span><?php echo $celprojektu['label']; ?></span>
                                </div>
                                <div class="list-content">
                                    <p><?php echo $celprojektu['title']; ?></p>
                                </div>
                            </li>
                        <?php endif; ?>
                        <?php if( $beneficjent['title'] ): ?>
                            <li class="list-row d-flex">
                                <div class="icon d-flex align-items-center">
                                <?php if ($includesphotos == 'Nie, projekt nie zawiera zdjęć'): ?>      
                                    <img src="<?php echo esc_url( ! empty( $beneficjent['icon']['url'] ) ? $beneficjent['icon']['url'] : get_stylesheet_directory_uri() . '/images/beneficjent.png' ); ?>" aria-hidden="true" alt="">
                                <?php endif; ?>    
                                    <span><?php echo $beneficjent['label']; ?></span>
                                </div>
                                <div class="list-content">
                                    <p><?php echo $beneficjent['title']; ?></p>
                                </div>
                            </li>
                        <?php endif; ?>
                        <?php if( $powiat['title'] ): ?>
                            <li class="list-row d-flex">
                                <div class="icon d-flex align-items-center">
                                <?php if ($includesphotos == 'Nie, projekt nie zawiera zdjęć'): ?>    
                                    <img src="<?php echo esc_url( ! empty( $powiat['icon']['url'] ) ? $powiat['icon']['url'] : get_stylesheet_directory_uri() . '/images/powiat.png' ); ?>" aria-hidden="true" alt="">
                                <?php endif; ?>   
                                    <span><?php echo $powiat['label']; ?></span>
                                </div>
                                <div class="list-content">
                                    <p><?php echo $powiat['title']; ?></p>
                                </div>
                            </li>
                        <?php endif; ?>
                        <?php if( $gmina['title'] ): ?>
                            <li class="list-row d-flex">
                                <div class="icon d-flex align-items-center">
                                <?php if ($includesphotos == 'Nie, projekt nie zawiera zdjęć'): ?>    
                                    <img src="<?php echo esc_url( ! empty( $gmina['icon']['url'] ) ? $gmina['icon']['url'] : get_stylesheet_directory_uri() . '/images/gmina.png' ); ?>" aria-hidden="true" alt="">
                                <?php endif; ?>    
                                    <span><?php echo $gmina['label']; ?></span>
                                </div>
                                <div class="list-content">
                                    <p><?php echo $gmina['title']; ?></p>
                                </div>
                            </li>
                        <?php endif; ?>
                        <?php if( $valuefunding ): ?>
                            <li class="list-row d-flex">
                                <div class="icon d-flex align-items-center">
                                <?php if ($includesphotos == 'Nie, projekt nie zawiera zdjęć'): ?>     
                                    <img src="<?php echo esc_url( ! empty( $dofinansowania['icon']['url'] ) ? $dofinansowania['icon']['url'] : get_stylesheet_directory_uri() . '/images/wartośćdofinansowania.png' ); ?>" aria-hidden="true" alt="">
                                <?php endif; ?>   
                                <span><?php echo !empty($dofinansowania['label']) ? $dofinansowania['label'] : 'wartość dofinansowania z EFRROW:'; ?></span>
                                </div>
                                <div class="list-content">
                                <p>
                                <?php 
                                    // Remove commas and ensure the value is numeric
                                    $valuefunding = str_replace(',', '', $valuefunding);

                                    // Check if the sanitized value is numeric and format it
                                    echo is_numeric($valuefunding) 
                                        ? number_format($valuefunding, 2, ',', ' ') 
                                        : '0,00'; 
                                ?> zł
                                </p>
                                </div>
                            </li>
                        <?php endif; ?>    
                        <?php if( $valueprojects ): ?>
                            <li class="list-row d-flex">
                                <div class="icon d-flex align-items-center">
                                <?php if ($includesphotos == 'Nie, projekt nie zawiera zdjęć'): ?>     
                                    <img src="<?php echo esc_url( ! empty( $wartosc['icon']['url'] ) ? $wartosc['icon']['url'] : get_stylesheet_directory_uri() . '/images/wartośćcałkowita.png' ); ?>" aria-hidden="true" alt="">
                                <?php endif; ?>   
                                <span><?php echo !empty($wartosc['label']) ? $wartosc['label'] : 'wartość całkowita projektu:'; ?></span>
                                </div>
                                <div class="list-content">
                                <p>
                                <?php 
                                    // Remove commas and ensure the value is numeric
                                    $valueprojects = str_replace(',', '', $valueprojects);

                                    // Check if the sanitized value is numeric and format it
                                    echo is_numeric($valueprojects) 
                                        ? number_format($valueprojects, 2, ',', ' ') 
                                        : '0,00'; 
                                ?> zł
                                </p>

                                </div>
                            </li>
                        <?php endif; ?>   
                    </ul>
                     
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