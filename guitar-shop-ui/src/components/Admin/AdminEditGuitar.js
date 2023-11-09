import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";

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
    marginTop: "52px",
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
    padding: "12px",
    background: "#333",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "10px",
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
    fontSize: "16px",
};

const labelStyle = {
    marginBottom: "15px", // 항목 이름과 입력 필드 사이의 간격 설정
    fontWeight: "bold",
    marginRight: "10px",
};

const AdminEditGuitar = () => {
    const navigate = useNavigate();
    const {guitarId} = useParams(); // URL 매개변수에서 기타 ID 추출

    const [guitar, setGuitar] = useState({
        name: "",
        company: "",
        country: "",
        manufactureDate: "",
        price: 0,
        priceOfSale: 0,
        description: "",
        image: ""
    });

    const [error, setError] = useState(null);

    useEffect(() => {
        // 기타 정보를 불러와서 폼에 채우는 로직
        axios.get(`/api/v1/guitars/${guitarId}`)
            .then((response) => {
                const data = response.data;
                setGuitar(data); // 기타 정보로 상태 업데이트
            })
            .catch((error) => {
                setError("기타 정보를 불러오는 중 오류 발생");
                console.error(error);
            });
    }, [guitarId]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setGuitar({
            ...guitar,
            [name]: value,
        });
    };

    const handleUpdateGuitar = (e) => {
        e.preventDefault();
        // 유효성 검사 및 서버로 업데이트 요청 보내는 로직
        axios.put(`/api/v1/guitars/guitar`, guitar)
            .then((responses) => {
                // 업데이트가 성공적으로 완료된 경우
                navigate(`/api/v1/admin/${guitarId}`); // 기타 상세 정보 페이지로 이동
            })
            .catch((error) => {
                setError("기타 정보를 업데이트하는 중 오류 발생");
                console.error(error);
            });
    };

    return (
        <div>
            <h1 style={{textAlign: "center", marginBottom: "50px"}}>Edit Guitar</h1>
            <form style={formStyle}>
                <div>
                    <label style={labelStyle}>Guitar Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Guitar Name"
                        value={guitar.name}
                        onChange={handleInputChange}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Company</label>
                    <input
                        type="text"
                        name="company"
                        placeholder="Company"
                        value={guitar.company}
                        onChange={handleInputChange}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Country</label>
                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={guitar.country}
                        onChange={handleInputChange}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Manufacture date</label>
                    <input
                        type="text"
                        name="manufactureDate"
                        placeholder="YYYY-MM-DD"
                        value={guitar.manufactureDate}
                        onChange={handleInputChange}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Price</label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Input only number"
                        value={guitar.price}
                        onChange={handleInputChange}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Price Of Sale</label>
                    <input
                        type="number"
                        name="priceOfSale"
                        placeholder="Input only number"
                        value={guitar.priceOfSale}
                        onChange={handleInputChange}
                        style={inputStyle}
                    />
                </div>
                <label style={labelStyle}>Description</label>
                <div>
                <textarea
                    type="text"
                    name="description"
                    value={guitar.description}
                    onChange={handleInputChange}
                    style={{...inputStyle, flex: "1", height: "100px", width: "80%"}}
                />
                </div>
                <div>
                    <label style={labelStyle}>Image</label>
                    <input
                        type="text"
                        name="image"
                        placeholder="Image Link"
                        value={guitar.image}
                        onChange={handleInputChange}
                        style={{...inputStyle, width: "70%"}}
                    />
                </div>
                <button onClick={handleUpdateGuitar} style={buttonStyle}>
                    Update
                </button>
                <Link style={backButtonStyle} to="/api/v1/admin">Back to list</Link>
            </form>
            {error && <div style={{color: "red"}}>{error}</div>}
        </div>
    );
};

export default AdminEditGuitar;