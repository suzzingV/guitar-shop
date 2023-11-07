import React from "react";

export function Guitar(props) {
    const guitarId = props.guitarId;
    const name = props.name;
    const price = props.price;
    return (
        <>
            <div className="col-2"><img className="img-fluid" src="https://i.imgur.com/HKOFQYa.jpeg" alt=""/></div>
            <div className=" col">
                <div className=" row">{name}</div>
            </div>
            <div className="col text-center price">{price}원</div>
        </>
    )
}