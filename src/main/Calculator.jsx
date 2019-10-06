import React, { Component } from 'react';

import './Calculator.css';

import Button from './components/Button';
import Display from './components/Display';


const initialState = {
    current: 0,
    values: [0, 0],
    displayValue: '0',
    operation: null,
    clearDisplay: false,
};

export default class Calculator extends Component {

    state = { ...initialState };

    clearMemory = () => {
        this.setState({ ...initialState });
    }

    setOperation = (operation) => {
        if (this.state.current === 0) {
            return this.setState({ operation, current: 1, clearDisplay: true });
        }
        const equals = operation === '=';
        const currentOperation = this.state.operation;
        
        const calculate = ({
            '-': (x, y) => x - y,
            '+': (x, y) => x + y,
            '*': (x, y) => x * y,
            '/': (x, y) => x / y,
        })[currentOperation] || ((x, y) => 0);

        const [x, y] = this.state.values;
        const displayValue = calculate(x, y);

        this.setState({
            displayValue,
            values: [displayValue, 0],
            operation: equals ? null : operation,
            current: equals ? 0 : 1,
            clearDisplay: !equals
        });
    }

    addDigit = (n) => {
        if (n === '.' && this.state.displayValue.includes('.')) return;

        const clearDisplay = this.state.displayValue === '0'|| this.state.clearDisplay;
        const currentValue = clearDisplay ? '' : this.state.displayValue;
        const displayValue = currentValue + n;
        this.setState({ displayValue, clearDisplay: false })
        
        if (n !== '.') {
            const i = this.state.current;
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values];
            values[i] = newValue;
            this.setState({ values });
            console.log(values);
        }
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/"  click={this.setOperation} operation />
                <Button label="7"  click={this.addDigit} />
                <Button label="8"  click={this.addDigit} />
                <Button label="9"  click={this.addDigit} />
                <Button label="*"  click={this.setOperation} operation/>
                <Button label="4"  click={this.addDigit} />
                <Button label="5"  click={this.addDigit} />
                <Button label="6"  click={this.addDigit} />
                <Button label="-"  click={this.setOperation} operation/>
                <Button label="1"  click={this.addDigit} />
                <Button label="2"  click={this.addDigit} />
                <Button label="3"  click={this.addDigit} />
                <Button label="+"  click={this.setOperation} operation/>
                <Button label="0"  click={this.addDigit} double />
                <Button label="."  click={this.addDigit} />
                <Button label="="  click={this.setOperation} operation/>
            </div>
        );
    }
}