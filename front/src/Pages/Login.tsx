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
    <div
      className="bg-gradient-to-t from-gray-700 via-gray-900 to-black w-full h-full"
      aria-label="Container that contains my navbar component"
    >
      <Navbar />
      <div
        className=" grid h-screen place-items-center mt-2"
        aria-label="Container that contains my Login Form component"
      >
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
