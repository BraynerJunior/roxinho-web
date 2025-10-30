"use client";

import Lottie from "lottie-react";
import { Card, CardDescription, CardContent, CardTitle } from "../ui/card";
import podiumAnimation from "@/animations/podium.json";

export default function CardOurResults() {
  return (
    <Card className="cursor-pointer flex-1 w-full bg-violet-eggplant-100 hover:bg-violet-eggplant-200 duration-300 ease-out shadow-2xl hover:shadow-none hover:translate-y-3">
      <div className="flex flex-col justify-start md:justify-evenly">
        <div className="bg-white rounded-full mt-20 ml-4 self-center">
          <Lottie
            animationData={podiumAnimation}
            loop={true}
            autoplay={true}
            className="w-full h-48"
          />
        </div>
        <CardContent className="pl-9 text-center xl:text-start self-center mt-8">
          <CardTitle className="text-3xl text-center 3xl:text-start">Nossos Resultados</CardTitle>
          <CardDescription className="text-center text-xl">
            Veja quem são os melhores
          </CardDescription>
        </CardContent>
      </div>
    </Card>
  );
}
