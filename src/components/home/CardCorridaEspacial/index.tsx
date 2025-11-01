
import { Card, CardContent, CardDescription, CardTitle } from "../../ui/card";
import rocketAnimation from "@/animations/rocket.json";
import { LottieCard } from "@/components/LottieCard";
import Link from "next/link";

export default function CardCorridaEspacial() {
  return (
    <Link className="block h-full w-full" href="#">
      <Card className="cursor-pointer flex-1 w-full h-full bg-violet-eggplant-100 hover:bg-violet-eggplant-200 duration-300 ease-out shadow-2xl hover:shadow-none hover:translate-y-3">
        <div className="flex flex-col justify-start md:justify-evenly">
          
          <LottieCard animationData={rocketAnimation} wrapperStyle="bg-[#FBFBFB] rounded-full mt-5 self-center py-6 px-7" lottieStyle="w-full h-46" />
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
