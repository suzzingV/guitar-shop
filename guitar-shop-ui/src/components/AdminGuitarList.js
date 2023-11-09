import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link,useLocation, useNavigate} from "react-router-dom";

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

const buttonStyle = {
    padding: "10px", // 공통 스타일
    borderRadius: "5px", // 공통 스타일
    cursor: "pointer", // 공통 스타일
};

const editButtonStyle = {
    ...buttonStyle,
    color: "#2c2c36",
    border: "none",
    padding: "10px",
    margin: "0 auto", // 가운데 정렬
    display: "block", // 가운데 정렬
    width: "60px", // 버튼의 고정 너비를 설정
};

const deleteButtonStyle = {
    ...buttonStyle,
    color: "#2c2c36",
    border: "none",
    padding: "10px",
    margin: "0 auto", // 가운데 정렬
    display: "block", // 가운데 정렬
    width: "60px", // 버튼의 고정 너비를 설정
};

function AdminGuitarList() {
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

    const closeAdminMode = () => {
        navigate("/api/v1/guitars");
    };

    const handleEdit = (guitarId) => {
        // 선택한 기타의 편집 페이지로 이동
        navigate(`/api/v1/admin/edit/${guitarId}`);
    };

    const handleDelete = (guitarId) => {
        // 서버에 선택한 기타를 삭제하도록 DELETE 요청을 보냅니다.
        axios.delete(`/api/v1/guitars/${guitarId}`)
            .then((response) => {
                // 삭제된 기타를 제외한 업데이트된 목록으로 guitarList 상태를 업데이트합니다.
                setGuitarList(guitarList.filter(guitar => guitar.guitarId !== guitarId));
            })
            .catch((error) => console.error(error));
    };

    return (
        <div style={appContainer}>
            {location.pathname === "/api/v1/admin" && (
                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-start" }}>
                    <button style={adminButtonStyle} onClick={closeAdminMode}>Close administrator mode</button>
                </div>
            )}

            {location.pathname === "/api/v1/admin" && ( // 경로가 루트 경로인 경우에만 출력
                <div style={listContainer}>
                    <h1 style={{ textAlign: "center" }}>Administrator mode</h1>

                    <div style={tabContainer}>
                        <Link
                            to="/api/v1/admin"
                            style={location.pathname === "/api/v1/admin" ? tabActiveStyle : tabStyle}
                        >
                            All Guitars
                        </Link>
                        {tabData.map((tab) => (
                            <Link
                                key={tab}
                                to={`/api/v1/admin/${tab}/byCompany`} // 동적 경로 보간 사용
                                style={location.pathname === `/api/v1/admin/${tab}/byCompany` ? tabActiveStyle : tabStyle}
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
                            <th style={thStyle}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {guitarList.map((guitar) => (
                            <tr key={guitar.guitarId}>
                                <td style={tdStyle}>
                                    <img src={guitar.image} alt={guitar.name} width="100" height="100" style={imgStyle}/> {/* 이미지 렌더링 */}
                                </td>
                                <td style={tdStyle}>{guitar.company}</td>
                                <td style={tdStyle}>{guitar.name}</td>
                                <td style={tdStyle}>
                                    {guitar.price}
                                </td>
                                <td style={tdStyle}>
                                    <button style={editButtonStyle} onClick={() => handleEdit(guitar.guitarId)}>Edit</button>
                                    <button style={deleteButtonStyle} onClick={() => handleDelete(guitar.guitarId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button
                        style={{ ...adminButtonStyle, marginTop: "10px" }}
                        onClick={() => navigate("/api/v1/guitars/guitar")}
                    >
                        Register guitar
                    </button>
                </div>
            )}
        </div>
    );
}

export default AdminGuitarList;