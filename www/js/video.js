
myurl = 'https://www.googleapis.com/youtube/v3/playlistItems?playlistId=PLVvoFIJvWUtYvBbvnq7dZUzza3cyFLv-2&key=AIzaSyAatoMZBB2i0T8BcdgIx20xsypdNVhphPc&fields=items&part=snippet&maxResults=20';
$.ajax({
  dataType: "json",
  url: myurl,
  type: 'GET',
  }).done(function ( data ) {
   $.each(data.items, function(i, item){
    console.log(data.items)
   content =  '<center><div class="nume">'
   + '<a href="https://www.youtube.com/watch?v=' + item.snippet.resourceId.videoId + '&list=PLVvoFIJvWUtYvBbvnq7dZUzza3cyFLv-2">' 
     + '<img class="resize" src="' + item.snippet.thumbnails.medium.url + '"/><br />' + item.snippet.title + '</a><hr /></div></center>'
  
   $(document).on("collapsibleexpand", "[data-role=collapsible]", function () {
  var position = $(this).offset().top - 60;
  $.mobile.silentScroll(position);
	});
  
   $('.container-ministri').append(content);

   $('.container-ministri').collapsibleset('refresh');
	
	
	
	
   })
  });