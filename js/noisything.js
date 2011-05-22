// Straight stole this from http://rappdaniel.com/noisy/
// Ghetto as crap right now.

var uri, cachedUri;

function makeBackground() {
	var options = {
		// How many percent of the image that is filled with noise, 
		//   represented by a number between 0 and 1 inclusive
		intensity:          1,

		// The width and height of the image in pixels
		size:               200,

		// The maximum noise particle opacity,
		//   represented by a number between 0 and 1 inclusive
		opacity:            0.08,

		// A string linking to the image used if there's no canvas support
		fallback:           '',

		// Specifies wheter the particles are grayscale or colorful
		monochrome:         true
	};

	if (JSON && localStorage.getItem) {
		cachedUri = localStorage.getItem(JSON.stringify(options));
	}
	
	// Use localStorage cache if these options have been used before
	if (cachedUri) {
		uri = cachedUri;
	} else {
		var canvas = document.createElement('canvas');
		
		// Use fallback image if canvas isn't supported
		if (!canvas.getContext) {
			return false;
		} else {
			canvas.width = canvas.height = options.size;
		
			var ctx = canvas.getContext('2d'),
			    imgData = ctx.createImageData(canvas.width, canvas.height),
			    numPixels = options.intensity * Math.pow(options.size, 2),
			    maxAlpha = 255 * options.opacity;
			    
			// Add color to random pixels in the canvas
			while (numPixels--) { // Read about the double bitwise NOT trick here: goo.gl/6DPpt
				var x = ~~(Math.random()*canvas.width),
				    y = ~~(Math.random()*canvas.height),
				    index = (x + y * imgData.width) * 4;
				
				var colorChannel = numPixels % 255; // This will look random enough
				imgData.data[index  ] = colorChannel;                                               // red
				imgData.data[index+1] = options.monochrome ? colorChannel : ~~(Math.random()*255);  // green
				imgData.data[index+2] = options.monochrome ? colorChannel : ~~(Math.random()*255);  // blue
				imgData.data[index+3] = ~~(Math.random()*maxAlpha);                                 // alpha
			}
			
			ctx.putImageData(imgData, 0, 0);
			uri = canvas.toDataURL('image/png');

			// In IE < 9 Data URI's are only displayed if they are < 32KB
			// Though IE < 9 doesn't officially support the canvas element, 
			//   certain scripts like excanvas.js will enable it and if the URI is > 32KB it won't be displayed
			if (uri.indexOf('data:image/png') != 0 ) {
				uri = options.fallback;
			}
		}
		if (JSON && localStorage) {
			localStorage.setItem(JSON.stringify(options), uri);
		}
	}

	$(table).css('background-image', "url('" + uri + "')");
}