import { useState } from "react";
import { userSignup } from "../../api"; // Import userSignup function
import BreakLine from "../../component/BreakLine/BreakLine";
import Button from "../../component/Button/Button";
import LoginWithThirdPartyButton from "../../component/LoginWithThirdPartyButton/LoginWithThirdPartyButton";
import "./SignUp.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const signUpForm = document.getElementById('signup_form');
    if (!signUpForm.checkValidity()) {
        signUpForm.reportValidity();
        return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await userSignup({ username, email, password });
      console.log(response)
      setMessage("Account created successfully! Please log in.");
    } catch (error) {
      setMessage("Sign-up failed. Please try again.");
      console.error("Signup Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const onClickParty = (e, party) => {
    e.preventDefault();
    console.log("Clicked on", party);
  };

  return (
    <div id="signup_container">
      <form id="signup_form">
        <p id="signup_title">Create an Account</p>
        
        <div className="input_container">
          <label htmlFor="username_sign_up">Username</label>
          <input
            type="text"
            id="username_sign_up"
            name="username_sign_up"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input_container">
          <label htmlFor="email_sign_up">Email</label>
          <input
            type="email"
            id="email_sign_up"
            name="email_sign_up"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input_container">
          <label htmlFor="pass_sign_up">Password</label>
          <input
            type="password"
            id="pass_sign_up"
            name="pass_sign_up"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit" className="signup_button" onClick={onSubmit} disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>

        {message && <div className="message">{message}</div>}

        <BreakLine text="or" width="90%" />

        <LoginWithThirdPartyButton
          icon={"/logo/github.png"}
          backgroundColor={"#363D45"}
          onClick={(e) => onClickParty(e, "Github")}
          disabled={loading}
        >
          Sign up with GitHub
        </LoginWithThirdPartyButton>

        <LoginWithThirdPartyButton
          icon={"/logo/google.png"}
          backgroundColor={"#4285F4"}
          onClick={(e) => onClickParty(e, "Google")}
          imgStyle={{ backgroundColor: "white", borderRadius: "50%" }}
          disabled={loading}
        >
          Sign up with Google
        </LoginWithThirdPartyButton>

        <div>Already have an account? <span className="signup_nav_sign_in">Sign in</span></div>
      </form>
    </div>
  );
}

export default SignUp;
