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
		pageNo++;
		getContent(pageNo);
    }
	function getContent(pageNo){
		if (pageNo == 0) {
			var myurl = 'http://gov.ro/ro/json-agenda';
		} else {
			var myurl = 'http://gov.ro/ro/json-agenda&page=' + pageNo;
		}
		$.ajax({
		  dataType: "jsonp",
		  url: myurl,
		  type: 'GET',
		  }).done(function ( data ) {
		   $.each(data.rez, function(i, item){
		   	var date = Date.parse(item.data_publicarii);
		   	var dateString = date.getDate() + date.getMonth() + date.getFullYear()
		   	var formattedDate = date.getDate() + ' ' + month(date.getMonth()) + ' ' + date.getFullYear();
		   	// vezi daca exista container pentru obiect in functie de data publicarii
		   	if ($('.'+dateString).length > 0) {
		   		// daca da, adauga la finalul containerului
				$('.'+dateString).append(contentagenda(item, date));
				$('.container-agenda').collapsibleset('refresh')
		   	} else {
			   	// daca nu, creaza un nou container cu data publicarii ca si clasa
			   	content = '<div class="container-agenda__item ' 
			   	+ dateString + '"><h2> Ştire din ' + 
			   	formattedDate + '</h2>' + contentagenda(item, date) + '</div>'
			   	$('.container-agenda').append(content);
				$('.container-agenda').collapsibleset('refresh')
			}
			})


		  });

	}    			
	function contentagenda(item, date){
		content = '<div class="container-agenda__item__container" data-role="collapsible"><h3>' 
		   		+ decodeEntities(item.titlu)+'<div class="container-agenda__item__container__data">' + date.getHours() + ':' + (date.getMinutes()<10?'0':'') + date.getMinutes() + '</div></h3><div class="container-agenda__item__container__content"><a href="#" onclick="window.open(\'http://gov.ro/ro/guvernul/agenda-guvern/'+ 
			   	item.url + '\', \'_system\');">Vezi ședința pe site</a>
	<button onclick="window.plugins.socialsharing.share(\'Message only\')">message only</button>'+ 
		   		decodeEntities(item.continut.trim().replace(/\n/g,'<br />').replace(/\t/g,'&nbsp;&nbsp;&nbsp;')) + '</div></div>'
	   	return content
	}