
import React from 'react';
import renderer from 'react-test-renderer';

import Comparison from '../client/components/Comparison.jsx';
import ComparisonModal from '../client/components/Comparison/ComparisonModal.jsx';
import Outfit from '../client/components/Comparison/Outfit.jsx';
import Price from '../client/components/Comparison/Price.jsx';
import Ratings from '../client/components/Comparison/Ratings.jsx';
import Related from '../client/components/Comparison/Related.jsx';
import exampleData from '../client/exampleData/OverviewData.js';

describe('Comparison Component', () => {
  const comparison = renderer.create(<Comparison/>);
  var tree = comparison.toJSON();

  test('It should create a Related Products section', () => {
    expect(tree.props.id).toEqual('comparison');
  });

  test('It should render the Related Products carousel', () => {
    expect(tree.children[1].props.id).toEqual('related');
  });

  test('It should render the Your Outfit carousel', () => {
    expect(tree.children[3].props.id).toEqual('outfit');
  });
})

