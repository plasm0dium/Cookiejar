// Ajax call to get the product that was click on
$.get('http://www.getitfree.us/api/posts.json?filter=popular&limit=8', function(obj) {
  if(document.cookie.length !== 0) {
        var cookieArray = document.cookie.split("selected-product=");
        var selectedIndex = cookieArray[1].indexOf(";");
        selectedProductId = cookieArray[1].slice(0, selectedIndex);
        for(var key in obj.data) {
          if(selectedProductId === obj.data[key].id) {
            var information = "<div class='col-md-6'>" +
                  '<div class="thumbnail">' + 
                    '<div class="caption">' +
                      obj.data[key].title +
                      obj.data[key].description +
                      '</div>' +
                    "<img class='img-responsive' src='" + obj.data[key].images["0"] + "'>" +  
                   '</div>' +
                  '</div>';
            $("#thank-you").append(information);
          }
        }
  } else {
    alert("Cookie is not found");
  }
});

// Split the cookie
var cookieArray = document.cookie.split("; ");

var fullName = "";

// Grab information from cookie
for(var i = 0; i < cookieArray.length; i++) {
  // Skip the selected product ID, cookie and applicant field
	if(cookieArray[i].split("=")[0] === 'selected-product' || cookieArray[i].split("=")[0] === 'applicant' || cookieArray[i].split("=")[0] === 'cookie') {
		continue;
	} 
  // Get full name from cookie and show on selected class
  else if (cookieArray[i].split("=")[0] === 'firstName' || cookieArray[i].split("=")[0] === 'lastName'){
		fullName += " " + cookieArray[i].split("=")[1];
		$(".name").text(function() {
			return fullName;
		});
	}
  // Get source from cookie and show on selected class
  else if (cookieArray[i].split("=")[0] === 'source') {
		$(".source").text(cookieArray[i].split("=")[1] + " ");
	} 
  var userInfo = '<table class="table">' + cookieArray[i].split("=")[0] + ": " +
                    cookieArray[i].split("=")[1] + '</table>';
                 
	$("#user-information").append(userInfo);
	
}


