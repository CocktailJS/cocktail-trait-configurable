'use strict';

var expect = require("chai").expect,
    cocktail = require('cocktail'),
    Configurable = require('../../lib/Configurable');

describe('Configurable.withOptions Trait Unit Test', function(){

    describe('Configurable.withOptions as Trait on ConfiguredClass', function(){
        var ConfiguredClass;

        ConfiguredClass = cocktail.mix({
            '@as': 'class',
            '@traits': [
                Configurable.withOptions({items: 'addItems'})
            ],

            '@properties': {value: 1},

            constructor: function () {
                this.items = [];
            },

            addItems: function (items) {
                var me = this;
                items.forEach(function(item){
                    me.items.push(item);
                })
            }
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

        it('should configure params as in options', function(){
            var sut = new ConfiguredClass(),
                items = [1,2,3,4],
                options = {
                    value: 1,
                    items: items
                };

            sut.configure(options);
            expect(sut.value).to.be.equal(1);
            expect(sut.items.length).to.be.equal(items.length);
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

    describe('Passing an empty object to Configurable.withOptions as Trait on ConfiguredClass', function(){
        var ConfiguredClass;

        ConfiguredClass = cocktail.mix({
            '@as': 'class',
            '@traits': [
                Configurable.withOptions({})
            ],

            '@properties': {value: 1, items: null},

            constructor: function () {
                this.items = [];
            }
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

        it('should configure params as in options', function(){
            var sut = new ConfiguredClass(),
                items = [1,2,3,4],
                options = {
                    value: 1,
                    items: items
                };

            sut.configure(options);
            expect(sut.value).to.be.equal(1);
            expect(sut.items.length).to.be.equal(items.length);
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
});
