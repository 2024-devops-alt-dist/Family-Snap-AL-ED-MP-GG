import { Outlet } from "react-router-dom";

function App() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed" 
      style={{ backgroundImage: "url('/images/noel.jpg')" }}
    >

      <div className="bg-black bg-opacity-60 min-h-screen flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
