import { db } from "@/db/drizzle";
import { profilesTable } from "@/db/drizzle/schema/profiles";
import { eq } from "drizzle-orm";
import { ProfileRepository, UpdateProfileInput } from "./profile-repository";
import { ProfileModel } from "@/models/profile/profile-model";

export class DrizzleProfileRepository implements ProfileRepository {
  async findByUserId(userId: number) {
    const [profile] = await db
      .select()
      .from(profilesTable)
      .where(eq(profilesTable.userId, userId))
      .limit(1);

    return profile ?? null;
  }

  async updateByUserId(
    userId: number,
    data: UpdateProfileInput
  ): Promise<ProfileModel> {
    const [updated] = await db
      .update(profilesTable)
      .set(data)
      .where(eq(profilesTable.userId, userId))
      .returning();

    return updated;
  }
}

