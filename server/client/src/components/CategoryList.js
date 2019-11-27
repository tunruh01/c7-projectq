import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {fetchCategories, fetchQuestions} from "../actions/actions"

class CategoryList extends Component {
    
    componentDidMount () {
        this.props.fetchCategories()
        console.log(this.props);
      }
    

    renderCategories() {
        console.log(this.props);
        let categories = this.props.category.topics
        
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
function mapStateToProps({ questions, category}) {
    return { questions, category };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
    { fetchQuestions, fetchCategories }, dispatch);
}
// export default CategoryList;
export default connect(mapStateToProps,mapDispatchToProps)(CategoryList);
