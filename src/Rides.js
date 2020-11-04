import React, { Component } from 'react';
import RideList from './RideList';

import { FaPlusCircle } from 'react-icons/fa'

class Rides extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupetonName: '',
            groupetonDate: '',
            groupetonTime: '',
            groupetonDesc: '',
            formDisplay: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
    }

    handleChange(e) {
        const itemName = e.target.name;
        const itemValue = e.target.value;

        this.setState({ [itemName]: itemValue });
    }

    handleSubmit(e) {
        e.preventDefault();
        let tempGroupeton = {
            groupetonName: this.state.groupetonName,
            groupetonDate: this.state.groupetonDate,
            groupetonTime: this.state.groupetonTime,
            groupetonDesc: this.state.groupetonDesc
        }
        // Sets a prop to a function that has our new object as a argument.
        this.props.addGroupeton(tempGroupeton); 
        this.setState({
            groupetonName: '',
            groupetonDate: '',
            groupetonTime: '',
            groupetonDesc: '',
        })

    }
    toggleForm() {
        this.setState({
            formDisplay: !this.state.formDisplay
        })
    }

    render() {
        return (
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-12 text-center">
                        <div className="formToggle" onClick={this.toggleForm} > <FaPlusCircle /> Create a Groupeton</div>
                        <div
                            className={'card bg-light ' + (this.state.formDisplay ? '' : 'formDisplay')}
                        >
                            <div className="card-body text-center">
                                {/* Form start  */}
                                <form onSubmit={this.handleSubmit}  >
                                    <div className="form-group form-row ">
                                        <label
                                            className="col-md-2 col-form-label text-md-right"
                                            htmlFor="groupetonName"
                                            readOnly >

                                            Name
                                        </label>
                                        <div className="col-md-10">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="groupetonName"
                                                aria-describedby="buttonAdd"
                                                placeholder="Groupeton Name"
                                                value={this.state.groupetonName}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group form-row">
                                        <label
                                            className="col-md-2 col-form-label text-md-right"
                                            htmlFor="groupetonDate"
                                        >
                                            Date
                                           </label>
                                        <div className="col-md-4">
                                            <input
                                                type="date"
                                                className="form-control"
                                                name="groupetonDate"
                                                id="groupetonDate"
                                                value={this.state.groupetonDate}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </div>
                                        <label
                                            className="col-md-2 col-form-label text-md-right"
                                            htmlFor="groupetonTime"
                                        >
                                            Time
                                         </label>
                                        <div className="col-md-4">
                                            <input
                                                type="time"
                                                className="form-control"
                                                name="groupetonTime"
                                                id="groupetonTime"
                                                value={this.state.groupetonTime}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </div>
                                    </div>


                                    <div className="form-group form-row">
                                        <label className="col-md-2 text-md-right" htmlFor="aptNotes">
                                            Description
                                          </label>
                                        <div className="col-md-10">
                                            <textarea
                                                className="form-control"
                                                rows="4"
                                                cols="50"
                                                name="groupetonDesc"
                                                id="groupetonDesc"
                                                placeholder="Ride Description"
                                                value={this.state.groupetonDesc}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group text-right mb-0">
                                        <button className="btn btn-primary formBtn" type="submit">
                                            Create
                    </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>

                {/* Displays user rides if there are any if not states that there are no rides avaialble  */}
                    {this.props.rides && this.props.rides.length ? (
                        <div className="card-body py-2">
                            <h4 className="card-title font-weight-light m-0">  Your Groupetons</h4>
                        </div>
                    ) : 'No rides created'}
                    {this.props.rides && (
                        <div className="container-fluid">
                            <RideList userID={this.props.userID} rides={this.props.rides} />
                        </div>
                    )}


                </div>
            </div>

        )
    }
}

export default Rides


