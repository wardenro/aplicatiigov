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
		   	var date = Date.parse(item.data_publicarii.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
		   	var dateString = date.getDate().toString() + date.getMonth().toString() + date.getFullYear().toString();
		    var formattedDate = date.getDate() + ' ' + month(date.getMonth()) + ' ' + date.getFullYear().toString();
		   	// vezi daca exista container pentru obiect in functie de data publicarii
		   	if ($('.'+dateString).length > 0) {
		   		// daca da, adauga la finalul containerului
				$('.'+dateString).append(contentAgenda(item)).html();
				$('.container-agenda').collapsibleset('refresh')
		   	} else {
			   	// daca nu, creaza un nou container cu data publicarii ca si clasa
			   	content = '<div class="container-agenda__item ' + 
			   	dateString + '"><h2> Știre din ' + 
			   	formattedDate + '</h2>' + contentAgenda(item) + '</div>'
			   	$('.container-agenda').append(content).html();
				$('.container-agenda').collapsibleset('refresh')

			}
			})
		  });
	}	

	function contentAgenda(item){
		var titlu = decodeEntities(item.titlu)
		content = '<div class="container-agenda__item__container" data-role="collapsible"><h3>' 
		   		+ decodeEntities(item.titlu)+'</h3><div class="container-agenda__item__container__content"><p>'
		   		+ decodeEntities(item.continut.trim().replace(/\n/g,'<br />').replace(/\t/g,'&nbsp;&nbsp;&nbsp;')) + '</p></div></div>'
	   	return content
	}
