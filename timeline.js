$(document).ready( function() {
	console.log("i am alive!");
	$('#eons').find('ul').hide();
	$('.era').click( function() { 
		console.log("expand/collapse"); 
		if ( $(this).find('ul:first').css('display') == 'none' ) {
			$(this).children('ul').show() 
		} else {
			$(this).children('ul').hide();
		}
		return false;
	});
});