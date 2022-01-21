import React from 'react';

var RatingBreakdown = (props) => {
  return(<>
    <div className='rating-breakdown'>
      {
        console.log(typeof props.ratingBreakDown[5])
      }
      <label htmlFor='5-stars'>5 stars</label>
      <meter
        className='rating-breakdown-bar'
        id='5-stars'
        value={String (props.ratingBreakDown[5])}
        min='0'
        max={String (props.numReviews)}>
      </meter>
    </div>
    <div className='rating-breakdown'>
      <label htmlFor='4-stars'>4 stars</label>
      <meter
        className='rating-breakdown-bar'
        id='4-stars'
        value={String (props.ratingBreakDown[4])}
        min='0'
        max={String (props.numReviews)}>
      </meter>
    </div>
    <div className='rating-breakdown'>
      <label htmlFor='3-stars'>3 stars</label>
      <meter
        className='rating-breakdown-bar'
        id='3-stars'
        value={String (props.ratingBreakDown[3])}
        min='0'
        max={String (props.numReviews)}>
      </meter>
    </div>
    <div className='rating-breakdown'>
      <label htmlFor='2-stars'>2 stars</label>
      <meter
        className='rating-breakdown-bar'
        id='2-stars'
        value={String (props.ratingBreakDown[2])}
        min='0'
        max={String (props.numReviews)}>
      </meter>
    </div>
    <div className='rating-breakdown'>
      <label htmlFor='1-stars'>1 stars</label>
      <meter
        className='rating-breakdown-bar'
        id='1-stars'
        value={String (props.ratingBreakDown[1])}
        min='0'
        max={String (props.numReviews)}>
      </meter>
    </div>
  </>)}

export default RatingBreakdown;