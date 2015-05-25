# cocktail-trait-configurable
## A [CocktailJS](http://cocktailjs.github.io) Trait Extension

[![Build Status](https://travis-ci.org/CocktailJS/cocktail-trait-configurable.svg?branch=master)](https://travis-ci.org/CocktailJS/cocktail-trait-configurable)
[![NPM version](https://badge.fury.io/js/cocktail-trait-configurable.svg)](http://badge.fury.io/js/cocktail-trait-configurable)

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

### Configuring the Configurable Trait 

Since `version 1.1.0` we can use Configurable.withOptions to return a configured Configurable Trait.
This returns a trait that will look into the given options for the setter name given a key. If the key is not found, then it will default to set{Key} method.

**Example:**
The class will use `addItems` instead of *setItems* since we want to add items to our items properties and will allow to pass an array or a single element.

MyClass.js

````javascript

var cocktail     = require('cocktail'),
    Configurable = require('cocktail-trait-configurable');
    
cocktail.mix({
    '@exports': module,
    '@as'     : 'class',

    '@traits' : [
        Configurable.withOptions({ items: 'addItems' })
    ],
    
    '@properties': {
        prop: 'default value'
    },

    constructor: function() {
        this.items = [];
    },

    addItems: function (items) {
        this.items.concat(items);
    }

});

````

index.js

````javascript

var MyClass = require('./MyClass'),
    options, obj, obj2;

options = {
    prop: 'value from options', 
    discarded: 'this should be discarded!',
    items: [1,2,3,4]
});

obj = new MyClass();

//use the configure method publicly
obj.configure(options);

console.log(obj.getProp()); //'value from options'
console.log(obj.items); // [1,2,3,4]

````


### API

The following methods will be publicly available on the host class:

- `configure(options)`: calls every available setter per each key defined in the the options object.
	- **options**: {Object} the object with values that are going to be applied.
