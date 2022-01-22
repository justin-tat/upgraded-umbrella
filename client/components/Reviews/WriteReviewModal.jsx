import React from 'react';

class WriteReviewModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(<>
      <div className='write-review-modal'>
        <dialog id="write-review-dialog" ref='write-review-dialog'>
          <form method="dialog">
            <div className='write-review-title'>WRITE YOUR REVIEW</div>
            <div>
              <label htmlFor='overall-rating'>Overall Rating</label>
                <select id='overall-rating'>
                  <option></option>
                  <option value='1'>Poor</option>
                  <option value='2'>Fair</option>
                  <option value='3'>Average</option>
                  <option value='4'>Good</option>
                  <option value='5'>Great</option>
                </select>
            </div>
            <div id='recommend'><label>Do you recommend this product?</label>
              <input type='radio' id='yes-recommend' name='recommend'></input>
              <label htmlFor='yes-recommend'>Yes</label>
              <input type='radio' id='no-recommend' name='recommend'></input>
              <label htmlFor='no-recommend'>No</label>
            </div>
            <div>
              <label htmlFor='summary'>Summary</label>
              <input type='text' id='summary' name='summary' minLength='0' maxLength='60' size="60"></input>
            </div>
            <div className='review-body'>
              <div>
                <label htmlFor='body'>Review</label>
              </div>
              <div>
                <textarea id='body' name='body'></textarea>
              </div>
            </div>
            <div>
              <label htmlFor='username'>Username</label>
              <input type='text' id='username' name='username' minLength='0' maxLength='60' size="20"></input>
              <label htmlFor='email'>Email</label>
              <input type='text' id='email' name='email' minLength='0' maxLength='60' size="20"></input>
            </div>
            <menu>
              <button id='submit-btn' value='default' onClick={this.props.writeReviewSubmitBtnClick}>Submit</button>
              <button value='cancel'>Cancel</button>
            </menu>
          </form>
        </dialog>

        <menu>
          <button id='write-review' onClick={this.props.writeReviewBtnClick}>WRITE REVIEW</button>
        </menu>
      </div>
    </>)}
}

export default WriteReviewModal;