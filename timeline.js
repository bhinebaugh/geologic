g = 0;
$(document).ready( function() {
	$('#eons').find('ol').hide();
	$('.era').click( function() { 
		console.log("expand/collapse"); 
		if ( $(this).find('ol:first').css('display') == 'none' ) {
			g++;
			$(this).children('ol').show() ;
			//hide OL by adding/removing a class instead
			$('#details h2').html("About the "+$(this).find('dt')[0].innerHTML);
			$('#description').html($(this).find('dd:first')[0].innerHTML)
		} else {
			$(this).children('ol').hide();
		}
		return false;
	});
});