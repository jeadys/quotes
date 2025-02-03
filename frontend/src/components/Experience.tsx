import {
  useMatcapTexture,
  Center,
  Text3D,
  OrbitControls,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useEffect, useState } from "react";

import * as THREE from "three";
import api from "../api.ts";

const material = new THREE.MeshMatcapMaterial();

const lineBreakString = (quote: string, start: number, end: number): string => {
  const regex = new RegExp(`(\\S+\\s*){${start},${end}}`, "g");
  return quote.replace(regex, "$&\n");
};

export default function Experience() {
  const [matcapTexture] = useMatcapTexture("167E76_36D6D2_23B2AC_27C1BE", 256);

  const [quote, setQuote] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await api.get("/");
        setQuote(response.data.quote);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };

    fetchQuote();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    matcapTexture.colorSpace = THREE.SRGBColorSpace;
    matcapTexture.needsUpdate = true;

    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, [isLoaded]);

  if (!isLoaded) return null;

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />

      <Center>
        <Text3D
          material={material}
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          {lineBreakString(quote, 1, 5)}
        </Text3D>
      </Center>
    </>
  );
}
