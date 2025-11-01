


import { Card, CardContent, CardTitle } from "../../ui/card";
import verbatinsAnimation from "@/animations/verbatins.json";
import { LottieCard } from "@/components/LottieCard";
import Link from "next/link";

export default function CardVerbatins() {
  return (
    <Link className="block h-full w-full" href="#">
      <Card className="cursor-pointer flex-1 w-full h-full bg-violet-eggplant-100 hover:bg-violet-eggplant-200 duration-300 ease-out shadow-2xl hover:shadow-none hover:translate-y-3 items-center">
        <div className="flex flex-col">
          

          <LottieCard animationData={verbatinsAnimation} wrapperStyle="bg-violet-eggplant-50 rounded-full mt-5 self-center" lottieStyle="w-full h-46" />


          <CardContent className="pl-9 text-center xl:text-start self-center mt-8">
            <CardTitle className="text-3xl sm:text-2xl xl:text-3xl text-center 3xl:text-start">
              Verbatins mounth
            </CardTitle>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
