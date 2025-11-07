import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db/drizzle";
import { usersTable } from "@/db/drizzle/schema/users";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/validations/auth-schemas";
import { Session, AuthOptions } from "next-auth";
import type { JWT as JWTType } from "next-auth/jwt";
import type { User as NextAuthUser } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";

const authOptions: AuthOptions = {
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
        if (!parsed.success) throw new Error("Dados inválidos");

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
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWTType;
      user?: NextAuthUser | AdapterUser;
    }) {
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.role = (user as any).role || "user";
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWTType }) {
      if (session.user && token) session.user.role = token.role;
      return session;
    },
  },
};

export default authOptions;