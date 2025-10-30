import CardCampanhaNews from "@/components/CardCampanhasNews";
import CardCorridaEspacial from "@/components/CardCorridaEspacial";
import CardGaming from "@/components/CardGaming";
import CardNews from "@/components/CardNews";
import CardOurResults from "@/components/CardOurResults";
import CardRoxinho from "@/components/CardRoxinho";
import CardVerbatins from "@/components/CardVerbatins";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { IoPersonOutline } from "react-icons/io5";

export default function Home() {
  return (
    <main className="bg-[url(/images/backgroundhomee.jpg)] bg-cover bg-center bg-no-repeat min-h-screen">
      <div className="w-full justify-center flex">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-items-center w-[90%] items-stretch my-14 gap-4 place-content-start">
          <div className="flex flex-col w-full h-full items-center md:justify-between gap-5">
            <CardRoxinho />
            <CardNews />
          </div>

          <div className="flex flex-col w-full h-full items-center justify-between gap-5">
            <CardCampanhaNews />
            <CardCorridaEspacial />
          </div>

          <div className="flex flex-col w-full h-full items-center justify-between gap-5">
            <CardOurResults />
            <CardVerbatins />
          </div>

          <div className="flex flex-col w-full h-full items-center justify-between gap-5">
            <CardGaming />
            <Card className="group relative flex-auto w-full justify-end bg-violet-eggplant-500 hover:bg-violet-eggplant-600 duration-300 ease-out shadow-2xl hover:shadow-none hover:translate-y-3 text-white items-center lg:items-start overflow-hidden">
              <div className="absolute inset-0 opacity-0 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-500 brightness-70 delay-200">
                <Image
                  src="/images/pessoasAleatorio.png"
                  alt="Imagem de uma pessoa aleatoria"
                  width={400}
                  height={100}
                  className="w-full h-full object-cover object-center -z-10 "
                />
              </div>
              <CardContent className="mt-20 pl-11 lg:pl-0 self-center transition-transform duration-700 ease-in-out group-hover:scale-0">
                <IoPersonOutline className="w-[8rem] md:w-[12rem] h-full p-0 m-0 " />
              </CardContent>
              <CardHeader className="min-w-70 pl-9 lg:pl-8 lg:translate-x-0 text-center md:text-start z-10 mt-20 ">
                <CardTitle className=" text-2xl ">De frente com...</CardTitle>
                <CardDescription className=" text-white text-xl">
                  Saiba quem é a celebridade da vez
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
