import Movies from "./pages/movies";
import "./utils/style/Layout.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div className="App">
      <div className="lmj-layout-inner">
        <Movies />
      </div>
    </div>
  );
}

export default App;
