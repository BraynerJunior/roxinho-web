import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { IoPersonOutline } from "react-icons/io5";
import Link from "next/link";

export default function CardDeFrenteCom() {
  return (
      <Link href="defrentecom" className="block w-full h-full">
    <Card
      className="group relative flex-auto w-full h-full justify-end bg-violet-eggplant-500 hover:bg-violet-eggplant-600 duration-300 ease-out shadow-2xl hover:shadow-none hover:translate-y-3 text-white items-center lg:items-start overflow-hidden"
    >
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
      </Link>
  );
}
