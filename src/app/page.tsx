
import CardGaming from "@/components/CardGaming";
import CardNews from "@/components/CardNews";
import CardOurResults from "@/components/CardOurResults";
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
    <div className="bg-violet-eggplant-300 min-h-[100svh] w-[100svw] justify-center flex ">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-items-center w-[90%] my-14 gap-y-3 gap-x-4">
        <div className="md:h-[90%] flex flex-col items-center justify-between space-y-5 w-full">
          <Card className="relative w-full md:mt-15 min-h-40 duration-300 ease-out shadow-2xl hover:shadow-none hover:translate-y-3">
            <CardHeader className="absolute left-1/3 text-center top-1/3 md:-translate-x-2/3 ">
              <CardTitle className="text-2xl">Roxinho.Web</CardTitle>
              <CardDescription className="text-xl">Quem somos</CardDescription>
            </CardHeader>
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center justify-center w-25 h-25 rounded-full bg-purple-950">
              <Image
                src="/images/mascote.png"
                alt="Mascote"
                fill
                className="object-cover rounded-full border-[#8232A4] border-3"
              />
            </div>
          </Card>
          <CardNews />
        </div>

        <div className="md:h-[90%] flex flex-col space-y-5 w-full items-center justify-between">
          <Card className="flex-auto w-full">
            <CardHeader>
              <CardTitle>Campanhas News</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
          </Card>
          <Card className="flex-auto w-full">
            <CardHeader>
              <CardTitle>Corrida Espacial</CardTitle>
              <CardDescription>Saiba mais</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="md:h-[90%] flex flex-col space-y-5 w-full items-center justify-between">
          <CardOurResults />

          <Card className="flex-auto w-full">
            <CardHeader>
              <CardTitle>Verbatins Month</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="md:h-[90%] flex flex-col space-y-5 w-full items-center justify-between">
          <CardGaming />

          <Card className="group relative flex-auto w-full justify-end bg-violet-eggplant-600 hover:bg-violet-eggplant-500 duration-300 ease-out shadow-2xl hover:shadow-none hover:translate-y-3 text-white items-center lg:items-start overflow-hidden">
            <div className="absolute inset-0 opacity-0 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-500 brightness-70 delay-200">
              <Image
                src="/images/pessoasAleatorio.png"
                alt="Imagem de uma pessoa aleatoria"
                width={400}
                height={100}
                className="w-full h-full object-cover object-center -z-10 "
              />
            </div>
            <CardContent className=" mt-20 pl-11 lg:pl-0 self-center transition-transform duration-700 ease-in-out group-hover:rotate-x-50 group-hover:rotate-z-45 group-hover:scale-0">
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
  );
}
