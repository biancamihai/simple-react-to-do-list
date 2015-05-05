(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
// My first TO DO APP attempt with React

//var localStorageMixin = require('react-localstorage');

// TodoApp component
var TodoApp = React.createClass({ displayName: "TodoApp",
	// sync state with local storage
	componentDidUpdate: function (prevProps, prevState) {
		localStorage.state = JSON.stringify(this.state);
	},
	// the to do app initial will be empty until a new task is added gtom the to do form
	getInitialState: function () {
		var items = [];
		if (typeof localStorage.state !== "undefined") items = JSON.parse(localStorage.state).items;
		return { items: items };
	},
	// update the to do list when a new task is added
	updateItems: function (newItem) {
		var allItems = this.state.items.concat([newItem]);
		this.setState({ items: allItems });
	},
	// complete item
	completeItem: function (pos) {
		this.state.items[pos].completed = 1;
		this.setState({ items: this.state.items });
	},
	// render the to do list
	render: function () {
		return React.createElement("div", null, React.createElement(TodoHeader, null), React.createElement(TodoList, { items: this.state.items, fnComplete: this.completeItem }), React.createElement(TodoForm, { onFormSubmit: this.updateItems }));
	}
});

// TodoHeader component	
var TodoHeader = React.createClass({ displayName: "TodoHeader",
	// render the header
	render: function () {
		return React.createElement("h2", null, "My first to do app with React.");
	}
});

// TodoList component
var TodoList = React.createClass({ displayName: "TodoList",
	// render the to do list
	render: function () {
		return React.createElement("ul", { className: "list-group" }, this.props.items.map(function (item, i) {
			var buttonClass = "btn btn-primary btn-xs";
			if (item.completed === 1) buttonClass = "btn btn-primary btn-xs hidden";
			return React.createElement("li", { className: "list-group-item", key: i }, item.text, React.createElement("button", { type: "button", className: buttonClass, onClick: this.props.fnComplete.bind(null, i) }, React.createElement("span", { className: "glyphicon glyphicon-ok", "aria-hidden": "true" }), " Complete"));
		}, this));
	}
});

// TodoForm
var TodoForm = React.createClass({ displayName: "TodoForm",
	// sync state with local storage
	getInitialState: function () {
		return { item: { text: "", completed: 0 } };
	},
	// on submit send the item to the state and return to the initial state with focus on the field
	handleSubmit: function (e) {
		e.preventDefault();
		this.props.onFormSubmit({ text: this.state.item, completed: 0 });
		this.setState({ item: { text: "", completed: 0 } });
		React.findDOMNode(this.refs.item).focus();
		return;
	},
	// on change assign the value to the state
	onChange: function (e) {
		this.setState({
			item: e.target.value
		});
	},
	// render a form with a text field and a submit button
	render: function () {
		return React.createElement("form", { onSubmit: this.handleSubmit }, React.createElement("div", { className: "row" }, React.createElement("div", { className: "col-xs-10" }, React.createElement("input", { type: "text", ref: "item", className: "form-control", onChange: this.onChange, value: this.state.item.text, placeholder: "Enter a new task here" })), React.createElement("div", { className: "col-xs-2" }, React.createElement("input", { type: "submit", className: "btn btn-primary", value: "Add" }))));
	}
});

React.render(React.createElement(TodoApp, null), content);


},{}]},{},[1]);
