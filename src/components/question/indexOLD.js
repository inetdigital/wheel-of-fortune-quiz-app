import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerIsPlaying: false,
      timerDuration: 5,
      timerFinished: false,
      questionAndAnswer: this.props.questionAndAnswer,
      selectedItem: this.props.selectedItem,
      revealAnswer: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.questionAndAnswer !== this.props.questionAndAnswer) {
      this.setState({
        questionAndAnswer: this.props.questionAndAnswer,
      });
    }
    if (prevProps.selectedItem !== this.props.selectedItem) {
      this.setState({
        selectedItem: this.props.selectedItem,
      });
    }
  }

  startTimer() {
    this.setState({
      timerIsPlaying: true,
    });
  }

  revealAnswer() {
    this.setState({
      revealAnswer: true,
    });
  }

  reset() {
    this.props.reset();
    this.setState({
      timerIsPlaying: false,
      timerFinished: false,
      selectedItem: null,
      revealAnswer: false,
    });
  }

  render() {
    const { items } = this.props;
    const { selectedItem } = this.state;
    return (
      <div className="question-inner">
        {selectedItem && (
          <React.Fragment>
            <div className="counter-wrapper">
              <CountdownCircleTimer
                isPlaying={this.state.timerIsPlaying}
                duration={this.state.timerDuration}
                colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
                size={150}
                strokeWidth={6}
                onComplete={() => {
                  this.setState({
                    timerFinished: true,
                  });
                }}
              >
                {({ remainingTime }) =>
                  remainingTime == this.state.timerDuration ? (
                    <Button
                      variant="outlined"
                      className="start-timer"
                      onClick={this.startTimer.bind(this)}
                    >
                      <Typography component="div">
                        <Box fontSize="h6.fontSize">Start Timer</Box>
                      </Typography>
                    </Button>
                  ) : (
                    <React.Fragment>
                      {remainingTime > 0 ? (
                        <Typography component="div">
                          <Box fontSize="h6.fontSize">{remainingTime}</Box>
                        </Typography>
                      ) : (
                        <Typography component="div">
                          <Box fontSize="h6.fontSize">Times up!</Box>
                        </Typography>
                      )}
                    </React.Fragment>
                  )
                }
              </CountdownCircleTimer>
            </div>
            <div className="question">
              <Typography component="div">
                <Box fontSize="h4.fontSize" m={1}>
                  {items[selectedItem].name}
                </Box>
              </Typography>
              <p>
                <span>Q.</span> {this.state.questionAndAnswer.question}
              </p>
              {this.state.timerFinished && !this.state.revealAnswer && (
                <div>
                  <Button
                    className="reveal-answer"
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={this.revealAnswer.bind(this)}
                  >
                    <Typography component="div">
                      <Box fontSize="h6.fontSize">And the answer is?</Box>
                    </Typography>
                  </Button>
                </div>
              )}
              <div
                className={`answer ${
                  !this.state.revealAnswer ? 'hidden' : 'visible'
                }`}
              >
                {this.state.revealAnswer && (
                  <div>
                    <p>
                      <span>A.</span> {this.state.questionAndAnswer.answer}
                    </p>
                    <div>
                      <button onClick={this.reset.bind(this)}>Reset</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

Question.propTypes = {
  questionWrapperClass: PropTypes.string,
  questionAndAnswer: PropTypes.object,
  selectedItem: PropTypes.number,
  items: PropTypes.array,
  onSelectItem: PropTypes.func,
  reset: PropTypes.func,
};

export default Question;
