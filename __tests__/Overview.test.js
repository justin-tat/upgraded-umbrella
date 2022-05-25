
import Overview from "../client/components/Overview.jsx";
import DefaultView from "../client/components/Overview/DefaultView";
import ProductInfo from "../client/components/Overview/ProductInfo";
import renderer from 'react-test-renderer';
import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import exampleData from '../client/exampleData/OverviewData.js';
//import { expect } from "chai";


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
        expect(tree.children[1].props.id).toEqual('defaultView');

    });
    test('It should not render the expandedView initialy', () => {
        const overview = renderer.create(<Overview/>);
        var tree = overview.toJSON();
        expect(tree.children[1].props).toEqual({"id": "defaultView"});
    })
    test('It should render the productFeatures component', () => {
        const overview = renderer.create(<Overview/>);
        var tree = overview.toJSON();
        expect(tree.children[3].props.id).toEqual('productFeatures');
    });
        
});

// describe('Default View Component', () => {
//     let overview;

//     beforeEach(() => {
//         overview = mount(<Overview/>);
//     });

//     afterEach(() => {
//         overview.unmount();
//     })
    
//     test('It should not display a left arrow to begin with', () => {
//         expect(overview.exists('#leftArrow')).toEqual(false);
//     });
//     test('It should display a right arrow to begin with', () => {
//         expect(overview.exists('#rightArrow')).toEqual(true);
//     });
//     test('should be able to click on the default view image', () => {
//         const targetFunction = jest.fn();
//         const mockFunction = jest.fn();
//         const defaultview = shallow(
//         <DefaultView 
//             results={styles.results} 
//             currStyle={0} 
//             currPhotoIndex={0} 
//             photos={photos}
//             reviewMetaData={reviewMetadata}
//             productOverview={products}
//             arrowClick={mockFunction}
//             updateStyle={mockFunction}
//             zoom={targetFunction}
//             toggleHide={mockFunction}
//             hide={false}
//         />);
//         defaultview.find('#mainImage').simulate('click');
//         expect(targetFunction).toHaveBeenCalled();
//         expect(mockFunction).not.toHaveBeenCalled();
//     });
//     test('should be able to click on the right arrow to advance the photo displayed', () => {
//         expect(overview.state().currPhotoIndex).toEqual(0);
//         overview.find("#rightArrow").simulate('click');
//         expect(overview.state().currPhotoIndex).toEqual(1);
//         overview.find("#rightArrow").simulate('click');
//         expect(overview.state().currPhotoIndex).toEqual(2);
//     });
//     test('Should be able to click on the left arrow to decrement the photo displayed', () => {
//         expect(overview.state().currPhotoIndex).toEqual(0);
//         overview.find("#rightArrow").simulate('click');
//         overview.find("#rightArrow").simulate('click');
//         expect(overview.state().currPhotoIndex).toEqual(2);
//         overview.find("#leftArrow").simulate('click');
//         expect(overview.state().currPhotoIndex).toEqual(1);
//     });
//     test('Should be able to click on the down arrow to advance the photo displayed', () => {
//         overview.find("#downPhotoArrow").simulate('click');
//         overview.find("#downPhotoArrow").simulate('click');
//         expect(overview.state().currPhotoIndex).toEqual(2);
//     });
//     test('Should be able to click on the up photo arrow to decrement the photo displayed', () => {
//         overview.find("#downPhotoArrow").simulate('click');
//         overview.find("#downPhotoArrow").simulate('click');
//         expect(overview.state().currPhotoIndex).toEqual(2);
//         overview.find("#upPhotoArrow").simulate('click');
//         expect(overview.state().currPhotoIndex).toEqual(1);
//     })
//     test('Should be able to change to the ExpandedView after clicking on the photo displayed', () => {
//         overview.find("#mainImage").simulate('click');
//         expect(overview.state().zoom).toEqual('expanded');

//     });
// });

describe('Expanded View Component', () => {
    let overview;

    beforeEach(() => {
        var mockFn = jest.fn();
        overview = mount(<Overview productId={59553} appAddToCarousel={mockFn}/>);
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
    //test('It should have a button to advance the photo indicated', () => {
        
    //     // expect(overview.state().currPhotoIndex).toEqual(0);
        
    //     // overview.find("#expandedRightArrow").simulate('click');
    //     // console.log('Am I even getting here? ', overview.state);
    //     // expect(overview.state().currPhotoIndex).toEqual(1);
    //     overview.find('#expandedRightArrow').simulate('click');
    //     expect(overview.state().currPhotoIndex).toEqual(1);
    // });
    // test('It should have a button to decrement the photo indicated', () => {
    //     expect(overview.state().currPhotoIndex).toEqual(0);
    //     overview.find("#expandedRightArrow").simulate('click');
    //     expect(overview.state().currPhotoIndex).toEqual(1);
    //     overview.find("#expandedLeftArrow").simulate('click');
    //     expect(overview.state().currPhotoIndex).toEqual(0);
    // });
    test('Upon clicking the expanded image, it should enter the zoomedIn view', () => {
        expect(overview.state().zoomedIn).toEqual(false);
        overview.find('#expandedImg').simulate('click')
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

    test('Should allow one to revert back to the expanded view by clicking on the image', () => {
        expect(overview.state().zoomedIn).toEqual(true);
        overview.find("#zoomedInImage").simulate('click');
        expect(overview.state().zoomedIn).toEqual(false);
    });
});

describe('Product Features', () => {

    let productInfo;
    let mockFn;
    let altRating = { 
        ratings: {
            "1": "0",
            "2": "0",
            "3": "0",
            "4": "0",
            "5": "10"
        }
    }
    

    beforeEach(() => {
        mockFn = jest.fn();
        productInfo = mount(<ProductInfo
        results={styles.results}
        ratings={reviewMetadata}
        productOverview={products}
        currStyle={0}
        updateStyle={mockFn}
        />);
    });

    afterEach(() => {
        productInfo.unmount();
    });

    test('The number of stars displayed should change dynamically', () => {
        var stars = productInfo.find(".indStar");
        expect(stars.at(0).props().src).toEqual("./img/filledStar.png");
        expect(stars.at(1).props().src).toEqual("./img/filledStar.png");
        expect(stars.at(2).props().src).toEqual("./img/filledStar.png");
        expect(stars.at(3).props().src).toEqual("./img/threeQuarterStar.png");

        productInfo.unmount();
        productInfo = mount(<ProductInfo
            results={styles.results}
            ratings={altRating}
            productOverview={products}
            currStyle={0}
            updateStyle={mockFn} 
        />);
        stars = productInfo.find(".indStar");

        expect(stars.at(0).props().src).toEqual("./img/filledStar.png");
        expect(stars.at(1).props().src).toEqual("./img/filledStar.png");
        expect(stars.at(2).props().src).toEqual("./img/filledStar.png");
        expect(stars.at(3).props().src).toEqual("./img/filledStar.png");
        expect(stars.at(4).props().src).toEqual("./img/filledStar.png");
    });

    test("The price displayed should change with the style inputted if that style has a sale price", () => {
        let overview = mount(<Overview/>);
        expect(overview.find(".price").text()).toEqual(" 140.00 ");
        expect(overview.state())
        expect(overview.exists("#salePrice")).toEqual(false);

        //Testing sale price renders
        overview.find(".styleOption").at(2).simulate("click");
        expect(overview.find(".price").at(0).text()).toEqual(" 140.00");
        expect(overview.find(".price").at(1).text()).toEqual("100.00");
        expect(overview.exists("#salePrice")).toEqual(true);

        //Testing normal price re-renders
        overview.find(".styleOption").at(1).simulate("click");
        expect(overview.find(".price").text()).toEqual(" 140.00 ");
        expect(overview.exists("#salePrice")).toEqual(false);
        overview.unmount();
    });

    test("The text of the style displayed should change with the style selected", () => {
        let overview = mount(<Overview/>);
        expect(overview.find("#styleMarker").childAt(2).text()).toEqual(" Forest Green & Black ");
        overview.find(".styleOption").at(1).simulate("click");
        expect(overview.find("#styleMarker").childAt(2).text()).toEqual(" Desert Brown & Tan ");
        overview.unmount();
    });

});



