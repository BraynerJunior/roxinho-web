"use client"

import Lottie from "lottie-react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import verbatinsAnimation from "@/animations/verbatins.json";

export default function CardVerbatins() {
    return (
        <Card className="flex-1 w-full bg-violet-eggplant-100 hover:bg-violet-eggplant-200 duration-300 ease-out shadow-2xl hover:shadow-none hover:translate-y-3 items-center">
            <div className="flex flex-col">
                <div className="bg-white rounded-full mt-5 self-center">
                    <Lottie
                        animationData={verbatinsAnimation}
                        loop={true}
                        autoplay={true}
                        className="w-full h-46"
                    />
                </div>


                <CardContent className="pl-9 text-center md:text-start self-center mt-8">
                    <CardTitle className=" text-3xl ">Verbatins mounth</CardTitle>
                    <CardDescription className="text-center text-xl">
                    
                    </CardDescription>
                </CardContent>
            </div>
        </Card>
    );
}
