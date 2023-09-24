import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StoreProvider from "./login/Provider";
import PrivateRoute from "./login/Private";
import Inicio from "./pages/Inicio";
import UserLogin from "./login/Login";

function App() {
  return (
    <Router>
      <div>
        <StoreProvider>
          <Routes>
            <Route path="/" element={<PrivateRoute element={Inicio} />}></Route>
            <Route path="/login" element={<UserLogin />} />
          </Routes>
        </StoreProvider>
      </div>
    </Router>
  );
}

export default App;
