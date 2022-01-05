import React from 'react';

const ComparisonModal = (props) => {
  if (!props.show) {
    return null
  }
  return (
    <div className='comparisonModal'>
      <div className='modalContent'>
        <div className='modalHeader'>
          <h4 className='modalTitle'>Comparing</h4>
        </div>
        <div className='modalBody'>
          This is the modal content
        </div>
        <div className='modalFooter'>
          <button className='modalBtn'>Close</button>
        </div>
      </div>
    </div>
  )
}

export default ComparisonModal;