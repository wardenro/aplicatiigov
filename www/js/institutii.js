
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
			   	item.link + '\', \'_system\');">'+item.link+'</a></div></p></div>';
  
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
