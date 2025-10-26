"use client";

import Lottie from "lottie-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import contactAnimation from "@/animations/contact.json";

export default function CardNews() {

  return (
    <Card
      className="flex-grow w-full justify-start bg-violet-eggplant-600 hover:bg-violet-eggplant-700 duration-300 ease-out shadow-2xl hover:shadow-none hover:translate-y-3 text-white items-center lg:items-start"
    >
      <div className="bg-white rounded-full mt-20 ml-4">
        <Lottie
          animationData={contactAnimation}
          loop={true}
          autoplay={true}
          className="w-full h-48"
        />
      </div>
      <CardHeader className="pl-9 -translate-x-1/1 lg:translate-x-0 text-center md:text-start">
        <CardTitle className=" text-3xl ">Roxinho News</CardTitle>
        <CardDescription className=" text-white text-2xl">
          novidades
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
