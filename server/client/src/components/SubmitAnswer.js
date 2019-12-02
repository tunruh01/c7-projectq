import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from '../actions/actions';
import AnswerList from './AnswerList'
import QuestionDetail from "./QuestionDetail";



class SubmitAnswer extends Component {
    componentDidMount() {
        const questionid = this.props.questionid

    }

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control" type="text" {...field.input} />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>
        );
    }

    onSubmit(questionid, values) {
        this.props.submitAnswer(questionid, values, () => {
            this.props.history.push('/');
        })
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className='padding'>
                <h4 className="text-center" style={{ color: "grey" }}>Answer question</h4>
                <div className="col-md-6 offset-md-3 shadow-sm">
                    <div className="row">
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}
                            name="addAnswer"
                            className="offset-md-4"
                        >
                            <Field
                                className="form-control"
                                placeholder="Name"
                                component={this.renderField}
                            />
                            <Field
                                className="form-control"
                                placeholder="Credentials"
                                component={this.renderField}
                            />
                            <Field
                                className="form-control"
                                placeholder="answer..."
                                component={this.renderField}
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

        )
    }
}

const mapStateToProps = (state) => {
    return state
}

const newAnswer = reduxForm({
    form: 'addAnswer',
})(SubmitAnswer);

export default connect(mapStateToProps, actions)(newAnswer)