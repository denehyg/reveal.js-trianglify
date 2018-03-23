# reveal.js-trianglify

A [Reveal.js](https://github.com/hakimel/reveal.js) plugin to algorithmically generate triangle art slide backgrounds. [Check out the live demo](https://denehyg.github.io/reveal.js-trianglify)

## Installation

### Bower

Download and install the package in your project:

```bower install reveal.js-trianglify```

Add the plugin to the dependencies in your presentation, as below. 

```javascript
Reveal.initialize({
	// ...
	
	dependencies: [
		// ... 
	  
		{ src: 'bower_components/reveal.js-trianglify/plugin.js' }
	]
});
```

### npm

Download and install the package in your project:

```npm install --save reveal.js-trianglify```

Add the plugin to the dependencies in your presentation, as below. 

```javascript
Reveal.initialize({
	// ...
	
	dependencies: [
		// ... 
	  
		{ src: 'node_modules/reveal.js-trianglify/plugin.js' }
	]
});
```

### Manual

Copy this repository into the plugins folder of your reveal.js presentation, eg ```plugins/trianglify```.

Add the plugin to the dependencies in your presentation, as below.

```javascript
Reveal.initialize({
	// ...
	
	dependencies: [
		// ... 
	  
		{ src: 'plugins/trianglify/plugin.js' }
	]
});
```

## Configuration

You can configure various aspects of however the trianglify backgrounds are generated for your presentation by providing a ```trianglify``` option in the reveal.js initialization options. The defaults for these options are provided by the Trianglify library (see the [Trianglify docs](https://github.com/qrohlf/trianglify/blob/master/Readme.md) for more details) and are repeated below.

```javascript
Reveal.initialize({
	// ...

	trianglify: {
		// Specifies the size of the mesh used to generate triangles.
		// Larger values will result in coarser patterns, smaller values 
		// will result in finer patterns. Note that very small values may
		// dramatically increase the runtime of Trianglify.
		cellSize: 75,

		// String or array of CSS-formatted colors specifing the color
		// gradient used on the x axis. Valid string values are 'random' 
		// or the name of a colorbrewer palette (i.e. 'YlGnBu' or 'RdBu').
		// When set to 'random', a gradient will be randomly selected
		// from the colorbrewer library. Valid array values should specify 
		// the color stops in any CSS format
		// (i.e. ['#000000', '#4CAFE8', '#FFFFFF']).
		xColors: 'random',

		// String or array of CSS-formatted colors,. When set to 'match_x' 
		// the same gradient will be used on both axes.
		// Otherwise, accepts the same options as x_colors.
		yColors: 'match_x',

		// Decimal value between 0 and 1 (inclusive). Specify the amount of randomness used when generating triangles.
		variance: 0.75
	},

});
```

## Trianglify as theme background

The default configuration generates a background for the entire presentation. There will be a single background visible for every slide that does not provide a slide specific backgrounds. This theme level background can be disabled by providing the following in the reveal.js initialization options...

```javascript
Reveal.initialize({
	// ...

	trianglify: {
		// ...
		displayAsTheme: false
	},

});
```

## Background for individual slides

Backgrounds for individual slides can be generated by adding a `data-trianglify` attribute to your `<section>` elements. The following attributes can be used to configure each specific background. Any attribute not provided will default to the overall configuration provided by the reveal.js initialization options (see above).

* data-trianglify-cellSize
* data-trianglify-xColors
* data-trianglify-yColors
* data-trianglify-variance

## Background transitions

When using individual slide backgrounds the reveal background transitions will be applied (configured via `backgroundTransition` in the reveal.js initialization options, or provided via the slide's `data-transition` attribute).

Note that the theme level background will ignore background transitions. If you need a common background that also applies background transitions you will need to add a `data-trianglify` attribute to each slide.

## License

reveal.js-trianglify is GPLv3 licensed.

Copyright (C) 2018 Greg Denehy

The [Trianglify](https://github.com/qrohlf/trianglify) library is copyright (C) Quinn Rohlf
