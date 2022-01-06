
import Overview from "../client/components/Overview.jsx";
import DefaultView from "../client/components/Overview/DefaultView";
import renderer from 'react-test-renderer';
import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
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
        const mockFunction = jest.fn();
        const overview = shallow(<DefaultView 
            results={styles.results} 
            currStyle={0} 
            currPhotoIndex={0} 
            photos={photos}
            reviewMetaData={reviewMetadata}
            productOverview={products}
            arrowClick={mockFunction}
            updateStyle={mockFunction}
            zoom={mockFunction}
            toggleHide={mockFunction}
            hide={false}
            />);
        console.log(overview);
        overview.find('#mainIma').simulate('click');
        expect(mockFunction).toHaveBeenCalled();
    }) 


});