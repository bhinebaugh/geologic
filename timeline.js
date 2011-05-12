$(document).ready( function() {
	// set the descriptions for each list item (i.e. a dd element) to (hidden?)
	$('.shown').hide();
	hideOLs = function() {
		// in the list #eons, hide any child lists
		$('#eons').find('ol').hide();
		console.log('hiding OLs');
	};
	hideOLs();
	$('#hideall').click( hideOLs );
	$('#showall').click( function() {
		$('#eons').find('ol').show();
		console.log('showing OLs');
	});
		
	// toggle visibility of description (<dd>) when the title (<dt>) is moused over 
	$('#eons dt').hover(
		function(){
			$(this).next().show();
			return false;
		},
		function() {
			$(this).next().hide();
			return false;
		}
	);
	
	//expand eras when clicked, and show child list	
	$('.era').click( function() { 
		
		if ( $(this).find('ol:first').css('display') == 'none' ) {
			$(this).children('ol').show() ;
			dd1 = $(this).find('dd:first')[0]
			$(dd1).toggleClass('child-shown');
		} else {
			$(this).children('ol').hide();
		}
		return false;
	});
	$('.period').click( function() { return false; /**prevent the click event from going to parent and hiding this element**/ });
});