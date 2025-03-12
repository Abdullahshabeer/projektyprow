jQuery(document).ready(function($) {
    $('.filter-button').on('click', function() {
       
        var postType = $(this).data('postype');
        var postsPerPage = ajax_params.posts_per_page;
        var ajaxUrl = ajax_params.ajax_url;
        $('.loderdiv').show();
        $.ajax({
            url: ajaxUrl,
            type: 'POST',
            data: {
                action: 'fetch_filtered_posts',
                post_type: postType,
                posts_per_page: postsPerPage
            },
            success: function(response) {
                $('.loderdiv').hide();
                $('#post-list .owl-carousel').html(response);

                // Reinitialize Owl Carousel after updating content
                $('#post-list .owl-carousel').trigger('destroy.owl.carousel').owlCarousel({
                    loop:false,
	    margin:30,
	    nav:true,
	    dots:false,
		autoHeight:true,
	    navText:[
	    	'<svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">\
				<path fill-rule="evenodd" clip-rule="evenodd" d="M20.7071 5.12749C21.0976 5.50581 21.0976 6.11919 20.7071 6.49751L11.4142 15.5L20.7071 24.5025C21.0976 24.8808 21.0976 25.4942 20.7071 25.8725C20.3166 26.2508 19.6834 26.2508 19.2929 25.8725L9.29289 16.185C8.90237 15.8067 8.90237 15.1933 9.29289 14.815L19.2929 5.12749C19.6834 4.74917 20.3166 4.74917 20.7071 5.12749Z" fill="#004A48"/>\
				</svg>','<svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">\
				<path fill-rule="evenodd" clip-rule="evenodd" d="M11.2929 5.12749C11.6834 4.74917 12.3166 4.74917 12.7071 5.12749L22.7071 14.815C23.0976 15.1933 23.0976 15.8067 22.7071 16.185L12.7071 25.8725C12.3166 26.2508 11.6834 26.2508 11.2929 25.8725C10.9024 25.4942 10.9024 24.8808 11.2929 24.5025L20.5858 15.5L11.2929 6.49751C10.9024 6.11919 10.9024 5.50581 11.2929 5.12749Z" fill="#004A48"/>\
			</svg>'],
	    responsive:{
	        0:{
	            items:1,
				
	        },
	        768:{
	            items:2,
	        },
	        992:{
	            items:3
	        }
	    }
                });
            }
        });
    });

   

   


       
});
jQuery(document).ready(function() {
    // Trigger fetchPosts on filter click
    $('.filter-post').on('click', function() {
        $('.filter-post').removeClass('active');
        const postType = $(this).data('postype'); // Get post type from the clicked element
        $(this).addClass('active');
        const searchQuery = $('#post-search').val(); // Get search query from the search field
        const ajaxUrl = ajax_params.ajax_url; // Get AJAX URL from localized parameters
        fetchPosts(postType, searchQuery, ajaxUrl, 1); // Fetch posts for the first page
    });

    // Trigger fetchPosts on search input
    $('#post-search').on('input', function() {
        const searchQuery = $(this).val(); // Get the search query
        const ajaxUrl = ajax_params.ajax_url; // Get AJAX URL from localized parameters
        fetchPosts(null, searchQuery, ajaxUrl, 1); // Fetch posts for the first page with updated search query
    });

    // Trigger fetchPosts on pagination click
    $(document).on('click', '.pagination-wrap a', function(e) {
        e.preventDefault(); // Prevent default link behavior
        const ajaxUrl = ajax_params.ajax_url; // AJAX URL
        const page = $(this).text(); // Extract the page number from the link text
        const postType = $('.filter-post.active').data('postype') || ''; // Active post type
        const searchQuery = $('#post-search').val(); // Current search query
        fetchPosts(postType, searchQuery, ajaxUrl, page); // Fetch posts for the selected page
    });
    // Fetch posts function
    function fetchPosts(postType = '', searchQuery = '', ajaxUrl, paged = 1) {
        $.ajax({
            url: ajaxUrl, // AJAX endpoint
            type: 'POST',
            data: {
                action: 'fetch_filtered_poststype', // AJAX action name
                post_type: postType, // Selected post type
                search_query: searchQuery, // Search query
                paged: paged // Current page number
            },
            beforeSend: function() {
                $('.fetchdata').html('<div class="loading">Loading...</div>'); // Show a loading message
            },
            success: function(response) {
                $('.fetchdata').html(response); // Replace content with fetched data
            },
            error: function(xhr, status, error) {
                console.error('AJAX Error:', error); // Log any errors to the console
                $('.fetchdata').html('<div class="error">Something went wrong. Please try again.</div>'); // Display error message
            }
        });
    }
    
    
});
document.addEventListener('DOMContentLoaded', function () {
    const svgWrapper = document.querySelector('.svg-wrapper');
    const zoomInBtn = document.querySelector('.btn-zoom-in');
    const zoomOutBtn = document.querySelector('.btn-zoom-out');
    const printBtn = document.querySelector('.btn-print');
    const compleWrapper = document.querySelector('.map-wrap');
    
	if (svgWrapper && zoomInBtn && zoomOutBtn && printBtn && compleWrapper) {
		let zoomLevel = 1;

		// Zoom In functionality
		zoomInBtn.addEventListener('click', function () {
			zoomLevel += 0.1;
			svgWrapper.style.transform = `scale(${zoomLevel})`;
			svgWrapper.style.transformOrigin = 'center';
		});

		// Zoom Out functionality
		zoomOutBtn.addEventListener('click', function () {
			zoomLevel = Math.max(0.1, zoomLevel - 0.1); // Prevent zooming out too much
			svgWrapper.style.transform = `scale(${zoomLevel})`;
			svgWrapper.style.transformOrigin = 'center';
		});

		// Print functionality
		printBtn.addEventListener('click', function () {
			const newWindow = window.open('', '_blank');
			newWindow.document.write('<html><head><title>Print SVG</title></head><body>');
			newWindow.document.write(compleWrapper.innerHTML);
			newWindow.document.write('</body></html>');
			newWindow.document.close();
			newWindow.print();
		});
	}	
});

jQuery(document).ready(function ($) {
    $(document).on('select2:select', '#powiat-select', function (e) {
        let selectedPowiat = $(this).val();
      
        const ajaxUrl = ajax_params.ajax_url;
        if (selectedPowiat) {
            $.ajax({
                url: ajaxUrl, // Provided by WordPress
                method: 'POST',
                data: {
                    action: 'fetch_child_categories',
                    parent_category: selectedPowiat,
                },
                success: function (response) {
                    if (response.success) {
                        let options = '<option value="">Wybierz</option>';
                        $.each(response.data, function (index, category) {
                            options += `<option value="${category.slug}">${category.name}</option>`;
                        });
                        $('#gmina-select').html(options).trigger('change');
                    } else {
                        alert(response);
                    }
                },
                error: function () {
                    alert('An error occurred while fetching data.');
                },
            });
        } else {
            $('#gmina-select').html('<option value="">Wybierz</option>');
        }
    });
    $(document).on('select2:select', '#LokalneGrupy', function (e) {
        let selectedPowiat = $(this).val();
      
        const ajaxUrl = ajax_params.ajax_url;
        if (selectedPowiat) {
            $.ajax({
                url: ajaxUrl, // Provided by WordPress
                method: 'POST',
                data: {
                    action: 'fetch_child_categories_second_postype',
                    parent_category: selectedPowiat,
                },
                success: function (response) {
                    if (response.success) {
                        let options = '<option value="">Wybierz</option>';
                        $.each(response.data, function (index, category) {
                            options += `<option value="${category.slug}">${category.name}</option>`;
                        });
                        $('#gmina-select').html(options).trigger('change');
                    } else {
                        alert(response);
                    }
                },
                error: function () {
                    alert('An error occurred while fetching data.');
                },
            });
        } else {
            $('#gmina-select').html('<option value="">Wybierz</option>');
        }
    });
});
