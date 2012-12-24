// The name of the deck, and filename, must be a function and property of the DeckMate.decks object.
// It must return an array of card elements that have been added to the DOM (not yet to the table).
DeckMate.decks.standard = function() {

	var cards = [],
		data = {

			// The value here gets added as a class to the card.
			// The keys double as the HTML ASCII entity.
			suits: {
				spades: 'black',
				clubs: 'black',
				hearts: 'red',
				diams: 'red'
			},

			members: {
				cardA: ['c8'],
				card2: ['c2','c14'],
				card3: ['c2','c8','c14'],
				card4: ['c1','c3','c13','c15'],
				card5: ['c1','c3','c8','c13','c15'],
				card6: ['c1','c3','c7','c9','c13','c15'],
				card7: ['c1','c3','c5','c7','c9','c13','c15'],
				card8: ['c1','c3','c5','c7','c9','c11','c13','c15'],
				card9: ['c1','c3','c4','c6','c8','c10','c12','c13','c15'],
				card10: ['c1','c3','c4','c5','c6','c10','c11','c12','c13','c15'],
				cardJ: ['f1'],
				cardQ: ['f2'],
				cardK: ['f3']
			}

		}

	// Loop through each suit ( spades, hearts )
	for ( var suit in data.suits ) {

		// And then create a card of each type for it.
		for ( var card in data.members ) {

			var htmlstr = '', card

			// Just using simple string concatenation for building elements.
			htmlstr += '<div class="card ' + suit + ' ' + data.suits[suit] + ' ' + card + '">'
			htmlstr += '<u>' + card.split('card')[1] + '</u><s>&' + suit + ';</s><u class="b">' + card.split('card')[1] + '</u><s class="b">&' + suit + ';</s>'
			// Make the little icon for each card. The classes figure the placement.
			for (var i=0,l=data.members[card].length;i<l;i++) {
				htmlstr += '<b class="' + data.members[card][i] + '">&' + suit + ';</b>'
			}
			htmlstr += '<i></i>'
			htmlstr += '</div>'

			card = $( htmlstr )

			cards.push( card )

		}
	}

	return cards
}
