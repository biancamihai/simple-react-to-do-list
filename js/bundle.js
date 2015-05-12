(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
// My first TO DO APP attempt with React

//var localStorageMixin = require('react-localstorage');

// status == 0 -- pending task
// status == 1 -- completed task
// status == 2 -- archived task

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
	// complete/archive item - change his status
	updateItem: function (pos, status) {
		this.state.items[pos].status = status;
		this.setState({ items: this.state.items });
	},
	// delete - deletes am item from the list
	deleteItem: function (pos) {
		var allItems = this.state.items;
		allItems.splice(pos, 1);
		this.setState({ items: allItems });
	},
	// deleteBulk: function(arr){
	// 	arr.forEach(function(item){
	// 		this.deleteItem(item);
	// 	});
	// },
	// render the to do list
	render: function () {
		return React.createElement("div", null, React.createElement(TodoHeader, null), React.createElement(TodoList, { items: this.state.items, fnComplete: this.updateItem, fnDelete: this.deleteItem }), React.createElement(TodoForm, { onFormSubmit: this.updateItems }));
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
			var classComplete = "btn btn-primary btn-xs",
			    classArchive = "btn btn-primary btn-xs hidden",
			    liClass = "list-group-item",
			    classCheckBox = "checkbox";
			if (item.status === 1) {
				classComplete = "btn btn-primary btn-xs hidden";
				classArchive = "btn btn-primary btn-xs";
			} else if (item.status === 2) {
				liClass = "list-group-item hidden";
			}
			return React.createElement("li", { className: liClass, key: i }, item.text, React.createElement("button", { type: "button", className: classComplete, onClick: this.props.fnComplete.bind(null, i, 1) }, React.createElement("span", { className: "glyphicon glyphicon-ok", "aria-hidden": "true" }), " Complete"), React.createElement("button", { type: "button", className: classArchive, onClick: this.props.fnComplete.bind(null, i, 2) }, React.createElement("span", { className: "glyphicon glyphicon-ok", "aria-hidden": "true" }), " Archive"), React.createElement("button", { type: "button", className: "btn btn-primary btn-xs", onClick: this.props.fnDelete.bind(null, i) }, React.createElement("span", { className: "glyphicon glyphicon-ok", "aria-hidden": "true" }), " Delete"), React.createElement("div", { className: "checkbox" }, React.createElement("label", { htmlFor: "name" }, React.createElement("input", { type: "checkbox", value: "1" }), "Priority")));
		}, this));
	}
});

// // Filter Tasks
// var FilterForm = React.createClass({
// 	// initial state, no filter selected by default
// 	getInitialState: function(){
// 		return {filter : null} // no filter set default
// 	},
// 	// on change option in filter
// 	onChange: function(){
// 		// set state
// 		this.setState({
// 			filter: e.target.value
// 		})
// 	}
// });

// TodoForm
var TodoForm = React.createClass({ displayName: "TodoForm",
	// sync state with local storage
	getInitialState: function () {
		return { item: { text: "", status: 0 } };
	},
	// on submit send the item to the state and return to the initial state with focus on the field
	handleSubmit: function (e) {
		if (typeof this.state.item === "object" && this.state.item.text.length === 0) return false;
		e.preventDefault();
		this.props.onFormSubmit({ text: this.state.item, status: 0 });
		this.setState({ item: { text: "", status: 0 } });
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
