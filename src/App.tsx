import { Outlet } from "react-router-dom";

function App() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: "url('./public/images/noel.jpg')", backgroundAttachment: "fixed" }}
    >
      <div className="max-w-4xl mx-auto  rounded-lg shadow-md p-6 ">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
