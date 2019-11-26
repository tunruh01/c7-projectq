import React, { Component } from "react";

// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import {fetchCategories, fetchQuestions} from "../actions/actions"

class CategoryList extends Component {
    
    constructor() {
        super() 
        
        this.state = {
            categories: [
                {name: 'Health', id: 1},
                {name: 'Technology', id: 2},
                {name: 'Finance', id: 3}
            ]
        }
        
        this.renderCategories = this.renderCategories.bind(this);
    }
    

    renderCategories() {
        let categories = this.state.categories
        
        return (
        categories.map(c => (
            <p key={c.id}>
                <a href='/'onClick= {e=> {e.preventDefault(this.fetchQuestions(c.id));}}>{c.name}</a>                                                    
            </p>
        )))
    }
    
    render() {
        return (
            <div>
                {this.renderCategories()}
            </div>   
        )
    }
};

//onClick= {e=> {e.preventDefault(this.selectFilterCategory(c.id));}}
// function mapStateToProps({ questions, category}) {
//     return { questions, category };
// }

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators(
//     { fetchQuestions, fetchCategories }, dispatch);
// }
export default CategoryList;
//export default connect(mapStateToProps,mapDispatchToProps)(CategoryList);
