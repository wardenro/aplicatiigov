    $(document).ready(function(){
    	var pageNo = 0;
		getContent(pageNo);
		// Verifica daca marimea ferestrei este mai mare decat continutul(daca se poate face scroll)
		if ($("body").height() < $(window).height()) {
			getNext(pageNo);
		}
		$(window).scroll(function() {
	   		if($(window).scrollTop() + $(window).height() == $(document).height()) {
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
			var myurl = 'http://gov.ro/ro/json-sedinte-guvern';
		} else {
			var myurl = 'http://gov.ro/ro/json-sedinte-guvern&page=' + pageNo;
		}
		$.ajax({
		  dataType: "jsonp",
		  url: myurl,
		  jsonpCallback: 'callback',
		  type: 'GET',
		  }).done(function ( data ) {
		   $.each(data.rez, function(i, item){
		   	var date = new Date(item.data_publicarii)
		   	var dateISO = date.toISOString();
		   	var formattedDate = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
		   	// vezi daca exista container pentru obiect in functie de data publicarii
		   	if ($('.'+dateISO).length > 0) {
		   		// daca da, adauga la finalul containerului
		   		content = '<div class="container-sedinte__item__container" data-role="collapsible"><h3>' + item.titlu +'</h3><p>'+ item.continut + '</p></div>'
				$('.'+dateISO).append(content);
				$('.container-sedinte').collapsibleset('refresh')
		   	} else {
			   	// daca nu, creaza un nou container cu data publicarii ca si clasa
			   	content = '<div class="container-sedinte__item ' + dateISO + '"><h2> Ședința din ' + formattedDate + '</h2><div class="container-sedinte__item__container" data-role="collapsible"> <h3>' + item.titlu +'</h3><p>'+ item.continut +'</p> </div></div>'
			   	$('.container-sedinte').append(content);
				$('.container-sedinte').collapsibleset('refresh')

			}
			})
		  });
	}