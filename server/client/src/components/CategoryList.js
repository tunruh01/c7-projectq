// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import Col from "react-bootstrap/Col";

// class CategoryList extends Component {
//     componentdidmount() {
//         let categories = this.props.fetchCategories();
//         return categories;
//     };

//     selectFilterCategory(category) {
//         console.log('clicked category')
//         console.log(category);
//         this.props.changeCategory(category);
//         let selectedCategory = this.props.questions.category;
//         this.props.fetchQuestions(selectedCategory);
//     };

//     // onClick= {e=> {e.preventDefault(this.selectFilterCategory(category));}}
//     render() {
//         return (
//                 categories.map(c => (
//                     <p key={c._Id}>
//                         <a onClick= {e=> {e.preventDefault(this.selectFilterCategory(category));}}></a>                                                    
//                     </p>
//                 ))
//         )
//     }
// };

// function mapStateToProps({ questions, category}) {
//     return { questions, category };
// }

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators(
//     { fetchQuestions, fetchCategories, changeCategory }, dispatch);
// }

// export default connect(mapStateToProps,mapDispatchToProps)(CategoryList);