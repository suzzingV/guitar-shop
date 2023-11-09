import React from "react";
import {useNavigate} from "react-router-dom";

const containerStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0 0 5px #ddd",
    backgroundColor: "#f5f5f5",
};

const buttonContainer = {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
};

const buttonStyle = {
    padding: "15px 30px",
    margin: "0 10px",
    fontSize: "18px",
    background: "#333",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
};

const Welcome = () => {
    const navigate = useNavigate();

    const openAdminMode = () => {
        navigate("/api/v1/admin/login");
    };

    const openGuitarShop = () => {
        navigate("/api/v1/guitars");
    }

    return (
        <div>
            <h1 style={{textAlign: "center", marginBottom: "30px"}}>Welcome to Guitar Shop</h1>

            <div style={buttonContainer}>
                <button onClick={openAdminMode} style={buttonStyle}>Administrator Mode</button>
                <button onClick={openGuitarShop} style={buttonStyle}>Go to Guitar Shop</button>
            </div>
        </div>
    );
}

export default Welcome;