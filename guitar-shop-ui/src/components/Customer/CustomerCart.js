import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useLocation, useNavigate} from "react-router-dom";

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

const quantityButtonStyle = {
    padding: "2px",
    borderRadius: "5px", // 공통 스타일
    cursor: "pointer", // 공통 스타일
}

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

const orderButtonStyle = {
    display: "block",
    fontSize: "18px",
    textAlign: "center",
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    textDecoration: "none",
};

function CustomerCart() {
    const location = useLocation();
    const navigate = useNavigate();

    const [guitarList, setGuitarList] = useState([]);

    useEffect(() => {
        // API를 호출하여 기타 데이터를 가져옵니다.
        axios.get('/api/v1/cart')
            .then((response) => {
                const guitarListData = response.data;
                setGuitarList(guitarListData);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleDelete = (guitarId) => {
        // 서버에 선택한 기타를 삭제하도록 DELETE 요청을 보냅니다.
        axios.delete(`/api/v1/cart/${guitarId}`)
            .then((response) => {
                // 삭제된 기타를 제외한 업데이트된 목록으로 guitarList 상태를 업데이트합니다.
                setGuitarList(guitarList.filter(guitar => guitar.guitarId !== guitarId));
            })
            .catch((error) => console.error(error));
    };

    const backToList = () => {
        navigate("/api/v1/guitars");
    };

    const handleIncrease = (guitarId) => {
        // Make a request to the server to increase the quantity for the selected guitar
        axios.put(`/api/v1/cart/increase/${guitarId}`)
            .then((response) => {
                // Update the quantity in the guitarList state
                setGuitarList(guitarList.map(guitar => {
                    if (guitar.guitarId === guitarId) {
                        return {...guitar, quantity: response.data};
                    }
                    return guitar;
                }));
                console.log(response.data);
            })
            .catch((error) => console.error(error));
    };

    const handleDecrease = (guitarId) => {
        // Make a request to the server to decrease the quantity for the selected guitar
        axios.put(`/api/v1/cart/decrease/${guitarId}`)
            .then((response) => {
                // Update the quantity in the guitarList state
                setGuitarList(guitarList.map(guitar => {
                    if (guitar.guitarId === guitarId) {
                        return {...guitar, quantity: response.data};
                    }
                    return guitar;
                }));
                console.log(response.data);
            })
            .catch((error) => console.error(error));
    };

    return (
        <div>
            {location.pathname === "/api/v1/cart" && (
                <div style={{display: "flex", justifyContent: "flex-end", alignItems: "flex-start"}}>
                    <button style={adminButtonStyle} onClick={backToList}>More shopping</button>
                </div>
            )}

            {location.pathname === "/api/v1/cart" && ( // 경로가 루트 경로인 경우에만 출력
                <div style={listContainer}>
                    <h1 style={{textAlign: "center", marginBottom: "50px"}}>Cart</h1>
                    <table style={tableStyle}>
                        <thead>
                        <tr>
                            <th style={thStyle}>Image</th>
                            <th style={thStyle}>Company</th>
                            <th style={thStyle}>Name</th>
                            <th style={thStyle}>Price</th>
                            <th style={thStyle}>Quantity</th>
                            <th style={thStyle}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {guitarList.map((guitar) => (
                            <tr key={guitar.guitarId}>
                                <td style={tdStyle}>
                                    <Link to={`/api/v1/guitars/${guitar.guitarId}`}>
                                        <img src={guitar.image} alt={guitar.name} width="100" height="100"
                                             style={imgStyle}/> {/* 이미지 렌더링 */}
                                    </Link>
                                </td>
                                <td style={tdStyle}>{guitar.company}</td>
                                <td style={tdStyle}>
                                    <Link to={`/api/v1/guitars/${guitar.guitarId}`}>
                                        {guitar.name}
                                    </Link>
                                </td>
                                <td style={tdStyle}>
                                    {guitar.price.toLocaleString()} ₩
                                </td>
                                <td style={tdStyle}>
                                    <button style={quantityButtonStyle}
                                            onClick={() => handleDecrease(guitar.guitarId)}>-
                                    </button>
                                    <span style={{margin: "0 10px"}}>{guitar.quantity}</span>
                                    <button style={quantityButtonStyle}
                                            onClick={() => handleIncrease(guitar.guitarId)}>+
                                    </button>
                                </td>
                                <td style={tdStyle}>
                                    <button style={deleteButtonStyle}
                                            onClick={() => handleDelete(guitar.guitarId)}>Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div>
                <h1 style={{textAlign: "right", fontSize: "25px"}}>Total
                    price: {guitarList.reduce((total, guitar) => total + (guitar.price * guitar.quantity), 0).toLocaleString()} ₩</h1>
            </div>
            <Link to="/api/v1/order" style={orderButtonStyle}>Order</Link>
        </div>
    );
}

export default CustomerCart;