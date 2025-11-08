import CardCampanhaNews from "@/components/home/CardCampanhasNews";
import CardCorridaEspacial from "@/components/home/CardCorridaEspacial";
import CardDeFrenteCom from "@/components/home/CardFrenteCom";
import CardGaming from "@/components/home/CardGaming";
import CardNews from "@/components/home/CardNews";
import CardOurResults from "@/components/home/CardOurResults";
import CardRoxinho from "@/components/home/CardRoxinho";
import CardVerbatins from "@/components/home/CardVerbatins";
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="bg-[url(/images/backgroundhome.svg)] bg-cover bg-center bg-no-repeat min-h-screen">
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
