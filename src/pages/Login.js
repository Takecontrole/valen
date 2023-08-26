import React, { useState } from "react";
import styled from "styled-components";
import { useLoginMutation } from "../services/appApi";
import { useNavigate } from "react-router-dom";
import { mobile } from "../responsive";
import { LinkContainer } from "react-router-bootstrap";
const Container = styled.div`
  height:100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
//${mobile({ background: "none" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  margin-left: 45px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-left: 45px;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 2px solid black;
  min-width: 40%;
  padding: 10px;
  margin-bottom: 2px;
`;


const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;



function Login() {
  
  const [email, setEmail] = useState("afro@gmail.com");
    const [password, setPassword] = useState("afro");
    const [login, { isError, isLoading, error }] = useLoginMutation();
    const navigate = useNavigate();
    function handleLogin(e) {
        e.preventDefault();
        login({ email, password }).then(() => {
            if (!isError) {
                setTimeout(() => {
                    navigate("/");
                }, 500);
            }
        });
    }
  return (
          <Container className="bg-login" >
    
      <Wrapper className="frame">
        <Title>Вход</Title>
        <Form
 onSubmit={handleLogin}>
        
        <Input
          type="email" placeholder=" email" value={email} required onChange={(e) => setEmail(e.target.value)}
          
        />
        <Input
          type="password" placeholder="пароль" value={password} required onChange={(e) => setPassword(e.target.value)}
          
        />
        <Button type="submit" disabled={isLoading} 
         > Войти
        </Button>
       </Form>
          <LinkContainer style={{marginTop:"10px", textDecoration: "underline"}} to="/signup">
       <p >Зарегистрироваться</p>
         </LinkContainer>
      </Wrapper>
    </Container>
  );
};

export default Login;
