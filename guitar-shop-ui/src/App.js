import React, {useState, useEffect, useCallback} from "react";
import axios from "axios";
import {Route, Link, Routes, useLocation, useNavigate, Navigate} from "react-router-dom";
import GuitarDetail from "./components/GuitarDetail";
import CompanyList from "./components/CompanyList";
import AdministratorLogin from "./components/AdministratorLogin";
import AdminGuitarList from "./components/AdminGuitarList";
import AddGuitar from "./components/AddGuitar";
import AdminCompanyList from "./components/AdminCompanyList";
import AdminGuitarDetail from "./components/AdminGuitarDetail";
import AdminEditGuitar from "./components/AdminEditGuitar";
import Cart from "./components/Cart";
import GuitarCartOrder from "./components/GuitarCartOrder";
import GuitarOrder from "./components/GuitarOrder";
import GuitarList from "./components/GuitarList";
import Welcome from "./components/Welcome"; // GuitarDetail 컴포넌트를 가져옴

const appContainer = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0 0 5px #ddd",
    backgroundColor: "#f5f5f5",
};

const listContainer = {
    marginTop: "20px",
};

const tabContainer = {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #ddd",
    marginBottom: "20px",
};

const tabStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    cursor: "pointer",
    textDecoration: "none",
    color: "#333",
};

const tabActiveStyle = {
    ...tabStyle,
    backgroundColor: "#333",
    color: "#fff",
};



const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
};

const thStyle = {
    background: "#333",
    color: "#fff",
    fontWeight: "bold",
    padding: "10px",
    textAlign: "left",
};

const tdStyle = {
    borderBottom: "1px solid #ddd",
    padding: "10px",
    verticalAlign: "top",
};

const imgStyle = {
    width: "100px",
    height: "100px",
};

const adminButtonStyle = {
    marginRight: "10px",
    padding: "5px 15px",
    color: "#2c2c36",
    border: "1px solid #2c2c36",
    borderRadius: "5px",
    cursor: "pointer",
};

function App() {
    const location = useLocation();
    const navigate = useNavigate();

    const openAdminMode = () => {
        navigate("/api/v1/admin/login");
    };

    const openCart = () => {
        navigate("/api/v1/cart");
    };

    return (
        <div style={appContainer}>
            {location.pathname === "/api/v1/guitars" && (
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-start" }}>
                <button style={adminButtonStyle} onClick={openCart}>Cart</button>
            </div>
            )}

            {location.pathname === "/api/v1/guitars" && ( // 경로가 루트 경로인 경우에만 출력
                <GuitarList />
            )}

            <Routes>
                <Route path="/api/v1/guitars/:company/byCompany" element={<CompanyList />} />
                <Route path="/api/v1/guitars/:guitarId" element={<GuitarDetail />} />
                <Route path="/api/v1/admin/login" element={<AdministratorLogin />} />
                <Route path="/api/v1/admin" element={<AdminGuitarList />} />
                <Route path="/api/v1/guitars/guitar" element={<AddGuitar />} />
                <Route path="/api/v1/admin/:company/byCompany" element={<AdminCompanyList />} />
                <Route path="/api/v1/admin/edit/:guitarId" element={<AdminEditGuitar />} />
                <Route path="/api/v1/admin/:guitarId" element={<AdminGuitarDetail />} />
                <Route path="/api/v1/cart" element={<Cart/>} />
                <Route path="/api/v1/order" element={<GuitarCartOrder/>} />
                <Route path="/api/v1/order/:guitarId" element={<GuitarOrder/>} />
                <Route path="/" element={<Welcome/>} />

            </Routes>
        </div>
    );
}

export default App;