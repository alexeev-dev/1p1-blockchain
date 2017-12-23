$(document).ready(function() {
	// Табы на странице фонда
	$('.js-tabs a').click(function(e) {
		e.preventDefault();

		var tab = $(this).attr('href');
		$('.fund-tab.active, .js-tabs a.active').removeClass('active');
		$(this).addClass('active');
		$(tab).addClass('active');
	});

	// Выпадающие списки
	$('.js-select > a').click(function(e) {
		e.preventDefault();
		if(!$(this).hasClass('active')) {
			$('.js-select > a, .js-select > ul').removeClass('active');
		}
		$(this).toggleClass('active').next().toggleClass('active');
	});
});

$(document).mouseup(function (e) {
	var selectBlock = $(".js-select > ul"),
		selectButton = $('.js-select > a');

	if (selectBlock.has(e.target).length === 0 && !selectBlock.is(e.target) && selectButton.has(e.target).length === 0 && !selectButton.is(e.target)){
		$(selectBlock).removeClass('active');
		$(selectButton).removeClass('active');
	} 
});

$( function() {
	var dateFormat = "mm/dd/yy",
	from = $( "#from" )
	.datepicker({
		defaultDate: "+1w",
		changeMonth: true,
		numberOfMonths: 1
	})
	.on( "change", function() {
		to.datepicker( "option", "minDate", getDate( this ) );
	}),
	to = $( "#to" ).datepicker({
		defaultDate: "+1w",
		changeMonth: true,
		numberOfMonths: 1
	})
	.on( "change", function() {
		from.datepicker( "option", "maxDate", getDate( this ) );
	});

	function getDate( element ) {
		var date;
		try {
			date = $.datepicker.parseDate( dateFormat, element.value );
		} catch( error ) {
			date = null;
		}

		return date;
	}
} );