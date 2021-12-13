import Overview from "../client/components/Overview.jsx";
import renderer from 'react-test-renderer';
import React from 'react';

test('It should be able to set state on mouse enter and mouse leave', () => {
    const overview = renderer.create(<Overview />);
    let tree = overview.toJSON();
    expect(tree.props.className).toEqual('normal');
    tree.children[0].props.onMouseEnter();
    tree = overview.toJSON();
    expect(tree.props.className).toEqual('hovered');
    tree.children[0].props.onMouseLeave();
    tree = overview.toJSON();
    expect(tree.props.className).toEqual("normal");
});