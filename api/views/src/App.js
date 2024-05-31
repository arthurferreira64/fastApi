import Layout from "./components/Layout";
import Create from "./pages/Create";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Update from "./pages/Update";

function App() {
  return (
    <Routes>
      {/* Integration d'un layout qui englobe les routes  */}
      <Route path="/" element={<Layout />}>
        {/* routes acessible sans autorisation */}
        <Route index element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path=":id" element={<Update />} />
      </Route>
    </Routes>
  );
}

export default App;
