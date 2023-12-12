import {Component} from "react";
import {connect} from "react-redux";
import {setAnswer} from "../actions/userAction";
import {sendPoint, setR, setX, setY} from "../actions/coordinatesAction";
import "../screen/chooseForm.css"
import FormErrors from "./FornErrors";
class ChooseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            X: {
                '-5': false,
                '-4': false,
                '-3': false,
                '-2': false,
                '-1': false,
                '0': false,
                '1': false,
                '2': false,
                '3': false,
            },
            R: {
                '1': false,
                '2': false,
                '3': false,
            },
            Y: '',
            formErrors: {paramX: '', paramR: '', paramY: '', all: ''},
            paramXValid: false,
            paramRValid: false,
            paramYValid: false,
        };
    }

    handleCheckboxChange = (value, type) => {
        const updatedValues = { ...this.state[type] };

        Object.keys(updatedValues).forEach((key) => {
            updatedValues[key] = key === value;
        });

        this.setState({
            [type]: updatedValues,
        });
        if (type === 'X') {
            this.props.setX(value)
            this.validateField('paramX', value)
        }
        else {
            this.props.setR(value)
            this.validateField('paramR', value)
        }
    };

    handleYChange = (event) => {
        this.setState({ Y: event.target.value });
        this.props.setY(event.target.value)
        this.validateField('paramY', event.target.value);
    };
    paramsIsReady = (e) => {
        let errors = this.state.formErrors;
        if (!this.state.formValid) {
            errors.all = 'Неправильно введенные поля';
            e.preventDefault();
        }
        else {
            errors.all = ''
            this.onSubmit(e);
        }
    };
    onSubmit = (e) => {
        e.preventDefault();
        const { X, Y, R } = this.state;

        // Find the selected X value
        const selectedX = Object.keys(X).find((key) => X[key]);

        // Find the selected R value
        const selectedR = Object.keys(R).find((key) => R[key]);

        // Ensure both X and R are selected, and Y is not empty
        if (selectedX !== undefined && selectedR !== undefined && Y !== '') {
            this.props.sendPoint({
                x: selectedX,
                y: Y,
                r: selectedR
            });
        }
    }
    validateField(fieldName, value) {

        this.props.setAnswer('');
        let fieldValidationErrors = this.state.formErrors;
        let paramXValid = this.state.paramXValid;
        let paramYValid = this.state.paramYValid;
        let paramRValid = this.state.paramRValid;

        switch (fieldName) {
            case 'paramX':
                paramXValid = (value !== '');
                fieldValidationErrors.paramX = paramXValid ? '' : 'Выберите X';
                break;
            case 'paramR':
                paramRValid = (value !== '');
                fieldValidationErrors.paramR = paramRValid ? '' : 'Выберите R';
                break;
            case 'paramY':
                paramYValid = (value !== '');
                fieldValidationErrors.paramY = paramYValid ? '' : 'Введите Y';
                if (!paramYValid) break;
                paramYValid = (!(isNaN(value) && value || !isNaN(value) && (Number(value) < -3 || Number(value) > 5)));
                fieldValidationErrors.paramY = paramYValid ? '' : 'от -3 до 5'
                break;
            default:
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors,
            paramXValid: paramXValid,
            paramYValid: paramYValid,
            paramRValid: paramRValid,
        }, this.validateForm);

    }

    validateForm() {
        this.setState({
            formValid: this.state.paramXValid &&
                this.state.paramYValid && this.state.paramRValid
        });

    }


    render() {
        const sortedXKeys = Object.keys(this.state.X).sort((a, b) => parseFloat(a) - parseFloat(b));
        return (
            <div className="container2">
                <form onSubmit={this.paramsIsReady} className='forma'>
                <p className="p1">Выберите X: </p>
                    <div className="X">
                {sortedXKeys.map((value) => (
                    <div className="chooseX" key={`X-${value}`}>
                        <input
                            type="checkbox"
                            id={`X-checkbox-${value}`}
                            value={value}
                            checked={this.state.X[value]}
                            onChange={() => this.handleCheckboxChange(value, 'X')}
                        />
                        <label htmlFor={`X-checkbox-${value}`}>{value}</label>
                    </div>
                ))}
                    </div>
                <p className="p2">Выберите Y: </p>
                <input className="inputY"
                    type="text"
                    value={this.state.Y}
                    onChange={this.handleYChange}
                    placeholder="Enter Y value"
                />
                <p className="p3">Выберите R: </p>
                    <div className="R">
                {Object.keys(this.state.R).map((value) => (
                    <div className="chooseR" key={`R-${value}`}>
                        <input
                            type="checkbox"
                            id={`R-checkbox-${value}`}
                            value={value}
                            checked={this.state.R[value]}
                            onChange={() => this.handleCheckboxChange(value, 'R')}
                        />
                        <label htmlFor={`R-checkbox-${value}`}>{value}</label>
                    </div>
                ))}
                    </div>
                    <div className="formErrors">
                        <FormErrors formErrors={this.state.formErrors} answer={this.props.app.answer}/>
                    </div>
                <button type={'submit'} className="button"><span>Ввести</span><i></i></button>
                </form>
            </div>
        );
    }
}

    const mapStateToProps = store => {
        return {
            app: store.app,
        }
    };

    const mapDispatchToProps = dispatch => {
        return {
            setX: x => dispatch(setX(x)),
            setR: r => dispatch(setR(r)),
            setY: y => dispatch(setY(y)),
            setAnswer: answer => dispatch(setAnswer(answer)),
            sendPoint: point => dispatch(sendPoint(point))
        }
    };


export default connect(mapStateToProps, mapDispatchToProps)(ChooseForm);