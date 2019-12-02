import React, { Component } from "react";
import "../App.css"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchCategories, selectCategory, fetchQuestions } from "../actions/actions"

class CategoryList extends Component {

  componentDidMount() {
    console.log(this.props)
    this.props.fetchCategories()
  }

  changeCategory(categoryId) {
    this.props.selectCategory(categoryId);
    console.log(this.props.category.selectedTopic);
    let selectedTopic= this.props.category.selectedTopic
    if (categoryId === selectedTopic) {
      this.props.fetchQuestions(1, selectedTopic)
    } else {
      console.log('fuck me')
    }
  }


  renderCategories() {
    let categories = this.props.category.topics
    return (
      categories.map(c => (
        <p key={c._id}>
          <a href='#' onClick={e => { e.preventDefault(this.changeCategory(c._id)); }}>{c.name}</a>
        </p>
      )))
  }

  render() {
    return (
      <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 sidebar">
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
    { fetchCategories, selectCategory, fetchQuestions }, dispatch);
}
// export default CategoryList;
export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
