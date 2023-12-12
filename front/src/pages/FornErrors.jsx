import React, {Component} from 'react'; // Component - класс из пакета react
import "../screen/formErrors.css";

class FormErrors extends Component {
    render() {
        return (
            <div>
                {this.props.answer}
                {Object.keys(this.props.formErrors).map((fieldName, i) => {
                    if(this.props.formErrors[fieldName].length > 0){
                        return (
                            <p className="error" key={i}>{fieldName}: {this.props.formErrors[fieldName]}</p>
                        )
                    } else {
                        return '   ';
                    }
                })}
            </div>
        )
    }

}

export default FormErrors;