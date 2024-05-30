import Layout from "./components/Layout";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      {/* Integration d'un layout qui englobe les routes  */}
      <Route path="/" element={<Layout />}>
        {/* routes acessible sans autorisation */}
        <Route index element={<Home />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;