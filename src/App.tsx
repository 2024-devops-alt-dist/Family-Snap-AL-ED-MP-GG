import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="app-background">
      <div className="overlay">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
