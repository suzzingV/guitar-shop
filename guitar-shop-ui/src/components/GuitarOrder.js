import React, { useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const formContainer = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0 0 5px #ddd",
    backgroundColor: "#f5f5f5",
};

const formStyle = {
    display: "flex",
    flexDirection: "column",
};

const inputStyle = {
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
};

const buttonStyle = {
    padding: "10px",
    background: "#333",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
};

const errorStyle = {
    color: "red",
};

const backButtonStyle = {
    marginTop: "10px",
    display: "block",
    textAlign: "center",
    color: "#333",
    textDecoration: "none",
};

function GuitarOrder() {
    const [order, setOrder] = useState({
        customerId: "",
        password: "",
        name: "",
        phoneNum: "",
        address: "",
        paymentMethod: "",
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isRegistrationComplete, setRegistrationComplete] = useState(false);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrder({
            ...order,
            [name]: value,
        });
    };

    const handleOrder = (e) => {
        e.preventDefault();
        // 유효성 검사를 수행
        if (order.name.trim() === "" || order.customerId.trim() === "" || order.password.trim() === ""
            || order.phoneNum.trim() === "" || order.address.trim() === "" || order.paymentMethod.trim() === "") {
            setError("모든 필수 필드를 입력하세요.");
        } else {
            axios.post(`/api/v1/order`, order)
                .then((response) => {
                    console.log("주문");
                    navigate("/api/v1/guitars");
                })
                .catch((error) => {
                    if (error.response) {
                        console.log("에러 메시지: " + error.response.data);
                        setError(error.response.data);
                    } else {
                        setError("주문 중 오류 발생");
                    }
                    console.error(error);
                });
        }
    };

    return (
        <div>
            <h1>Order</h1>
            <form style={formStyle}>
                <input
                    type="text"
                    name="customerId"
                    placeholder="Custmer Id"
                    value={order.customerId}
                    onChange={handleInputChange}
                    style={inputStyle}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={order.name}
                    onChange={handleInputChange}
                    style={inputStyle}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={order.address}
                    onChange={handleInputChange}
                    style={inputStyle}
                />
                <input
                    type="text"
                    name="password"
                    placeholder="Password"
                    value={order.password}
                    onChange={handleInputChange}
                    style={inputStyle}
                />
                <input
                    type="text"
                    name="phoneNum"
                    placeholder="Phone number"
                    value={order.phoneNum}
                    onChange={handleInputChange}
                    style={inputStyle}
                />
                <input
                    type="text"
                    name="paymentMethod"
                    placeholder="Payment Method"
                    value={order.paymentMethod}
                    onChange={handleInputChange}
                    style={inputStyle}
                />


                <button onClick={handleOrder} style={buttonStyle}>
                    Pay
                </button>

                {error && <div style={errorStyle}>{error}</div>}

                {isRegistrationComplete && (
                    <div className="popup">
                        결제가 완료되었습니다.
                    </div>
                )}

                <Link style={backButtonStyle} to="/api/v1/guitars">Back to list</Link>
            </form>
        </div>
    );
}

export default GuitarOrder;