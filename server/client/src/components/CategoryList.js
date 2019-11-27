import React, { Component } from "react";
import "../App.css"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchCategories, fetchQuestions } from "../actions/actions"

class CategoryList extends Component {

    // constructor() {
    //     super() 

    //     this.state = {
    //         categories: [
    //             {name: 'Health', id: 1},
    //             {name: 'Technology', id: 2},
    //             {name: 'Finance', id: 3}
    //         ]
    //     }

    //     this.renderCategories = this.renderCategories.bind(this);
    // }
    componentDidMount() {
        this.props.fetchCategories()
        console.log(this.props.category.topics);
    }


    renderCategories() {
        console.log(this.props.category);
        let categories = this.props.category.topics

        return (
            categories.map(c => (
                <p key={c.id}>
                    <a href='/' onClick={e => { e.preventDefault(this.fetchQuestions(c.id)); }}>{c.name}</a>
                </p>
            )))
    }

    render() {
        return (

            <div class="container-fluid">
                <div class="row flex-nowrap">
                    <div class="col-md-4 col-12 sidebar">
                        <div class="card card-body p-2">
                            <h4>Category</h4>
                            <ul class="nav nav-pills flex-column">
                                <li class="nav-item">
                                    <a class="nav-link" href="#">{this.renderCategories()}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
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
