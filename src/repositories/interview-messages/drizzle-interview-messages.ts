import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { interviewMessagesTable } from "@/db/drizzle/schema";
import { InterviewMessageModel } from "@/models/interview-messages/interview-message-model";
import { InterviewMessageRepository } from "./interview-messages-repository";

export class DrizzleInterviewMessageRepository implements InterviewMessageRepository {
  async findByInterviewId(interviewId: number): Promise<InterviewMessageModel[]> {
    const results = await db
      .select({
        id: interviewMessagesTable.id,
        interviewId: interviewMessagesTable.interviewId,
        fromUser: interviewMessagesTable.fromUser,
        content: interviewMessagesTable.content,
        createdAt: interviewMessagesTable.createdAt,
      })
      .from(interviewMessagesTable)
      .where(eq(interviewMessagesTable.interviewId, interviewId))
      .orderBy(interviewMessagesTable.id);

    return results.map((msg) => ({
      id: msg.id,
      interviewId: msg.interviewId,
      fromUser: msg.fromUser,
      content: msg.content,
      createdAt: msg.createdAt.toISOString(),
    }));
  }

  async create(data: Omit<InterviewMessageModel, "id" | "createdAt">): Promise<InterviewMessageModel> {
    const [newMessage] = await db
      .insert(interviewMessagesTable)
      .values({
        interviewId: data.interviewId,
        fromUser: data.fromUser,
        content: data.content,
      })
      .returning({
        id: interviewMessagesTable.id,
        interviewId: interviewMessagesTable.interviewId,
        fromUser: interviewMessagesTable.fromUser,
        content: interviewMessagesTable.content,
        createdAt: interviewMessagesTable.createdAt,
      });

    return {
      id: newMessage.id,
      interviewId: newMessage.interviewId,
      fromUser: newMessage.fromUser,
      content: newMessage.content,
      createdAt: newMessage.createdAt.toISOString(),
    };
  }
}
