import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db/drizzle";
import { usersTable } from "@/db/drizzle/schema/users";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs"; // certifique-se de instalar:
import { loginSchema } from "../validations/auth-schemas";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) {
          throw new Error("Dados inválidos");
        }

        const { email, password } = parsed.data;

        const [user] = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, email));

        if (!user) throw new Error("Usuário não encontrado");

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) throw new Error("Senha incorreta");

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.email,
          role: user.systemRole,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
});
