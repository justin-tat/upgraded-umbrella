import React from 'react';
import axios from 'axios';
import StyleList from './StyleList.jsx';
import CartSpecifics from './CartSpecifics.jsx';
import AddToCart from './AddToCart.jsx';

class StyleInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            salePrice: 0,
            hasSale: false,
            originalPrice: 0,
            styleRows: this.parseStyles(),
            availableSizes: this.parseAvailableSizes(),
            size: '',
            quantity: [],
            cart: [],
            skuSelected: '',
            favorited: false
        }
        this.updateSize = this.updateSize.bind(this);
        this.getQuantityBySize = this.getQuantityBySize.bind(this);
        this.updateCart = this.updateCart.bind(this);
        this.toggleFavorite = this.toggleFavorite.bind(this);
        this.getFromCart = this.getFromCart.bind(this);
        this.postToCart = this.postToCart.bind(this);
    }

    //Calling componentDidMount 

    //s3, cloudfront optimize how fast data can be downloaded from s3
    componentDidMount() {
        this.getPrice();
        this.getFromCart();
    }

    componentDidUpdate(prevProps) {
        if(this.props.style !== prevProps.style) {
            this.setState({
                size: '',
                quantity: [],
                skuSelected: '',
                salePrice: 0,
                hasSale: false,
                originalPrice: 0,
            }, () => {
                this.getPrice();
                this.setState({
                    availableSizes: this.parseAvailableSizes(),
                    styleRows: this.parseStyles()
                });
            });
        }
        
    }

    updateCart() {
        if(this.state.skuSelected === '') {
            alert('You need to choose a size!');
        } else {
            this.postToCart(this.state.skuSelected)
            .then(() => {
                this.getFromCart(this.state.skuSelected);
            });
            alert('Trying to purchase ' + this.state.skuSelected);
        }
        
    }

    //Change to baseURL: 'http://100.24.25.169',
    getFromCart() {
        return axios({
            baseURL: 'http://localhost:3000',
            url: '/cart',
            method: 'get',
        }).then(result => {
            var printString = "";
            for(var i = 0; i < result.data.length; i++) {
                var temp = "SKU Number: " + String(result.data[i].sku_id) + " \n\t Quantity: " + String(result.data[i].count) + "\n"
                printString += temp;
            }
            console.log('Successfully got items from cart: \n', printString);
        })
        .catch(err => {
            console.log('Failed inside of productOverview of client side code');
        });
    }

    postToCart(skuID) {
        var sizeSelector = document.getElementById('quantitySelector');
        var numItems = parseInt(sizeSelector.options[sizeSelector.selectedIndex].value)
        skuID = parseInt(skuID);
        return axios({
            baseURL: 'http://localhost:3000',
            url: '/postToCart',
            method: 'post',
            params: {skuID: skuID, numItems: numItems}
        })


    }


    parseAvailableSizes() {
        var availableSizes = [];
        for (var [key, value] of Object.entries(this.props.styles[this.props.currStyle].skus)) {
            if(value.quantity !== 0) {
                availableSizes[value.size] = value.quantity;
            }
        }
        return availableSizes;
    }

    toggleFavorite() {
        this.setState({
            favorited: !this.state.favorited
        }, () => {
            this.props.addToCarousel({
                productID: this.props.productId,
                status: this.state.favorited === true ? "favorited" : "unfavorited"
            });
        })

    }

    //Sets the size variable and calls getQuantityBySize as a callback to ensure state is set before execution
    updateSize(event) {
        event.preventDefault();
        this.setState({
            size: event.target.value
        }, this.getQuantityBySize);
    }

    //Finds quantity based off of state.size. availableSizes contains keys of sizes with values of quantities
    getQuantityBySize() {
        var max = Math.min(this.state.availableSizes[this.state.size], 15);
        var quantityArr = [];
        var currSKU = '';
        for (var i = 1; i <= max; i++) {
            quantityArr.push(i);
        }
        for ( var[key, value] of Object.entries(this.props.styles[this.props.currStyle].skus)) {
            if (value.size === this.state.size) {
                currSKU = key;
            }
        }
        this.setState({
            quantity: quantityArr,
            skuSelected: currSKU
        });
    }

    //returns array of arrays. Each nested array contains 4 style URLs (per specs)
    parseStyles() {
        var allStyleRows = [];
        var currStyleRow = [];
        for(var i = 0; i < this.props.styles.length; i++) {
            currStyleRow.push(this.props.styles[i].photos[0]);
            if (currStyleRow.length === 4) {
                allStyleRows.push(currStyleRow);
                currStyleRow = [];
            }
        }
        if (currStyleRow.length !== 0) {
            allStyleRows.push(currStyleRow);
        }
        return allStyleRows;
    } 

    //sale_price is equal to null when there is no sale. hasSale is used in render method
    getPrice() {
        if (this.props.style.sale_price !== null) {
            this.setState({
                salePrice: this.props.style.sale_price,
                hasSale: true
            });
        }
        this.setState({
            originalPrice: this.props.style.original_price
        });
    }

    render() {
        return(
            <div id="productDescription">
                <br></br>
                <div>{this.props.productOverview.category}</div>
                <div>{this.props.productOverview.name}</div>
                { this.state.hasSale === true 
                    ? <div id="sale"> 
                        <div id="salePrice" className="price"> {this.state.originalPrice}</div><div className="price">{this.state.salePrice}</div>
                    </div>
                    : <div>
                        <div className="price"> {this.state.originalPrice} </div>
                    </div>
                }
                <div id="styleMarker"> 
                    <div> STYLE: </div> <div> {this.props.style.name} </div>
                </div>
                <StyleList styles={this.state.styleRows} updateStyle={this.props.updateStyle} currStyle={this.props.currStyle}/>
                <CartSpecifics availableSizes={this.state.availableSizes} updateSize={this.updateSize} size={this.state.size} quantity={this.state.quantity}/>
                <AddToCart 
                    updateCart={this.updateCart} 
                    addToCarousel={this.props.addToCarousel} 
                    toggleFavorite={this.toggleFavorite} 
                    favorited={this.state.favorited} 
                />
                    
            </div>
        )
    }
}

export default StyleInfo;