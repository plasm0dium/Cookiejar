// GET param from specific source
var getParam = window.location.pathname.split("=")[1];

// Create cookie for specific source and store to global variable
document.cookie = "source=" + getParam;


// Ajax call to pull latest 8 Getitfree.us
$.get('http://www.getitfree.us/api/posts.json?filter=popular&limit=8', function(obj) {

	// Iterate through Json object and append to index.html
	for(var key in obj.data) {
	    var information = "<div class='col-sm-12 col-md-5' onclick='setCookie(this.id)' id='" + 	obj.data[key].id + "'>" +
                	'<div class="thumbnail">' + 
                		'<div class="caption">' +
                			obj.data[key].title +
                			obj.data[key].description +
                			'</div>' +
                	 	"<img class='img-responsive' src='" + obj.data[key].images["0"] + "'>" +  
                	 '</div>' +
                	'</div>';
	      $("#gif-results").append(information);
	    }
	});

//Set cookie for specific item and redirect to signup form
function setCookie (e) {
	document.cookie = "selected-product=" + e;
  	window.location = "signup.html";
}
