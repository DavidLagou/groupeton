import React, { Component } from 'react';

class FormError extends Component {
    render() {
        const { theMessage } = this.props;
        // if a user has filled out a form incorrectly, we are to display the error message in the form header.
        return (
            <div className="col-12 alert alert-danger px-3">
                {theMessage}
            </div>
        )
    }
}

export default FormError

