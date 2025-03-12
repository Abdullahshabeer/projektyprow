<?php
/*
  Plugin Name: gautan Blocks
  Version: 0.1
  Author: umer(UM)
  Author URI: 
  Text Domain: gautanBlocks
*/

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class gautanbarg_block {
  function __construct() {
    $this->gautan_Blocks_define_constants();
    add_action('init', array($this, 'gautanb'));
    add_filter('block_categories', array($this, 'custom_block_category'), 10, 2);
    add_action('admin_menu', array($this, 'add_settings_page'));
    add_action('admin_init', array($this, 'register_settings'));
  }

  private function define($name, $value) {
    if ( ! defined($name) ) {
      define($name, $value);
    }
  }

  private function gautan_Blocks_define_constants() {
    $this->define('gautan_Blocks_PLUGIN_FILE', plugin_dir_path(__FILE__));
    $this->define('gautan_Blocks_BASE_URL', plugin_dir_url(__FILE__));
  }
  
  function gautanb() {
    $strings = array(
      'list'                                => get_option('list', __('Home Banner', 'prow')),
      'url'                                => get_option('url', __('url', 'prow')),
      'banner_title'                        => get_option('banner_title', __('title', 'prow')),
      'banner_discription'                  => get_option('banner_discription', __('Banner Discription', 'prow')),
      'backgrounimage'                      => get_option('backgrounimage', __('photo', 'prow')),
      'shortcut'                            => get_option('shortcut', __('tiles added as repeater', 'prow')),
      'shortcuttitle'                       => get_option('shortcuttitle', __('text', 'prow')),
      'czytal'                       => get_option('czytal', __('czytaj więcej', 'prow')),
      'shortcutlink'                        => get_option('shortcutlink', __('url', 'prow')),
      'shorticon'                           => get_option('shorticon', __('Add icon', 'prow')),
      'list_remove'                         => get_option('list_remove', __('remove Item', 'prow')),
      'list_add_iteme'                      => get_option('list_add_iteme', __('add Item', 'prow')),
      'Select_an_image'                     =>  get_option('Select_an_image', __('Select image', 'prow')),
      'Na_skrty'                            =>  get_option('Na_skrty', __('Na skróty', 'prow')),
      'Selectapost_type'                    =>get_option('Selectapost_type', __('select post type' , 'prow' )),
      'post_section_Title'                  =>get_option('post_section_Title', __('post title' , 'prow' )),
      'post_per_page'                       =>get_option('post_per_page', __('post per page' , 'prow' )),
      'section_button'                      =>get_option('section_button', __('posts button' , 'prow' )),
      'Select_a_category'                   =>get_option('Select_a_category', __('select categories' , 'prow' )),
      'Button_link'                         =>get_option('Button_link', __('post button url' , 'prow' )),
      'homepage_new_block'                  =>get_option('homepage_new_block', __('Dobre praktyki - strona główna' , 'prow' )),
      'BUtton_Title'                        =>get_option('BUtton_Title', __('Button title' , 'prow' )),
      'Select_Post_Type'                    =>get_option('Select_Post_Type', __('Select Post Type' , 'prow' )),
      'homepage_szkolenia_block'             =>get_option('homepage_szkolenia_block', __('szkolenia Posts' , 'prow' )),
      'Select_Category'                     =>get_option('Select_Category', __('Select Category' , 'prow' )),
      'Informacja_heading_style'            =>get_option('Informacja_heading_style', __('Heading style' , 'prow' )),
       'Informacja_Heading'                 =>get_option('Informacja_Heading', __('Heading' , 'prow' )),
       'Informacja_inner_button'           =>get_option('Informacja_inner_button', __('inner button' , 'prow' )),
       'Informacja_button_color'           =>get_option('Informacja_button_color', __('Button color' , 'prow' )),
       'Informacja_sectiont_title'         =>get_option('Informacja_sectiont_title', __('Title' , 'prow' )),
       'Informacja_headerdivider'          =>get_option('Informacja_headerdivider', __('header divider' , 'prow' )),
       'Informacja_Enter_a_description'    =>get_option('Informacja_Enter_a_description', __('text' , 'prow' )),
       'Informacja_Delete_Image'          =>get_option('Informacja_Delete_Image', __('Delete Image' , 'prow' )),
       'Informacja_Select_an_image'       =>get_option('Informacja_Select_an_image', __('Select an image' , 'prow' )),
       'image_section_block'              =>get_option('image_section_block', __('Zdjęcie + tekst' , 'prow' )),
       'image_title_block'                =>get_option('image_title_block', __('image title block' , 'prow' )),
       'Zobacz'                           =>get_option('Zobacz', __('Zobacz strukturę w nowym oknie' , 'prow' )),
       'image_title'                      => get_option('image_title',  __('image Title', 'prow')),
       'image_title_block'                => get_option('image_title_block', __('image Title block', 'prow')),
      'faq_section_title'                 =>get_option('faq_section_title', __('FAQ section title' , 'prow' )),
       'accordion'                        =>get_option('accordion', __('FAQ accordione' , 'prow' )),
       'faq_title'                        =>get_option('faq_title', __('FAQ Title' , 'prow' )),
       'Delete_a_section'                 =>get_option('Delete_a_section', __('Delete section' , 'prow' )),
       'add_sectiont'                     =>get_option('add_sectiont', __('ADD section' , 'prow' )),
       'Enter_a_description'              =>get_option('Enter_a_description', __('Enter Description' , 'prow' )),
       'scop_certifaction'                 =>get_option('scop_certifaction', __('icon image ' , 'prow' )),
       'selected_design_size'             =>get_option('selected_design_size', __('select size ' , 'prow' )),
       'design_size'                      =>get_option('design_size', __(' size ' , 'prow' )),
       'imageicon'                        =>get_option('imageicon', __(' image/icon' , 'prow' )),
       'addmedia'                        =>get_option('addmedia', __(' add media' , 'prow' )),
       'blocktitle'                       =>get_option('blocktitle', __(' Block Title' , 'prow' )),
       'blockdiscription'                =>get_option('blockdiscription', __('Block discription' , 'prow' )),
       'blocklink'                       =>get_option('blocklink', __('Block link' , 'prow' )),
       'block_remove'                   =>get_option('block_remove', __('Block remove' , 'prow' )),
       'block_add'                      =>get_option('block_add', __('Block add' , 'prow' )),
       'image_position'                  =>get_option('image_position', __('Położenie obrazka' , 'prow' )),
       'background'                     =>get_option('background', __('Tło' , 'prow' )),
       'selected_image_position'        =>get_option('selected_image_position', __('selected image position' , 'prow' )),
       'selected_background'            =>get_option('selected_background', __('selected background' , 'prow' )),
       'kodzakres'                     =>get_option('kodzakres', __('kod zakres' , 'prow' )),
       'Kod'                           =>get_option('Kod', __('kod' , 'prow' )),
       'Zakres'                        =>get_option('Zakres', __('Zakres' , 'prow' )),
       'add_Zakres'                    =>get_option('add_Zakres', __('add Zakres' , 'prow' )),
       'remove_Zakres'                 =>get_option('remove_Zakres', __('remove Zakres' , 'prow' )),
       'defaultkod'                    =>get_option('defaultkod', __('Kod' , 'prow' )),
       'defaultZakres'                =>get_option('defaultZakres', __('Zakres' , 'prow' )),
       'Infographi'                   =>get_option('Infographi', __('Infographic' , 'prow' )),
       'Infographic'                 =>get_option('Infographic', __('Infographic' , 'prow' )),
       'progressbar'                =>get_option('progressbar', __('progressbar size' , 'prow' )),
       'backgroundcolor'       =>get_option('backgroundcolor', __('Background color' , 'prow' )),
       'Infographic_title'       =>get_option('Infographic_title', __('Infographic Title' , 'prow' )),
       'Infographic_Select_an_image'       =>get_option('Infographic_Select_an_image', __('Select an image' , 'prow' )),
       'Infographic_discription'       =>get_option('Infographic_discription', __('Infographic discription' , 'prow' )),
       'Infographic_remove'       =>get_option('Infographic_remove', __('Infographic remove' , 'prow' )),
       'Infographic_add'       =>get_option('nfographic_add', __('Infographic add' , 'prow' )),
       'certification'       =>get_option('certification', __('Certification bodies' , 'prow' )),
       'AccordionTitle'       =>get_option('AccordionTitle', __('Accordion Title' , 'prow' )),
       'Accordion_add_logo'       =>get_option('Accordion_add_logo', __('Add logo' , 'prow' )),
       'Accordion_remove_remove'       =>get_option('Accordion_remove_remove', __('Remove logo' , 'prow' )),
       'accordion_discription'       =>get_option('accordion_discription', __('Accordion discription' , 'prow' )),
       'accordion_Thumbnail'       =>get_option('accordion_Thumbnail', __('Accordion Thumbnail' , 'prow' )),
       'add_Thumbnail'       =>get_option('add_Thumbnail', __('Add Thumbnail' , 'prow' )),
       'remove_Thumbnail'       =>get_option('remove_Thumbnail', __('Remove Thumbnail' , 'prow' )),
       'Thumbnail_Title'       =>get_option('Thumbnail_Title', __('Thumbnail Title' , 'prow' )),
       'Thumbnail_second_Title'       =>get_option('Thumbnail_second_Title', __('Thumbnail  second Title' , 'prow' )),
       'Thumbnail_Link'       =>get_option('Thumbnail_Link', __('Thumbnail  link' , 'prow' )),
       'add_accordion_sectiont'       =>get_option('add_accordion_sectiont', __('Add accordion sectiont' , 'prow' )),
       'remove_accordion_sectiont'       =>get_option('remove_accordion_sectiont', __('remove accordion sectiont' , 'prow' )),
       'accordion_logo'       =>get_option('accordion_logo', __('Accordion logo' , 'prow' )),
       'link'       =>get_option('link', __('Program w liczbach ' , 'prow' )),
       'link_icon'       =>get_option('link_icon', __('select link icon' , 'prow' )),
       'link_content'       =>get_option('link_content', __('link title' , 'prow' )),
       'link_url'       =>get_option('link_url', __('link url' , 'prow' )),
       'remove_link' => get_option('remove_link', __('Remove link', 'prow')),
        'add_link' => get_option('add_link', __('add link', 'prow')),
        'document' => get_option('document', __('Document', 'prow')),
        'liczba' => get_option('liczba', __('liczba dokumentów na stronie:', 'prow')),
        'zatrzymaj'                           => get_option('zatrzymaj', __('zatrzymaj animację', 'prow')),
        'zagraj'                           => get_option('zagraj', __('zagraj animację', 'prow')),
        'tab_title' => get_option('tab_title', __('Tab title', 'prow')),
        'tab_inner_link_title' => get_option('tab_inner_link_title', __('Tab inner link title', 'prow')),
        'tab_inner_link_icon' => get_option('tab_inner_link_icon', __('Tab inner link icon', 'prow')),
        'tab_inner_link_url' => get_option('tab_inner_link_url', __('Tab inner link url', 'prow')),
        'tab_inner_icon_button' => get_option('tab_inner_icon_button', __('Tab inner icon button', 'prow')),
        'add_icon' => get_option('add_icon', __('add icon', 'prow')),
        'change_icon' => get_option('change_icon', __('change icon', 'prow')),
        'add_new_teb' => get_option('add_new_teb', __('add new tab', 'prow')),
        'remove_teb' => get_option('remove_teb', __('remove tab', 'prow')),
        'add_link' => get_option('add_link', __('add slider', 'prow')),
        'remove_link' => get_option('remove_slider', __('remove_slider', 'prow')),
        'tab' => get_option('tab', __('tab', 'prow')),
        'linknumber' => get_option('linknumber', __('link', 'prow')),
        'kontakt_block' => get_option('kontakt_block', __('Kontakt', 'prow')),
        'mapshortcode' => get_option('mapshortcode', __('Obraz', 'prow')),
        'Section_headin' => get_option('Section_headin', __('select heading', 'prow')),
        'Heading' => get_option('Heading', __('Heading', 'prow')),
        'heading_style' => get_option('heading_style', __('heading style', 'prow')),
        'sectiontt' => get_option('sectiontt', __('heading title', 'prow')),
        'headerdivider' => get_option('headerdivider', __('heading divider', 'prow')),
        'sectiontcontent' => get_option('sectiontcontent', __('section content', 'prow')),
        'select_video' => get_option('Nselect_video', __('select video', 'prow')),
        'bannervideo' => get_option('bannervideo', __('banner video', 'prow')),
        'differentdesign_block' => get_option('differentdesign_block', __('Unijna post', 'prow')),
        'api_table' => get_option('rect_table', __('Rect Table ', 'prow')),
        'apitoken' => get_option('apitoken', __('Api Token ', 'prow')),
        'Bold_discription' => get_option('Bold_discription', __('Bold ', 'prow')),
        'Break_discription' => get_option('Break_discription', __('Break ', 'prow')),
        'Link_discription' => get_option('Link_discription', __('Link ', 'prow')),
        'choose_file' => get_option('choose_file', __('Choose file ', 'prow')),
        'point' => get_option('point', __('add detail ', 'prow')),
        'delete_point' => get_option('delete_point', __('remove detail ', 'prow')),
        'button_content' => get_option('button_content', __('przechodzenie miedzy kategoriami strzałkami bocznymi ', 'prow')),
        'shortdetail' => get_option('shortdetail', __('short detail ', 'prow')),
        'contactdetail' => get_option('contactdetail', __('contact detail ', 'prow')),
        'select_icon' => get_option('select_icon', __('select icon ', 'prow')),
        'delete_image' => get_option('delete_image', __('delete icon ', 'prow')),
        'download_file_block' => get_option('download_file_block', __('Download file block ', 'prow')),
        'Title' => get_option('Title', __('Tytuł ', 'prow')),
        'choose_a_file' => get_option('choose_a_file', __('Wybierz plik ', 'prow')),
        'filename' => get_option('filename', __('File name ', 'prow')),
        'delete_file' => get_option('delete_file', __('Usuń plik ', 'prow')),
        'file_new_file' => get_option('file_new_file', __('Dodaj nowy plik ', 'prow')),
        'Change_file' => get_option('Change_file', __('Zmień plik ', 'prow')),
        'wigetdetail' => get_option('wigetdetail', __('sidebar list ', 'prow')),
        'inner_block_content' => get_option('inner_block_content', __('inner Block content', 'prow')),
        'headerdividercolor' => get_option('headerdividercolor', __('heading divider color', 'prow')),
        'left'                            => __('Lewo' , 'prow'),
      'right'                           => __('Prawo' , 'prow'),
      'selected_image_side'                          => __('Wybierz' , 'prow'),
      'sectiont'                => __('Nagłówek' , 'prow'),
      'Background_color'                => __('Kolor tła' ,'prow'),
      'Delete_Image'                => __('Usuń obrazek' ,'prow'),
      'image_side'                        => __('Pozycja obrazka' ,'prow'),
      'inner_button'                        => __('Tekst na wewnętrznym przycisku' ,'prow'),
      'Button_URLextrenal'                        => __('link (zewnętrzny przycisk)' ,'prow'),
      'Text_on_the_button'                        => __('Tekst na zewnętrznym przycisku' ,'prow'),
      'Button_URLrt'                        => __('Link (wewnętrzny przycisk)' ,'prow'),
      'galleryslider'                        => __('gallery slider' ,'prow'),
      'author_name'                        => __('author name' ,'prow'),
      'short_description'                        => __('short description' ,'prow'),
      'remove_gallery'                        => __('remove gallery' ,'prow'),
      'add_gallery'                        => __('add gallery' ,'prow'),
      'tytu'                               => __('tytul' ,'prow'),
      'slider'                               => __('slider' ,'prow'),
      'opis'                               => __('opis' ,'prow'),
    );

    $site_url = site_url();
    $svg_url = gautan_Blocks_BASE_URL . 'images/images.jpeg';
    $icon = gautan_Blocks_BASE_URL . 'images/icon.svg';
    $right = gautan_Blocks_BASE_URL . 'images/right.svg';
    $file_icon = gautan_Blocks_BASE_URL . 'images/file-icon.svg';
    $icontsvg = gautan_Blocks_BASE_URL . 'images/icontsvg.svg';
    wp_register_script('gautanbscript', gautan_Blocks_BASE_URL . 'build/index.js', array('wp-blocks', 'wp-components', 'wp-element', 'wp-api', 'wp-editor', 'wp-i18n'), false, true);
   
    register_block_type('prow-namespace/api-table', array(
      'editor_script' => 'gautanbscript',
      'render_callback' => 'your_namespace_render_block',
  ));

    
    wp_localize_script('gautanbscript', 'myBlockData', array(
      'strings' => $strings,
      'defaultimge' => $svg_url,
      'icon' => $icon,
      'siteUrl' => $site_url,
      'right'  => $right,
      'file_icon'  => $file_icon,
      'icontsvg'  => $icontsvg
    ));

    register_block_type('myguten-block/block-name', array(
      'editor_script' => 'gautanbscript',
      'editor_style' => 'gautanbStyle',
      'style' => 'gautanbFrontendStyles'
    ));
  }
  
  function custom_block_category($categories, $post) {
    return array_merge(
      $categories,
      array(
        array(
          'slug' => 'my-custom-category',
          'title' => __('prow block', 'prow'),
          'icon' => 'wordpress',
        )
      )
    );
  }

  function add_settings_page() {
    add_options_page(
      __('Custom Strings', 'prow'),
      __('Custom Strings', 'prow'),
      'manage_options',
      'gautanb-strings',
      array($this, 'settings_page_content')
    );
  }

  function register_settings() {
    // Add a settings section
    add_settings_section(
        'gautanb_settings_section',
        __('Custom Strings', 'prow'),
        null,
        'gautanb-strings'
    );

    $strings = array(
        'button_content' =>  __('przechodzenie miedzy kategoriami strzałkami bocznymi ', 'prow'),
        'list' => __('Home Banner', 'prow'),
        'banner_title' => __('Banner Title', 'prow'),
        'banner_discription' => __('Banner Discription', 'prow'),
        'backgrounimage' => __('Background image', 'prow'),
        'shortcut' => __('Banner shortcut', 'prow'),
        'shortcuttitle' => __('shortcut Title', 'prow'),
        'shortcutlink' => __('shortcut link', 'prow'),
        'shorticon' => __('Add icon', 'prow'),
        'list_remove' => __('remove Item', 'prow'),
        'list_add_iteme' => __('add Item', 'prow'),
        'Select_an_image' => __('select image', 'prow'),
        'Na_skrty'                       => __('Na skróty', 'prow'),
        'Selectapost_type'               =>__('select post type' , 'prow' ),
        'post_section_Title'             =>__('post title' , 'prow' ),
        'liczba'                           => __('liczba dokumentów na stronie:', 'prow'),
        'zatrzymaj'                           => __('zatrzymaj animację', 'prow'),
        'zagraj'                           => __('zagraj animację', 'prow'),
        'post_per_page'                  =>__('post per page' , 'prow' ),
        'section_button'                 =>__('posts button' , 'prow' ),
        'Select_a_category'              =>__('select categories' , 'prow' ),
        'Button_title'                   =>__('post button url' , 'prow' ),
        'homepage_new_block'             =>__('Dobre praktyki - strona główna' , 'prow' ),
        'BUtton_Title'                  =>__('Button title' , 'prow' ),
        'Select_Post_Type'              =>__('Select Post Type' , 'prow' ),
        'homepage_szkolenia_block'              =>__('szkolenia Posts' , 'prow' ),
        'Select_Category'              =>__('Select Category' , 'prow' ),
        'Informacja_heading_style'       =>__('Heading style' , 'prow' ),
         'Informacja_Heading'             =>__('Heading' , 'prow' ),
         'Informacja_inner_button'        =>__('inner button' , 'prow' ),
         'Informacja_button_color'        =>__('Button color' , 'prow' ),
         'Informacja_sectiont_title'      =>__('sectiont title' , 'prow' ),
         'Informacja_headerdivider'       =>__('header divider' , 'prow' ),
         'Informacja_Enter_a_description' =>__('Enter a description' , 'prow' ),
         'Informacja_Delete_Image'        =>__('Delete Image' , 'prow' ),
         'Informacja_Select_an_image'     =>__('Select an image' , 'prow' ),
         'image_section_block'       =>__('Zdjęcie + tekst' , 'prow' ),
         'image_title_block'       =>__('image title block' , 'prow' ),
         'Zobacz'       =>__('Zobacz strukturę w nowym oknie' , 'prow' ),
         'image_title' =>  __('image Title', 'prow'),
         'image_title_block' =>  __('image Title block', 'prow'),
        'faq_section_title'       =>__('FAQ section title' , 'prow' ),
         'accordion'       =>__('FAQ accordione' , 'prow' ),
         'faq_title'       =>__('FAQ Title' , 'prow' ),
         'Delete_a_section'       =>__('Delete section' , 'prow' ),
         'add_sectiont'       =>__('ADD section' , 'prow' ),
         'Enter_a_description'       =>__('Enter Description' , 'prow' ),
         'scop_certifaction'       =>__('icon image ' , 'prow' ),
         'selected_design_size'       =>__('select size ' , 'prow' ),
         'design_size'       =>__(' size ' , 'prow' ),
         'imageicon'       =>__(' image/icon' , 'prow' ),
         'addmedia'       =>__(' add media' , 'prow' ),
         'blocktitle'       =>__(' Block Title' , 'prow' ),
         'blockdiscription'       =>__('Block discription' , 'prow' ),
         'blocklink'       =>__('Block link' , 'prow' ),
         'block_remove'       =>__('Block remove' , 'prow' ),
         'block_add'       =>__('Block add' , 'prow' ),
         'image_position'       =>__('Położenie obrazka' , 'prow' ),
         'background'       =>__('Tło' , 'prow' ),
         'selected_image_position'       =>__('selected image position' , 'prow' ),
         'selected_background'       =>__('selected background' , 'prow' ),
         'kodzakres'       =>__('kod zakres' , 'prow' ),
         'Kod'       =>__('kod' , 'prow' ),
         'Zakres'       =>__('Zakres' , 'prow' ),
         'add_Zakres'       =>__('add Zakres' , 'prow' ),
         'remove_Zakres'       =>__('remove Zakres' , 'prow' ),
         'defaultkod'       =>__('Kod' , 'prow' ),
         'defaultZakres'       =>__('Zakres' , 'prow' ),
         'Infographi'       =>__('Infographic' , 'prow' ),
         'Infographic'       =>__('Infographic' , 'prow' ),
         'progressbar'       =>__('progressbar size' , 'prow' ),
         'backgroundcolor'       =>__('Background color' , 'prow' ),
         'Infographic_title'       =>__('Infographic Title' , 'prow' ),
         'Infographic_Select_an_image'       =>__('Select an image' , 'prow' ),
         'Infographic_discription'       =>__('Infographic discription' , 'prow' ),
         'Infographic_remove'       =>__('Infographic remove' , 'prow' ),
         'Infographic_add'       =>__('Infographic add' , 'prow' ),
         'certification'       =>__('Certification bodies' , 'prow' ),
         'AccordionTitle'       =>__('Accordion Title' , 'prow' ),
         'Accordion_add_logo'       =>__('Add logo' , 'prow' ),
         'Accordion_remove_remove'       =>__('Remove logo' , 'prow' ),
         'accordion_discription'       =>__('Accordion discription' , 'prow' ),
         'accordion_Thumbnail'       =>__('Accordion Thumbnail' , 'prow' ),
         'add_Thumbnail'       =>__('Add Thumbnail' , 'prow' ),
         'remove_Thumbnail'       =>__('Remove Thumbnail' , 'prow' ),
         'Thumbnail_Title'       =>__('Thumbnail Title' , 'prow' ),
         'Thumbnail_second_Title'       =>__('Thumbnail  second Title' , 'prow' ),
         'Thumbnail_Link'       =>__('Thumbnail  link' , 'prow' ),
         'add_accordion_sectiont'       =>__('Add accordion sectiont' , 'prow' ),
         'remove_accordion_sectiont'       =>__('remove accordion sectiont' , 'prow' ),
         'accordion_logo'       =>__('Accordion logo' , 'prow' ),
         'link'       =>__('Program w liczbach' , 'prow' ),
         'link_icon'       =>__('select link icon' , 'prow' ),
         'link_content'       =>__('link title' , 'prow' ),
         'link_url'       =>__('link url' , 'prow' ),
         'remove_link' => __('Remove link', 'prow'),
          'add_link' => __('add link', 'prow'),
          'document' => __('Document', 'prow'),
          'tab_title' => __('Tab title', 'prow'),
          'tab_inner_link_title' => __('Tab inner link title', 'prow'),
          'tab_inner_link_icon' => __('Tab inner link icon', 'prow'),
          'tab_inner_link_url' => __('Tab inner link url', 'prow'),
          'tab_inner_icon_button' => __('Tab inner icon button', 'prow'),
          'add_icon' => __('add icon', 'prow'),
          'change_icon' => __('change icon', 'prow'),
          'add_new_teb' => __('add new tab', 'prow'),
          'remove_teb' => __('remove tab', 'prow'),
          'add_link' => __('add link', 'prow'),
          'remove_link' => __('remove link', 'prow'),
          'tab' => __('tab', 'prow'),
          'linknumber' => __('link', 'prow'),
          'kontakt_block' => __('Kontakt', 'prow'),
          'mapshortcode' => __('Obraz', 'prow'),
          'Section_headin' => __('select heading', 'prow'),
          'Heading' => __('Heading', 'prow'),
          'heading_style' => __('heading style', 'prow'),
          'sectiontt' => __('heading title', 'prow'),
          'headerdivider' => __('heading divider', 'prow'),
          'sectiontcontent' => __('section content', 'prow'),
          'select_video' => __('select video', 'prow'),
          'bannervideo' => __('banner video', 'prow'),
          'differentdesign_block' => __('Unijna post', 'prow'),
          'rect_table' => __('Rect Table', 'prow'),
          'apitoken' =>  __('Api Token ', 'prow'),
          'Bold_discription'=>  __('Bold ', 'prow'),
          'Break_discription'=> __('Break ', 'prow'),
          'Link_discription'=> __('Link ', 'prow'),
          'choose_file'=> __('Choose file ', 'prow'),
        
    );

    foreach ($strings as $key => $default) {
      register_setting('gautanb_settings_group', $key, array(
          'type' => 'string',
          'sanitize_callback' => 'sanitize_text_field',
          'default' => $default,
      ));

      add_settings_field(
          $key,
          $default,
          function() use ($key, $default) {
              $value = get_option($key, '');
              $value = !empty($value) ? $value : $default;
              echo "<input type='text' name='$key' value='" . esc_attr($value) . "' class='regular-text' />";
          },
          'gautanb-strings',
          'gautanb_settings_section'
      );
    }
  }

  function settings_page_content() {
    ?>
    <div class="wrap">
      <h1><?php _e('Custom Strings', 'prow'); ?></h1>
      <form method="post" action="options.php">
        <?php
        settings_fields('gautanb_settings_group');
        do_settings_sections('gautanb-strings');
        submit_button();
        ?>
      </form>
    </div>
    <?php
  }
}

new gautanbarg_block();


?>
