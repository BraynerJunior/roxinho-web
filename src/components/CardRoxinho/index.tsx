
import { Card, CardDescription, CardTitle } from "../ui/card";
import Image from "next/image";

export default function CardRoxinho() {
    return (
        <Card className="cursor-pointer relative w-full  min-h-40 duration-300 ease-out shadow-2xl hover:shadow-none hover:translate-y-3 items-center justify-center
        bg-linear-to-tr from-violet-eggplant-400 to-violet-eggplant-200 hover:from-violet-eggplant-200 hover:to-violet-eggplant-400 text-white transition">
            <div className="items-center justify-center flex flex-col  text-center  ">
                <CardTitle className="text-2xl text-white">Roxinho.Web</CardTitle>
                <CardDescription className="text-xl text-white">Quem somos</CardDescription>
            </div>
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center justify-center w-25 h-25 rounded-full bg-purple-950">
                <Image
                    src="/images/mascote.png"
                    alt="Mascote"
                    fill
                    className="object-cover rounded-full border-[#8232A4] border-3"
                />
            </div>
        </Card>
    );
}