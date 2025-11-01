
"use client";

import { useRef, useEffect } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function LottieCard({ animationData, wrapperStyle, lottieStyle }: { animationData: any, wrapperStyle: string, lottieStyle: string }) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const wrapperRef = useRef<HTMLDivElement>(null); // Ref para o wrapper div

  useEffect(() => {
    const lottieInstance = lottieRef.current;
    const wrapperElement = wrapperRef.current;

    // 1. Crie o observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          lottieInstance?.play();
        } else {
          lottieInstance?.stop();
        }
      },
      { threshold: 0.1 } // Toca quando 10% estiver visível
    );

    // 2. Observe o elemento
    if (wrapperElement) {
      observer.observe(wrapperElement);
    }

    // 3. Função de limpeza
    return () => {
      // Pare de observar
      if (wrapperElement) {
        observer.unobserve(wrapperElement);
      }
      // Destrua a animação
      if (lottieInstance) {
        lottieInstance.stop();
        lottieInstance.destroy();
      }
    };
  }, []); // Array vazio

  return (
    <div className={wrapperStyle} ref={wrapperRef}>
      <Lottie
        // 4. Passamos o 'ref' para o componente Lottie
        lottieRef={lottieRef}
        animationData={animationData} // Recebe a animação por prop
        loop={true}
        autoplay={false}
        className={lottieStyle}
      />
      {/* ...resto do seu card... */}
    </div>
  );
}

