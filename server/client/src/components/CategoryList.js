import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import {fetchCategories, fetchQuestions} from "../actions/actions"

class CategoryList extends Component {
    componentDidMount() {
        let categories = ['Sports', 'Technology', 'Music', 'Anime', ]
        //this.props.fetchCategories();
        return categories;
    };

    // selectFilterCategory(categoryId) {
    //     this.props.fetchQuestions(categoryId);
    // };
    
    render(categories) {
        return (
                categories.map(c => (
                    <p key={c._Id}>
    <a href='/' onClick= {e=> {e.preventDefault(this.selectFilterCategory(c._Id));}}>{c.name}</a>                                                    
                    </p>
                ))
        )
    }
};

// function mapStateToProps({ questions, category}) {
//     return { questions, category };
// }

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators(
//     { fetchQuestions, fetchCategories }, dispatch);
// }
export default CategoryList;
//export default connect(mapStateToProps,mapDispatchToProps)(CategoryList);