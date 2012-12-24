require(['jquery', 'jquery.noisy', 'jquery.deckmate', 'deckmate', 'deck', 'card'], function($) {

	$(function() {

		$('#table').deckmate().noisy({
			intensity:          1.5,
			monochrome:         true
		})

	})

})
