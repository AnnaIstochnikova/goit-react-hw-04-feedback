import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Section } from './section/section';
import { Statistics } from './statistics/statistics';
import { Notification } from './notification/notification';
import { FeedbackOptions } from './feedbackOptions/feedbackOptions';

class Feedback extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
    positive: 0,
    totalFeedback: 0,
    positivePercentage: 0,
    showStatistics: false,
  };

  changeVote = type => {
    this.setState(prevState => ({
      [type]: prevState[type] + 1,
      showStatistics: true,
    }));
  };

  changeTotalFeedback = () =>
    this.state.good + this.state.bad + this.state.neutral;

  changePositiveFeedback = () => {
    return +(
      100 *
      (this.state.good /
        (this.state.good + this.state.bad + this.state.neutral))
    ).toFixed(0);
  };

  render() {
    const { good, neutral, bad, showStatistics } = this.state;
    const totalFeedbackCount = this.changeTotalFeedback();
    const positiveFeedbackCount = this.changePositiveFeedback();

    return (
      <>
        <Section title="Please leave feedback" />
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={this.changeVote}
        />
        {showStatistics || <Notification message="There is no feedback" />}
        {showStatistics && (
          <>
            <Section title="Statistics" />
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              totalFeedback={totalFeedbackCount}
              positivePercentage={positiveFeedbackCount}
            />
          </>
        )}
      </>
    );
  }
}

Feedback.propTypes = {
  state: PropTypes.shape({
    good: PropTypes.number,
    neutral: PropTypes.number,
    bad: PropTypes.number,
    totalFeedback: PropTypes.number,
    positivePercentage: PropTypes.number,
  }),
  changeVote: PropTypes.func,
  changeTotalFeedback: PropTypes.func,
  changePositiveFeedback: PropTypes.func,
  options: PropTypes.object,
  title: PropTypes.string,
};

export default Feedback;
