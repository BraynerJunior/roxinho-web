export interface CreateInterviewMessageInput {
  interviewId: number | null | undefined;
  fromUser: boolean;
  content: string;
}