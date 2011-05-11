$(document).ready( function() {
	// in the list #eons, hide any child lists
	//$('#eons').find('ol').hide(); //makes dd's show on dt-mouseout
	// set the descriptions for each list item (i.e. a dd element) to (hidden?)
	// and toggle the class to display them in the sidebar on mouseover
	//$('#eons').find('ol').hide();
	$('#eons dt').hover( 
		function(){
			$(this).next().addClass('shown');
			return false;
		},
		function() {
			$(this).next().removeClass('shown');
			return false;
		}
	);
	
	//expand eras when clicked, and show child list	
	$('.era').click( function() { 
		console.log("era clicked"); 
		if ( $(this).find('ol:first').css('display') == 'none' ) {
			$(this).children('ol').show() ;
			//hide OL by adding/removing a class instead
			//$('#details h2').html("About the "+$(this).find('dt')[0].innerHTML);
			//$('#description').html($(this).find('dd:first')[0].innerHTML)
			dd1 = $(this).find('dd:first')[0]
			$(dd1).toggleClass('child-shown');
		} else {
			$(this).children('ol').hide();
		}
		return false;
	});
	//show details of period when clicked or hovered
	/*
	$('.period').click( function() {
		d = $(this).find('dd');
		console.log(d);
		d.toggleClass('shown');
		return false;
	}); */
});