import React, { Component } from "react";
// import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";




class QuestionDetail extends Component {


    render() {
        // temporary form until we implement redux so we can use redux-form 
        return (
            <div>
                <div>
                    <h3>Category: Pizza</h3>
                    <h1>
                        Why in the world do people eat Papa John's ?
                     </h1>
                </div>

                <div className='padding'>
                    <h4 className="text-center" style={{ color: "grey" }}>Answer question</h4>
                    <div className="col-md-6 offset-md-3 shadow-sm">
                        <div className="row">
                            <form
                                name="addContact"
                                className="offset-md-4"
                            >
                                <input
                                    className="form-control"
                                    placeholder="Name"
                                />
                                <input
                                    className="form-control"
                                    placeholder="Credentials"
                                />
                                <input
                                    className="form-control"
                                    placeholder="answer..."
                                />

                                <Link to="/">
                                    <button className="btn-dark btn btn-sm">
                                        Back
                                    </button>
                                </Link>
                                <input
                                    type="submit"
                                    className="btn-dark btn btn-sm float-right"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}




export default QuestionDetail;