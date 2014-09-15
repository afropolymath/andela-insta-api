Instagram = {
	base: "https://api.instagram.com/v1",
	params: { client_id: 'baa5c63f64e844fc9a854b18bbb8d301' },
	start: function() {
		$('.container #popular').show();
		$('.tabs a').click(Instagram.changeTabs);
		// Fetches recent posts
		Instagram.fetchRecent();
		// Fetches posts around me
		Instagram.fetchFromLocation();
	},
	// A method that fetches all the most popular media on Instagram
	fetchRecent: function() {
		$.getJSON(Instagram.base + '/media/popular?callback=?', Instagram.params, function(response) {
	        		Instagram.loadItems(response, '#popular');
	        	});
	},
	// A method that fetches all the media around me (within 1000km)
	fetchFromLocation: function() {

		Instagram.params.lat = 0;
		Instagram.params.lng = 0;

		// Check if our browser supports Geolocation
		if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(function(position) {
	        	Instagram.params.lat = position.coords.latitude;
	        	Instagram.params.lng = position.coords.longitude;
	        	$.getJSON(Instagram.base + '/media/search?callback=?', Instagram.params, function(response) {
	        		Instagram.loadItems(response, '#near_you');
	        	});
	        });
	    } else {
	        $('.error').html("Geolocation is not supported by this browser.");
	    }	
		
		// Use longitude and latitude to get posts
		// Run load items
	},
	loadItems: function(response, container) {
		//console.log(response);
		$.each(response.data, function() {
			var post = this;
			var caption = post.caption !== null ? post.caption.text : '';
			var post_div = '<div class="post">' + 
			'<img src="' + post.images.low_resolution.url + '"/>' +
			'<div class="caption">' + caption +'</div>'
			'</div>';
			$('.container ' + container).append(post_div);

		})
		//var post = '<div class="post">';
	},
	changeTabs: function(e) {
		var location = $(this).attr('href');
		$(location).siblings().hide();
		$(location).show();
		e.preventDefault();
	}
}

$(document).ready(Instagram.start);