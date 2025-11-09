import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db/drizzle";
import { usersTable } from "@/db/drizzle/schema/users";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/validations/auth-schemas";

const authConfig = NextAuth({
  secret: process.env.AUTH_SECRET,
  debug: true,
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("🟣 Credenciais recebidas:", credentials);

          const parsed = loginSchema.safeParse(credentials);
          if (!parsed.success) {
            console.error("❌ Erro ao validar schema:", parsed.error);
            throw new Error("Dados inválidos");
          }

          const { email, password } = parsed.data;

          const [user] = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email));

          console.log("🟢 Usuário encontrado:", user);

          if (!user) throw new Error("Usuário não encontrado");

          if (!user.passwordHash) {
            console.error("🔥 Usuário não possui hash de senha.");
            throw new Error("Erro de configuração do usuário");
          }

          const valid = await bcrypt.compare(password, user.passwordHash);
          console.log("🧩 Senha válida?", valid);

          if (!valid) throw new Error("Senha incorreta");

          const finalUser = {
            id: user.id.toString(),
            email: user.email,
            name: user.email,
            role: user.systemRole ?? "not_allowed",
          };

          console.log("✅ Usuário autenticado:", finalUser);
          return finalUser;
        } catch (err) {
          console.error("🔥 Erro no authorize():", err);
          throw err;
        }
      },
    }),
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token) {
        session.user.role = token.role as string | undefined;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});

export const handlers = authConfig.handlers;
export const signIn = authConfig.signIn;
export const signOut = authConfig.signOut;
export const auth = authConfig.auth;
