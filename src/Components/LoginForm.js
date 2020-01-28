import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import firebase from "./Fire/Fire";
import { Link } from "react-router-dom";

//firebase Auth 지정
export const controlAuth = firebase.auth();

export function LoginForm() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    console.log(data);
    const email = data.Email;
    const password = data.pass;
    console.log(email);
    console.log(password);
    //Login 정보 firebase Auth전달
    controlAuth
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        console.error("Failed", error);
      });
  };
  //firebase Auth 인증상태 관찰자
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const userInfo = user.providerData;
      console.log(userInfo);
    } else {
      return;
    }
  });

  return (
    <Styles>
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            name="Email"
            placeholder="E-mail"
            ref={register({ required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.Email && "이메일 양식이 일치하지 않습니다."}
          <input type="password" name="pass" placeholder="P.W" ref={register} />
          <button type="submit">Log In</button>
          <Link to="/signup">
            <button type="submit">Sign Up</button>
          </Link>
        </form>
      </section>
    </Styles>
  );
}
const Styles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  & section {
    margin: 0;
    padding: 10px;
    width: 500px;
    height: 550px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & form {
      margin: 0;
      padding: 15px;
      width: 300px;
      height: 350px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #b8b6ffa3;
      border-radius: 10px;
      & input {
        margin-top: 20px;
        margin-bottom: 20px;
        width: 250px;
        height: 30px;
        padding-left: 10px;
        letter-spacing: 2px;
        font-size: 1rem;
        border: none;
        border-bottom: 1px solid lightseagreen;
        background: none;
        outline: none;
      }
      & button {
        width: 140px;
        height: 30px;
        border-radius: 5px;
        background: lightgreen;
        font-size: 1rem;
        :hover {
          background: #72c672;
          color: blanchedalmond;
        }
      }
    }
  }
`;
