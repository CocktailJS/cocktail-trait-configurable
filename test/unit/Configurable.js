'use strict';

var expect = require("chai").expect,
    cocktail = require('cocktail'),
    Configurable = require('../../lib/Configurable');

describe('Configurable Trait Unit Test', function(){

    describe('Configurable added as Trait on ConfiguredClass', function(){
        var ConfiguredClass;

        ConfiguredClass = cocktail.mix({
            '@as': 'class',
            '@traits': [Configurable],
            '@properties': {value: 1}
        });
        
        it('should provide `configurable` method on host class', function(){
            var sut = new ConfiguredClass();
            expect(sut).to.respondTo('configure');
        });

        it('should accept {} as a valid param in configure method', function(){
            var sut = new ConfiguredClass(),
                options = {};

            sut.configure(options);
        });

        it('should accept no params or any non-object param in configure method', function(){
            var sut = new ConfiguredClass(),
                untouched = new ConfiguredClass();

            sut.configure();
            expect(sut).to.be.eql(untouched);

            sut.configure(function(){});
            expect(sut).to.be.eql(untouched);

            sut.configure(true);
            expect(sut).to.be.eql(untouched);

            sut.configure(1);
            expect(sut).to.be.eql(untouched);

            sut.configure('string');
            expect(sut).to.be.eql(untouched);

            sut.configure({value: 10});
            expect(sut).to.not.be.eql(untouched);

        });
    });

    describe('Configurable added as Trait on ConfiguredClass with property `configured`', function(){
        var ConfiguredClass,
            privateValue = "PRIVATE";

        ConfiguredClass = cocktail.mix({
            '@as': 'class',
            '@traits': [Configurable],
            '@properties': {
                configured: false,
                value: undefined
            },

            privateValue: privateValue
        });
        
        it('should call setConfigured method with boolean options.configured value', function(){
            var sut = new ConfiguredClass(),
                options = {};

            //make it true
            options.configured = true;
            sut.configure(options);
            expect(sut.isConfigured()).to.be.equal(options.configured);

            //make it false
            options.configured = false;
            sut.configure(options);            
            expect(sut.isConfigured()).to.be.equal(options.configured);         
        });

        it('should call setValue method with any options.value value', function(){
            var sut = new ConfiguredClass(),
                options = {};

            //make it object
            options.value = {'some': 1};
            sut.configure(options);
            expect(sut.getValue()).to.be.equal(options.value);

            //make it null
            options.value = null;
            sut.configure(options);
            expect(sut.getValue()).to.be.equal(options.value);

            //make it 0
            options.value = 0;
            sut.configure(options);
            expect(sut.getValue()).to.be.equal(options.value);

            //make it String
            options.value = "string";
            sut.configure(options);
            expect(sut.getValue()).to.be.equal(options.value);

            //make it undefined
            options.value = undefined;
            sut.configure(options);
            expect(sut.getValue()).to.be.equal(options.value);

        });

        it('should not modify values with no setters', function(){
            var sut = new ConfiguredClass(),
                options = {};

            options.privateValue = "SHOULD BE DISCARDED";
            sut.configure(options);
            expect(sut.privateValue).to.be.equal(privateValue);

        });

        it('should not add values with no setters', function(){
            var sut = new ConfiguredClass(),
                options = {};

            options.unknown = "UNKNOWN";
            sut.configure(options);
            expect(sut.unknown).to.be.equal(undefined);

        });

    });

});
