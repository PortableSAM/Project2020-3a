import React, { useState } from "react";
import "./LoginForm.css";

export function LoginForm() {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

  const handleSubmit = e => {
    e.preventDefault();
    if ((email, pass) === undefined) {
      alert("이메일과 패스워드를 입력하세요.");
    } else;
    alert(`E-mail: ${email},Password: ${pass}`);
  };

  return (
    <div>
      <div className="login-container">
        <form type="submit" onSubmit={handleSubmit}>
          <label>
            E-mail{" "}
            <input
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password{" "}
            <input
              type="password"
              name="password"
              placeholder="password"
              value={pass}
              onChange={e => setPass(e.target.value)}
            />
          </label>
          <button>Log in</button>
        </form>
      </div>
    </div>
  );
}
