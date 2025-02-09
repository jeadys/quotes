import "./App.css";
import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience.tsx";

import { Perf } from "r3f-perf";

function App() {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [4, 15, 20],
      }}
    >
      <Perf position="top-left" />
      <Experience />
    </Canvas>
  );
}

export default App;
