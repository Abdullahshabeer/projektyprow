<!DOCTYPE html>
<html lang="pl">
<head>   
     <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
	<div class="header-top">
		<a class="skip-link screen-reader-text" href="#content-full"><?php _e('przejdź do treści' , 'prow') ?></a>
		<div class="container">
			<div class="header-logo-wrap">
				<div class="header-logo d-flex align-items-center justify-content-between">
					<?php
						$current_language = 'en';
					if ($current_language === 'en') {
					$english_first_logo_url = get_theme_mod('first_logo'); 
					$first_logo_link = get_theme_mod('first_link_control');
					if (!empty($english_first_logo_url)) {
					echo '<span><img src="' . esc_url($english_first_logo_url) . '" alt=""></span>';
					}
					}
					else{

					}
					if ($current_language === 'en') {
					$english_second_logo_url = get_theme_mod('second_logo'); 
					$second_logo_link = get_theme_mod('second_link_control');
					if (!empty($english_second_logo_url)) {
					echo '<span><img src="' . esc_url($english_second_logo_url) . '" alt=""></span>';
					}
					}
					else{

					}
					if ($current_language === 'en') {
					$english_Third_logo_url = get_theme_mod('Third_logo'); 
					$Third_logo_link = get_theme_mod('Third_link_control');
					if (!empty($english_Third_logo_url)) {
					echo '<span><img src="' . esc_url($english_Third_logo_url) . '" alt=""></span>';
					}
					}
					else{

					}
					if ($current_language === 'en') {
					$english_Four_logo_url = get_theme_mod('Four_logo'); 
					$fourth_logo_link = get_theme_mod('Four_link_control');
					if (!empty($english_Four_logo_url)) {
					echo '<span><img src="' . esc_url($english_Four_logo_url) . '" alt=""></span>';
					}
					}
					else{

					}
					?>
				</div>	
				<div class="top-header-content text-center">
					<?php 
						$minheaderdiscription = get_theme_mod('discription_text'); 
					?>
					<p><?php echo $minheaderdiscription; ?></p>	
				</div>
			</div>
		</div>	
	</div>
	<header class="main-header">
		<div class="container">
			<div class="main-header-inner d-flex align-items-center justify-content-between">
	            <div class="logo-sec white">
				<?php
						if ( function_exists( 'has_custom_logo' ) && has_custom_logo() ) {
							$logo = wp_get_attachment_image_src( get_theme_mod( 'custom_logo' ), 'full' );
							$alt_text = __('logo prow link do strony głównej', 'prow');
							echo '<a href="' . esc_url( home_url( '/' ) ) . '" title="'. esc_attr( $alt_text ) .'"><img src="' . esc_url( $logo[0] ) . '" alt="' . esc_attr( $alt_text ) . '"></a>';
						} else {
							echo '<h1><a href="' . esc_url( home_url( '/' ) ) . '">' . get_bloginfo( 'name' ) . '</a></h1>';
						}
						?>
	            </div>
	            <div class="site-navigation justify-content-center align-items-center">
	            	<div class="main-menu-wrap">
					<?php
						wp_nav_menu(
							array(
								'theme_location' => 'primary',
								'container' => '',
								'menu_class' => 'd-flex align-items-center',	
							)
						);
					?>
					</div>
	            </div>
	            <div class="toggle-button">
	                <span class="line one"></span>
	                <span class="line two"></span>
	                <span class="line three"></span>
              	</div>
	            <div class="mobile-menu-wrap">
	            	<div class="mobile-menu-wrap-inner">
					    <div class="mobile-menu">
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
	</header>
	<div id="content-full"></div>
