import React, { Component } from 'react'

import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'
import { BiArrowBack } from 'react-icons/bi'
import { CgMathDivide, CgMathEqual, CgMathPlus, CgMathMinus } from 'react-icons/cg'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...initialState }
    /* O operador spread clona o objeto acima, inserindo suas propriedades.
    Se não usássemos, a palavra "inicialState" seria interpretada como uma propriedade. */

    constructor(props) { // Dando bind nas funções.
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
        this.eraseDigit = this.eraseDigit.bind(this)
    }

    

    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({
                operation: operation,
                current: 1,
                clearDisplay: true
            })
        } else {
            const equals = operation === '='
            let currentOperation = this.state.operation
            const values = [ ...this.state.values ]

            // Versão utilizando o Switch
            switch (currentOperation) {
                case '+':
                    values[0] = values[0] + values[1]
                    break
                case '-':
                    values[0] = values[0] - values[1]
                    break
                case '*':
                    values[0] = values[0] * values[1]
                    break
                case '/':
                    values[0] = values[0] / values[1]
                    break
                default:
            }

            // try {
            //     values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            // } catch(e) {
            //     values[0] = this.state.values[0]
            // }
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(n) { // Os parâmetros são as "labels".
        if (n === '.' && this.state.displayValue.includes('.')) {
            return // Se o dígito for ponto e já estiver incluído no display, sair da função.
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay // Se forem true, limpará a tela.
        const currentValue = clearDisplay ? '' : this.state.displayValue //  && (this.state.displayValue === '0' && n !== '.') Na condição.
        const displayValue = currentValue + n

        this.setState({
            displayValue: displayValue,
            clearDisplay: false
        })

        if (n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [ ...this.state.values ]
            values[i] = newValue
            this.setState({ values: values })
        }

        // Minha lógica
        // const currentValue = this.state.displayValue === '0' && (this.state.displayValue === '0' && n !== '.') ? '' : this.state.displayValue
        // const displayValue = currentValue + n

        // this.setState({displayValue: displayValue})
    }
    
    eraseDigit() {
        const values = [ ...this.state.values ]

        let erasedNumber;
        this.state.current === 0 ? erasedNumber = values[0] : erasedNumber = values[1]
        
        let modifiedNumber = String(erasedNumber).split('')
        modifiedNumber.pop()
        let readyNumber = Number(modifiedNumber.join(''))

        erasedNumber = readyNumber
        
        console.log(values)

        if (this.state.current === 0) {
            this.setState({
                values: [erasedNumber, values[1]]
            })
        } else {
            this.setState({
                values: [values[0], erasedNumber]
            })
        }

        this.setState({
            displayValue: erasedNumber
        })
    }

    render() {
        return(
            <div className="Calculator">
                <Display value={this.state.displayValue} />
                <Button double label="AC"  click={this.clearMemory} />
                <Button content={<BiArrowBack className="operationIcon" />} click={this.eraseDigit} /> {/* ERASE BUTTON */}
                <Button operation label="/" content={<CgMathDivide className="operationIcon" />} click={this.setOperation} />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button operation label="*" content={<CgMathPlus className="operationIcon multIcon" />} click={this.setOperation} />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button operation label="-" content={<CgMathMinus className="operationIcon" />} click={this.setOperation} />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button operation label="+" content={<CgMathPlus className="operationIcon" />} click={this.setOperation} />
                <Button double label="0" click={this.addDigit} />
                <Button label="." click={this.addDigit} />
                <Button operation label="=" content={<CgMathEqual className="operationIcon" />} click={this.setOperation} />
            </div>
        )
    }
}