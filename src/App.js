import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Pose from "./components/Pose";
import Selfie from "./components/Selfie";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Main />}></Route>
        <Route path={"/pose"} element={<Pose />}></Route>
        <Route path={"/selfie"} element={<Selfie />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
