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
		   	var date = new Date(item.data_publicarii)
		   	var formattedDate = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
		   	// vezi daca exista container pentru obiect in functie de data publicarii
		   	if ($('.'+formattedDate).length > 0) {
		   		// daca da, adauga la finalul containerului
		   		content = '<div class="container-stiri__item__container" data-role="collapsible"><h3>' 
		   		+ item.titlu +'</h3><div class="container-stiri__item__container__content"><div class="image_wrapper"><img src="'+ 
		   		item.imagine +'" /></div><a href="http://gov.ro/ro/stiri/'+ 
		   		item.url +'" target="_blank">Vezi știre pe site</a><p>'+ 
		   		item.continut + '</p></div></div>'
				$('.'+formattedDate).append(content).html();
				$('.container-stiri').collapsibleset('refresh')
		   	} else {
			   	// daca nu, creaza un nou container cu data publicarii ca si clasa
			   	content = '<div class="container-stiri__item ' + 
			   	formattedDate + '"><h2> Ședința din ' + 
			   	formattedDate + '</h2><div class="container-stiri__item__container" data-role="collapsible"> <h3>' + 
			   	item.titlu +'</h3><div class="container-stiri__item__container__content"><div class="image_wrapper"><img src="'+ 
			   	item.imagine +'" /></div><a href="http://gov.ro/ro/stiri/'+ 
			   	item.url +'" target="_blank">Vezi știre pe site</a><p>'+ 
			   	item.continut +'</p></div> </div></div>'
			   	$('.container-stiri').append(content).html();
				$('.container-stiri').collapsibleset('refresh')

			}
			})
		  });
	}