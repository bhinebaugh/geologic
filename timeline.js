var scaling = {
	'precambrian' : { 'width':'115%', 'left': 0 },
	'phanerozoic' : { 'width':'600%', 'left':'-500%' },
	'paleozoic' : { 'width' : '1350%', 'left': '-1167%'},
	'mesozoic' : { 'width':'1650%', 'left':'-1540%' },
	'cenozoic' : { 'width' : '4000%', 'left' : '-3900%' }
}


$(document).ready( function() {
	// set the descriptions for each list item (i.e. a dd element) to (hidden?)
	$('.shown').hide();
	hideOLs = function() {
		// in the list #eons, hide any child lists
		$('#eons').find('ol').hide();
		$('.era').removeClass('open-arrow');
		$(this).addClass('greyed');
		$('#showall').removeClass('greyed')
	};
	hideOLs();
	$('#hideall').click( hideOLs );
	$('#showall').click( function() {
		$('#eons').find('ol').show();
		// change arrows to open
		$('.era').addClass('open-arrow');
		// grey out link text
		$(this).addClass('greyed');
		$('#hideall').removeClass('greyed');
	});
	showAbout = function(){
			$(this).next().show();
			return false;
	};
	hideAbout = function() {
			$(this).next().hide();
			return false;
	};
	zoomTimeline = function(eraName) {
		console.log("Zooming to "+eraName);
		$('#r-'+eraName.slice(0,3)).toggleClass('overline');
		if ( scaling[eraName] ) {
			$('#horizontal-ribbon').animate( scaling[eraName], "slow" );
		} else {
			console.log("not a key in scaling object");
			return false;
		}
	}
	// toggle visibility of description (<dd>) when the title (<dt>) is moused over 
	/**** this was not unbinding properly
	/ $('dt').hover(
		showAbout, //mouseover
		hideAbout //mouseout
	); */
	$('dt').bind( 'mouseover', showAbout).bind( 'mouseout', hideAbout);
	$("#make-plain").click( function() {
		$('.shown').show();
		$('dd').removeClass('shown');
		$('ol').show();
		// remove hover show/hide functionality
		//$('dt').hover( function() {return false}, function() {return false});
		//hideAbout = function() { console.log("new hideAbout function"); return false };
		//showAbout = function() { return false }
		$('dt').unbind( 'mouseover', showAbout ).unbind( 'mouseout', hideAbout );
	});
	
	//expand eras when clicked, and show child list	
	$('.era').click( function() { 
		if ( $(this).find('ol:first').css('display') == 'none' ) {
			$(this).addClass('open-arrow');
			$('#hideall').removeClass('greyed');
			$(this).children('ol').show();
			dd1 = $(this).find('dd:first')[0]
			$(dd1).toggleClass('child-shown');
			// zoom timeline ribbon to the era in question
			zoomTimeline( $(this.firstChild).attr('class') );
		} else {
			$(this).removeClass('open-arrow');
			$('#showall').removeClass('greyed');
			$(this).children('ol').hide();
		}
		return false;
	});
	$('.period').click( function() { 
		return false; /**prevent the click event from going to parent and hiding this element**/ 
	});
});
