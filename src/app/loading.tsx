import { LottieCard } from "@/components/LottieCard";
import loadingAnimation from "@/animations/loading.json";

export default function Loading() {
  return (
    <main className="bg-[url(/images/backgroundhome.svg)] bg-cover bg-center bg-no-repeat min-h-screen">
        <div className="flex flex-col justify-center items-center h-screen">
        <LottieCard animationData={loadingAnimation} wrapperStyle="" lottieStyle="h-100 w-150"/>
        <h2 className="text-white text-3xl ">Carregando...</h2>
        </div>
    </main>
  );
}
