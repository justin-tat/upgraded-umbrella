
import Overview from "../client/components/Overview.jsx";
import DefaultView from "../client/components/Overview/DefaultView";
import renderer from 'react-test-renderer';
import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import exampleData from '../client/exampleData/OverviewData.js';


Enzyme.configure({adapter: new Adapter()});

const products = exampleData.overviewProducts;
const styles = exampleData.styles;
const reviewMetadata = exampleData.reviewMetadata; 
const photos = exampleData.styles.results[0].photos;

describe('Overview Component', () => {
    test('It should create an overview section', () => {
        const overview = renderer.create(<Overview/>);
        var tree = overview.toJSON();
        expect(tree.props.id).toEqual('overview');
    });
    test('It should render the default view initially', () => {
        const overview = renderer.create(<Overview/>);
        var tree = overview.toJSON();
        expect(tree.children[0].props.id).toEqual('defaultView');

    });
    test('It should not render the expandedView initialy', () => {
        const overview = renderer.create(<Overview/>);
        var tree = overview.toJSON();
        expect(tree.children[1].props).toEqual({});
        expect(tree.children[1].children).toEqual(null);
    })
    test('It should render the productFeatures component', () => {
        const overview = renderer.create(<Overview/>);
        var tree = overview.toJSON();
        expect(tree.children[2].props.id).toEqual('productFeatures');
    });
        
});

describe('Default View Component', () => {
    
    test('It should not display a left arrow to begin with', () => {
        const overview = renderer.create(<Overview/>);
        var tree = overview.toJSON();
        var defaultView = tree.children[0];
        expect(defaultView.children[0].props).toEqual({});
        expect(defaultView.children[0].children).toEqual(null);
    });
    test('It should display a right arrow to begin with', () => {
        const overview = renderer.create(<Overview/>);
        var tree = overview.toJSON();
        var defaultView = tree.children[0];
        expect(defaultView.children[2].props).toEqual({});
        expect(defaultView.children[2].children[0]).toEqual(" ");
    });
    test('should be able to click on the default view image', () => {
        const targetFunction = jest.fn();
        const mockFunction = jest.fn();
        const overview = shallow(
        <DefaultView 
            results={styles.results} 
            currStyle={0} 
            currPhotoIndex={0} 
            photos={photos}
            reviewMetaData={reviewMetadata}
            productOverview={products}
            arrowClick={mockFunction}
            updateStyle={mockFunction}
            zoom={targetFunction}
            toggleHide={mockFunction}
            hide={false}
        />);
        overview.find('#mainImage').simulate('click');
        expect(targetFunction).toHaveBeenCalled();
        expect(mockFunction).not.toHaveBeenCalled();
    });
    test('should be able to click on the right arrow to advance the photo displayed', () => {
        const overview = mount(<Overview/>);
        expect(overview.state().currPhotoIndex).toEqual(0);
        overview.find("#rightArrow").simulate('click');
        expect(overview.state().currPhotoIndex).toEqual(1);
        overview.find("#rightArrow").simulate('click');
        expect(overview.state().currPhotoIndex).toEqual(2);
        overview.unmount();
    });
    test('Should be able to click on the left arrow to decrement the photo displayed', () => {
        const overview = mount(<Overview/>);
        overview.find("#rightArrow").simulate('click');
        overview.find("#rightArrow").simulate('click');
        expect(overview.state().currPhotoIndex).toEqual(2);
        overview.find("#leftArrow").simulate('click');
        expect(overview.state().currPhotoIndex).toEqual(1);
        overview.unmount();
    });
    test('Should be able to click on the down arrow to advance the photo displayed', () => {
        const overview = mount(<Overview/>);
        overview.find("#downPhotoArrow").simulate('click');
        overview.find("#downPhotoArrow").simulate('click');
        expect(overview.state().currPhotoIndex).toEqual(2);
        overview.unmount();
    });
    test('Should be able to click on the up photo arrow to decrement the photo displayed', () => {
        const overview = mount(<Overview/>);
        overview.find("#downPhotoArrow").simulate('click');
        overview.find("#downPhotoArrow").simulate('click');
        expect(overview.state().currPhotoIndex).toEqual(2);
        overview.find("#upPhotoArrow").simulate('click');
        expect(overview.state().currPhotoIndex).toEqual(1);
        overview.unmount();
    })
    test('Should be able to change to the ExpandedView after clicking on the photo displayed', () => {
        const overview = mount(<Overview/>);
        overview.find("#mainImage").simulate('click');
        expect(overview.state().zoom).toEqual('expanded');
        overview.unmount();

    });
});

describe('Expanded View Component', () => {
    let overview;

    beforeEach(() => {
        overview = mount(<Overview/>);
        overview.find("#mainImage").simulate('click');
    });
    afterEach(() => {
        overview.unmount();
    });

    test('It should have a button to revert the view to the default state', () => {
        expect(overview.state().zoom).toEqual('expanded');
        overview.find(".revertToExpanded").simulate('click');
        expect(overview.state().zoom).toEqual('default');
    })
    test('It should have a button to advance the photo indicated', () => {
        expect(overview.state().currPhotoIndex).toEqual(0);
        overview.find("#expandedRightArrow").simulate('click');
        expect(overview.state().currPhotoIndex).toEqual(1);
    });
    test('It should have a button to decrement the photo indicated', () => {
        expect(overview.state().currPhotoIndex).toEqual(0);
        overview.find("#expandedRightArrow").simulate('click');
        expect(overview.state().currPhotoIndex).toEqual(1);
        overview.find("#expandedLeftArrow").simulate('click');
        expect(overview.state().currPhotoIndex).toEqual(0);
    });
    test('Upon clicking the expanded image, it should enter the zoomedIn view', () => {
        expect(overview.state().zoomedIn).toEqual(false);
        overview.find('#expandedImg').simulate('click');
        expect(overview.state().zoomedIn).toEqual(true);
    });
});

describe('Zoomed In View', () => {
    let overview;
    beforeEach(() => {
        overview = mount(<Overview/>);
        overview.find('#mainImage').simulate('click');
        overview.find('#expandedImg').simulate('click');
    });

    afterEach(() => {
        overview.unmount();
    });

    test('Should allow to revert back to the default view by clicking on a marker', () => {
        expect(overview.state().zoomedIn).toEqual(true);
        overview.find(".revertToExpanded").simulate('click');
        expect(overview.state().zoomedIn).toEqual(false);
        expect(overview.state().zoom).toEqual('default');
    });

    test('Should change the cursor to a magnifying glass when hovering over the image', () => {
        const cursorStyle = overview.find('#zoomedInImage').get(0).props.style;
        console.log(cursorStyle);
    });
})