
myurl = 'https://www.googleapis.com/youtube/v3/playlistItems?playlistId=PLVvoFIJvWUtYvBbvnq7dZUzza3cyFLv-2&key=AIzaSyAatoMZBB2i0T8BcdgIx20xsypdNVhphPc&fields=items&part=snippet&maxResults=20';
$.ajax({
  dataType: "jsonp",
  url: myurl,
  type: 'GET',
  }).done(function ( data ) {
   $.each(data.items, function(i, item){
   content =  '<center><div class="nume">'
   + '<a style="text-decoration:none" href="#" onclick="window.open(\'https://www.youtube.com/watch?v=' + item.snippet.resourceId.videoId + '&list=PLVvoFIJvWUtYvBbvnq7dZUzza3cyFLv-2\', \'_system\'); return false">' 
     + '<img class="resize" src="' + item.snippet.thumbnails.medium.url + '"/><br />' + item.snippet.title + '</a><hr /></div></center>'
     $('.container-ministri').append(content);
   })
  });