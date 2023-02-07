import Navbar from "../Components/Navbar";
import mike from "../Images/MikeW.png";
const NotFound = () => {
  return (
    <div className="bg-gradient-to-t from-gray-700 via-gray-900 to-black w-screen h-screen ">
      <Navbar />
      <div className="bg-white flex items-center justify-center h-full">
        <div className="h-1/3 w-1/3">
          <img src={mike} alt="Mike W" />
          <h1>Grattis du har hittat något som du inte borde... </h1>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
