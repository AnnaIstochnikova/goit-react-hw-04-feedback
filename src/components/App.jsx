import Feedback from './feedback/feedbackFn';

export const App = () => {
  return (
    <div>
      <Feedback good={0} neutral={0} bad={0} total={0} positivePercentage={0} />
    </div>
  );
};
