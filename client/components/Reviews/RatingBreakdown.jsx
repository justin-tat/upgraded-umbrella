import React from 'react';

var RatingBreakdown = (props) => {
  return(<>
    <div className='rating-breakdown'>
      <label htmlFor='5-stars'>5 stars</label>
      <meter
        className='rating-breakdown-bar'
        id='5-stars'
        value={(props.reviewsMeta !== null) ? String (props.reviewsMeta.ratings[5]) : '0'}
        min='0'
        max={(props.reviewsMeta !== null) ? String (props.numReviews) : '10'}>
      </meter>
    </div>
    <div className='rating-breakdown'>
      <label htmlFor='4-stars'>4 stars</label>
      <meter
        className='rating-breakdown-bar'
        id='4-stars'
        value={(props.reviewsMeta !== null) ? String (props.reviewsMeta.ratings[4]) : '0'}
        min='0'
        max={(props.reviewsMeta !== null) ? String (props.numReviews) : '10'}>
      </meter>
    </div>
    <div className='rating-breakdown'>
      <label htmlFor='3-stars'>3 stars</label>
      <meter
        className='rating-breakdown-bar'
        id='3-stars'
        value={(props.reviewsMeta !== null) ? String (props.reviewsMeta.ratings[3]) : '0'}
        min='0'
        max={(props.reviewsMeta !== null) ? String (props.numReviews) : '10'}>
      </meter>
    </div>
    <div className='rating-breakdown'>
      <label htmlFor='2-stars'>2 stars</label>
      <meter
        className='rating-breakdown-bar'
        id='2-stars'
        value={(props.reviewsMeta !== null) ? String (props.reviewsMeta.ratings[2]) : '0'}
        min='0'
        max={(props.reviewsMeta !== null) ? String (props.numReviews) : '10'}>
      </meter>
    </div>
    <div className='rating-breakdown'>
      <label htmlFor='1-stars'>1 stars</label>
      <meter
        className='rating-breakdown-bar'
        id='1-stars'
        value={(props.reviewsMeta !== null) ? String (props.reviewsMeta.ratings[1]) : '0'}
        min='0'
        max={(props.reviewsMeta !== null) ? String (props.numReviews) : '10'}>
      </meter>
    </div>
  </>)}

export default RatingBreakdown;