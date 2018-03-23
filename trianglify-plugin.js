/*
 * reveal.js-trianglify, a Reveal.js plugin to algorithmically generate triangle art backgrounds.
 * Copyright (C) 2018  Greg Denehy
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

var RevealTrianglify = window.RevealTrianglify || (function(){
	var config = Reveal.getConfig();
	var options = config.trianglify || {};
	options.path = options.path || scriptPath() || 'plugin/trianglify';
	
	// Cached references to DOM elements
	var dom = {};

    loadResource(options.path + 'lib/trianglify/dist/trianglify.min.js', 'script', null, function() {
        loadPlugin();
	});
	
	function loadPlugin() {
		// does not support IE9 or below
		if (!ieVersion || ieVersion >= 10) {
			function option(opt, def) {
				if (typeof opt === "undefined") return def;
				return opt;
			}

			//
			// Set option defaults
			//
			var defaults = Trianglify.defaults;
			var cellSize = parseInt(option(options.cellSize, defaults.cell_size));
			var xColors = option(options.xColors, defaults.x_colors);
			var yColors = option(options.yColors, defaults.y_colors);
			var variance = parseFloat(option(options.variance, defaults.variance));
			var displayAsTheme = option(options.displayAsTheme, true) === true;

			// Cache references to key DOM elements
			dom.reveal = document.querySelector('.reveal');

			function generateBackground(parent, opts) {
				opts.height = dom.reveal.clientHeight;
				opts.width = dom.reveal.clientWidth;

				var pattern = Trianglify(opts);
				var background = parent.querySelector('.trianglify-background');
				if (background) parent.removeChild(background);
				background = parent.insertBefore(pattern.svg(), parent.firstChild);
				background.setAttribute('class', 'trianglify-background');
			}

			function generateBackgrounds() {
				// presentation background
				if (displayAsTheme) {
					generateBackground(dom.reveal, {
						cell_size: cellSize,
						x_colors: xColors,
						y_colors: yColors,
						variance: variance
					});
				}
	
				// individual slide backgrounds
				Reveal.getSlides().forEach(function(slide) {
					if (slide.hasAttribute('data-trianglify')) {
						generateBackground(slide.slideBackgroundElement, {
							cell_size: slide.hasAttribute('data-trianglify-cellSize') ? parseInt(slide.getAttribute('data-trianglify-cellSize')) : cellSize,
							x_colors: slide.hasAttribute('data-trianglify-xColors') ? slide.getAttribute('data-trianglify-xColors') : xColors,
							y_colors: slide.hasAttribute('data-trianglify-yColors') ? slide.getAttribute('data-trianglify-yColors') : yColors,
							variance: slide.hasAttribute('data-trianglify-variance') ? slide.getAttribute('data-trianglify-variance') : variance
						});
					}
				});
			}

			generateBackgrounds();
			window.addEventListener('resize', function() {
				generateBackgrounds();
			});

			/**
			 * Extend object a with the properties of object b.
			 * If there's a conflict, object b takes precedence.
			 */
			function extend( a, b ) {
				for( var i in b ) {
					a[ i ] = b[ i ];
				}
			}

			/**
			 * Dispatches an event of the specified type from the
			 * reveal DOM element.
			 */
			function dispatchEvent( type, args ) {
				var event = document.createEvent( 'HTMLEvents', 1, 2 );
				event.initEvent( type, true, true );
				extend( event, args );
				document.querySelector('.reveal').dispatchEvent( event );

				// If we're in an iframe, post each reveal.js event to the
				// parent window. Used by the notes plugin
				if( config.postMessageEvents && window.parent !== window.self ) {
					window.parent.postMessage( JSON.stringify({ namespace: 'reveal', eventName: type, state: Reveal.getState() }), '*' );
				}
			}

			dispatchEvent('trianglify-ready');
		}
		else {
			console.log("Error: reveal.js-trianglify does not support IE version 9 or below");
		}
	};

	// modified from math plugin
	function loadResource( url, type, id, callback ) {
		var head = document.querySelector( 'head' );
		var resource;

		if ( type === 'script' ) {
			resource = document.createElement( 'script' );
			resource.type = 'text/javascript';
            resource.src = url;
            if (id) resource.id = id;
		}
		else if ( type === 'stylesheet' ) {
			resource = document.createElement( 'link' );
			resource.rel = 'stylesheet';
			resource.href = url;
            if (id) resource.id = id;
		}

		// Wrapper for callback to make sure it only fires once
		var finish = function() {
			if( typeof callback === 'function' ) {
				callback.call();
				callback = null;
			}
		}

		resource.onload = finish;

		// IE
		resource.onreadystatechange = function() {
			if ( this.readyState === 'loaded' ) {
				finish();
			}
		}

		// Normal browsers
		head.appendChild( resource );
	}

	function scriptPath() {
		// obtain plugin path from the script element
		var path;
		if (document.currentScript) {
			path = document.currentScript.src.slice(0, -20);
		} else {
			var sel = document.querySelector('script[src$="trianglify-plugin.js"]')
			if (sel) {
				path = sel.src.slice(0, -20);
			}
		}
		return path;
	}

	var ieVersion = function() {
		var browser = /(msie) ([\w.]+)/.exec(window.navigator.userAgent.toLowerCase());
		if (browser && browser[1] === "msie") {
			return parseFloat(browser[2]);
		}
		return null;
	}();
	
	return {}; // API
})();
