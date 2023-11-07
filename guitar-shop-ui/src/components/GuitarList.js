import React from "react";
import {Guitar} from "./Guitar";

export function GuitarList({guitars = []}) {
    return (
        <React.Fragment>
            <h5 className="flex-grow-0"><b>상품 목록</b></h5>
            <ul className="list-group products">
                {guitars.map(v =>
                    <li key={v.guitarId} className="list-group-item d-flex mt-3">
                        <Guitar {...v}/>
                    </li>
                )}
            </ul>
        </React.Fragment>
    )
}