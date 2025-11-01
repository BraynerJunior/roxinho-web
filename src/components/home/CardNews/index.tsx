
import { Card, CardDescription, CardContent, CardTitle } from "../../ui/card";
import contactAnimation from "@/animations/contact.json";
import { LottieCard } from "@/components/LottieCard";
import Link from "next/link";

export default function CardNews() {
  return (
    <Link className="block h-full w-full" href="#">
      <Card className="cursor-pointer flex-auto w-full h-full justify-start md:justify-evenly bg-violet-eggplant-500 hover:bg-violet-eggplant-600 duration-300 ease-out shadow-2xl hover:shadow-none hover:translate-y-3 text-white items-center lg:items-start">

        <LottieCard wrapperStyle="bg-violet-eggplant-50 rounded-full  self-center " lottieStyle="w-full h-48" animationData={contactAnimation} />
        
        <CardContent className="pl-9 text-center md:text-start self-center">
          <CardTitle className="text-3xl sm:text-2xl xl:text-3xl text-center 3xl:text-start">
            Roxinho News
          </CardTitle>
          <CardDescription className=" text-white text-2xl">
            novidades
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
