import Reviews from "../client/components/Reviews.jsx";
import renderer from 'react-test-renderer';
import React from 'react';

test('It should create a Reviews & Ratings section', () => {
  const reviews = renderer.create(<Reviews />);
  let tree = reviews.toJSON();
  expect(tree[0].children[0]).toEqual('Ratings & Reviews');
});