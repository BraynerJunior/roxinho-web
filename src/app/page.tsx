import CardCampanhaNews from "@/components/CardCampanhasNews";
import CardCorridaEspacial from "@/components/CardCorridaEspacial";
import CardDeFrenteCom from "@/components/CardFrenteCom";
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
            <CardDeFrenteCom />
          </div>
        </div>
      </div>
    </main>
  );
}
