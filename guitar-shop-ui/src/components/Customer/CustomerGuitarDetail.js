import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";

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

const adminButtonStyle = {
    padding: "5px 15px",
    color: "#2c2c36",
    border: "1px solid #2c2c36",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
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

function CustomerGuitarDetail() {
    const navigate = useNavigate();
    const {guitarId} = useParams();
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

    const openCart = () => {
        navigate("/api/v1/cart");
    };

    const buyNow = () => {
        navigate(`/api/v1/order/${guitarId}`);
    };


    return (
        <div>
            <div style={{display: "flex", justifyContent: "flex-end", alignItems: "flex-start"}}>
                <button style={adminButtonStyle} onClick={openCart}>Cart</button>
            </div>

            <h1 style={{marginBottom: "50px", textAlign: "center"}}>Guitar Detail</h1>
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
                    <div style={buttonContainer}>
                        <button onClick={addToCart} style={buttonStyle}>Add to Cart</button>
                        <button onClick={buyNow} style={buttonStyle}>Buy Now</button>
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

export default CustomerGuitarDetail;