'use strict';

var cocktail = require('cocktail');

/**
 * @trait Configurable
 * A trait/talent which provides configure(options) method into the host class.
 */
cocktail.mix({
    '@exports' : module,
    '@as'      : 'class',

    '@static': {
        
        /**
         * @factory
         * @static
         * @method withOptions
         * Returns a Configurable Trait.
         * The setter for a given key will be resolved by looking on the options map for setter names.
         * If key is not in the map it will default to set{Key} method.
         * @param options {Object}
         */
        withOptions: function (options) {
            var Configurable = this,
                configurable = {};

            options = options || {};

            return cocktail.mix(configurable, {
                '@talents': [
                    {
                        talent: Configurable,
                        alias: {
                            _getSetter: '_baseSetter'
                        }
                    }
                ],

                _getSetter: function (key) { 
                    return options[key] || this._baseSetter(key);
                }
            })
        }
    },

    /**
     * @public
     * @method configure
     * Configures the host class by calling setters on each property defined in the given options
     * @params options {Object}
     */
    configure: function (options) {
        var key, option, setter, setterName;

        for(key in options) {
            option = options[key];
            setterName = this._getSetter(key);
            setter = this[setterName];
            if(setter){
                setter.call(this, option);
            }
        }
    },

    _getSetter: function (key) { 
        var camelKey = (key.charAt(0).toUpperCase() + key.slice(1));
        return 'set'+camelKey;
    }

});
