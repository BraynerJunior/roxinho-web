import { z } from "zod";

const messageSchema = z.object({
  id: z.number().optional(),
  fromUser: z.boolean(),
  content: z.string().min(1, "O conteúdo da mensagem não pode ser vazio."),
});

export const interviewFormSchema = z.object({
  userId: z.number(),
  messages: z.array(messageSchema),
});

export type InterviewFormData = z.infer<typeof interviewFormSchema>;
