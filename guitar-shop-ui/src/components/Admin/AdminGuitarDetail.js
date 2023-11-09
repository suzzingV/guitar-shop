import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

const guitarDetailContainer = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0 0 5px #ddd",
    backgroundColor: "#f5f5f5",
};

const guitarInfoStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
};

const imageStyle = {
    marginRight: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
};

const companyStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "0px",
    marginTop: "0px",
};

const nameStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    marginTop: "10px",
    marginBottom: "80px",
};

const priceContainer = {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
};

const originalPriceStyle = {
    fontSize: "18px",
    textDecoration: "line-through",
    marginRight: "10px",
    color: "#888", // 회색
};

const priceStyle = {
    fontSize: "23px",
    color: "#2c2c36", // 빨간색
};

const backButtonStyle = {
    display: "block",
    fontSize: "18px",
    textAlign: "center",
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    textDecoration: "none",
};

function AdminGuitarDetail() {
    const {guitarId} = useParams();
    const [guitar, setGuitar] = useState({});

    useEffect(() => {
        axios.get(`/api/v1/guitars/${guitarId}`)
            .then((response) => {
                setGuitar(response.data);
            })
            .catch((error) => console.error(error));
    }, [guitarId]);

    return (
        <div>
            <h1 style={{textAlign: "center", marginBottom: "50px"}}>Guitar Detail</h1>
            <div style={guitarInfoStyle}>
                <img src={guitar.image} alt={guitar.name} width="300" height="300" style={imageStyle}/>
                <div>
                    <p style={companyStyle}>{guitar.company}</p>
                    <p style={nameStyle}>{guitar.name}</p>
                    {guitar.priceOfSale > 0 && (
                        <div style={priceContainer}>
                            <span style={originalPriceStyle}>{guitar.price.toLocaleString()} ₩</span>
                            <span style={priceStyle}>{(guitar.price - guitar.priceOfSale).toLocaleString()} ₩</span>
                        </div>
                    )}
                    {guitar.priceOfSale <= 0 && (
                        <p style={priceStyle}>{guitar.price.toLocaleString()} ₩</p>
                    )}
                </div>
            </div>
            <p><strong>Country:</strong> {guitar.country}</p>
            <p><strong>Manufacture Date:</strong> {guitar.manufactureDate}</p>
            <p><strong></strong> {guitar.description}</p>
            <Link to="/api/v1/admin" style={backButtonStyle}>Back to list</Link>
        </div>
    );
}

export default AdminGuitarDetail;