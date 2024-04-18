
import './App.css';
import Home from './screens/Home';
import Login from "./screens/Login"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-blackbox.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min"
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import Cart from './screens/Cart';

function App() {
  return (
    <CartProvider>
      <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/createuser" element={<Signup/>}></Route>
          
        </Routes>
      </div>
    </Router>

    </CartProvider>
    
  );
}

export default App;
