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
			var myurl = 'http://gov.ro/ro/json';
		} else {
			var myurl = 'http://gov.ro/ro/json&page=' + pageNo;
		}
		$.ajax({
		  dataType: "jsonp",
		  url: myurl,
		  type: 'GET',
		  }).done(function ( data ) {
			console.log(pageNo)
		   	console.log(data.rez)
		   $.each(data.rez, function(i, item){
		   	var date = Date.parse(item.data_publicarii);
		   	var dateString = date.getDate() + date.getMonth() + date.getFullYear();
		    var formattedDate = date.getDate() + ' ' + month(date.getMonth()) + ' ' + date.getFullYear().toString();
		   	// vezi daca exista container pentru obiect in functie de data publicarii
		   	if ($('.'+dateString).length > 0) {
		   		// daca da, adauga la finalul containerului
				$('.'+dateString).append(contentStiri(item, date)).html();
				$('.container-stiri').collapsibleset('refresh')
		   	} else {
			   	// daca nu, creaza un nou container cu data publicarii ca si clasa
			   	content = '<div class="container-stiri__item ' + 
			   	dateString + '"><h2> Știre din ' + 
			   	formattedDate + '</h2>' + contentStiri(item, date) + '</div>'
			   	$('.container-stiri').append(content).html();
				$('.container-stiri').collapsibleset('refresh')

			}
			})
		  });
	}	

	function contentStiri(item, date){
		var titlu = decodeEntities(item.titlu)
		var url = 'http://gov.ro/ro/stiri/'+   	item.url
		var content = '<div class="container-stiri__item__container" data-role="collapsible"><h3>' + image(item.imagine) + 
			   	titlu +'<div class="container-stiri__item__container__data">' + date.getHours() + ':' + (date.getMinutes()<10?'0':'') + date.getMinutes() +
			   	'</div></h3><div class="container-stiri__item__container__content"><button class="social_share_button" onclick="window.plugins.socialsharing.share(\'' + titlu + '\', \'' + titlu + '\', ' + imagine_share(item.imagine) + ', \'' + url + '\')"><img src="images/share-icon.png" width="25" height="25" /></button><p><a href="#" onclick="window.open(\'http://gov.ro/ro/stiri/'+ 
			   	item.url + '\', \'_system\'); return false">Vezi știre pe site</a></p> <p>'+ 
			   	decodeEntities(item.continut.trim().replace(/\n/g,'<br />').replace(/\t/g,'&nbsp;&nbsp;&nbsp;'))
			   	 +'</p></div> </div>'
	   	return content
	}

	function image(imagine){
		if (imagine.length > 0 && imagine != 'http://gov.ro/fisiere/') {
			content = '<div class="image_wrapper"><img src="'+ 
				   	imagine +'" /></div>'
		   	return content
	   	} else {
	   		return ''
	   	}
	}

	function imagine_share(imagine) {
		if (imagine.length > 0 && imagine != 'http://gov.ro/fisiere/') {
		   	return '\'' + imagine + '\''
	   	} else {
	   		return null
	   	}
	}

	function supportedFormatDate(date){
		return date.substring(0, 4) + '-' + date.substring(5, 7) + '-' + date.substring(8, 10) + ' ' + date.substring(11, 19);
	}