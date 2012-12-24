$.fn.deckmate = function( options ) {

	var defaults = {
		deck: 'standard'
	}

	return this.each( function() {

		// Set the passed-in options, as well as any settings
		// that might be stored in JSON on the element attribute.
		var element = $(this), settings = $.extend( {}, defaults, options )
		if ( element.data('deckmate') ) $.extend( settings, element.data('deckmate') )

		// Pass in the table element.
		var deckmate = new DeckMate( this )

		// Load the deck specified in the settings
		deckmate.placeDeck( settings.deck )

	})

}
