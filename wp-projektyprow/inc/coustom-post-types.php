<?php 
function custom_post_type_Multimedia()
{
    // Register Custom Post Type: Projekty inwestycyjne
    $labels = array(
        'name'                  => _x('Projekty inwestycyjne', 'Post Type General Name', 'prow'),
        'singular_name'         => _x('Projekt inwestycyjny', 'Post Type Singular Name', 'prow'),
        'menu_name'             => __('Projekty inwestycyjne', 'prow'),
        'name_admin_bar'        => __('Projekty inwestycyjne', 'prow'),
        'archives'              => __('Archiwum Projektów inwestycyjnych', 'prow'),
        'parent_item_colon'     => __('Rodzic Projekt inwestycyjny:', 'prow'),
        'all_items'             => __('Wszystkie Projekty inwestycyjne', 'prow'),
        'add_new_item'          => __('Dodaj nowy Projekt inwestycyjny', 'prow'),
        'add_new'               => __('Dodaj nowy', 'prow'),
        'new_item'              => __('Nowy Projekt inwestycyjny', 'prow'),
        'edit_item'             => __('Edytuj Projekt inwestycyjny', 'prow'),
        'update_item'           => __('Aktualizuj Projekt inwestycyjny', 'prow'),
        'view_item'             => __('Zobacz Projekt inwestycyjny', 'prow'),
        'view_items'            => __('Zobacz Projekty inwestycyjne', 'prow'),
        'search_items'          => __('Szukaj', 'prow'),
        'not_found'             => __('Nic nie znaleziono', 'prow'),
        'not_found_in_trash'    => __('Nic nie znaleziono w koszu', 'prow'),
        'featured_image'        => __('Obrazek wyróżniający', 'prow'),
        'set_featured_image'    => __('Ustaw obrazek wyróżniający', 'prow'),
        'remove_featured_image' => __('Usuń obrazek wyróżniający', 'prow'),
        'use_featured_image'    => __('Użyj jako obrazek wyróżniający', 'prow'),
        'insert_into_item'      => __('Wstaw do Projektu inwestycyjnego', 'prow'),
        'uploaded_to_this_item' => __('Dodano do Projektu inwestycyjnego', 'prow'),
        'items_list'            => __('Lista Projektów inwestycyjnych', 'prow'),
        'items_list_navigation' => __('Nawigacja po liście Projektów inwestycyjnych', 'prow'),
        'filter_items_list'     => __('Filtruj listę Projektów inwestycyjnych', 'prow'),
    );
    $args = array(
        'label'                 => __('Projekty inwestycyjne', 'prow'),
        'description'           => __('Projekty inwestycyjne', 'prow'),
        'labels'                => $labels,
        'supports'              => array('title', 'author', 'editor', 'thumbnail', 'custom-fields', 'excerpt', 'page-attributes', 'comments'),
        'show_in_rest'          => true,
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 5,
        'menu_icon'             => 'dashicons-editor-table',
        'show_in_admin_bar'     => true,
        'rewrite'               => array('slug' => 'inwestycyjne'),
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => true,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'capability_type'       => 'post',
    );
    register_post_type('projektyinwestycyjne', $args);

    // Register Custom Taxonomy: Działania (Action Categories)
    $taxonomy_labels = array(
        'name'              => _x('Działania', 'taxonomy general name', 'prow'),
        'singular_name'     => _x('Działanie', 'taxonomy singular name', 'prow'),
        'search_items'      => __('Szukaj działań', 'prow'),
        'all_items'         => __('Wszystkie działania', 'prow'),
        'parent_item'       => __('Rodzic działania', 'prow'),
        'parent_item_colon' => __('Rodzic działania:', 'prow'),
        'edit_item'         => __('Edytuj działanie', 'prow'),
        'update_item'       => __('Aktualizuj działanie', 'prow'),
        'add_new_item'      => __('Dodaj nowe działanie', 'prow'),
        'new_item_name'     => __('Nazwa nowego działania', 'prow'),
        'menu_name'         => __('Działania', 'prow'),
    );
    $taxonomy_args = array(
        'hierarchical'      => true,
        'labels'            => $taxonomy_labels,
        'show_ui'           => true,
        'show_in_rest'      => true,
        'rewrite'           => array('slug' => 'inwestycyjne-categories'),
    );
    register_taxonomy('inwestycyjne-categories', 'projektyinwestycyjne', $taxonomy_args);

    $taxonomy_labels = array(
        'name'              => _x('project', 'taxonomy general name', 'prow'),
        'singular_name'     => _x('project', 'taxonomy singular name', 'prow'),
        'search_items'      => __('Szukaj działań', 'prow'),
        'all_items'         => __('Wszystkie project', 'prow'),
        'parent_item'       => __('Rodzic project', 'prow'),
        'parent_item_colon' => __('Rodzic project:', 'prow'),
        'edit_item'         => __('Edytuj project', 'prow'),
        'update_item'       => __('Aktualizuj project', 'prow'),
        'add_new_item'      => __('Dodaj nowe project', 'prow'),
        'new_item_name'     => __('Nazwa nowego project', 'prow'),
        'menu_name'         => __('project', 'prow'),
    );
    $taxonomy_args = array(
        'hierarchical'      => true,
        'labels'            => $taxonomy_labels,
        'show_ui'           => true,
        'show_in_rest'      => true,
        'rewrite'           => array('slug' => 'project-categories'),
    );
    register_taxonomy('project-categories', 'projektyinwestycyjne', $taxonomy_args);
}
add_action('init', 'custom_post_type_Multimedia', 0);


function projekty_leader() {
    $labels = array(
        'name'               => _x('Projekty LEADER', 'Post Type General Name', 'prow'),
        'singular_name'      => _x('Projekt LEADER', 'Post Type Singular Name', 'prow'),
        'menu_name'          => __('Projekty LEADER', 'prow'),
        'name_admin_bar'     => __('Projekty LEADER', 'prow'),
        'archives'           => __('Archiwum Projektów LEADER', 'prow'),
        'parent_item_colon'  => __('Rodzic Projekt:', 'prow'),
        'all_items'          => __('Wszystkie Projekty LEADER', 'prow'),
        'add_new_item'       => __('Dodaj nowy Projekt LEADER', 'prow'),
        'add_new'            => __('Dodaj nowy', 'prow'),
        'new_item'           => __('Nowy Projekt LEADER', 'prow'),
        'edit_item'          => __('Edytuj Projekt LEADER', 'prow'),
        'update_item'        => __('Aktualizuj Projekt LEADER', 'prow'),
        'view_item'          => __('Zobacz Projekt LEADER', 'prow'),
        'search_items'       => __('Szukaj Projektu LEADER', 'prow'),
        'not_found'          => __('Nie znaleziono', 'prow'),
        'not_found_in_trash' => __('Nie znaleziono w koszu', 'prow'),
        'featured_image'     => __('Obrazek wyróżniający', 'prow'),
        'set_featured_image' => __('Ustaw obrazek wyróżniający', 'prow'),
        'remove_featured_image' => __('Usuń obrazek wyróżniający', 'prow'),
        'items_list'         => __('Lista Projektów LEADER', 'prow'),
        'filter_items_list'  => __('Filtruj listę Projektów LEADER', 'prow'),
    );

    $args = array(
        'label'               => __('Projekty LEADER', 'prow'),
        'description'         => __('Projekty realizowane w ramach programu LEADER', 'prow'),
        'labels'              => $labels,
        'supports'            => array('title', 'author', 'editor', 'thumbnail', 'excerpt', 'comments'),
        'show_in_rest'        => true,
        'hierarchical'        => false,
        'public'              => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'menu_position'       => 5,
        'menu_icon'           => 'dashicons-editor-table',
        'rewrite'             => array('slug' => 'projekty-leader'),
        'has_archive'         => 'projekty-leader',
        'publicly_queryable'  => true,
        'capability_type'     => 'post',
    );
    register_post_type('projekty_leader', $args);

    // Register Taxonomy: Leader Categories
    $leader_category_labels = array(
        'name'              => _x('Kategorie Działań', 'taxonomy general name', 'prow'),
        'singular_name'     => _x('Kategoria Działania', 'taxonomy singular name', 'prow'),
        'search_items'      => __('Szukaj Kategorii Działań', 'prow'),
        'all_items'         => __('Wszystkie Kategorie', 'prow'),
        'parent_item'       => __('Rodzic Kategorii', 'prow'),
        'edit_item'         => __('Edytuj Kategorię', 'prow'),
        'add_new_item'      => __('Dodaj Nową Kategorię', 'prow'),
        'menu_name'         => __('Kategorie Działań', 'prow'),
    );

    $leader_category_args = array(
        'hierarchical'      => true,
        'labels'            => $leader_category_labels,
        'show_ui'           => true,
        'show_in_rest'      => true,
        'rewrite'           => array('slug' => 'leader-categories'),
    );
    register_taxonomy('leader_categories', 'projekty_leader', $leader_category_args);

    // Register Taxonomy: Project Categories
    $project_category_labels = array(
        'name'              => _x('Projekty', 'taxonomy general name', 'prow'),
        'singular_name'     => _x('Projekt', 'taxonomy singular name', 'prow'),
        'search_items'      => __('Szukaj Projektów', 'prow'),
        'all_items'         => __('Wszystkie Projekty', 'prow'),
        'parent_item'       => __('Rodzic Projektu', 'prow'),
        'add_new_item'      => __('Dodaj Nowy Projekt', 'prow'),
        'menu_name'         => __('Projekty', 'prow'),
    );

    $project_category_args = array(
        'hierarchical'      => true,
        'labels'            => $project_category_labels,
        'show_ui'           => true,
        'show_in_rest'      => true,
        'rewrite'           => array('slug' => 'project-category'),
    );
    register_taxonomy('project-category', 'projekty_leader', $project_category_args);
}
add_action('init', 'projekty_leader');

function add_upload_csv_button_to_projekty_leader_list()
{
    global $current_screen;

    if (isset($current_screen) && $current_screen->post_type === 'projekty_leader') {
        ?>
        <script type="text/javascript">
            jQuery(document).ready(function($) {
                var customButtonHtml = '<a href="<?php echo admin_url('edit.php?post_type=projekty_leader&page=upload_file'); ?>" class="page-title-action">Upload File</a>';
                $(".wrap .page-title-action:first").after(customButtonHtml);
            });
        </script>
        <?php
    }
}
add_action('admin_footer', 'add_upload_csv_button_to_projekty_leader_list');

// Add Submenu Page for File Upload
function add_file_upload_submenu()
{
    add_submenu_page(
        'edit.php?post_type=projekty_leader',
        __('Upload File', 'prow'),
        __('Upload File', 'prow'),
        'manage_options',
        'upload_file',
        'projekty_leader_file_upload_page'
    );
}
add_action('admin_menu', 'add_file_upload_submenu');

// Render the File Upload Page
function projekty_leader_file_upload_page()
{
    if (!current_user_can('manage_options')) {
        return;
    }

    // Handle File Upload
    if (isset($_FILES['upload_file'])) {
        $uploaded_file = $_FILES['upload_file'];
        $file_type = $uploaded_file['type'];

        if ($file_type === 'text/csv' || $file_type === 'application/vnd.ms-excel') {
            // Handle CSV File
            handle_csv_upload($uploaded_file['tmp_name']);
        } elseif ($file_type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            // Handle Excel File (without PhpSpreadsheet)
            handle_excel_upload($uploaded_file['tmp_name']);
        } else {
            echo '<div class="notice notice-error"><p>Invalid file type. Please upload a valid CSV or Excel (.xlsx) file.</p></div>';
        }
    }

    ?>
    <div class="wrap">
        <h1><?php _e('Upload CSV File to Create Posts', 'prow'); ?></h1>
        <form method="post" enctype="multipart/form-data">
            <input type="file" name="upload_file" accept=".csv, .xlsx" required>
            <?php submit_button(__('Upload File', 'prow')); ?>
        </form>
    </div>
    <?php
}


// function handle_csv_upload($file_path)
// {
//     global $wpdb;

//     // Check if ACF plugin is active
//     if (!function_exists('update_field')) {
//         echo '<div class="notice notice-error"><p>Advanced Custom Fields plugin is not active. Please activate it first.</p></div>';
//         return;
//     }

//     $handle = fopen($file_path, 'r');

//     if ($handle === false) {
//         echo '<div class="notice notice-error"><p>Could not open the CSV file.</p></div>';
//         return;
//     }

//     // Get the CSV header (first row)
//     $header = fgetcsv($handle);

//     if (!$header) {
//         echo '<div class="notice notice-error"><p>The CSV file must not be empty and should have a valid header row.</p></div>';
//         fclose($handle);
//         return;
//     }

//     while (($row = fgetcsv($handle)) !== false) {
//         // Skip empty rows
//         if (empty(array_filter($row))) {
//             continue;
//         }

//         // Extract fields from the row
//         $dzialanie = sanitize_text_field($row[0]);
//         $poddzialanie = sanitize_text_field($row[1]);
//         $typ_operacji = sanitize_text_field($row[2]);
//         $tytul_projektu = sanitize_text_field($row[3]);
//         $cel_projektu = sanitize_text_field($row[4]);
//         $beneficjent = sanitize_text_field($row[5]);
//         $powiat = sanitize_text_field($row[6]);
//         $gmina = sanitize_text_field($row[7]);
//         $lokalna_grupa_dzialania = sanitize_text_field($row[8]);
//         $wartosc_calkowita_projektu = str_replace('zł', '', sanitize_text_field($row[9]));
//         $kwota_dofinansowania_efrrow = str_replace('zł', '', sanitize_text_field($row[10]));
//         $status = sanitize_text_field($row[11]);
//         $zawiera_zdjecia = sanitize_text_field($row[12]);
//         $dobre_praktyki = sanitize_text_field($row[13]);

//         // $wartosc_calkowita_projektu = str_replace([' ', ','], ['', '.'], $wartosc_calkowita_projektu);
//         // $kwota_dofinansowania_efrrow = str_replace([' ', ','], ['', '.'], $kwota_dofinansowania_efrrow);

//         // Only add posts for "Działanie 19 - Wsparcie dla rozwoju lokalnego w ramach inicjatywy LEADER"
//         if ($dzialanie !== "19 Wsparcie dla rozwoju lokalnego w ramach inicjatywy LEADER") {
//             continue;
//         }

//         // Create a new post
//         $post_id = wp_insert_post([
//             'post_title' => $tytul_projektu,
//             'post_content' => '',
//             'post_type' => 'projekty_leader',
//             'post_status' => 'publish',
//         ]);

//         if (is_wp_error($post_id)) {
//             echo '<div class="notice notice-error"><p>Error creating post for ' . $tytul_projektu . '.</p></div>';
//             continue;
//         }
//         $term_to_use = !empty($gmina) ? $gmina : $lokalna_grupa_dzialania;

//         if (!empty($term_to_use)) {
//             $term = get_term_by('name', $term_to_use, 'leader_categories'); // Find term by name
            
//             if ($term) {
//                 wp_set_object_terms($post_id, $term->term_id, 'leader_categories'); // Assign term to post
//             } else {
//                 // Optional: Create the term if it doesn't exist
//                 $new_term = wp_insert_term($term_to_use, 'leader_categories');
//                 if (!is_wp_error($new_term)) {
//                     wp_set_object_terms($post_id, $new_term['term_id'], 'leader_categories');
//                 } else {
//                     echo '<div class="notice notice-error"><p>Error assigning ' . $term_to_use . ' to post "' . $tytul_projektu . '".</p></div>';
//                 }
//             }
//         }
//         if (!empty($typ_operacji)) {
//             $term = get_term_by('name', $typ_operacji, 'project-category'); // Find term by name
        
//             if ($term) {
//                 wp_set_object_terms($post_id, $term->term_id, 'project-category'); // Assign term to post
//             } else {
//                 // Optional: Create the term if it doesn't exist
//                 $new_term = wp_insert_term($typ_operacji, 'project-category');
//                 if (!is_wp_error($new_term)) {
//                     wp_set_object_terms($post_id, $new_term['term_id'], 'project-category');
//                 } else {
//                     echo '<div class="notice notice-error"><p>Error assigning typ_operacji ' . $typ_operacji . ' to post "' . $tytul_projektu . '".</p></div>';
//                 }
//             }
//         }
        
//         // Map CSV data to ACF fields
//         update_field('dzialanie_text_with_icon', ['title' => $dzialanie], $post_id);
//         update_field('poddziałanie_text_with_icon', ['title' => $poddzialanie], $post_id);
//         update_field('typ_operacji_text_with_icon', ['title' => $typ_operacji], $post_id);
//         update_field('projektu_text_with_icon', ['title' => $tytul_projektu], $post_id);
//         update_field('celprojektu_text_with_icon_copy', ['title' => $cel_projektu], $post_id);
//         update_field('beneficjent_text_with_icon', ['title' => $beneficjent], $post_id);
//         update_field('powiat_text_with_icon', ['title' => $powiat], $post_id);
//         update_field('gmina text_with_icon', ['title' => $gmina], $post_id);
//         update_field('lokalna grupa działania_text_with_icon', ['title' => $lokalna_grupa_dzialania], $post_id);
//         update_field('value_of_projects:', $wartosc_calkowita_projektu, $post_id);
//         update_field('value_of_eafrd_funding', $kwota_dofinansowania_efrrow, $post_id);
//         update_field('includes_photos', $zawiera_zdjecia, $post_id);
//         update_field('zrealizowane-', $status, $post_id);
//         update_field('praktyki', $dobre_praktyki, $post_id);

//         // Feedback for each post created
//         echo '<div class="notice notice-success"><p>Post "' . $tytul_projektu . '" created successfully with custom fields!</p></div>';
//     }

//     fclose($handle);
// }
function handle_csv_upload($file_path)
{
    global $wpdb;
 
    $min_id = 30972; // Starting ID of the posts in your database
   

    // Check if ACF plugin is active
    if (!function_exists('update_field')) {
        echo '<div class="notice notice-error"><p>Advanced Custom Fields plugin is not active. Please activate it first.</p></div>';
        return;
    }

    $handle = fopen($file_path, 'r');

    if ($handle === false) {
        echo '<div class="notice notice-error"><p>Could not open the CSV file.</p></div>';
        return;
    }

    // Get the CSV header (first row)
    $header = fgetcsv($handle);

    if (!$header) {
        echo '<div class="notice notice-error"><p>The CSV file must not be empty and should have a valid header row.</p></div>';
        fclose($handle);
        return;
    }

    while (($row = fgetcsv($handle)) !== false) {
        // Skip empty rows
        if (empty(array_filter($row))) {
            continue;
        }

        // Extract fields from the row
        $dzialanie = sanitize_text_field($row[0]);
        $poddzialanie = sanitize_text_field($row[1]);
        $typ_operacji = sanitize_text_field($row[2]);
        $tytul_projektu = sanitize_text_field($row[3]);
        $cel_projektu = sanitize_text_field($row[4]);
        $beneficjent = sanitize_text_field($row[5]);
        $powiat = sanitize_text_field($row[6]);
        $gmina = sanitize_text_field($row[7]);
        $lokalna_grupa_dzialania = sanitize_text_field($row[8]);
        $wartosc_calkowita_projektu = str_replace('zł', '', sanitize_text_field($row[9]));
        $kwota_dofinansowania_efrrow = str_replace('zł', '', sanitize_text_field($row[10]));
        $status = sanitize_text_field($row[11]);
        $zawiera_zdjecia = sanitize_text_field($row[12]);
        $dobre_praktyki = sanitize_text_field($row[13]);

        // Only add posts for "Działanie 19 - Wsparcie dla rozwoju lokalnego w ramach inicjatywy LEADER"
        if ($dzialanie !== "19 Wsparcie dla rozwoju lokalnego w ramach inicjatywy LEADER") {
            continue;
        }

        // Find an existing post by title
        $existing_post = get_page_by_title($tytul_projektu, OBJECT, 'projektyinwestycyjne');

        // if ($existing_post && $existing_post->ID >= $min_id && $existing_post->ID <= $max_id) {
            // Update the existing post within the specified ID range
            $post_id = $min_id;

            wp_update_post([
                'ID' => $post_id,
                
                'post_status' => 'publish', // Ensure the post remains published
            ]);

            // Update custom fields
            update_field('typ_operacji_text_with_icon', ['title' => $typ_operacji], $post_id);
            // update_field('beneficjent_text_with_icon', ['title' => $beneficjent], $post_id);
            echo '<div class="notice notice-success"><p>Post "' . $tytul_projektu . '" updated successfully!</p></div>';
            $min_id++;
        // } else {
        //     echo '<div class="notice notice-warning"><p>Post "' . $tytul_projektu . '" not found or outside the ID range. Skipping.</p></div>';
        // }
    }

    fclose($handle);
}



// Function to Handle Excel File Upload Without PhpSpreadsheet (Very Basic Handling)
// function handle_excel_upload($file_path)
// {
//     global $wpdb;

//     // Debugging: Display the file path
//     echo '<div class="notice notice-info"><p>File path received: ' . esc_html($file_path) . '</p></div>';

//     // Check if file exists
//     if (!file_exists($file_path)) {
//         echo '<div class="notice notice-error"><p>File does not exist: ' . esc_html($file_path) . '</p></div>';
//         return;
//     }

//     // Move the uploaded file to a proper location with .xlsx extension
//     $upload_dir = wp_upload_dir();
//     $target_file = $upload_dir['path'] . '/uploaded_file.xlsx';

//     if (!move_uploaded_file($file_path, $target_file)) {
//         echo '<div class="notice notice-error"><p>Could not move the file to the uploads directory.</p></div>';
//         return;
//     }

//     // Check the file extension
//     $file_type = pathinfo($target_file, PATHINFO_EXTENSION);
//     if ($file_type !== 'xlsx') {
//         echo '<div class="notice notice-error"><p>Only .xlsx files are supported. File extension detected: ' . esc_html($file_type) . '</p></div>';
//         return;
//     }

//     // Load PhpSpreadsheet library
//     require_once ABSPATH . 'vendor/autoload.php'; // Ensure PhpSpreadsheet is loaded

//     try {
//         // Read the Excel file
//         $reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader('Xlsx');
//         $spreadsheet = $reader->load($target_file);

//         // Get the first worksheet
//         $worksheet = $spreadsheet->getActiveSheet();
//         $rows = $worksheet->toArray();

//         $insert_values = [];
        
//         // Process rows
//         foreach ($rows as $index => $row) {
//             // Skip header row or rows with fewer than 4 values
//             if ($index === 0 || count($row) < 4) {
//                 continue;
//             }

//             $dzialanie_text_with_icon = sanitize_text_field(trim($row[0])); // First column as identifier
//             $poddzialanie_text_with_icon = sanitize_text_field(trim($row[1])); // Second column
//             $typ_operacji_text_with_icon = sanitize_text_field(trim($row[2])); // Third column
//             $projektu_text_with_icon = sanitize_text_field(trim($row[3])); // Fourth column

//             // Find the post by title
//             $post_id = $wpdb->get_var(
//                 $wpdb->prepare(
//                     "SELECT ID FROM {$wpdb->posts} WHERE post_title = %s AND post_status = 'publish' LIMIT 1",
//                     $dzialanie_text_with_icon
//                 )
//             );

//             if ($post_id) {
//                 // Update meta fields for this post
//                 update_post_meta($post_id, 'poddziałanie_text_with_icon', $poddzialanie_text_with_icon); // Group meta
//                 update_post_meta($post_id, 'typ_operacji_text_with_icon', $typ_operacji_text_with_icon); // Group meta
//                 update_post_meta($post_id, 'projektu_text_with_icon', $projektu_text_with_icon); // Text field
//             } else {
//                 // If no post found, you can either log the message or create a new post (if needed)
//                 echo '<div class="notice notice-warning"><p>No post found with title: ' . esc_html($dzialanie_text_with_icon) . '</p></div>';
//             }

//             // Prepare data for inserting new posts if required (optional)
//             $insert_values[] = $wpdb->prepare(
//                 "(%s, %s, %s, %s)",
//                 $dzialanie_text_with_icon,
//                 $poddzialanie_text_with_icon,
//                 $typ_operacji_text_with_icon,
//                 $projektu_text_with_icon
//             );
//         }

//         // Bulk insert posts (if needed)
//         if (!empty($insert_values)) {
//             $sql = "INSERT INTO {$wpdb->posts} (post_title, post_content, post_type, post_status) VALUES " . implode(', ', $insert_values);
//             $wpdb->query($sql);

//             echo '<div class="notice notice-success"><p>Posts created successfully from the Excel file!</p></div>';
//         }

//     } catch (Exception $e) {
//         echo '<div class="notice notice-error"><p>Error reading Excel file: ' . esc_html($e->getMessage()) . '</p></div>';
//     }
// }







// function delete_projekty_leader_posts_by_date()
// {
//     global $wpdb;

//     // Define the specific date and time range
//     $start_date = '2024-12-11 00:00:00';
//     $end_date = '2024-12-11 23:59:59';

//     // SQL query to delete posts and their metadata
//     $wpdb->query(
//         $wpdb->prepare(
//             "
//             DELETE p, pm
//             FROM {$wpdb->posts} p
//             LEFT JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id
//             WHERE p.post_type = %s
//             AND p.post_status = %s
//             AND p.post_date BETWEEN %s AND %s
//             ",
//             'projekty_leader', // Post type
//             'publish',         // Only published posts
//             $start_date,       // Start of the date range
//             $end_date          // End of the date range
//         )
//     );
// }
// //  Trigger the function when needed
// add_action('init', 'delete_projekty_leader_posts_by_date');

// function delete_all_projekty_leader_posts()
// {
//     global $wpdb;

//     // SQL query to delete all 'projekty_leader' posts and their metadata
//     $wpdb->query(
//         $wpdb->prepare(
//             "
//             DELETE p, pm
//             FROM {$wpdb->posts} p
//             LEFT JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id
//             WHERE p.post_type = %s
//             ",
//             'projekty_leader' // Post type
//         )
//     );
// }
// // Trigger the function when needed
// add_action('init', 'delete_all_projekty_leader_posts');
function add_upload_csv_button_to_projektyinwestycyjne_list()
{
    global $current_screen;

    if (isset($current_screen) && $current_screen->post_type === 'projektyinwestycyjne') {
        ?>
        <script type="text/javascript">
            jQuery(document).ready(function($) {
                var customButtonHtml = '<a href="<?php echo admin_url('edit.php?post_type=projektyinwestycyjne&page=upload_filee'); ?>" class="page-title-action">Upload File</a>';
                $(".wrap .page-title-action:first").after(customButtonHtml);
            });
        </script>
        <?php
    }
}
add_action('admin_footer', 'add_upload_csv_button_to_projektyinwestycyjne_list');
function add_file_upload_submenup() {
    add_submenu_page(
        'edit.php?post_type=projektyinwestycyjne',
        __('Upload File', 'prow'),
        __('Upload File', 'prow'),
        'manage_options',
        'upload_filee',
        'projektyinwesty_file_upload_page'
    );
}
add_action('admin_menu', 'add_file_upload_submenup');

function projektyinwesty_file_upload_page() {
    if (!current_user_can('manage_options')) {
        return;
    }

    // Handle File Upload
    if (isset($_FILES['upload_file'])) {
        $uploaded_file = $_FILES['upload_file'];
        $file_type = $uploaded_file['type'];

        if ($file_type === 'text/csv' || $file_type === 'application/vnd.ms-excel') {
            // Handle CSV File
            handle_csv_uploadd($uploaded_file['tmp_name']);
        } elseif ($file_type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            // Handle Excel File (without PhpSpreadsheet)
            echo '<div class="notice notice-error"><p>Invalid file type. Please upload a valid CSV</p></div>';
        } else {
            echo '<div class="notice notice-error"><p>Invalid file type. Please upload a valid CSV or Excel (.xlsx) file.</p></div>';
        }
    }

    ?>
    <div class="wrap">
        <h1><?php _e('Upload CSV  File to Create Posts', 'prow'); ?></h1>
        <form method="post" enctype="multipart/form-data">
            <input type="file" name="upload_file" accept=".csv, .xlsx" required>
            <?php submit_button(__('Upload File', 'prow')); ?>
        </form>
    </div>
    <?php
}
function handle_csv_uploadd($file_path)
{
    global $wpdb;

    // Define your ID range
    $min_id = 34991; // Starting ID of the posts in your database
    $max_id = $min_id + 1669 - 1; // Calculate the last ID based on your post count

    // Check if ACF plugin is active
    if (!function_exists('update_field')) {
        echo '<div class="notice notice-error"><p>Advanced Custom Fields plugin is not active. Please activate it first.</p></div>';
        return;
    }

    $handle = fopen($file_path, 'r');

    if ($handle === false) {
        echo '<div class="notice notice-error"><p>Could not open the CSV file.</p></div>';
        return;
    }

    // Get the CSV header (first row)
    $header = fgetcsv($handle);

    if (!$header) {
        echo '<div class="notice notice-error"><p>The CSV file must not be empty and should have a valid header row.</p></div>';
        fclose($handle);
        return;
    }

    while (($row = fgetcsv($handle)) !== false) {
        // Skip empty rows
        if (empty(array_filter($row))) {
            continue;
        }

        // Extract fields from the row
        $dzialanie = sanitize_text_field($row[0]);
        $poddzialanie = sanitize_text_field($row[1]);
        $typ_operacji = sanitize_text_field($row[2]);
        $tytul_projektu = sanitize_text_field($row[3]);
        $cel_projektu = sanitize_text_field($row[4]);
        $beneficjent = sanitize_text_field($row[5]);
        $powiat = sanitize_text_field($row[6]);
        $gmina = sanitize_text_field($row[7]);
        $lokalna_grupa_dzialania = sanitize_text_field($row[8]);
        $wartosc_calkowita_projektu = str_replace('zł', '', sanitize_text_field($row[9]));
        $kwota_dofinansowania_efrrow = str_replace('zł', '', sanitize_text_field($row[10]));
        $status = sanitize_text_field($row[11]);
        $zawiera_zdjecia = sanitize_text_field($row[12]);
        $dobre_praktyki = sanitize_text_field($row[13]);

        $valid_values = [
                        "4 Inwestycje w środki trwałe", 
                        "7 Podstawowe usługi i odnowa wsi na obszarach wiejskich"
                    ];
                    
                    if (!in_array($dzialanie, $valid_values)) {
                        continue;
                    }

        // Find an existing post by title
        $existing_post = get_page_by_title($tytul_projektu, OBJECT, 'projektyinwestycyjne');

        // if ($existing_post && $existing_post->ID >= $min_id && $existing_post->ID <= $max_id) {
            // Update the existing post within the specified ID range
            $post_id = $min_id;

            wp_update_post([
                'ID' => $post_id,
                'post_title' => $tytul_projektu,
                'post_status' => 'publish', // Ensure the post remains published
            ]);
            // $term_to_use = !empty($gmina) ? $gmina : $powiat;

            //         if (!empty($term_to_use)) {
            //             $term = get_term_by('name', $term_to_use, 'inwestycyjne-categories'); // Changed taxonomy here
                        
            //             if ($term) {
            //                 wp_set_object_terms($post_id, $term->term_id, 'inwestycyjne-categories'); // Changed taxonomy here
            //             } else {
            //                 // Optional: Create the term if it doesn't exist
            //                 $new_term = wp_insert_term($term_to_use, 'inwestycyjne-categories'); // Changed taxonomy here
            //                 if (!is_wp_error($new_term)) {
            //                     wp_set_object_terms($post_id, $new_term['term_id'], 'inwestycyjne-categories'); // Changed taxonomy here
            //                 } else {
            //                     echo '<div class="notice notice-error"><p>Error assigning ' . $term_to_use . ' to post "' . $tytul_projektu . '".</p></div>';
            //                 }
            //             }
            //         }
            // Update custom fields
          
            update_field('typ_operacji_text_with_icon', ['title' => $typ_operacji], $post_id);
           

            echo '<div class="notice notice-success"><p>Post "' . $tytul_projektu . '" updated successfully!</p></div>';
            $min_id++;
        // } else {
        //     echo '<div class="notice notice-warning"><p>Post "' . $tytul_projektu . '" not found or outside the ID range. Skipping.</p></div>';
        // }
    }

    fclose($handle);
}


// function handle_csv_uploadd($file_path)
// {
//     global $wpdb;

//     // Check if ACF plugin is active
//     if (!function_exists('update_field')) {
//         echo '<div class="notice notice-error"><p>Advanced Custom Fields plugin is not active. Please activate it first.</p></div>';
//         return;
//     }

//     $handle = fopen($file_path, 'r');

//     if ($handle === false) {
//         echo '<div class="notice notice-error"><p>Could not open the CSV file.</p></div>';
//         return;
//     }

//     // Get the CSV header (first row)
//     $header = fgetcsv($handle);

//     if (!$header) {
//         echo '<div class="notice notice-error"><p>The CSV file must not be empty and should have a valid header row.</p></div>';
//         fclose($handle);
//         return;
//     }

//     while (($row = fgetcsv($handle)) !== false) {
//         // Skip empty rows
//         if (empty(array_filter($row))) {
//             continue;
//         }

//         // Extract fields from the row
//         $dzialanie = sanitize_text_field($row[0]);
//         $poddzialanie = sanitize_text_field($row[1]);
//         $typ_operacji = sanitize_text_field($row[2]);
//         $tytul_projektu = sanitize_text_field($row[3]);
//         $cel_projektu = sanitize_text_field($row[4]);
//         $beneficjent = sanitize_text_field($row[5]);
//         $powiat = sanitize_text_field($row[6]);
//         $gmina = sanitize_text_field($row[7]);
//         $lokalna_grupa_dzialania = sanitize_text_field($row[8]);
//         $wartosc_calkowita_projektu = str_replace('zł', '', sanitize_text_field($row[9]));
//         $kwota_dofinansowania_efrrow = str_replace('zł', '', sanitize_text_field($row[10]));
//         $status = sanitize_text_field($row[11]);
//         $zawiera_zdjecia = sanitize_text_field($row[12]);
//         $dobre_praktyki = sanitize_text_field($row[13]);

//         // $wartosc_calkowita_projektu = str_replace([' ', ','], ['', '.'], $wartosc_calkowita_projektu);
//         // $kwota_dofinansowania_efrrow = str_replace([' ', ','], ['', '.'], $kwota_dofinansowania_efrrow);

//         // Only add posts for "Działanie 19 - Wsparcie dla rozwoju lokalnego w ramach inicjatywy LEADER"
//         $valid_values = [
//             "4 Inwestycje w środki trwałe", 
//             "7 Podstawowe usługi i odnowa wsi na obszarach wiejskich"
//         ];
        
//         if (!in_array($dzialanie, $valid_values)) {
//             continue;
//         }

//         // Create a new post for 'projektyinwesty'
//         $post_id = wp_insert_post([
//             'post_title' => $tytul_projektu,
//             'post_content' => '',
//             'post_type' => 'projektyinwestycyjne', // Changed post type here
//             'post_status' => 'publish',
//         ]);

//         if (is_wp_error($post_id)) {
//             echo '<div class="notice notice-error"><p>Error creating post for ' . $tytul_projektu . '.</p></div>';
//             continue;
//         }
//         $term_to_use = !empty($powiat) ? $powiat : $gmina;

//         if (!empty($term_to_use)) {
//             $term = get_term_by('name', $term_to_use, 'inwestycyjne-categories'); // Changed taxonomy here
            
//             if ($term) {
//                 wp_set_object_terms($post_id, $term->term_id, 'inwestycyjne-categories'); // Changed taxonomy here
//             } else {
//                 // Optional: Create the term if it doesn't exist
//                 $new_term = wp_insert_term($term_to_use, 'inwestycyjne-categories'); // Changed taxonomy here
//                 if (!is_wp_error($new_term)) {
//                     wp_set_object_terms($post_id, $new_term['term_id'], 'inwestycyjne-categories'); // Changed taxonomy here
//                 } else {
//                     echo '<div class="notice notice-error"><p>Error assigning ' . $term_to_use . ' to post "' . $tytul_projektu . '".</p></div>';
//                 }
//             }
//         }
//         if (!empty($typ_operacji)) {
//             $term = get_term_by('name', $typ_operacji, 'project-categories'); // Changed taxonomy here
        
//             if ($term) {
//                 wp_set_object_terms($post_id, $term->term_id, 'project-categories'); // Changed taxonomy here
//             } else {
//                 // Optional: Create the term if it doesn't exist
//                 $new_term = wp_insert_term($typ_operacji, 'project-categories'); // Changed taxonomy here
//                 if (!is_wp_error($new_term)) {
//                     wp_set_object_terms($post_id, $new_term['term_id'], 'project-categories'); // Changed taxonomy here
//                 } else {
//                     echo '<div class="notice notice-error"><p>Error assigning typ_operacji ' . $typ_operacji . ' to post "' . $tytul_projektu . '".</p></div>';
//                 }
//             }
//         }
        
//         // Map CSV data to ACF fields
//         update_field('dzialanie_text_with_icon', ['title' => $dzialanie], $post_id);
//         update_field('poddziałanie_text_with_icon', ['title' => $poddzialanie], $post_id);
//         update_field('typ_operacji_text_with_icon', ['title' => $typ_operacji], $post_id);
//         update_field('projektu_text_with_icon', ['title' => $tytul_projektu], $post_id);
//         update_field('celprojektu_text_with_icon_copy', ['title' => $cel_projektu], $post_id);
//         update_field('beneficjent_text_with_icon', ['title' => $beneficjent], $post_id);
//         update_field('powiat_text_with_icon', ['title' => $powiat], $post_id);
//         update_field('gmina text_with_icon', ['title' => $gmina], $post_id);
//         update_field('lokalna grupa działania_text_with_icon', ['title' => $lokalna_grupa_dzialania], $post_id);
//         update_field('value_of_projects:', $wartosc_calkowita_projektu, $post_id);
//         update_field('value_of_eafrd_funding', $kwota_dofinansowania_efrrow, $post_id);
//         update_field('includes_photos', $zawiera_zdjecia, $post_id);
//         update_field('zrealizowane-', $status, $post_id);
//         update_field('praktyki', $dobre_praktyki, $post_id);

//         // Feedback for each post created
//         echo '<div class="notice notice-success"><p>Post "' . $tytul_projektu . '" created successfully with custom fields!</p></div>';
//     }

//     fclose($handle);
// }


// function reassign_project_categories() {
//     // Define the taxonomy and terms
//     $taxonomy = 'project-categories';
//     $old_term = 'Scalanie gruntów'; // Name of the incorrect category
//     $new_term = 'projektów na scalanie gruntów'; // Name of the correct category

//     // Get the term IDs for both terms
//     $old_term_obj = get_term_by('name', $old_term, $taxonomy);
//     $new_term_obj = get_term_by('name', $new_term, $taxonomy);

//     if (!$old_term_obj || !$new_term_obj) {
//         error_log('One or both terms not found.');
//         return;
//     }

//     $old_term_id = $old_term_obj->term_id;
//     $new_term_id = $new_term_obj->term_id;

//     // Query posts assigned to the incorrect term
//     $args = [
//         'post_type' => 'projektyinwestycyjne',
//         'post_status' => 'publish',
//         'posts_per_page' => -1, // Retrieve all posts
//         'tax_query' => [
//             [
//                 'taxonomy' => $taxonomy,
//                 'field' => 'term_id',
//                 'terms' => $old_term_id,
//             ],
//         ],
//     ];

//     $query = new WP_Query($args);

//     if ($query->have_posts()) {
//         foreach ($query->posts as $post) {
//             // Remove the old term and assign the new term
//             wp_remove_object_terms($post->ID, $old_term_id, $taxonomy);
//             wp_set_object_terms($post->ID, $new_term_id, $taxonomy, true); // Append the new term
//         }
//     }

//     wp_reset_postdata();
// }

// // // Hook the function to the `init` action
// add_action('init', 'reassign_project_categories');
// function reassign_multiple_project_categories() {
//     // Define the taxonomy and terms
//     $taxonomy = 'project-categories';
//     $old_terms = ['Zarządzanie zasobami wodnymi dla gmin', 'Zarządzanie zasobami wodnymi dla PGW WP']; // Names of the old categories
//     $new_term = 'projektów na zarządzanie zasobami wodnymi'; // Name of the new category

//     // Get the term IDs for the old terms and the new term
//     $old_term_ids = [];
//     foreach ($old_terms as $old_term) {
//         $term = get_term_by('name', $old_term, $taxonomy);
//         if ($term) {
//             $old_term_ids[] = $term->term_id;
//         }
//     }

//     $new_term_obj = get_term_by('name', $new_term, $taxonomy);
//     if (!$new_term_obj) {
//         error_log('New term not found.');
//         return;
//     }

//     $new_term_id = $new_term_obj->term_id;

//     if (empty($old_term_ids)) {
//         error_log('No old terms found.');
//         return;
//     }

//     // Query posts assigned to the old terms
//     $args = [
//         'post_type' => 'projektyinwestycyjne',
//         'post_status' => 'publish',
//         'posts_per_page' => -1, // Retrieve all posts
//         'tax_query' => [
//             [
//                 'taxonomy' => $taxonomy,
//                 'field' => 'term_id',
//                 'terms' => $old_term_ids,
//             ],
//         ],
//     ];

//     $query = new WP_Query($args);

//     if ($query->have_posts()) {
//         foreach ($query->posts as $post) {
//             // Remove the old terms and assign the new term
//             wp_remove_object_terms($post->ID, $old_term_ids, $taxonomy);
//             wp_set_object_terms($post->ID, $new_term_id, $taxonomy, true); // Append the new term
//         }
//     }

//     wp_reset_postdata();
// }

// // Hook the function to the `init` action
// add_action('init', 'reassign_multiple_project_categories');
// function get_min_max_post_ids($post_type = 'post') {
//     global $wpdb;

//     // Query to get minimum and maximum post IDs
//     $results = $wpdb->get_row(
//         $wpdb->prepare(
//             "SELECT MIN(ID) as min_id, MAX(ID) as max_id 
//              FROM {$wpdb->posts} 
//              WHERE post_type = %s AND post_status = 'publish'",
//             $post_type
//         )
//     );

//     if ($results) {
//         return [
//             'min_id' => $results->min_id,
//             'max_id' => $results->max_id,
//         ];
//     }

//     return null;
// }

// // Example usage
// $post_type = 'projektyinwestycyjne'; // Replace with your post type
// $ids = get_min_max_post_ids($post_type);

// if ($ids) {
//     echo 'Minimum Post ID: ' . $ids['min_id'] . '<br>';
//     echo 'Maximum Post ID: ' . $ids['max_id'];
// } else {
//     echo 'No posts found for the specified post type.';
// }

// function update_projekty_leader_titles() {
//     global $wpdb;

//     // Get all posts of the 'projekty_leader' post type
//     $posts = $wpdb->get_results("
//         SELECT ID, post_title 
//         FROM {$wpdb->posts} 
//         WHERE post_type = 'projekty_leader' 
//         AND post_status = 'publish'
//     ");

//     if ($posts) {
//         foreach ($posts as $post) {
//             $post_id = $post->ID;
    
//             // Get the custom field 'projektu_text_with_icon' as an array
//             $projektu_data = get_field('projektu_text_with_icon', $post_id); // ACF function
            
//             // Check if 'projektu_text_with_icon' exists and contains a 'title' key
//             if (!empty($projektu_data['title'])) {
//                 $tytul_projektu = $projektu_data['title'];
    
//                 // Update the post title with the 'title' from 'projektu_text_with_icon'
//                 $updated_post = [
//                     'ID'         => $post_id,
//                     'post_title' => $tytul_projektu,
//                 ];
//                 wp_update_post($updated_post);
    
//                 // Optional: Log the update for debugging
//                 error_log("Updated post ID {$post_id} with new title: {$tytul_projektu}");
//             } else {
//                 // Optional: Log missing 'title' for debugging
//                 error_log("Post ID {$post_id} has no 'title' in 'projektu_text_with_icon'");
//             }
//         }
//     } else {
//         error_log("No posts found for the 'projekty_leader' post type.");
//     }
    
// }

// // Hook the function to a custom action (or call it manually)
// add_action('init', 'update_projekty_leader_titles');
// add_action('init', function () {
//     // Query all posts of the custom post type 'projektyinwestycyjne'
//     $args = [
//         'post_type'      => 'projektyinwestycyjne',
//         'posts_per_page' => -1, // Fetch all posts
//         'fields'         => 'ids', // Only fetch post IDs for better performance
//     ];

//     $posts = get_posts($args);

//     if (!empty($posts)) {
//         foreach ($posts as $post_id) {
//             // Get the existing 'wartosc_projektu' group field value
//             $wartosc_projektu = get_field('dofinansowania_z_efrrow', $post_id);

//             if (!empty($wartosc_projektu) && isset($wartosc_projektu['label'])) {
//                 // Set the 'label' field to an empty value
//                 $wartosc_projektu['label'] = '';

//                 // Update the group field with the modified data
//                 update_field('dofinansowania_z_efrrow', $wartosc_projektu, $post_id);
//             }
//         }
//     }
// });


