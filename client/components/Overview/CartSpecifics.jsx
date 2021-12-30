import React from 'react';

var CartSpecifics = (props) => {
    return(
    <div id="cartSpecifics">
        {
            Object.keys(props.availableSizes).length === 0
                ? <select id="sizeSelector" disabled>
                    <option value=""> OUT OF STOCK </option>
                </select>
                : <select id="sizeSelector" onChange={props.updateSize}>
                    <option>SELECT SIZE</option>
                    {Object.entries(props.availableSizes).map(([key, value]) => {
                        return <option value={key} key={key}> {key} </option>
                    })}
                </select>
        }
        {
            props.size === ''
                ? <select id="quantitySelector" disabled>
                    <option> - </option>
                </select>
                : <select id="quantitySelector">
                    {
                        props.quantity.map(val => {
                            return <option value={val} key={val}> {val} </option>
                        })
                    }
                </select>
        }
    </div>)
}

export default CartSpecifics;