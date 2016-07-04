require("./node_modules/bootstrap/dist/css/bootstrap.min.css");
var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
	render: function () {
		return (
			<div>
				<Calculator />
			</div>
		);
	}
});

var EntranceField = React.createClass({
	getDefaultProps: function () {
		return {
			entranceFieldStyle: 'entranceField',
			loggerStyle: 'logger',
			inputStyle: 'input'
		};
	},

	render: function () {
		return (
			<div className={this.props.entranceFieldStyle}>
				<div className={this.props.loggerStyle}>{this.props.string}</div>
				<input className={this.props.inputStyle} value={this.props.value}/>
			</div>
		);
	}
});


var Button = React.createClass({

	getDefaultProps: function () {
		return {
			buttonStyle: 'button__initial'
		};
	},

	log: function () {
		this.props.onClickHandler(this.props.value);
	},

	render: function () {
		return (
			<button className={this.props.buttonStyle}
							onClick={this.log}>{this.props.value}</button>
		)
	}
});

var Calculator = React.createClass({
	clearValue: false,

	getDefaultProps: function () {
		return {
			calculatorStyle: 'calculator'
		};
	},

	getInitialState: function () {
		return {
			string: '',
			value: '',
			result: null,
			lastCommand: null
		};
	},

	operations: {
		'+': function (value1, value2) {
			return value1 + value2;
		},
		'-': function (value1, value2) {
			return value1 - value2;
		},
		'*': function (value1, value2) {
			return value1 * value2;
		},
		'/': function (value1, value2) {
			if (value2 === 0) {
				return this.value = 'Cannot divide by zero';
			}
			return value1 / value2;
		}
	},

	logValue: function (currentValue) {
		this.setState({
			string: this.state.string,
			value: this.state.value + currentValue.toString()
		});
		if (this.clearValue) {
			this.setState({
				string: this.state.string,
				value: currentValue
			});
		}
		this.clearValue = false;
	},

	computeValue: function (value) {
		var currentResult = (this.state.result !== null) ? this.state.result : +this.state.value,
			currentValue = this.state.value;

		if (this.state.lastCommand !== null) {
			currentResult = this.state.lastCommand(currentResult, +this.state.value);
			currentValue = currentResult;
		}

		this.state.lastCommand = this.operations[value];

		this.setState({
			string: this.state.string + this.state.value + value,
			value: currentValue,
			result: currentResult
		});

		this.clearValue = true;
	},

	deleteValue: function () {
		var currentValue = this.state.value.slice(0, -1);

		this.setState({
			string: this.state.string,
			value: currentValue,
		});
		this.clearValue = true;
	},

	calculate: function () {
		var currentResult = (this.state.result !== null) ? this.state.result : +this.state.value,
			currentValue = this.state.value;

		if (this.state.lastCommand !== null) {
			currentResult = this.state.lastCommand(currentResult, +this.state.value);
			currentValue = currentResult;
			this.state.lastCommand = null;
		}

		this.setState({
			string: '',
			value: currentValue,
			result: currentResult
		});

		this.clearValue = true;
	},

	render: function () {
		return (
			<div className={this.props.calculatorStyle}>
				<EntranceField string={this.state.string} value={this.state.value}/>
				<Button value={'<--'} onClickHandler={this.deleteValue}/>
				<Button value={'/'} onClickHandler={this.computeValue}/>
				<Button value={'*'} onClickHandler={this.computeValue}/>
				<Button value={'-'} onClickHandler={this.computeValue}/>
				<Button value={7} onClickHandler={this.logValue}/>
				<Button value={8} onClickHandler={this.logValue}/>
				<Button value={9} onClickHandler={this.logValue}/>
				<Button value={'+'} onClickHandler={this.computeValue}/>
				<Button value={4} onClickHandler={this.logValue}/>
				<Button value={5} onClickHandler={this.logValue}/>
				<Button value={6} onClickHandler={this.logValue}/>
				<Button value={'ENTER'} onClickHandler={this.calculate}/>
				<Button value={1} onClickHandler={this.logValue}/>
				<Button value={2} onClickHandler={this.logValue}/>
				<Button value={3} onClickHandler={this.logValue}/>
				<Button value={0} onClickHandler={this.logValue}/>
			</div>)
	}
});

ReactDOM.render(<App/>, document.querySelector("#myApp"));
