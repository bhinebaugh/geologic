// FOR DEPRECATION
var scaling = {
	'precambrian' : { 'width':'115%', 'left': 0 },
	'phanerozoic' : { 'width':'600%', 'left':'-500%' },
	'paleozoic' : { 'width' : '1350%', 'left': '-1167%'},
	'mesozoic' : { 'width':'1650%', 'left':'-1540%' },
	'cenozoic' : { 'width' : '4000%', 'left' : '-3900%' }
}

const EON = "eon",
	  ERA = "era",
	  PERIOD = "period",
	  EPOCH = "epoch";
const nesting = ["Eon", "Era", "Period", "Epoch"]
const hierarchy = new Set([EON, ERA, PERIOD, EPOCH]) 

// state
// data structure to represent
// nested eras, periods, and epochs
// color can be stored in CSS, defined in named properties (vars)
const geohistory = new Set([
	// description: 'The earliest part of Earth\'s history. Unicellular life.',
	// These three eons are known as the Precambrian, an informal supereon
	{
		name: 'Hadean',
		type: "Eon",
		description: 'yikes really inhospitable conditions',
		span: [4600,4000]
		// no subdivisions for this one
	},
	{
		name: 'Archean',
		description: 'way way early in Earth\'s history',
		span: [4000,2500],
		subdivisions: new Set([
			// Eras of the Archean
			{
				name: 'Eoarchean', 
				description: '',
				span: []
			},
			{
				name: 'Paleoarchean', 
				description: '',
				span: []
			},
			{
				name: 'Mesoarchean', 
				description: '',
				span: []
			},
			{
				name: 'Neoarchean',
				description: '',
				span: []
			}
		])
	},
	{
		name: 'Proterozoic',
		description: 'Fits and starts, culminating in the enigmatic Ediacaran life',
		span: [2500,541]
		// children: Paleo, Meso, Neo-proterozoic
	},
	{
		name: 'Phanerozoic',
		description: 'Meaning "visible life", the Phanerozoic eon is the current one',
		span: [542,0],
		subdivisions: new Set([
			// Eras of the Phanerozoic:
			{
				name: 'Paleozoic',
				description: '"Acient Life"',
				span: [541,252],
				subdivisions: new Set([
					// Periods of the Paleozoic
					{
						name: 'Cambrian',
						abbr: '',
						description: '',
						span: [541,485]
					},
					{
						name: 'Ordovician',
						abbr: '',
						description: '',
						span: [485,444]
					},
					{
						name: 'Silurian',
						abbr: '',
						description: '',
						span: [444,419]
					},
					{
						name: 'Devonian',
						abbr: '',
						description: '',
						span: [419,359]
					},
					{
						name: 'Carboniferous',
						abbr: '',
						description: '',
						span: [359,299]
					},
					{
						name: 'Permian',
						abbr: '',
						description: '',
						span: [299,251]
					}
				])
			},
			{
				name: 'Mesozoic',
				description: '"Middle Life"',
				span: [252,66],
				subdivisions: new Set([
					// Periods of the Mesozoic
					{
						name: 'Triassic',
						description: '',
						span: [252,200]
					},
					{
						name: 'Jurassic',
						description: '',
						span: [200,145]
					},
					{
						name: 'Cretaceous',
						description: '',
						span: [145,66]
					}
				])
			},
			{
				name: 'Cenozoic',
				styling: { 'width' : '4000%', 'left' : '-3900%' },
				description: 'The Cenozoic is the most recent geologic era, including the present epoch, the Holocene(?)',
				span: [66,0],
				subdivisions: new Set([
					// Periods of the Cenozoic
					{
						name: 'Paleogene',
						description: '',
						span: [66,23],
						subdivisions: new Set([
							{
								name: 'Paleocene',
								description: '',
								span: []
							},
							{
								name: 'Eocene',
								description: '',
								span: []
							},
							{
								name: 'Oligocene',
								description: '',
								span: []
						},
						])
					},
					{
						name: 'Neogene',
						description: '',
						span: [23,2.6],
						subdivisions: new Set([
							{
								name: 'Miocene',
								description: '',
								span: []
							},
							{
								name: 'Pliocene',
								description: '',
								span: []
							},
						])
					},
					{
						name: 'Quaternary',
						description: '',
						span: [2.6,0],
						subdivisions: new Set([
							{
								name: 'Pleistocene',
								description: '',
								span: []
							},
							{
								name: 'Holocene',
								description: '',
								span: []
							},
							// ...arguably the Anthropocene could be the current epoch
						])
					}
				])
			}
		])
	}
]);
// store sequence in a data structure
// and nest them to show hierarchy
// - Set - array-like order of elements, which could be objects
// - Map - ordered keys, each with a value, is iterable


$(document).ready( function() {
	// set the descriptions for each list item (i.e. a dd element) to (hidden?)
	$('.shown').hide();
	$('.transl').hide();
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
			console.log("showing details of "+this.innerHTML);
			$('#about-title').html(this.innerHTML);
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
	$('.translatable').hover( 
		function(){ $(this).children().show() }, 
		function(){ $(this).children().hide() }
	);
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
			zoomTimeline( $(this.firstChild).attr('class').split(' ')[0] );
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

	// construct timeline from JS data
	// use <summary><detail>
	function unpackEra(geoSet) {
		const d = document.createElement("ol");
		const $d = $(d);
		for (const unit of geoSet) {
			// $d.append("<li></li>");
			var li = document.createElement("li");
			// $li = $d.find("li")
			// $li.append(`<dt>${unit.name}</dt><dd>${unit.description}</dd>`);
			$(li).append("<dt>" + unit.name + "</dt><dd>" + unit.description + "</dd>");
			$(li).addClass(unit.name.toLowerCase());
			if (unit.subdivisions) {
				const subtimes = unpackEra(unit.subdivisions);
				// $li.append("<p>has subdivisions</p>");
				$(li).append(subtimes)
			}
			$d.append(li)
		}
		return $d;
	}
	$("#alt").append(unpackEra(geohistory))

	// similarly construct horizontal ribbon
	// just copy and repurpose ol?
	// var tl = document.createElement("div");
	const tl = document.getElementById("all-eons");
	for (const unit of geohistory) {
		let d = document.createElement("div");
		d.classList.add("timeline-unit", unit.name.toLowerCase());
		d.style.flex = "1 1 " + (unit.span[0] - unit.span[1]) + "px";
		d.style['height'] = '20px';
		d.style.flexBasis = "5";
		// .cssText("")
		d.textContent = unit.name;
		tl.append(d);
	}
	// $("#linear").append(tl)
});
