import "./App.scss"
import Navbar from "./components/Navbar";
import PackageStatusCard from "./components/PackageStatusCard";

function App() {
  return (
    <div className="App">
      <Navbar />
      <PackageStatusCard />
    </div>
  );
}

export default App;
