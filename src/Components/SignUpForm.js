import React from "react";
import styled from "styled-components";
import firebase from "./Fire/Fire";
import { controlAuth } from "./LoginForm";
import { useForm } from "react-hook-form";

//fireStore 지정
const db = firebase.firestore();
const dbRef = db.collection("User");

export const SignUp = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    //가입유저 이메일, 패스워드 지정
    const email = data.Email;
    const password = data.Password;
    //firebase Auth 등록
    controlAuth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        const userInfo = user;
        //가입유저 정보 firestore 저장
        dbRef.doc(userInfo.user.uid).set({
          userID: userInfo.user.uid,
          userFirstName: data.firstName,
          userLastName: data.lastName,
          userEmail: userInfo.user.email,
          //가입시간 Timestamp로 표시
          signupAt: firebase.firestore.Timestamp.fromDate(new Date())
        });
      })
      .catch(error => {
        console.error("Fail", error);
      });
  };
  return (
    <Styles>
      <header>
        <h3>Sign Up</h3>
      </header>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="firstName"
            placeholder="First name"
            ref={register({ requier: true })}
          />
          <input
            name="lastName"
            placeholder="Last name"
            ref={register({ requier: true })}
          />
          <input
            type="email"
            placeholder="E-mail"
            name="Email"
            ref={register({ required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.Email && "E-mail 양식에 맞춰 주세요."}
          <input
            type="password"
            placeholder="Password"
            name="Password"
            ref={register({
              required: true,
              min: 8,
              pattern: /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/
              //출처: https://gongam100.tistory.com/24 [공감 스토리]
            })}
          />
          {errors.Password && "영문,숫자 혼합 6~20자 이내"}
          <footer>
            <button type="submit">Sign Up</button>
          </footer>
        </form>
      </main>
    </Styles>
  );
};

const Styles = styled.div`
  margin: 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & header {
    width: 200px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  & main {
    width: 350px;
    height: 400px;
    display: flex;
    justify-content: center;
  }
  & form {
    padding: 10px;
    width: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & input {
      margin-top: 20px;
      margin-bottom: 20px;
      padding-left: 15px;
      width: 150px;
      height: 30px;
      border: none;
      border-bottom: 1px solid gray;
    }
    & footer {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    & button {
      width: 150px;
      height: 25px;
      border-radius: 5px;
    }
  }
`;
