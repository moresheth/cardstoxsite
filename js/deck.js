function Deck( name, deckmate ) {

	require(['./decks/' + name + '.deck'], function($) {
		// This assumes it was loaded and created a function with the deckname
		deckmate.loadedDecks[ name ] = new DeckMate.decks[ name ]()
		deckmate.placeDeck( name )
	})

}
