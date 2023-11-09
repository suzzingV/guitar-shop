import React, { useState } from "react";
import axios from "axios";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import CompanyList from "./CompanyList";
import GuitarDetail from "./GuitarDetail";
import AdminGuitarList from "./AdminGuitarList";

const containerStyle = {
    maxWidth: "400px",
    // Add more styles like margin, padding, background color, etc.
};

const formStyle = {
    display: "flex",
    flexDirection: "column",
    marginTop: "40px",
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
    fontWeight: "bold",
};

const errorStyle = {
    color: "red",
};

const backButtonStyle = {
    marginTop: "10px",
    display: "block",
    textAlign: "center",
    color: "#333",
    textDecoration: "underline",
};

function AdministratorLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id : "",
        password: "",
    });

    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Axios를 사용하여 로그인 요청을 서버로 보냄
            const response = await axios.post("/api/v1/admin/login", formData);

            console.log("response 받음");
            if (response.data) {
                // 로그인 성공
                console.log("로그인 성공");
                navigate("/api/v1/admin")
            } else {
                // 로그인 실패
                setError("로그인 실패");
                window.alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요."); // 경고창 표시
            }
        } catch (error) {
            console.error("로그인 중 오류 발생:", error);
            setError("로그인 중 오류 발생");
        }
    }

    return (
        <div style={{ ...containerStyle, margin: "0 auto" }}>
            <h1 style={{ textAlign: "center" }}>Administrator Login</h1>
            <form style={formStyle}>
                <input
                    type="id"
                    name="id"
                    placeholder="ID"
                    value={formData.id}
                    onChange={handleInputChange}
                    style={inputStyle}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    style={inputStyle}
                />
                <button onClick={handleLogin} style={buttonStyle}>
                    Login
                </button>
            </form>
            {error && <div style={errorStyle}>{error}</div>}
            <Link to="/" style={backButtonStyle}>
                Go to Welcome page
            </Link>
        </div>
    );
}

export default AdministratorLogin;


