    $(document).ready(function(){
    	var pageNo = 0;
		getContent(pageNo);
		// Verifica daca marimea ferestrei este mai mare decat continutul(daca se poate face scroll)
		if ($("body").height() < $(window).height()) {
			pageNo++;
			getNext(pageNo);
		}
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
			   	dateString + '"><h2> Ședința din ' + 
			   	formattedDate + '</h2>' + contentStiri(item, date) + '</div>'
			   	$('.container-stiri').append(content).html();
				$('.container-stiri').collapsibleset('refresh')

			}
			})
		  });
	}	
	function contentStiri(item, date){
		content = '<div class="container-stiri__item__container" data-role="collapsible"><h3>' + image(item.imagine) + 
			   	decodeEntities(item.titlu) +'<div class="container-stiri__item__container__data">' + date.getHours() + ':' + (date.getMinutes()<10?'0':'') + date.getMinutes() +
			   	'</div></h3><div class="container-stiri__item__container__content"><a href="#" onclick="window.open(\'http://gov.ro/ro/stiri/'+ 
			   	item.url + '\', \'_system\', \'location=no\'); return false">Vezi știre pe site</a><p>'+ 
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

	function supportedFormatDate(date){
		return date.substring(0, 4) + '-' + date.substring(5, 7) + '-' + date.substring(8, 10) + ' ' + date.substring(11, 19);
	}