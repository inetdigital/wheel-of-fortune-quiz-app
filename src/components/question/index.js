import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import CounterTime from 'components/counter';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

function Question(props) {
  const data = useStaticQuery(graphql`
    query QuestionsQuery {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/questions/" } }
      ) {
        totalCount
        edges {
          node {
            frontmatter {
              question_field
              answer_field
              relation
            }
          }
        }
      }
    }
  `);

  const [timerFinished, setTimerFinished] = useState(false);
  const [revealAnswer, setRevealAnswer] = useState(false);
  const [title, setTitle] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);

  function revealAnswerUpdate() {
    setRevealAnswer(true);
  }

  function reset() {
    props.reset();
    setTimerFinished(false);
    setRevealAnswer(false);
  }

  function completeTimer() {
    setTimerFinished(true);
  }

  useEffect(() => {
    if (props.selectedCategoryTitle) {
      const newObej = data.allMarkdownRemark.edges.filter(
        questionsInCat =>
          questionsInCat.node.frontmatter.relation ==
          props.selectedCategoryTitle
      );

      const selectedQuestionItem = Math.floor(Math.random() * newObej.length);
      setTitle(props.selectedCategoryTitle);
      setQuestion(
        newObej[selectedQuestionItem].node.frontmatter.question_field
      );
      setAnswer(newObej[selectedQuestionItem].node.frontmatter.answer_field);
    }
  }, [props.selectedCategoryTitle]);

  return (
    <div className="question-inner">
      {question && answer && title && (
        <React.Fragment>
          <div className="counter-wrapper">
            <CounterTime complete={completeTimer} />
          </div>
          <div className="question">
            <Box mb={4}>
              <Typography component="div">
                <Box fontSize="h4.fontSize" m={1}>
                  {title}
                </Box>
              </Typography>
            </Box>
            <p>
              <span>Q.</span> {question}
            </p>
            {timerFinished && !revealAnswer && (
              <Box mt={3} pt={3}>
                <Button
                  className="reveal-answer"
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={revealAnswerUpdate}
                >
                  <Typography component="div">
                    <Box fontSize="h4.fontSize">Reveal Answer</Box>
                  </Typography>
                </Button>
              </Box>
            )}
            <div className={`answer ${!revealAnswer ? 'hidden' : 'visible'}`}>
              {revealAnswer && (
                <div>
                  <p>
                    <span>A.</span> {answer}
                  </p>
                  <Box mt={3} pt={3}>
                    <Button
                      className="reveal-answer"
                      variant="contained"
                      color="primary"
                      disableElevation
                      onClick={reset}
                    >
                      <Typography component="div">
                        <Box fontSize="h4.fontSize">New Question</Box>
                      </Typography>
                    </Button>
                  </Box>
                </div>
              )}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default Question;
