function Card( _element ) {

	this.element = _element

	this.element.data('card', this)

}

Card.prototype.moveTo = function( x, y ) {
	this.element.css({
		left: x + 'px',
		top: y + 'px'
	})
}

Card.prototype.moveToFront = function() {
	this.element.parent().append( this.element )
}

Card.prototype.moveToBack = function() {
	this.element.parent().prepend( this.element )
}
