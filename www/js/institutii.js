
myurl = 'http://gov.ro/ro/json-institutii';
$.ajax({
  dataType: "jsonp",
  url: myurl,
  jsonpCallback: 'callback',
  type: 'GET',
  }).done(function ( data ) {
  $.each(data.rez, function(i, item){
	
   content = '<h3>' + '<div class="nume">' + item.titlu + '</div></h3>' +
   '<p> <div class="link"><a href="#" onclick="window.open(\''+ 
			   	item.link + '\', \'_system\'); return false">'+item.link+'</a></div></p>';
	if(item.facebook!="")
	{
		content=content +'<a href="#" onclick="window.open(\''+ 
			   	item.facebook + '\', \'_system\'); return false">'+'<img class="resize" src="images/social_facebook_box_blue.png"; style="width:30px;height:30px"</a></div>';
	}		
  
	if(item.youtube!="")
	{
		content=content +'<a href="#" onclick="window.open(\''+ 
			   	item.youtube + '\', \'_system\'); return false">'+'<img class="resize" src="images/YouTube-icon.png" style="width:30px;height:30px"</a></div>';
	}		
	if(item.twitter!="")
	{
		content=content+'<a href="#" onclick="window.open(\''+ 
			   	item.twitter + '\', \'_system\'); return false">'+'<img class="resize" src="images/Twitter_Logo_Hd_Png_03.png" style="width:30px;height:30px"</a></div>';
	}		
  
  
  
  //<a href="#" onclick="window.open(\'http://gov.ro/ro/guvernul/sedinte-guvern/'+ 
			   	//item.url + '\', \'_system\');">Vezi ședința pe site</a><p>'
	$(document).on("collapsibleexpand", "[data-role=collapsible]", function () 
	{
	  var position = $(this).offset().top - 60;
	  $.mobile.silentScroll(position);
	});
  
  
   $('.container-institutii').append(content);
   $('.container-institutii').collapsibleset('refresh');
	
	
	
	
   })
  });
