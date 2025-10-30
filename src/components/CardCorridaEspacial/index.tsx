"use client";

import Lottie from "lottie-react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import rocketAnimation from "@/animations/rocket.json";
import Link from "next/link";

export default function CardCorridaEspacial() {
  return (
    <Link className="block h-full w-full" href="#">
      <Card className="cursor-pointer flex-1 w-full h-full bg-violet-eggplant-100 hover:bg-violet-eggplant-200 duration-300 ease-out shadow-2xl hover:shadow-none hover:translate-y-3">
        <div className="flex flex-col justify-start md:justify-evenly">
          <div className="bg-[#FBFBFB] rounded-full mt-5 self-center py-6 px-7">
            <Lottie
              animationData={rocketAnimation}
              loop={true}
              autoplay={true}
              className="w-full h-46"
            />
          </div>
          <CardContent className="pl-9 text-center md:text-start self-center mt-8">
            <CardTitle className="text-3xl sm:text-2xl xl:text-3xl text-center 3xl:text-start">
              Corrida Espacial
            </CardTitle>
            <CardDescription className="text-center text-xl">
              Saiba mais
            </CardDescription>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
