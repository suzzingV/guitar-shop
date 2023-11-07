import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import GuitarDetail from "./GuitarDetail";
import { GuitarList } from "./GuitarList";

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

function CompanyList() {
    const location = useLocation();
    const navigate = useNavigate();

    const { company } = useParams(); // useParams를 사용하여 동적 경로의 "company" 파라미터 추출
    const [guitarList, setGuitarList] = useState([]);
    const [tabData, setTabData] = useState([]);

    useEffect(() => {
        axios.get(`/api/v1/guitars/${company}/byCompany`)
            .then((response) => {
                const data = response.data;
                const guitarListData = data.byCompany;
                const tabData = data.tabList; // 'tab' 키에 해당하는 데이터 가져오기
                setGuitarList(guitarListData);
                setTabData(tabData); // tabData 상태 업데이트
            })
            .catch((error) => console.error(error));
    }, [company]);

    return (
        <div style={appContainer}>
            {location.pathname === `/company/${company}/byCompany` && (
                <div style={listContainer}>
                    <h1 style={{ textAlign: "center" }}>Guitar List</h1>

                    <div style={tabContainer}>
                        <Link
                            to="/"
                            style={location.pathname === "/" ? tabActiveStyle : tabStyle}
                        >
                            All Guitars
                        </Link>
                        {tabData.map((tab) => (
                            <Link
                                key={tab}
                                to={`/company/${tab}/byCompany`} // 동적 경로 보간 사용
                                style={location.pathname === `/company/${tab}/byCompany` ? tabActiveStyle : tabStyle}
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
                                    <img src={guitar.image} alt={guitar.name} width="100" height="100" style={imgStyle}/> {/* 이미지 렌더링 */}
                                </td>
                                <td style={tdStyle}>{guitar.company}</td>
                                <td style={tdStyle}>
                                    <Link to={`/guitar/${guitar.guitarId}`}>{guitar.name}</Link>
                                </td>
                                <td style={tdStyle}>{guitar.price}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Routes>
                <Route path="/company/:company/byCompany/*" element={<CompanyList />} />
                <Route path="/guitar/:guitarId" element={<GuitarDetail />} />
            </Routes>
        </div>
    );
}

export default CompanyList;






