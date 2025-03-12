var $ = jQuery;
jQuery(document).ready(function($) {
    jQuery('.toggle-button').click(function(){
		if (jQuery(this).hasClass('active')) {
			jQuery(this).removeClass('active');
			jQuery('body').removeClass('menu-open');
			jQuery('.mobile-menu-wrap').css({ 'height': 'unset' });
		}
		else{
			jQuery(this).addClass('active');
			jQuery('body').addClass('menu-open');
			SetHeight();
		}
		$('.mobile-menu-wrap').slideToggle();
	});

	$('.owl-carousel.article-carousel').owlCarousel({
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

	$('.owl-carousel.finances-investments, .finances-leader').owlCarousel({
	    loop:false,
	    margin:40,
	    nav:true,
	    dots:false,
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
	            items:3,
	        },
	        992:{
	            items:5
	        }
	    }
	});
	
	$(window).on('load', function () {
		$(".owl-prev").attr({
			"aria-label": "przewiń do tyłu",
			"tabindex": "-1"
		});
		$(".owl-next").attr({
			"aria-label": "przewiń do przodu",
			"tabindex": "-1"
		});
		
		// For thumbnail slider
		$(".owl-slider-thumbnail .owl-prev").attr({
			"aria-label": "Poprzedni obraz",
			"tabindex": "0"
		});
		$(".owl-slider-thumbnail .owl-next").attr({
			"aria-label": "Następny obraz",
			"tabindex": "0"
		});
	});

	$('.mobile-menu .menu-item-has-children > a').append('<span class="nav-toggle-icon"></span>');
	$('.nav-toggle-icon').click(function(e) {
		e.preventDefault();
	    var clickedMenuItem 			= $(this).closest('.menu-item-has-children');
    	var subMenu 					= clickedMenuItem.find('.sub-menu');
    	$('.sub-menu').not(subMenu).slideUp();
    	subMenu.slideToggle();
	});


	// set equal height of news card
	var maxHeight = 0;
	$('.article-card .article-content').each(function() {
		var contentHeight 		= $(this).height();
		maxHeight 		= Math.max(maxHeight, contentHeight);
	});
	$('.article-card .article-content').height(maxHeight);


	$('summary').on('click', function(event) {
        var $details = $(this).parent();
        $('details').not($details).removeAttr('open');

        if ($details.attr('open')) {
            $details.removeAttr('open');
        } else {
            $details.attr('open', 'open');
        }

        event.preventDefault();
    });

	$('.owl-slider-main .item').each(function() {
		var img = $(this).find('img');
		var imgSrc = img.attr('src');
	
		if (imgSrc) {
			$(this).css('position', 'relative');
			$(this).find('.image').prepend('<div class="bg-blur"></div>');
			
			$(this).find('.bg-blur').css({
				'background-image': 'url(' + imgSrc + ')',
				'background-size': 'cover',
				'background-position': 'center',
				'filter': 'blur(27px)',
				'position': 'absolute',
				'top': 0,
				'left': 0,
				'width': '100%',
				'height': '100%',
				'z-index': 1
			});
		}
	});
	$.fn.DataTable.ext.pager.numbers_length = 6;

	new DataTable('#project-table', {
		info: false,
		pageLength: 10,
		
		initComplete: function () {
			var api = this.api();
	
			var clonedHeader = $('#project-table thead tr').clone().addClass('map-filter-row').attr('data-dt-order', 'disable');
			clonedHeader.find('th').each(function() {
				$(this)
					.removeAttr('data-dt-column')
					.removeAttr('aria-sort')
					.removeAttr('aria-label')
					.removeAttr('tabindex')
					.removeClass(); // Removes all classes
			});
			$('#project-table thead').append(clonedHeader);

			$('#project-table thead').append(`
				<tr id="sort-container-row" style="display:none;">
					<td colspan="${api.columns().count()}">
						<div id="sort-container">
							<label for="sort-dropdown">Sortuj: </label>
							<select id="sort-dropdown">
								<option value="">Wybierz</option>
								<option value="alphabetical">Alfabetycznie</option>
								<option value="custom-option-1">Opcja niestandardowa 1</option>
								<option value="custom-option-2">Opcja niestandardowa 2</option>
							</select>
						</div>
					</td>
				</tr>
			`);
	
			$('#project-table thead').append(`
				<tr id="custom-info-row" style="display:none;">
					<td colspan="${api.columns().count()}">
						<div style="display: flex; justify-content: space-between; align-items: center;">
							<div id="custom-info-left">Wyniki wyszukiwania: <span id="showing-records"></span></div>
							<div id="custom-info-right">
								<button id="remove-filter">
									<svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.5834 6.57874L6.41675 15.977" stroke="#1B1B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.41675 6.57874L15.5834 15.977" stroke="#1B1B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Usuń filtry</button>
							</div>
						</div>
					</td>
				</tr>
			`);  
	
			// Set up column filters
			api.columns().every(function () {
				var column = this;
				var header = $('#project-table thead tr:eq(1) th').eq(column.index());
				if (header.text() === 'Tytuł projektu') {
					$('<label for="project-title">Tytuł projektu</label><input type="text" id="project-title" placeholder="Wpisz"/>')
						.appendTo(header.empty())
						.on('keyup change', function () {
							if (column.search() !== this.value) {
								column.search(this.value).draw();
							}
							toggleCustomInfo();
						});
				} else if (header.text() === 'Działanie') {
					var select = $('<select id="action"><option value="">Wybierz</option></select>')
						.appendTo(header.empty())
						.on('change', function () {
							var val = $.fn.dataTable.util.escapeRegex($(this).val());
							column.search(val ? '^' + val + '$' : '', true, false).draw();
							toggleCustomInfo();
						});
					column.data().unique().sort().each(function (d) {
						select.append('<option value="' + d + '">' + d + '</option>');
					});
					$('<label for="action">Działanie</label>').prependTo(select.parent());
					select.select2({
						placeholder: "Wybierz",
						width: '100%',
						minimumResultsForSearch: -1
					});
				} else if (header.text() === 'Typ operacji') {
					var select = $('<select id="operation-type"><option value="">Wybierz</option></select>')
						.appendTo(header.empty())
						.on('change', function () {
							var val = $.fn.dataTable.util.escapeRegex($(this).val());
							column.search(val ? '^' + val + '$' : '', true, false).draw();
							toggleCustomInfo();
						});
	
					column.data().unique().sort().each(function (d) {
						select.append('<option value="' + d + '">' + d + '</option>');
					});

					$('<label for="operation-type">Typ operacji</label>').prependTo(select.parent());
					select.select2({
						placeholder: "Wybierz",
						width: '100%',
						minimumResultsForSearch: -1
					});
				} else if (header.text() === 'Poddziałanie') {
					var select = $('<select id="sub-activity"><option value="">Wybierz</option></select>')
						.appendTo(header.empty())
						.on('change', function () {
							var val = $.fn.dataTable.util.escapeRegex($(this).val());
							column.search(val ? '^' + val + '$' : '', true, false).draw();
							toggleCustomInfo();
						});
	
					column.data().unique().sort().each(function (d) {
						select.append('<option value="' + d + '">' + d + '</option>');
					});

					$('<label for="sub-activity">Poddziałanie</label>').prependTo(select.parent());
					select.select2({
						placeholder: "Wybierz",
						width: '100%',
						minimumResultsForSearch: -1
					});
				} else if (header.text() === 'Powiat') {
					var select = $('<select id="powiat-select"><option value="">Wybierz</option></select>')
						.appendTo(header.empty())
						.on('change', function () {  
							var val = $.fn.dataTable.util.escapeRegex($(this).val());
// 							column.search(val ? '^' + val + '$' : '', true, false).draw();
// 							toggleCustomInfo();
						});
	
					column.data().unique().sort().each(function (d) {
						select.append('<option value="' + d + '">' + d + '</option>');
					});

					$('<label for="sub-activity">Powiat</label>').prependTo(select.parent());
					select.select2({
						placeholder: "Wybierz",
						width: '100%',
						minimumResultsForSearch: -1
					});
				} else if (header.text() === 'Gmina') {
					var select = $('<select id="gmina-select"><option value="">Wybierz</option></select>')
						.appendTo(header.empty())
						.on('change', function () {
							var val = $.fn.dataTable.util.escapeRegex($(this).val());
							column.search(val ? '^' + val + '$' : '', true, false).draw();
							toggleCustomInfo();
						});
	
// 					column.data().unique().sort().each(function (d) {
// 						select.append('<option value="' + d + '">' + d + '</option>');
// 					});

					$('<label for="sub-activity">Gmina</label>').prependTo(select.parent());
					select.select2({
						placeholder: "Wybierz",
						width: '100%',
						minimumResultsForSearch: -1
					});
				}else if (header.text() === 'Lokalne Grupy Działania') {
					var select = $('<select id="LokalneGrupy"><option value="">Wybierz</option></select>')
						.appendTo(header.empty())
						.on('change', function () {
							var val = $.fn.dataTable.util.escapeRegex($(this).val());
							// column.search(val ? '^' + val + '$' : '', true, false).draw();
							// toggleCustomInfo();
						});
	
					column.data().unique().sort().each(function (d) {
						select.append('<option value="' + d + '">' + d + '</option>');
					});

					$('<label for="sub-activity">Lokalne Grupy Działania</label>').prependTo(select.parent());
					select.select2({
						placeholder: "Wybierz",
						width: '100%',
						minimumResultsForSearch: -1
					});
				} else {
					var select = $('<select id="beneficiary"><option value="">Wybierz</option></select>')
						.appendTo(header.empty())
						.on('change', function () {
							var val = $.fn.dataTable.util.escapeRegex($(this).val());
							column.search(val ? '^' + val + '$' : '', true, false).draw();
							toggleCustomInfo();
						});
	
					column.data().unique().sort().each(function (d) {
						select.append('<option value="' + d + '">' + d + '</option>');
					});
					$('<label for="beneficiary">Beneficjent</label>').prependTo(select.parent());
					select.select2({
						placeholder: "Wybierz",
						width: '100%',
					});
				}
			});
	
			
			api.on('draw', function() {
				var showingRecords = api.rows({ filter: 'applied' }).count();
				$('#showing-records').text(showingRecords);
				toggleCustomInfo();
				
				$('#project-table td').removeClass('dtr-control');
				$('#project-table td').removeAttr('tabindex');
				
				$('.dt-paging-button.previous').removeAttr('aria-label');
			$('.dt-paging-button.next').removeAttr('aria-label'); 
			
			$('.dt-paging-button.previous').attr('title', 'Poprzednia strona');
			$('.dt-paging-button.next').attr('title', 'Następna strona'); 
			});
	
			$('#project-table').on('click', '#remove-filter', function() {
				$('#project-table thead tr:eq(1) input').val('');
				$('#project-table thead tr:eq(1) select').each(function() {
					$(this).val('').trigger('change');
				});
				
				api.columns().search('').draw();
				$('#custom-info-row').hide();
			});
	
			function toggleCustomInfo() {
				let hasValue = $('#project-table thead tr:eq(1) input').filter(function() { return this.value; }).length > 0 ||
							   $('#project-table thead tr:eq(1) select').filter(function() { return this.value; }).length > 0;
				$('#custom-info-row').toggle(hasValue);
			}
	
			function toggleSortDropdown() {
				if ($(window).width() < 991) {
					$('#sort-container-row').show();
				} else {
					$('#sort-container-row').hide();
				}
			}
			toggleSortDropdown();
	
			$('#sort-dropdown').on('change', function() {
				var sortValue = $(this).val();
				if (sortValue === 'alphabetical') {
					api.order([0, 'asc']).draw();
				} else if (sortValue === 'custom-option-1') {
					api.order([1, 'asc']).draw();
				} else if (sortValue === 'custom-option-2') {
					api.order([2, 'asc']).draw();
				}
			});
	
			$(window).on('resize', toggleSortDropdown);

			function togglePagination() {
				const rowCount = api.rows({ filter: 'applied' }).count();
				const paginationContainer = $('.dt-paging');
				paginationContainer.toggle(rowCount > 0);
				
				$('#project-table td.dtr-control').removeAttr('tabindex');
			}
	
			togglePagination();
			
			$('.dt-paging-button.previous').removeAttr('aria-label');
			$('.dt-paging-button.next').removeAttr('aria-label'); 
			
			$('.dt-paging-button.previous').attr('title', 'Poprzednia strona');
			$('.dt-paging-button.next').attr('title', 'Następna strona');
			
			$('#project-table td').removeClass('dtr-control');
			$('#project-table td').removeAttr('tabindex');
	
			api.on('draw', togglePagination);
		},
		language: {
			paginate: {
	        	next: '&#129122;',
	        	previous: '&#129120;'
	      	},
			lengthMenu: 'Wyniki wyszukiwania _MENU_',
			aria: {
				orderable:  ": Aktywuj, aby sortować",
				orderableReverse: ": Aktywuj, aby odwrócić sortowanie",
				orderableRemove: ': Aktywuj, aby usunąć sortowanie'
			}
		},
		layout: {
			topStart: null,
			topEnd: null,
			bottomEnd: null,
			bottomStart: {
				paging: {
					firstLast: false
				}
			}
		},
		columnDefs: [
			{
				className: '',
			},
		
			{ width: '35%', targets: 0 },
			{ width: '21.6666%', targets: 3 },
			{ width: '21.6666%', targets: 4 },
			{ width: '21.6666%', targets: 5 },
			{ orderable: false, targets: 'map-filter-row' }
		],
		order: [0, 'asc'],
		responsive: {
			breakpoints: [
				{name: 'bigdesktop', width: Infinity},
				{name: 'middesktop', width: 991},
				{name: 'medium', width: 991},
				{name: 'mobilep', width: 991},
			],
			details: {
				renderer: function(api, rowIdx, columns) {
					var defaultRenderer = DataTable.Responsive.renderer.listHidden();
					var childRowContent = defaultRenderer(api, rowIdx, columns);
					return $('<tr class="' + api.row(rowIdx).node().className + ' child"></tr>').append(
						$('<td colspan="100%" class="child"></td>').append(childRowContent)
					);
				}
			}
		}
	})
	
	$('#project-table').on('draw.dt', function () {
        
    });
	
	
});
$('#project-table').on('responsive-display.dt', function(e, datatable, row, showHide) {
    const controlCell = $(row.node()).find('td.dtr-control'); // Locate the control cell

    if (controlCell.length) {
        const label = showHide ? 'Zwiń' : 'Rozwiń'; // Toggle between expand/collapse labels

        // Check if the toggle label exists
        let labelSpan = controlCell.find('.toggle-label');
        if (labelSpan.length) {
            // Update the screen-reader text inside the toggle label
            let srText = labelSpan.find('.screen-reader-text');
            if (srText.length) {
                srText.text(label); // Update existing screen-reader text
            } else {
                labelSpan.append(`<span class="screen-reader-text">${label}</span>`); // Add it back if missing
            }
        } else {
            // Add the toggle label with the screen-reader text
            controlCell.append(
                `<span class="toggle-label dtr-control" tabindex="0">
                    <span class="screen-reader-text">${label}</span>
                </span>`
            );
        }
    }
});
$(document).ready(function() {
    $('.select2-hidden-accessible').select2({
        sorter: function(data) {
            // Separate the placeholder option
            const placeholder = data.find(item => item.id === "");
            const sortedData = data
                .filter(item => item.id !== "") // Exclude the placeholder from sorting
                .sort(function(a, b) {
                    return a.text.localeCompare(b.text, 'pl');
                });

            // Add the placeholder back at the top
            if (placeholder) {
                sortedData.unshift(placeholder);
            }

            return sortedData;
        }
    });
});

// On table initialization (page load), ensure the default labels are applied
$(document).ready(function() {
    $('#project-table').DataTable().rows().every(function() {
        const row = this.node();
        const controlCell = $(row).find('td.dtr-control'); // Find the control cell

        if (controlCell.length) {
            // Check if the toggle label exists
            let labelSpan = controlCell.find('.toggle-label');
            if (labelSpan.length) {
                // Ensure the screen-reader text exists inside the toggle label
                let srText = labelSpan.find('.screen-reader-text');
                if (srText.length) {
                    srText.text('Rozwiń'); // Set default screen-reader text
                } else {
                    labelSpan.append(`<span class="screen-reader-text">Rozwiń</span>`); // Add it back if missing
                }
            } else {
                // Add the toggle label with the screen-reader text
                controlCell.append(
                    `<span class="toggle-label dtr-control" tabindex="0">
                        <span class="screen-reader-text">Rozwiń</span>
                    </span>`
                );
            }
        }
    });
});
function SetHeight() {
	var HeaderTopHeight 	= jQuery('.header-top').is(':visible') ? jQuery('.header-top').outerHeight() : 0;
	var HeaderHeight 			= jQuery('.main-header').outerHeight();
	var TotalHeight 			= HeaderTopHeight + HeaderHeight; 
	jQuery('.mobile-menu-wrap').css({ 'height': 'calc(100vh - ' + TotalHeight+ 'px)' });
}
$(document).ready(function() {
    var sync1 	= $(".owl-slider-main");
    var sync2 	= $(".owl-slider-thumbnail");
    duration 	= 300,
    thumbs 		= 5;

	sync2.on('click', '.owl-next', function () {
		sync1.trigger('next.owl.carousel')
	});
	sync2.on('click', '.owl-prev', function () {
		sync1.trigger('prev.owl.carousel')
	});
	sync1.owlCarousel({
		loop: false,
		items : 1,
		margin:0,
		nav : false,
		dots : false,
		autoHeight : true,
		touchDrag: false,
		mouseDrag: false,
		pullDrag: false,
		onChanged: function(event) {
			updateNavState(event);
			updateActiveClass(event.item.index);
		},
	})
	sync2.owlCarousel({
		loop: false,
		margin:30,
		nav : true,
		dots : false,
		touchDrag: false,
		mouseDrag: false,
		pullDrag: false,
		navText:[
			'<svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">\
				<path fill-rule="evenodd" clip-rule="evenodd" d="M20.7071 5.12749C21.0976 5.50581 21.0976 6.11919 20.7071 6.49751L11.4142 15.5L20.7071 24.5025C21.0976 24.8808 21.0976 25.4942 20.7071 25.8725C20.3166 26.2508 19.6834 26.2508 19.2929 25.8725L9.29289 16.185C8.90237 15.8067 8.90237 15.1933 9.29289 14.815L19.2929 5.12749C19.6834 4.74917 20.3166 4.74917 20.7071 5.12749Z" fill="#004A48"/>\
				</svg>','<svg xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none">\
				<path fill-rule="evenodd" clip-rule="evenodd" d="M11.2929 5.12749C11.6834 4.74917 12.3166 4.74917 12.7071 5.12749L22.7071 14.815C23.0976 15.1933 23.0976 15.8067 22.7071 16.185L12.7071 25.8725C12.3166 26.2508 11.6834 26.2508 11.2929 25.8725C10.9024 25.4942 10.9024 24.8808 11.2929 24.5025L20.5858 15.5L11.2929 6.49751C10.9024 6.11919 10.9024 5.50581 11.2929 5.12749Z" fill="#004A48"/>\
			</svg>'],
		responsive: {
			0: {
				items: 2,
				margin:20
			},
			600: {
				items: 3
			},
			1000: {
				items: thumbs
			}
		}
	})
	.on('click', '.owl-item', function() {
		var i = $(this).index();
		console.log(i);
		sync2.trigger('to.owl.carousel', [i, duration, true]);
		sync1.trigger('to.owl.carousel', [i, duration, true]);
		updateActiveClass(i);
	});

	function updateNavState(event) {
		var index = event.item.index;
		var totalItems = event.item.count;
		
		if (index === 0) {
			sync2.find('.owl-prev').addClass('disabled');
		} else {
			sync2.find('.owl-prev').removeClass('disabled');
		}

		if (index === totalItems - 1) {
			sync2.find('.owl-next').addClass('disabled');
		} else {
			sync2.find('.owl-next').removeClass('disabled');
		}
	}
	function updateActiveClass(index) {
		sync2.find('.owl-item').removeClass('active');
		sync2.find('.owl-item').eq(index).addClass('active');
	}
	updateActiveClass(0);
});

document.querySelectorAll('a').forEach(function(link) {
	const linkHostname = link.hostname;
	const currentHostname = window.location.hostname;

	if (link.href.startsWith('tel:')) {
		link.setAttribute('title', 'kliknij aby zadzwonić');
	} else if (link.href.startsWith('mailto:')) {
		link.setAttribute('title', 'kliknij by wysłać mejla');
	} else if (linkHostname !== currentHostname) {
		if (link.target === "_blank") {
			link.setAttribute('title', 'otwiera się w nowej karcie');
		} else {
			link.setAttribute('title', 'link zewnętrzny');
		}
	}
});
$(window).on('load' , function(){
	jQuery('.able-button-handler-fullscreen').attr('aria-label', 'Pełny ekran');
})

