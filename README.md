[![Build Status](https://travis-ci.org/CocktailJS/cocktail-trait-configurable.png?branch=master)](https://travis-ci.org/CocktailJS/cocktail-trait-configurable)

# cocktail-trait-configurable
## A [CocktailJS](http://cocktailjs.github.io) Trait Extension

A trait to add `configure(options)` method that will call setters on each options key. 

### Install

````bash
npm install cocktail --save
npm install cocktail-trait-configurable --save
````

### Trait requires (glue code)

None

### Usage

MyClass.js

````javascript

var cocktail     = require('cocktail'),
	Configurable = require('cocktail-trait-configurable');
	
cocktail.mix({
    '@exports': module,
    '@as'     : 'class',

    '@traits' : [Configurable],
    
    '@properties': {
    	property1: 'default value',
    	property2: 0
    },

    constructor: function(config) {
        //we can use configurable method in the constructor
        this.configure(config);
    }
    
});

````

index.js

````javascript

var MyClass = require('./MyClass'),
    options, obj, obj2;

options = {
    property1: 'value from options', 
    property2: false, 
    discarded: 'this should be discarded!'
});

obj = new MyClass();

//use the configure method publicly
obj.configure(options);

console.log(obj.getProperty1()); //'value from options'
console.log(obj.getProperty2()); //false

//or in the constructor
obj2 = new MyClass(options);

console.log(obj2.getProperty1()); //'value from options'
console.log(obj2.getProperty2()); //false


````

### API

The following methods will be publicly available on the host class:

- `configure(options)`: calls every available setter per each key defined in the the options object.
	- **options**: {Object} the object with values that are going to be applied.
