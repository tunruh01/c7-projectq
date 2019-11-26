import React, { Component } from "react";
// import styled from "styled-components";
import Qnav from "./Qnav";
import { connect } from "react-redux";
// import * as actions from '../actions';
import _ from "lodash";
import InfiniteScroll from 'react-infinite-scroller';

class QuestionList extends Component {
  constructor() {
    super()

    this.loadItems = this.loadItems.bind(this)

    this.state = {
      category: "software",
      name: "fred",
      question: "will we be ok?",
      hasMoreItems: true
    }
  }

  componentDidMount() {
    this.props.fetchQuestions()
  }

  loadItems(page) {
    if (page < this.props.totalPages || this.props.totalPages === 0) {
      this.props.fetchQuestions(page)
    } else {
      this.setState({ hasMoreItems: false })
    }
  }

  render() {
    const questions = _.map(this.props.questions, (q) => {
      return questions;
    });

    return (
      <InfiniteScroll
        loadMore={this.loadItems}
        pageStart={0}
        hasMore={this.state.hasMoreItems}>
      </InfiniteScroll>
    );
  }
}

function mapStateToProps(state) {
  return { questions: state.questions, totalPages: state.total_pages }
};

export default connect(
  mapStateToProps,
  // actions
)(QuestionList);