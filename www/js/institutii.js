
myurl = 'http://gov.ro/ro/json-institutii';
$.ajax({
  dataType: "jsonp",
  url: myurl,
  jsonpCallback: 'callback',
  type: 'GET',
  }).done(function ( data ) {
  $.each(data.rez, function(i, item){
	
   content = '<h3>' + '<div class="nume">' + item.titlu + '</div></h3>' +
   '<p> <div class="link"><a href="#" onclick="window.open(\''+item.link + '\');">'+item.link+'</a></div></p>';
	if(item.facebook!="")
	{
		content=content +'<a href="#" onclick="window.open(\''+item.facebook + '\'); ">'+'<img class="resize" src="images/social_facebook_box_blue.png"; style="width:30px;height:30px"</a></div>';
	}		
  
	if(item.youtube!="")
	{
		content=content +'<a href="#" onclick="window.open(\''+item.youtube + '\'); ">'+'<img class="resize" src="images/YouTube-icon.png" style="width:30px;height:30px"</a></div>';
	}		
	if(item.twitter!="")
	{
		content=content+'<a href="#" onclick="window.open(\''+item.twitter + '\'); ">'+'<img class="resize" src="images/Twitter_Logo_Hd_Png_03.png" style="width:30px;height:30px"</a></div>';
	}		
  
	$(document).on("collapsibleexpand", "[data-role=collapsible]", function () 
	{
	  var position = $(this).offset().top - 60;
	  $.mobile.silentScroll(position);
	});
  
  
   $('.container-institutii').append(content);
   $('.container-institutii').collapsibleset('refresh');
	
	
	
	
   })
  });
