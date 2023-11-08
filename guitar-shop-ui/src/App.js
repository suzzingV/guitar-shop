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
import AdminEditGuitar from "./components/AdminEditGuitar"; // GuitarDetail 컴포넌트를 가져옴

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
    padding: "5px 15px",
    color: "#2c2c36",
    border: "1px solid #2c2c36",
    borderRadius: "5px",
    cursor: "pointer",
};

function App() {
    const location = useLocation();
    const navigate = useNavigate();

    const [guitarList, setGuitarList] = useState([]);
    const [tabData, setTabData] = useState([]);

    useEffect(() => {
        // API를 호출하여 기타 데이터를 가져옵니다.
        axios.get('/api/v1/guitars')
            .then((response) => {
                const data = response.data;
                const guitarListData = data.byCompany;
                const tabData = data.tabList; // 'tab' 키에 해당하는 데이터 가져오기
                setGuitarList(guitarListData);
                setTabData(tabData); // tabData 상태 업데이트
            })
            .catch((error) => console.error(error));
    }, []);

    const openAdminMode = () => {
        navigate("/api/v1/admin/login");
    };

    return (
        <div style={appContainer}>
            {location.pathname === "/api/v1/guitars" && (
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-start" }}>
                <button style={adminButtonStyle} onClick={openAdminMode}>Administrator mode</button>
            </div>
            )}

            {location.pathname === "/api/v1/guitars" && ( // 경로가 루트 경로인 경우에만 출력
                <div style={listContainer}>
                    <h1 style={{ textAlign: "center" }}>Guitar List</h1>

                    <div style={tabContainer}>
                        <Link
                            to="/api/v1/guitars"
                            style={location.pathname === "/api/v1/guitars" ? tabActiveStyle : tabStyle}
                        >
                            All Guitars
                        </Link>
                        {tabData.map((tab) => (
                            <Link
                                key={tab}
                                to={`/api/v1/guitars/${tab}/byCompany`} // 동적 경로 보간 사용
                                style={location.pathname === `/api/v1/guitars/${tab}/byCompany` ? tabActiveStyle : tabStyle}
                            >
                                {tab}
                            </Link>
                        ))}
                    </div>

                    <table style={tableStyle}>
                        <thead>
                        <tr>
                            <th style={thStyle}>Image</th>
                            <th style={thStyle}>Company</th>
                            <th style={thStyle}>Name</th>
                            <th style={thStyle}>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {guitarList.map((guitar) => (
                            <tr key={guitar.guitarId}>
                                <td style={tdStyle}>
                                    <Link to={`/api/v1/guitars/${guitar.guitarId}`}>
                                        <img src={guitar.image} alt={guitar.name} width="100" height="100" style={imgStyle}/>
                                    </Link>
                                </td>
                                <td style={tdStyle}>{guitar.company}</td>
                                <td style={tdStyle}>
                                    <Link to={`/api/v1/guitars/${guitar.guitarId}`}>{guitar.name}</Link>
                                </td>
                                <td style={tdStyle}>
                                    {guitar.price - guitar.priceOfSale}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
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
            </Routes>
        </div>
    );
}

export default App;