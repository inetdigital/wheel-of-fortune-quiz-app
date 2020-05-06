import React, { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

function Counter(props) {
  const [timerIsPlaying, setTimerIsPlaying] = useState(false);
  const [timerDuration, setTimerDuration] = useState(30);

  function startTimer() {
    setTimerIsPlaying(true);
  }

  function complete() {
    props.complete();
  }

  return (
    <CountdownCircleTimer
      isPlaying={timerIsPlaying}
      duration={timerDuration}
      colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
      size={150}
      strokeWidth={6}
      onComplete={complete}
    >
      {({ remainingTime }) =>
        remainingTime == timerDuration ? (
          <Button className="start-timer" onClick={startTimer}>
            <Typography component="div">
              <Box fontSize="h5.fontSize">Start Timer</Box>
            </Typography>
          </Button>
        ) : (
          <React.Fragment>
            {remainingTime > 0 ? (
              <Typography component="div">
                <Box fontSize="h4.fontSize">{remainingTime}</Box>
              </Typography>
            ) : (
              <Typography component="div">
                <Box fontSize="h4.fontSize">Times up!</Box>
              </Typography>
            )}
          </React.Fragment>
        )
      }
    </CountdownCircleTimer>
  );
}

export default Counter;
