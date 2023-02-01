import LoginForm from "../Components/loginForm";
import Navbar from "../Components/Navbar";

const checkLS = async () => {
  let LS: any = localStorage.getItem("loggedinUser");
  let LSParsed = JSON.parse(LS);
  if (LSParsed) {
    console.log("finns");
    if (LSParsed.isAllowed && LSParsed.type === "company") {
      window.location.href = "http://localhost:3002/";
    } else if (LSParsed.isAllowed && LSParsed.type === "user") {
      window.location.href = "http://localhost:3002/";
    }
  } else {
    console.log("finns inget utan helt tom");
  }
};
const Login = () => {
  checkLS();
  return (
    <div>
      <Navbar />
      <h1>HEJ från login</h1>
      <div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
