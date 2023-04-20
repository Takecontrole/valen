import React, {useEffect,  useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateProductMutation } from "../services/appApi";
import axios from "../axios";
import "./NewProduct.css";
import styled from "styled-components";
import { mobile } from "../responsive";
import Chart from "../components/chart/Chart";

import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { productData } from "../dummyData";
const Form = styled.form`
background-color: #0c101b;
  width: 100%;
  height: 100%;
  color: #e0e0e0;
  top: -150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Input = styled.input`
  flex: 1;
  width: 80%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  background-color: #1F2A40;
  color: #e0e0e0;
`;
const Select = styled.select`
margin: 20px 10px 0px 0px;
  padding: 10px;
background:white;
width:80%;
  background-color: #1F2A40;
  color: #e0e0e0;
  
`;
const Button = styled.button`
  width: 200px;
  border: none;
  margin-top: 20px;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  
`;
const Option = styled.option``;
function NewProduct() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [brend, setBrend] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [images, setImages] = useState([]);
    const [imgToRemove, setImgToRemove] = useState(null);
    const navigate = useNavigate();
    const [createProduct, { isError, error, isLoading, isSuccess }] = useCreateProductMutation();

    function handleRemoveImg(imgObj) {
        setImgToRemove(imgObj.public_id);
        axios
            .delete(`/images/${imgObj.public_id}/`)
            .then((res) => {
                setImgToRemove(null);
                setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
            })
            .catch((e) => console.log(e));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !description || !price || !category || !images.length) {
            return alert("нужно обязательно заполнить все поля");
        }
        createProduct({ name, description, price, brend, category, size, color, images }).then(({ data }) => {
            if (data.length > 0) {
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }
        });
    }

    function showWidget() {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "das4snqwu",
                uploadPreset: "uploads",
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
                }
            }
        );
        widget.open();
    }

    return (
       
                    <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                        <h1 className="mt-4">Создавайте</h1>
                        {isSuccess && <Alert variant="success">Успешно</Alert>}
                        {isError && <Alert variant="danger">{error.data}</Alert>}
              
                        
                        <Input
          type="text" placeholder="введите имя" value={name} required onChange={(e) => setName(e.target.value)}
        />

                            
                        <Input as="textarea" placeholder="описание" style={{ height: "100px" }} value={description} required onChange={(e) => setDescription(e.target.value)}/>

                        
                                      <Input type="number" placeholder="цена" value={price} required onChange={(e) => setPrice(e.target.value)} />
                        
                                                  
                                 <Select onChange={(e) => setBrend(e.target.value)}>
           <Option disabled selected>
                                    -- бренд --
                                </Option>
                                <Option value="Contra la contra">Contra la contra</Option>
                                <Option value="Lik">Lik</Option>
                                <Option value="Beastie girls">Beastie girls</Option>
                                <Option value="Bad brains">Bad brains</Option>
                                <Option value="Cross">Cross</Option>
                                <Option value="Acrostix">Acrostix</Option>
          </Select>
                                 <Select onChange={(e) => setCategory(e.target.value)}>
           <Option disabled selected>
                                    -- категория --
                                </Option>
                                 <Option value="Клуб украденных невест">Клуб украденных невест</Option>
                                <Option value="Новые поступления">Новые поступления</Option>
                                <Option value="Распродажа">Распродажа</Option>
                                <Option value="Тренд">Тренд</Option>
                                <Option value="Осенняя коллекция">Осенняя коллекция</Option>
                                
          </Select>

                     
                        
               <Select onChange={(e) => setSize(e.target.value)}>
  
                                <Option disabled selected>
                                    -- размер —
                                </Option>
                                <Option value="XS">XS</Option>
                                <Option value="S">S</Option>
                                <Option value="M">M</Option>
                                <Option value="L">L</Option>
                                <Option value="XL">XL</Option>
                                
                         </Select>     
                
               <Select  onChange={(e) => setColor(e.target.value)}>

                                <Option disabled selected>
                                    -- цвет —
                                </Option>
                                <Option value="чёрный">чёрный</Option>
                                <Option value="белый">белый</Option>
                                <Option value="коричневый">коричневый</Option>
                                <Option value="синий">синий</Option>
                                <Option value="красный">красный</Option>
                                <Option value="розовый">розовый</Option>
                                <Option value="пятнистый">пятнистый</Option>
                                <Option value="серебро">серебро</Option>
                                
                        </Select>
                         
                        
                
                        
                        
                        
                            <Button type="button" onClick={showWidget}>
                                Загрузить изображения
                            </Button>
                            <div className="images-preview-container">
                                {images.map((image) => (
                                    <div className="image-preview">
                                        <img src={image.url} />
                                        {imgToRemove != image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                                    </div>
                                ))}
                            </div>
                        

                       
                            <Button type="submit" disabled={isLoading || isSuccess}>
                                Создать
                            </Button>
                    </Form>

    );
}

export default NewProduct;
