// src/app/api/auth/[...nextauth]/route.ts
import authOptions from "@/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export const GET = handler.GET;
export const POST = handler.POST;
