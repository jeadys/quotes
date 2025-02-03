import { BoundsApi, useBounds } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";

type Props = {
  children: React.ReactNode;
};

export const SelectToZoom = ({ children }: Props) => {
  const api: BoundsApi = useBounds();

  return (
    <group
      onClick={(e: ThreeEvent<MouseEvent>) => (
        e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit()
      )}
      onPointerMissed={(e: MouseEvent) => e.button === 0 && api.refresh().fit()}
    >
      {children}
    </group>
  );
};
