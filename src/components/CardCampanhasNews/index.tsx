"use client"

import Lottie from "lottie-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import campanhasAnimations from "@/animations/campanhas.json"
export default function CardCampanhaNews() {
    return (
       <Card className="flex-1 w-full bg-violet-eggplant-100 hover:bg-violet-eggplant-200 duration-300 ease-out shadow-2xl hover:shadow-none hover:translate-y-3">
            <div className="flex flex-col justify-start md:justify-evenly">
                <div className="bg-[#FBFBFB] rounded-full mt-5 self-center ">
                    <Lottie
                        animationData={campanhasAnimations}
                        loop={true}
                        autoplay={true}
                        className="w-full h-46"
                    />
                </div>
                <CardContent className="pl-9 text-center md:text-start self-center mt-8">
                    <CardTitle className=" text-3xl ">Nossos Resultados</CardTitle>
                    <CardDescription className="text-center text-xl">
                        Veja quem são os melhores
                    </CardDescription>
                </CardContent>
            </div>
        </Card>

    );
}