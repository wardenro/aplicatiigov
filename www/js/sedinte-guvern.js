    $(document).ready(function(){
    	var pageNo = 0;
		getContent(pageNo);
		$(window).scroll(function() {
	   		if($(window).scrollTop() + $(window).height() == $(document).height()) {
				pageNo++;
	   			getNext(pageNo);
			}
		})
    })
	

    function getNext(pageNo) {
		getContent(pageNo);
    }
	function getContent(pageNo){
		if (pageNo == 0) {
			var myurl = 'http://gov.ro/ro/json-sedinte-guvern';
		} else {
			var myurl = 'http://gov.ro/ro/json-sedinte-guvern&page=' + pageNo;
		}
		$.ajax({
		  dataType: "jsonp",
		  url: myurl,
		  type: 'GET',
		  }).done(function ( data ) {
		   $.each(data.rez, function(i, item){
		   	var date = Date.parse(item.data_publicarii.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
		   	var dateString = date.getDate().toString() + date.getMonth().toString() + date.getFullYear().toString()
		   	var formattedDate = date.getDate() + ' ' + month(date.getMonth()) + ' ' + date.getFullYear();
		   	// vezi daca exista container pentru obiect in functie de data publicarii
		   	if ($('.'+dateString).length > 0) {
		   		// daca da, adauga la finalul containerului
				$('.'+dateString).append(contentSedinte(item, date));
				$('.container-sedinte').collapsibleset('refresh')
		   	} else {
			   	// daca nu, creaza un nou container cu data publicarii ca si clasa
			   	content = '<div class="container-sedinte__item ' 
			   	+ dateString + '"><h2> Ședința din ' + 
			   	formattedDate + '</h2>' + contentSedinte(item, date) + '</div>'
			   	$('.container-sedinte').append(content);
				$('.container-sedinte').collapsibleset('refresh')
			}
			})


		  });

	}    			
	function contentSedinte(item, date){
		var titlu = decodeEntities(item.titlu)
		var url = 'http://gov.ro/ro/guvernul/sedinte-guvern/'+   	item.url
		content = '<div class="container-sedinte__item__container" data-role="collapsible"><h3>' 
		   		+ decodeEntities(item.titlu)+'<div class="container-sedinte__item__container__data">' + date.getHours() + ':' + (date.getMinutes()<10?'0':'') + date.getMinutes() + '</div></h3><div class="container-sedinte__item__container__content"><button class="social_share_button" onclick="window.plugins.socialsharing.share(\'' + titlu + '\', \'' + titlu + '\',  null, \'' + url + '\')"><img src="images/share-icon.png" width="25" height="25" /></button><p><a href="#" onclick="window.open(\'http://gov.ro/ro/guvernul/sedinte-guvern/'+ 
			   	item.url + '\', \'_system\');">Vezi ședința pe site</a></p><p>'+ 
		   		decodeEntities(item.continut.trim().replace(/\n/g,'<br />').replace(/\t/g,'&nbsp;&nbsp;&nbsp;')) + '</p></div></div>'
	   	return content
	}