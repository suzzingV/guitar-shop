import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

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

const backButtonStyle = {
    display: "block",
    textAlign: "center",
    color: "#333",
    textDecoration: "underline",
    marginTop: "10px",
};

function CustomerGuitarList() {
    const location = useLocation();
    const navigate = useNavigate();

    const [guitarList, setGuitarList] = useState([]);
    const [tabData, setTabData] = useState([]);

    useEffect(() => {
        axios
            .get('/api/v1/guitars')
            .then((response) => {
                const data = response.data;
                const guitarListData = data.byCompany;
                const tabData = data.tabList;
                setGuitarList(guitarListData);
                setTabData(tabData);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <div style={listContainer}>
            <h1 style={{textAlign: "center", marginBottom: "50px"}}>Guitar List</h1>

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
                        to={`/api/v1/guitars/${tab}/byCompany`}
                        style={
                            location.pathname === `/api/v1/guitars/${tab}/byCompany`
                                ? tabActiveStyle
                                : tabStyle
                        }
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
                                <img
                                    src={guitar.image}
                                    alt={guitar.name}
                                    width="100"
                                    height="100"
                                    style={imgStyle}
                                />
                            </Link>
                        </td>
                        <td style={tdStyle}>{guitar.company}</td>
                        <td style={tdStyle}>
                            <Link to={`/api/v1/guitars/${guitar.guitarId}`}>
                                {guitar.name}
                            </Link>
                        </td>
                        <td style={tdStyle}>
                            {(guitar.price - guitar.priceOfSale).toLocaleString()} ₩
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Link to="/" style={backButtonStyle}>
                Go to Welcome page
            </Link>
        </div>
    );
}

export default CustomerGuitarList;