import BreakLine from "../../component/BreakLine/BreakLine";
import Button from "../../component/Button/Button";
import LoginWithThirdPartyButton from "../../component/LoginWithThirdPartyButton/LoginWithThirdPartyButton";
import "./Login.css";
import { useState } from "react";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = (e) => {
    const loginForm = document.getElementById('login_form');
    let isFormValid = loginForm.checkValidity();
    //if form is not valid, show the browser's default validation messages
    if(!isFormValid) {
        loginForm.reportValidity();
        return;
    }
    e.preventDefault();
    setLoading(true);
    setError("");
    // if(username.length<5){
    //     setError('Username must be at least 5 characters long');
    //     setLoading(false);
    //     return;
    // }
    // if(password.length<5){
    //     setError('Password must be at least 5 characters long');
    //     setLoading(false);
    //     return;
    // }
    console.log("Username:", username);
    console.log("Password:", password);
    setLoading(false);
  };
  const onClickParty = (e,party) => {
    e.preventDefault();
    console.log("Clicked on",party);
  };
  return (
    <div id="login_container">
      <form id="login_form">
        <p id="login_title">Log in</p>
        <div className="input_container">
          <label htmlFor="username_sign_in">Username</label>
          <input
            type="text"
            id="username_sign_in"
            name="username_sign_in"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input_container">
          <label htmlFor="pass_sign_in">Password</label>
          <input
            type="password"
            id="pass_sign_in"
            name="pass_sign_in"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type={'submit'} className="login_button" onClick={onSubmit} disabled={loading}>
          Log in
        </Button>
      <BreakLine text="or" width="90%" />
      <LoginWithThirdPartyButton
        disabled={loading}
        icon={"/logo/github.png"}
        backgroundColor={"#24292E"}
        onClick={(e) => onClickParty(e,"Github")}
      >
        Log in with GitHub
      </LoginWithThirdPartyButton>
      <LoginWithThirdPartyButton
        disabled={loading}
        icon={"/logo/google.png"}
        backgroundColor={"#4285F4"}
        onClick={(e) => onClickParty(e,"Google")}
        imgStyle={{backgroundColor:"white",borderRadius:"50%"}}
      >Log in with Google
      </LoginWithThirdPartyButton>
      <div>don't have an account? <span className="login_nav_sign_up">sign up</span></div>
      </form>
    </div>
  );
}
export default Login;
