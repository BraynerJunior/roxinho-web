import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (

    <div className="bg-violet-eggplant-500 h-screen items-center flex justify-center" >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:grid-rows-4 gap-4 items-center w-450 h-205 bg-red-400 ">
      <Card className="col-span-1/2 w-[45%]   ">
        <CardHeader>
          <CardTitle>
            primeiro
          </CardTitle>
          <CardDescription>
            teste
          </CardDescription>
        </CardHeader>      
      </Card>
      <Card className="col-span-1 h-full">
        <CardHeader>
          <CardTitle>
            segundo
          </CardTitle>
          <CardDescription>
            teste
          </CardDescription>
        </CardHeader>      
      </Card>
      <Card className="col-span-1 h-full">
        <CardHeader>
          <CardTitle>
            terceiro
          </CardTitle>
          <CardDescription>
            teste
          </CardDescription>
        </CardHeader>      
      </Card>
      <Card className="col-span-1 row-span-1 h-[80%] w-[20rem] ">
        <CardHeader>
          <CardTitle>
           Quarto
          </CardTitle>
          <CardDescription>
            teste
          </CardDescription>
        </CardHeader>      
      </Card>
      <Card className="col-span-1 row-span-3 h-full my-2 w-[12rem]">
        <CardHeader>
          <CardTitle>
           quinto
          </CardTitle>
          <CardDescription>
            teste
          </CardDescription>
        </CardHeader>      
      </Card>
      <Card className="col-span-1 h-full w-[12rem] row-span-2">
        <CardHeader>
          <CardTitle>
            Sexto
          </CardTitle>
          <CardDescription>
            teste
          </CardDescription>
        </CardHeader>      
      </Card>
      <Card className="col-span-1 h-full w-[12rem]">
        <CardHeader>
          <CardTitle>
            Quem somos
          </CardTitle>
          <CardDescription>
            teste
          </CardDescription>
        </CardHeader>      
      </Card>
      <Card className="col-span-1 row-span-3 h-[85%] w-[20rem]">
        <CardHeader>
          <CardTitle>
          oitavo
          </CardTitle>
          <CardDescription>
            teste
          </CardDescription>
        </CardHeader>      
      </Card>
      </div>
    </div>
  );
}
