import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { Section } from './section/section';
import { Statistics } from './statistics/statistics';
import { Notification } from './notification/notification';
import { FeedbackOptions } from './feedbackOptions/feedbackOptions';

const Feedback = () => {
  const [bad, setBad] = useState(0);
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [totalFeedback, setTotalFeedback] = useState(0);
  const [showStatistics, setShowStatistics] = useState(false);
  const [positivePercentage, setPositivePercentage] = useState(0);

  const changeVote = type => {
    setShowStatistics(true);
    switch (type) {
      case 'good':
        setGood(prev => prev + 1);
        break;
      case 'bad':
        setBad(prev => prev + 1);
        break;
      case 'neutral':
        setNeutral(prev => prev + 1);
        break;
      default:
        setTotalFeedback();
        break;
    }
  };

  useEffect(() => {
    setTotalFeedback(good + bad + neutral);
    setPositivePercentage(+(100 * (good / (good + bad + neutral))).toFixed(0));
  }, [good, bad, neutral]);

  return (
    <>
      <Section title="Please leave feedback" />
      <FeedbackOptions
        options={['good', 'neutral', 'bad']}
        onLeaveFeedback={changeVote}
      />
      {showStatistics || <Notification message="There is no feedback" />}
      {showStatistics && (
        <>
          <Section title="Statistics" />
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            totalFeedback={totalFeedback}
            positivePercentage={positivePercentage}
          />
        </>
      )}
    </>
  );
};

Feedback.propTypes = {
  good: PropTypes.number,
  neutral: PropTypes.number,
  bad: PropTypes.number,
  totalFeedback: PropTypes.number,
  positivePercentage: PropTypes.number,
  changeVote: PropTypes.func,
  changeTotalFeedback: PropTypes.func,
  changePositiveFeedback: PropTypes.func,
  options: PropTypes.object,
  title: PropTypes.string,
};

export default Feedback;
