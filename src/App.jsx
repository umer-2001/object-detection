import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ObjectDetection from "./components/ObjectDetection";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="w-full border-2  border-red-500">
        <h1 className="text-5xl text-red-500">Hello world</h1>
        <ObjectDetection />
      </div>
    </>
  );
}

export default App;
