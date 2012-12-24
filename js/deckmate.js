// This is the main function that we use to initialize.
function DeckMate( tableEl ) {

	// There is only one table.
	this.table = tableEl

	// There can be multiple decks.
	this.loadedDecks = {}

}

// When new decks are loaded, they are stored in this object.
DeckMate.decks = {}

DeckMate.prototype.loadDeck = function( deckName ) {
	this.loadedDecks[ deckName ] = new Deck( deckName, this.placeDeck )
}

DeckMate.prototype.placeDeck = function( deckName ) {

	if ( !this.loadedDecks[ deckName ] ) return this.loadDeck( deckName )

	var deck = this.loadedDecks[ deckName ]

	for ( var i=0,l=deck.length, i++ ) {
		this.table.append( deck[i] )
	}

}
