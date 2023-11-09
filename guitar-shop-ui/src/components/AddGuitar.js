import React, { useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

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

function AddGuitar() {
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
    const navigate = useNavigate();
    const [isRegistrationComplete, setRegistrationComplete] = useState(false);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGuitar({
            ...guitar,
            [name]: value,
        });
    };

    const handleAddGuitar = (e) => {
        e.preventDefault();
            // 유효성 검사를 수행
            if (guitar.name.trim() === "" || guitar.company.trim() === "" || guitar.country.trim() === ""
            || guitar.description.trim() === "") {
                setError("모든 필수 필드를 입력하세요.");
            } else if (guitar.price < 0) {
                setError("가격은 음수가 아니어야 합니다.");
            } else if (guitar.priceOfSale >= guitar.price) {
                setError("세일 가격은 원래 가격보다 높지 않아야 합니다.");
            } else {
                // 모든 유효성 검사를 통과한 경우 서버로 데이터를 전송
                axios.post(`/api/v1/guitars/guitar`, guitar)
                    .then((response) => {
                        // 등록이 성공적으로 완료될 때 팝업을 표시하고, 2초 후에 자동으로 이동
                        console.log("등록 완료");
                            navigate("/api/v1/admin");
                    })
                    .catch((error) => {
                        setError("새로운 기타를 등록하는 중 오류 발생");
                        console.error(error);
                    });
            }
    };

    return (
        <div>
            <h1 style={{textAlign: "center"}}>Add New Guitar</h1>
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
                <button onClick={handleAddGuitar} style={buttonStyle}>
                    Register
                </button>

                {error && <div style={errorStyle}>{error}</div>}

                {isRegistrationComplete && (
                    <div className="popup">
                        기타 등록이 완료되었습니다.
                    </div>
                )}

                <Link style={backButtonStyle} to="/api/v1/admin">Back to list</Link>
            </form>
        </div>
    );
}

export default AddGuitar;