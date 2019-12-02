import React, { Component } from "react";
import "../App.css"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchCategories, fetchQuestions } from "../actions/actions"

class CategoryList extends Component {

  componentDidMount() {
    this.props.fetchCategories()
  }



  renderCategories() {
    let categories = this.props.category.topics
    return (
      categories.map(c => (
        <p key={c._id}>
          <a href='/' onClick={e => { e.preventDefault(this.fetchQuestions(c._id)); }}>{c.name}</a>
        </p>
      )))
  }

  render() {
    return (
      <div className="sidebar col-lg-3 col-md-3">
        <div className="card card-body p-2">
          <h4>Category</h4>
          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <a className="nav-link" href="#">{this.renderCategories()}</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
};

//onClick= {e => { e.preventDefault(this.selectFilterCategory(c.id)); }}
function mapStateToProps({ questions, category }) {
  return { questions, category };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchQuestions, fetchCategories }, dispatch);
}
// export default CategoryList;
export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
