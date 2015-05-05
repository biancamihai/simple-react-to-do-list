 'use strict';
// My first TO DO APP attempt with React 

//var localStorageMixin = require('react-localstorage');

// TodoApp component
var TodoApp = React.createClass({ 
	// sync state with local storage
	componentDidUpdate: function(prevProps, prevState) {
    	localStorage.state = JSON.stringify(this.state);
	},
	// the to do app initial will be empty until a new task is added gtom the to do form
	getInitialState: function(){
		var items = [];
		if(typeof localStorage.state !== 'undefined') items = JSON.parse(localStorage.state).items;
		return {items: items};
	},
	// update the to do list when a new task is added
	updateItems: function(newItem){
		var allItems = this.state.items.concat([newItem]);
		this.setState({items: allItems});
	},
	// complete item
	completeItem: function(pos) {
		this.state.items[pos].completed = 1;
		this.setState({items: this.state.items});
	},
	// render the to do list
	render: function(){
		return (
			<div>
				<TodoHeader/>
				<TodoList items={this.state.items} fnComplete={this.completeItem}/>
				<TodoForm onFormSubmit={this.updateItems}/>
			</div>
		);
	}
});

// TodoHeader component	
var TodoHeader = React.createClass({ 
	// render the header
	render: function(){
		return (
			<h2>My first to do app with React.</h2>
		);
	}
});

// TodoList component
var TodoList = React.createClass({ 
	// render the to do list
	render: function() {
		return (
      <ul className='list-group'>
        {this.props.items.map(function(item, i) {
        	var buttonClass = 'btn btn-primary btn-xs';
          if(item.completed === 1) buttonClass = 'btn btn-primary btn-xs hidden';
          return (
            <li className='list-group-item' key={i}>
				{item.text} 
				<button type="button" className={buttonClass} onClick={this.props.fnComplete.bind(null, i)}>
					<span className="glyphicon glyphicon-ok" aria-hidden="true"></span> Complete
				</button>
			</li>
          );
        }, this)}
      </ul>
    );
	}
});

// TodoForm
var TodoForm = React.createClass({
	// sync state with local storage
	getInitialState: function() {
		return {item: { text : '', completed : 0 }};
	},
	// on submit send the item to the state and return to the initial state with focus on the field
	handleSubmit: function(e){
		e.preventDefault();
		this.props.onFormSubmit({ text : this.state.item, completed : 0 });
		this.setState({item: { text : '', completed : 0 }});
		React.findDOMNode(this.refs.item).focus();
		return;
	},
	// on change assign the value to the state
	onChange: function(e){
		this.setState({
			item: e.target.value
		});
	},
	// render a form with a text field and a submit button
	render: function(){
		return (
			<form onSubmit={this.handleSubmit}>
				<div className='row'>
					<div className='col-xs-10'>
						<input type='text' ref='item' className='form-control' onChange={this.onChange} value={this.state.item.text} placeholder="Enter a new task here"/>
					</div>
					<div className='col-xs-2'>
						<input type='submit' className='btn btn-primary' value='Add'/>
					</div>
				</div>
			</form>
		);
	}
});

React.render(<TodoApp/>, content);