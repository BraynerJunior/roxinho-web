import { UserModel } from "@/models/user/user-model";
import { RegisterInput, UserRepository } from "./user-repository";
import { resolve } from "path";
import { readFile } from "fs/promises";
import { SIMULATE_WAIT_IN_MS } from "@/lib/constants";

const ROOT_DIR = process.cwd();
const JSON_USERS_FILE_PATH = resolve(
  ROOT_DIR,
  "src",
  "db",
  "seed",
  "users.json"
);

export class JsonUserRepository implements UserRepository {
  create(
    data: RegisterInput
  ): Promise<
    | { success: true; user: { id: number; email: string } }
    | { success: false; message: string }
  > {
    throw new Error("Method not implemented.");
  }
  private async simulateWait() {
    if (SIMULATE_WAIT_IN_MS <= 0) return;

    await new Promise((resolve) => setTimeout(resolve, SIMULATE_WAIT_IN_MS));
  }

  private async readFromDisk(): Promise<UserModel[]> {
    const jsonContent = await readFile(JSON_USERS_FILE_PATH, "utf-8");
    const parsedJson = JSON.parse(jsonContent);
    const { users } = parsedJson;
    return users;
  }

  async findAll(): Promise<UserModel[]> {
    await this.simulateWait();

    const users = await this.readFromDisk();
    return users;
  }

  async findById(id: string): Promise<UserModel> {
    const users = await this.findAll();
    const user = users.find((user) => user.id.toString() === id);

    if (!user) throw new Error("Usuário não encontrado para ID");

    return user;
  }
}
