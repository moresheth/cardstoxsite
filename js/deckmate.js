// This is the main function that we use to initialize.
function DeckMate( tableEl ) {

	// There is only one table.
	this.table = tableEl

	// There can be multiple decks.
	this.loadedDecks = {}

	this.table.
		mousedown( doDown ).
		mousemove( doMove ).
		mouseup( doUp ).
		on( 'touchstart', doDown ).
		on( 'touchmove', doMove ).
		on( 'touchend', doUp ).
		on( 'contextmenu', doContext )

	var dragged = false,
		dragbox = false,
		coords,
		moveIt = false,
		hasDragged = false

	function moveToFront( card ) {
		moveIt = false;
		this.table.append( card );
	}

	function doDown(e) {
		var target = e.target;
		if ( target.tagName.toLowerCase() == 'i' ) {
			e.preventDefault();
			$('.selected').removeClass('selected');
			$('.dragbox').remove();
			var card = target.parentNode;
			dragged = card;
			$(dragged).addClass('selected');
			coords = getCoords(e);
			moveIt = true;
			hasDragged = false;
		} else if ( target.id == 'table' ) {
			e.preventDefault();
			$('.selected').removeClass('selected');
			$('.dragbox').remove();
			coords = getCoords(e);
			$(table).append('<div class="dragbox" style="top:' + coords.y + 'px;left:' + coords.x + 'px"></div>');
			hasDragged = false;
			dragbox = $('.dragbox')[0];
		}
	}

	function doUp(e) {
		if (dragged) $(dragged).addClass('selected');
		dragged = false;
		moveIt = false;
		if (dragbox) {
			dragbox = false;
			$('.dragbox').remove();
		}
	}

	function doMove(e) {
		if (!dragged && !dragbox) return false;
		var currCoords = getCoords(e);
		if (dragbox) {
			e.preventDefault();
			hasDragged = true;
			if ( currCoords.x < coords.x ) {
				dragbox.style.width = ( coords.x - currCoords.x )+'px';
				dragbox.style.left = currCoords.x + 'px';
			} else {
				dragbox.style.width = ( currCoords.x - coords.x )+'px';
				dragbox.style.left = coords.x + 'px';
			}
			if ( currCoords.y < coords.y ) {
				dragbox.style.height = ( coords.y - currCoords.y )+'px';
				dragbox.style.top = currCoords.y + 'px';
			} else {
				dragbox.style.height = ( currCoords.y - coords.y )+'px';
				dragbox.style.top = coords.y + 'px';
			}
		} else {
			if (moveIt) $( dragged ).data('card').moveToFront()
			e.preventDefault();
			hasDragged = true;
			dragged.style.left = (dragged.offsetLeft + currCoords.x - coords.x)+'px';
			dragged.style.top = (dragged.offsetTop + currCoords.y - coords.y)+'px';
			coords = getCoords(e);
		}
	}

	function getCoords(e) {
		var posx = 0;
		var posy = 0;
		if (!e) var e = window.event;

		if ( e.touches ) {
			var touch = e.touches[0];
			posx = touch.pageX;
			posy = touch.pageY;
		} else if (e.pageX || e.pageY) {
			posx = e.pageX;
			posy = e.pageY;
		} else if (e.clientX || e.clientY) {
			posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		return {x:posx,y:posy};
	}

	function doContext(e) {
		var target = e.target;
		if ( target.tagName.toLowerCase() == 'i' ) {
			e.preventDefault();
			var coords = getCoords(e);
		}
	}

}

// When new decks are loaded, they are stored in this object.
DeckMate.decks = {}

DeckMate.prototype.loadDeck = function( deckName ) {
	new Deck( deckName, this )
}

DeckMate.prototype.placeDeck = function( deckName ) {

	var deck = this.loadedDecks[ deckName ]

	// We'll come back after we loaded it.
	if ( !deck ) return this.loadDeck( deckName )

	// Add each card in the deck to the table.
	for ( var i=0,l=deck.length; i<l; i++ ) {
		var card = deck[i]
		this.table.append( card.element )
		card.moveTo( i + 100, i + 100 )
	}

}
