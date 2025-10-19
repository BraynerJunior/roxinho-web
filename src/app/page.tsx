import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoNewspaperSharp } from "react-icons/io5";
import { IoPersonSharp } from "react-icons/io5";

export default function Home() {
  return (
    <div className="bg-violet-eggplant-500 min-h-[100svh] w-[100svw] justify-center flex">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-items-center w-[90%] bg-red-400 my-10 gap-y-3 gap-x-4">
        <div className="h-full flex flex-col items-center justify-between space-y-5 w-full">
          <Card className="relative h-1/4 w-full md:mt-15">
            <CardHeader>
              <CardTitle>Quem somos</CardTitle>
              <CardDescription>sobre nossa equipe</CardDescription>
            </CardHeader>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center w-14 h-14 rounded-full bg-purple-950">
              <IoPersonSharp className="text-white" />
            </div>
          </Card>
          <Card className="flex-grow w-full justify-around">
            <CardContent className="self-center">
              <IoNewspaperSharp className="w-[10rem] h-full text-violet-eggplant-500" />
            </CardContent>
            <CardHeader>
              <CardTitle className="text-center">Roxinho News</CardTitle>
              <CardDescription className="text-center">
                novidades
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="h-full flex flex-col space-y-5 w-full items-center justify-between">
          <Card className="h-full w-full">
            <CardHeader>
              <CardTitle>segundo</CardTitle>
              <CardDescription>teste</CardDescription>
            </CardHeader>
          </Card>
          <Card className="h-full w-full">
            <CardHeader>
              <CardTitle>Sexto</CardTitle>
              <CardDescription>teste</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="h-full flex flex-col space-y-5 w-full items-center justify-between">
          <Card className="h-full w-full">
            <CardHeader>
              <CardTitle>terceiro</CardTitle>
              <CardDescription>teste</CardDescription>
            </CardHeader>
          </Card>

          <Card className="h-full w-full">
            <CardHeader>
              <CardTitle>Quem somos</CardTitle>
              <CardDescription>teste</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="h-full flex flex-col space-y-5 items-center justify-between">
          <Card className="h-[80%] w-full min-w-[20rem] ">
            <CardHeader>
              <CardTitle>Quarto</CardTitle>
              <CardDescription>teste</CardDescription>
            </CardHeader>
          </Card>

          <Card className="h-[85%] w-full min-w-[20rem]">
            <CardHeader>
              <CardTitle>oitavo</CardTitle>
              <CardDescription>teste</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
