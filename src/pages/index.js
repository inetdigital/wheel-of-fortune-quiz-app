import React from 'react';
import Layout from 'components/layout';

import Wheel from 'components/wheel';
import Question from 'components/question';

import categories from 'containers/categories.js';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionWrapperClass: 'transparent',
      selectedItem: null,
      selectedQuestionAnswer: {
        question: null,
        answer: null,
      },
    };
  }

  reset() {
    this.setState({
      selectedItem: null,
      selectedQuestionAnswer: {
        question: null,
        answer: null,
      },
      wheelPosition: 'center',
    });
  }

  complete(id) {
    const selectedItemQuestion = Math.floor(
      Math.random() * categories[id].questions.length
    );
    setTimeout(() => {
      this.setState({
        questionWrapperClass: 'opaque',
        selectedItem: id,
        selectedQuestionAnswer: {
          question: categories[id].questions[selectedItemQuestion].q,
          answer: categories[id].questions[selectedItemQuestion].a,
        },
      });
    }, 12000);
  }

  render() {
    const { questionWrapperClass } = this.state;
    return (
      <Layout>
        <Wheel
          items={categories}
          containerClass={this.state.wheelPosition}
          onSelectItem={this.complete.bind(this)}
          reset={this.reset.bind(this)}
        />
        <div className={`question-wrapper ${questionWrapperClass}`}>
          <Question
            questionWrapperClass={this.state.questionWrapperClass}
            selectedItem={this.state.selectedItem}
            questionAndAnswer={this.state.selectedQuestionAnswer}
            items={categories}
          />
        </div>
      </Layout>
    );
  }
}
