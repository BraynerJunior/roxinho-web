
import { Card, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import gamingAnimation from "@/animations/gaming.json";
import Link from "next/link";

import { LottieCard } from "@/components/LottieCard";

export default function CardGaming() {
 

  return (
    <Link className="block h-full w-full" href="#">
      <Card
        className="cursor-pointer relative w-full h-full sm:min-h-40  duration-300 ease-out shadow-2xl hover:shadow-none hover:translate-y-3 bg-linear-to-tr from-violet-eggplant-400 to-violet-eggplant-200 hover:bg-linear-to-tr hover:from-violet-eggplant-200 hover:to-violet-eggplant-400 text-white transition"
        
      >
       
        <LottieCard animationData={gamingAnimation} wrapperStyle="absolute -right-10 -top-1/3" lottieStyle="w-full  h-42 sm:h-48" />
        <CardHeader>
          <CardTitle className="text-3xl sm:text-2xl xl:text-3xl text-center 3xl:text-start">
            Jogos
          </CardTitle>
             
          <CardDescription className="text-white text-2xl">
            Caça ao tesouro      
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
