'use strict';

var cocktail = require('cocktail');

/**
 * @trait Configurable
 *
 */
cocktail.mix({
    '@exports' : module,
    '@as'      : 'class',

    /**
     * @public
     * @method configure
     * Configures the host class by calling setters on each property defined in the given options
     * @params options {Object}
     */
    configure: function (options) {
        var key, option, camelKey, setter;

        for(key in options) {
            option = options[key];
            camelKey = (key.charAt(0).toUpperCase() + key.slice(1));
            setter = this['set'+camelKey];
            if(setter){
                setter.call(this, option);
            }
        }
    }

});