import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import RootLayout from "./layouts/RootLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
