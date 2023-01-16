import LoginForm from "../Components/loginForm";
import Navbar from "../Components/Navbar";

const Login = () => {
  return (
    <div>
      <Navbar/>
      <h1>HEJ från login</h1>
      <div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
