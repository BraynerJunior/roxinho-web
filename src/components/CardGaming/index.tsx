"use client";

import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useRef } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import gamingAnimation from "@/animations/gaming.json";

export default function CardGaming() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <Card
      className="cursor-pointer relative w-full sm:min-h-40  duration-300 ease-out shadow-2xl hover:shadow-none hover:translate-y-3 bg-linear-to-tr from-violet-eggplant-400 to-violet-eggplant-200 hover:bg-linear-to-tr hover:from-violet-eggplant-200 hover:to-violet-eggplant-400 text-white transition"
      onMouseEnter={() => lottieRef.current?.play()}
      onMouseLeave={() => lottieRef.current?.stop()}
    >
      <div className="absolute -right-10 -top-1/3">
        <Lottie
          lottieRef={lottieRef}
          animationData={gamingAnimation}
          loop={true}
          autoplay={false}
          className="w-full  h-42 sm:h-48"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-3xl sm:text-2xl lg:text-3xl">Jogos</CardTitle>   
        <CardDescription className="text-white text-2xl">
          Caça ao tesouro      
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
