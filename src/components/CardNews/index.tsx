"use client";

import Lottie from "lottie-react";
import {
  Card,
  CardDescription,
  CardContent,
  CardTitle,
} from "../ui/card";
import contactAnimation from "@/animations/contact.json";

export default function CardNews() {

  return (
    <Card
      className="flex-auto w-full justify-start md:justify-evenly bg-violet-eggplant-600 hover:bg-violet-eggplant-700 duration-300 ease-out shadow-2xl hover:shadow-none hover:translate-y-3 text-white items-center lg:items-start"
    >
      <div className="bg-white rounded-full  self-center">
        <Lottie
          animationData={contactAnimation}
          loop={true}
          autoplay={true}
          className="w-full h-48"
        />
      </div>
      <CardContent className="pl-9 text-center md:text-start self-center">
        <CardTitle className=" text-3xl ">Roxinho News</CardTitle>
        <CardDescription className=" text-white text-2xl">
          novidades
        </CardDescription>
      </CardContent>
    </Card>
  );
}
