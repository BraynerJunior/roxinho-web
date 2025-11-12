import { SiteHeader } from "@/components/ui/site-header";
import AdminHomeCardDeFrenteCom from "./home-card-defrentecom";
import AdminHomeCardOurResults from "./home-card-our-results";
import AdminHomeCardGames from "./home-card-games";
import AdminHomeCardRoxinhoNews from "./home-card-roxinho-news";

export function HomeSectionCards() {
  return (
    <>
      <SiteHeader title="Resumo" />
      <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <AdminHomeCardDeFrenteCom />
        <AdminHomeCardOurResults />
        <AdminHomeCardGames />
        <AdminHomeCardRoxinhoNews />
      </div>
    </>
  );
}
