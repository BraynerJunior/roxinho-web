import Link from "next/link";
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="bg-[url(/images/backgroundhomee.jpg)] bg-cover bg-center bg-no-repeat min-h-screen">
        <div className="flex">
            <Link href="/login">Login</Link>
            <Link href="/register">Registrar</Link>
        </div>
    </main>
  );
}
