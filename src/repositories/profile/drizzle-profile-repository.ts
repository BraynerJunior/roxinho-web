import { db } from "@/db/drizzle";
import { profilesTable } from "@/db/drizzle/schema/profiles";
import { eq } from "drizzle-orm";
import { ProfileRepository, UpdateProfileInput } from "./profile-repository";
import { ProfileModel } from "@/models/profile/profile-model";

export class DrizzleProfileRepository implements ProfileRepository {
  async findByUserId(userId: number) {
    const [profile] = await db
      .select(
        {
          userId: profilesTable.userId,
          jobRoleId: profilesTable.jobRoleId,
          name: profilesTable.name,
          bio: profilesTable.bio,
          avatarUrl: profilesTable.avatarUrl,
          createdAt: profilesTable.createdAt,
          updatedAt: profilesTable.updatedAt
        }
      )
      .from(profilesTable)
      .where(eq(profilesTable.userId, userId))
      .limit(1);

      console.log(profile)

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

