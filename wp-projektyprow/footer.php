<footer>
	<div class="footer-top">
		<div class="container">
			<div class="row">
				<div class="col-lg-12 footer-row d-flex align-items-center justify-content-between">
					<div class="footer-title">
						<?php
						if ( function_exists( 'has_custom_logo' ) && has_custom_logo() ) {
							$logo = wp_get_attachment_image_src( get_theme_mod( 'custom_logo' ), 'full' );
							$alt_text = __('logo prow link do strony głównej', 'prow');
							echo '<a href="' . esc_url( home_url( '/' ) ) . '" title="'. esc_attr( $alt_text ) .'"><img src="' . esc_url( $logo[0] ) . '" alt="' . esc_attr( $alt_text ) . '"></a>';
						} else {
							echo '<h3>' . get_bloginfo( 'name' ) . '</h3>';
						}
						?>
					</div>
					<div class="footer-right d-flex align-items-center flex-row-reverse">
						<div class="menu-social-sec">
							<div class="footer-menu d-lg-none">
								<?php 	
									wp_nav_menu(
										array(
											'theme_location' => 'footer-bottom-menu',
											'container' => '',
											'menu_class' => '',
										)
										);
								?>
							</div>
							<div class="social-icons">
								<?php
									if (is_active_sidebar('footer-sidebar-2')) {
										dynamic_sidebar('footer-sidebar-2');
									}
								?>
							</div>
						</div>
						<div class="footer-logo d-flex align-items-center">
							<?php
								if (is_active_sidebar('footer-sidebar')) {
									dynamic_sidebar('footer-sidebar');
								}
							?>
						</div>
					</div>
				</div>
				<div class="col-lg-12 footer-row d-none d-lg-block">
					<div class="footer-menu text-end">
						<?php 	
							wp_nav_menu(
								array(
									'theme_location' => 'footer-bottom-menu',
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
	<div class="footer-bottom">
		<div class="container">
			<div class="copyright-sec"><?php
					if (is_active_sidebar('copyright-sidebar')) {
						dynamic_sidebar('copyright-sidebar');
					}
				?></div>
		</div>
	</div>
</footer>
	<?php wp_footer(); ?>
  </body>
</html>

