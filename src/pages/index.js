import React, { useState } from 'react';
import Layout from 'components/layout';

import Wheel from 'components/wheel';
import Question from 'components/question';

function Index() {
  const [questionWrapperClass, setQuestionWrapperClass] = useState(
    'transparent'
  );
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategoryTitle, setSelectedCategoryTitle] = useState(null);
  const [resetWheel, setResetWheel] = useState(false);

  function reset() {
    setQuestionWrapperClass('transparent');
    setSelectedItem(null);
    setSelectedCategoryTitle(null);
    setResetWheel(true);
  }

  function complete(id, title) {
    setSelectedItem(id);
    setSelectedCategoryTitle(title);
    setTimeout(() => {
      setQuestionWrapperClass('opaque');
    }, 12000);
  }

  return (
    <Layout>
      <Wheel onSelectItem={complete} resetWheel={resetWheel} />
      <div className={`question-wrapper ${questionWrapperClass}`}>
        <Question
          questionWrapperClass={questionWrapperClass}
          selectedItem={selectedItem}
          selectedCategoryTitle={selectedCategoryTitle}
          reset={reset}
        />
      </div>
    </Layout>
  );
}

export default Index;
