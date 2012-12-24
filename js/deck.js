function Deck( name, callback ) {

	require(['./decks/' + name + '.deck'], function($) {
		// This assumes it was loaded and created a function with the deckname
		return new DeckMate.decks[ name ]()
	})

}
