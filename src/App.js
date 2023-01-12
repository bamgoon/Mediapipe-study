import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Main";
import Pose from "./Pose";
import Selfie from "./Selfie";

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
