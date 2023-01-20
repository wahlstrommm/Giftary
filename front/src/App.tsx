import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { Link } from 'react-router-dom'

function App() {
  return (
    <main className="w-screen h-screen bg-salte-600">
     <Navbar/>
      <div className="bg-red-600 w-full h-4/6 flex justify-center items-center">
        <div className="h-4/5 bg-amber-900 w-8/12 flex justify-center items-center">
          <div className="bg-amber-500 h-3/4 w-2/4 relative top-4 flex flex-col">
            {/* img */}
            <p>HEJ</p>
            <div className="flex justify-center gap-9 relative bottom-2 items-center">
              <Link to={"/Generator"}>
                <button className="bg-green-100 w-28">generator</button>
               </Link>
               <Link to={"/Login"}>
                 <button className="bg-green-700 w-28">Logga in</button>
               </Link>
            </div>
          </div>
        </div>
      </div>
    <footer>
      <Footer />
    </footer>
  </main>
  );
}

export default App;
