import React, { Component } from 'react';
import { Field, reduxForm } from "redux-form";
import "../App.css";
import { Button } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from '../actions/actions';
import CheckboxGroup from './checkboxGroup'

class SubmitQuestion extends Component {

  componentDidMount() {
    this.props.fetchCategories();
  }
  onSubmit(values) {
    this.props.createQuestion(values, () => {
      this.props.history.replace('/');
      window.location.reload();
    });
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

  questionInput() {

  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="row example-wrapper">
        <div className="col-xs-12 col-sm-6 offset-sm-3 example-col">
          <div className="card submit-form-card mx-auto">
            <form className="k-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <div className='form-group'>
                <legend>Ask Question Below</legend>
                <label className="k-form-field">
                  <Field
                    name="question"
                    placeholder="Start your question with What, How, Why, etc"
                    component={'textarea'}
                  />
                </label>
                <Field
                  name='topics'
                  component={CheckboxGroup}
                  options={this.props.category.topics}
                />
                <div className="text-right">
                  <div className="form-actions">
                    <a href='/'><Button variant="outline-danger mr-2" size="sm">Cancel</Button></a>
                    <Button type="submit" variant="outline-secondary mr-2" size="sm">Submit</Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    );
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

const mapStateToProps = (state) => {
  return state
}

export default reduxForm({ form: 'questionNew' })(connect(mapStateToProps, mapDispatchToProps)(SubmitQuestion));