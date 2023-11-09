import React from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import CustomerGuitarDetail from "./components/Customer/CustomerGuitarDetail";
import CustomerCompanyList from "./components/Customer/CustomerCompanyList";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminGuitarList from "./components/Admin/AdminGuitarList";
import AdminAddGuitar from "./components/Admin/AdminAddGuitar";
import AdminListByCompany from "./components/Admin/AdminListByCompany";
import AdminGuitarDetail from "./components/Admin/AdminGuitarDetail";
import AdminEditGuitar from "./components/Admin/AdminEditGuitar";
import CustomerCart from "./components/Customer/CustomerCart";
import CustomerCartOrder from "./components/Customer/CustomerCartOrder";
import CustomerGuitarOrder from "./components/Customer/CustomerGuitarOrder";
import CustomerGuitarList from "./components/Customer/CustomerGuitarList";
import Welcome from "./components/welcome/Welcome"; // CustomerGuitarDetail 컴포넌트를 가져옴

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
                <div style={{display: "flex", justifyContent: "flex-end", alignItems: "flex-start"}}>
                    <button style={adminButtonStyle} onClick={openCart}>Cart</button>
                </div>
            )}

            {location.pathname === "/api/v1/guitars" && ( // 경로가 루트 경로인 경우에만 출력
                <CustomerGuitarList/>
            )}

            <Routes>
                <Route path="/api/v1/guitars/:company/byCompany" element={<CustomerCompanyList/>}/>
                <Route path="/api/v1/guitars/:guitarId" element={<CustomerGuitarDetail/>}/>
                <Route path="/api/v1/admin/login" element={<AdminLogin/>}/>
                <Route path="/api/v1/admin" element={<AdminGuitarList/>}/>
                <Route path="/api/v1/guitars/guitar" element={<AdminAddGuitar/>}/>
                <Route path="/api/v1/admin/:company/byCompany" element={<AdminListByCompany/>}/>
                <Route path="/api/v1/admin/edit/:guitarId" element={<AdminEditGuitar/>}/>
                <Route path="/api/v1/admin/:guitarId" element={<AdminGuitarDetail/>}/>
                <Route path="/api/v1/cart" element={<CustomerCart/>}/>
                <Route path="/api/v1/order" element={<CustomerCartOrder/>}/>
                <Route path="/api/v1/order/:guitarId" element={<CustomerGuitarOrder/>}/>
                <Route path="/" element={<Welcome/>}/>

            </Routes>
        </div>
    );
}

export default App;