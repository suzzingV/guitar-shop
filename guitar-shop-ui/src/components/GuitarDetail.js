import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

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

const buttonContainer = {
    display: "flex",
    justifyContent: "left",
    marginTop: "24px", // 버튼과 가격 사이에 간격을 추가합니다.
};

const buttonStyle = {
    fontSize: "18px",
    padding: "10px 20px",
    margin: "0 10px",
    border: "1px solid #2c2c36",
    borderRadius: "5px",
    textDecoration: "none",
    color: "#2c2c36",
};

function GuitarDetail() {
    const { guitarId } = useParams();
    const [guitar, setGuitar] = useState({});

    useEffect(() => {
        axios.get(`/api/v1/guitars/${guitarId}`)
            .then((response) => {
                setGuitar(response.data);
            })
            .catch((error) => console.error(error));
    }, [guitarId]);

    const addToCart = () => {
        axios.post(`/api/v1/cart/${guitarId}`)
            .then((response) => {
                const shouldRedirect = window.confirm(response.data);
                if (shouldRedirect) {
                    window.location.href = "/api/v1/cart";
                }
            })
            .catch((error) => console.error(error));
    };


    return (
        <div style={guitarDetailContainer}>
            <h1 style={{ textAlign: "center" }}>Guitar Detail</h1>
            <div style={guitarInfoStyle}>
                <img src={guitar.image} alt={guitar.name} width="300" height="300" style={imageStyle} />
                <div>
                    <p style={companyStyle}>{guitar.company}</p>
                    <p style={nameStyle}>{guitar.name}</p>
                    {guitar.priceOfSale > 0 && (
                        <div style={priceContainer}>
                            <span style={originalPriceStyle}>{guitar.price}원</span>
                            <span style={priceStyle}>{guitar.price - guitar.priceOfSale}원</span>
                        </div>
                    )}
                    {guitar.priceOfSale <= 0 && (
                        <p style={priceStyle}>{guitar.price}원</p>
                    )}
                    <div style={buttonContainer}>
                        <button onClick={addToCart} style={buttonStyle}>Add to Cart</button>
                        <a href="#" style={buttonStyle}>Buy Now</a>
                    </div>
                </div>
            </div>
            <p><strong>Country:</strong> {guitar.country}</p>
            <p><strong>Manufacture Date:</strong> {guitar.manufactureDate}</p>
            <p><strong></strong> {guitar.description}</p>
            <Link to="/api/v1/guitars" style={backButtonStyle}>Back to list</Link>
        </div>
    );
}

export default GuitarDetail;