import {
  Bounds,
  Center,
  Float,
  OrbitControls,
  Stars,
  Text3D,
  useMatcapTexture,
} from "@react-three/drei";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import * as THREE from "three";

import { SelectToZoom } from "../components/SelectToZoom.tsx";
import { lineBreakString } from "../utils.ts";
import api from "../api.ts";

type Quote = {
  id: number;
  quote: string;
  author: string;
};

export default function Experience() {
  const [matcapTexture] = useMatcapTexture("167E76_36D6D2_23B2AC_27C1BE", 256);
  const material = new THREE.MeshMatcapMaterial();

  matcapTexture.colorSpace = THREE.SRGBColorSpace;
  matcapTexture.needsUpdate = true;

  material.matcap = matcapTexture;
  material.needsUpdate = true;

  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response: AxiosResponse<Quote> = await api.get("/");
        setQuote(response.data);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };

    fetchQuote();
  }, []);

  if (!isLoaded) return null;

  return (
    <>
      <OrbitControls makeDefault />

      <Center>
        <Float
          speed={1}
          rotationIntensity={2}
          floatIntensity={2}
          floatingRange={[1, 2]}
        >
          <Bounds fit clip observe margin={1.2}>
            <SelectToZoom>
              <Text3D
                material={material}
                font="./fonts/helvetiker_regular.typeface.json"
                size={0.75}
                height={0.2}
                curveSegments={6}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={3}
              >
                {quote
                  ? `${lineBreakString(quote.quote, 1, 5)}\n- ${quote.author}`
                  : "Hello World!"}
              </Text3D>
            </SelectToZoom>
          </Bounds>
        </Float>
      </Center>

      <Stars
        radius={10}
        depth={100}
        count={1000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </>
  );
}
