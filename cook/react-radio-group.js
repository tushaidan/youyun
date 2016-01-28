(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ReactRadioGroup"] = factory(require("React"));
	else
		root["ReactRadioGroup"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	var React = __webpack_require__(1)
	var assign = __webpack_require__(2)

	function emptyFn(){}

	module.exports = React.createClass({

	    displayName: 'ReactRadioGroup',

	    propTypes: {
	        name: React.PropTypes.string.isRequired,
	        items: function(props, name){
	            if (!props.children && !props.items){
	                return new Error('Your component has no children. In this case, you should specify an items array.')
	            }
	        }
	    },

	    componentDidUpdate: function() {
	        if (!this.shouldGenerateChildren()){
	            this.setRadioNames()
	            this.setCheckedRadio()
	        }
	    },

	    componentDidMount: function() {
	        if (!this.shouldGenerateChildren()){
	            this.setRadioNames()
	            this.setCheckedRadio()
	        }
	    },

	    setCheckedRadio: function(){
	        var value = this.props.value != null?
	                        this.props.value:
	                        this.state.defaultValue

	        this.someRadio(function(radio){
	            if (radio.value == value){
	                radio.checked = true
	                return true
	            }
	        })
	    },

	    setRadioNames: function() {
	        this.forEachRadio(function(radio){
	            radio.setAttribute('name', this.props.name)
	        })
	    },

	    someRadio: function(fn){
	        var $radios = this.getRadios()

	        return [].some.call($radios, fn, this)
	    },

	    forEachRadio: function(fn) {
	        var $radios = this.getRadios()

	        return [].forEach.call($radios, fn, this)
	    },

	    getRadios: function() {
            return ReactDOM.findDOMNode(this).querySelectorAll('input[type="radio"]')
	        // return this.getDOMNode().querySelectorAll('input[type="radio"]')
	    },

	    getDefaultProps: function() {
	        return {
	            defaultLabelStyle: {
	                cursor: 'pointer'
	            },
	            defaultInputStyle: {
	                cursor: 'pointer'
	            }
	        }
	    },

	    getInitialState: function() {
	        return {
	            defaultValue: this.props.defaultValue
	        }
	    },

	    render: function(){
	        var props = this.prepareProps(this.props, this.state)

	        return React.createElement("div", React.__spread({},  props))
	    },

	    getValue: function() {
	        if (this.value == undefined){
	            this.value = this.state.defaultValue
	        }

	        return this.value
	    },

	    handleChange: function(event) {
	        var target = event.target
	        var fn     = this.props.onChange || emptyFn
	        var value  = this.value = target.value

	        fn(value, event)

	        if (this.props.value == null){
	            this.setState({
	                defaultValue: value
	            })
	        }
	    },

	    shouldGenerateChildren: function() {
	        return !this.props.children
	    },

	    prepareProps: function(thisProps, state) {

	        var props = {}

	        assign(props, thisProps)

	        if (this.shouldGenerateChildren()){
	            props.labelStyle = this.prepareLabelStyle(props, state)
	            props.inputStyle = this.prepareInputStyle(props, state)
	            props.children   = this.prepareChildren(props, state)
	        }

	        props.onChange = this.handleChange

	        return props
	    },

	    prepareLabelStyle: function(props) {
	        return assign({}, props.defaultLabelStyle, props.labelStyle)
	    },

	    prepareInputStyle: function(props) {
	        return assign({}, props.defaultInputStyle, props.inputStyle)
	    },

	    prepareChildren: function(props, state) {

	        var checkedValue = props.value != null?
	                            props.value:
	                            state.defaultValue

	        return (props.items || []).map(function(item, index, arr){

	            var inputStyle = assign({}, props.inputStyle)
	            var labelStyle = assign({}, props.labelStyle)
	            var checked
	            var value
	            var children

	            if (typeof item === 'string'){
	                value    = item
	                checked  = checkedValue == value
	                children = item
	            } else {
	                value    = item.value
	                children = item.label || item.value || item.children
	                checked  = checkedValue == value

	                if (item.inputStyle){
	                    assign(inputStyle, item.inputStyle)
	                }
	                if (item.style){
	                    assign(labelStyle, item.style)
	                }
	            }

	            if (checked){
	                assign(inputStyle, props.checkedInputStyle)
	                assign(labelStyle, props.checkedLabelStyle)

	                if (checked && item && item.checkedStyle){
	                    assign(labelStyle, item.checkedStyle)
	                }
	            }

	            var inputProps = {
	                checked : checked,
	                value   : value,
	                name    : props.name,
	                type    : 'radio',
	                style   : inputStyle,
	                onChange: emptyFn
	            }

	            var radioProps = {
	                key       : index,
	                checked   : checked,
	                index     : index,
	                name      : props.name,
	                value     : value,
	                style     : labelStyle,
	                inputProps: inputProps,
	                label     : children,
	                item      : item,
	                children  : [
	                    React.createElement("input", React.__spread({},  inputProps)),
	                    children
	                ]
	            }

	            var renderFn = props.renderRadio
	            var result

	            if (renderFn){
	                result = renderFn(radioProps, index, arr)
	            }

	            if (result === undefined){
	                result = React.createElement("label", React.__spread({},  radioProps))
	            }

	            return result
	        }, this)
	    }
	})

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/* eslint-disable no-unused-vars */
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }
/******/ ])
});
;
