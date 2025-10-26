"use client";

import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useRef } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import gamingAnimation from "@/animations/gaming.json";

export default function CardGaming() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <Card
      className="relative h-1/4 w-full md:mt-15 min-h-40  duration-300 ease-out shadow-2xl hover:shadow-none hover:translate-y-3 bg-linear-to-r from-indigo-800 to-blue-500 text-white"
      onMouseEnter={() => lottieRef.current?.play()}
      onMouseLeave={() => lottieRef.current?.stop()}
    >
      <div className="absolute -right-5 -top-1/3">
        <Lottie
          lottieRef={lottieRef}
          animationData={gamingAnimation}
          loop={true}
          autoplay={false}
          className="w-full h-48"
        />
      </div>
      <CardHeader>
                <CardTitle className="text-3xl">Jogos</CardTitle>   
        <CardDescription className="text-white text-2xl">
                    Caça ao tesouro      
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
