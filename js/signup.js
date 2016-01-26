// Ajax call to get selected item
$.get('http://www.getitfree.us/api/posts.json?filter=popular&limit=8', function(obj) {
  
  // Check if cookie exist
  if(document.cookie.length !== 0) {
      // Split the cookie to get selected item ID
      var cookieArray = document.cookie.split("selected-product=");

      var selectedProductId = selectedProductId || cookieArray[1];
      // Iterate through object from ajax call
      for(var key in obj.data) { 
        // Check if cookie is longer than original
        if(cookieArray[1].indexOf(";") > -1) {
          // Find index of and find the selected item ID
          var selectedIndex = cookieArray[1].indexOf(";");
          selectedProductId = cookieArray[1].slice(0, selectedIndex);
        } 
        // Append selected item onto DOM
        if(selectedProductId === obj.data[key].id) {
          var selectedProduct = "<div class='col-md-4'>" + 
            '<div class="thumbnail">' + 
              '<div class="caption">' +
                  obj.data[key].title + 
              '</div>' +
              "<img src='" + obj.data[key].images["0"] + "'>" + 
            '</div>' +
          "</div>"
              $("#selected-product").append(selectedProduct);
            }
          }
        }
   else {
    alert("Cookie is not found");
  }
});

var server = "http://submissions.herokuapp.com/api/submissions";

// helper function for POST
function send(data) {
  $.ajax({
    url: server,
    type: "POST",
    dataType: 'json',
    data: data,
    success: function(data) {
      console.log('Data send succesfully', data);
       if (data) {
        // Set cookie with user information for thank-you page
        for(var key in data) {
          document.cookie = key + '=' + data[key]; 
        }
        window.location = "thank-you.html";
      }
    },
    error: function(data) {
      console.log("ERROR");
    }
  });
 
}

// Grab information from form and send it out as an object
$("#signupForm").submit(function(e){
  e.preventDefault();
     userData = {
       'firstName': $("#first").val(),
       'lastName': $("#last").val(),
       'email': $("#email").val(),
       'phone': $("#phone").val(),
       'street': $("#street").val(),
       'city': $("#city").val(),
       'state': $("#state").val(),
       'zip': $("#zip").val(),
       'applicant': "TL",
       'cookie': document.cookie
     };
     send(userData);
  });
