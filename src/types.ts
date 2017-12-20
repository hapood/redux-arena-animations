import { ReactNode } from "react";

export type AnimationProps = {
  onMount: (node: ReactNode) => void;
  onUnmount: (node: ReactNode) => void;
  onUpdate: (oldNode: ReactNode, newNode: ReactNode) => void;
  isRenderDisabled: boolean;
};
