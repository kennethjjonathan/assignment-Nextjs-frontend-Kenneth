import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

type ModalBaseProps = {
  children: React.ReactNode;
  isOpen: boolean;
};

function ModalBase({ children, isOpen }: ModalBaseProps) {
  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal");
  }, []);

  return isOpen && ref.current
    ? createPortal(
        <div className="fixed h-full w-full top-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-[1000]">
          {children}
        </div>,
        ref.current
      )
    : null;
}

export default ModalBase;
