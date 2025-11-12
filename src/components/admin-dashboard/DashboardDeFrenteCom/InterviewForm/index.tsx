"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  interviewFormSchema,
  InterviewFormData,
} from "@/lib/validations/interview-schema";
import { InterviewModel } from "@/models/interview/interview-model";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2, Loader2 } from "lucide-react";
import React from "react";
import { UserSearchSelect } from "./user-search-select";

interface InterviewFormProps {
  initialData?: InterviewModel;
  onSubmit: (data: InterviewFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
  onDataChange?: (data: InterviewFormData) => void;
}

export function InterviewForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
  onDataChange,
}: InterviewFormProps) {
  const form = useForm<InterviewFormData>({
    resolver: zodResolver(interviewFormSchema),
    defaultValues: {
      userId: initialData?.user.id ?? undefined,
      messages:
        initialData?.messages.map((msg) => ({
          id: msg.id,
          fromUser: msg.fromUser,
          content: msg.content,
        })) || [],
    },
  });

  React.useEffect(() => {
    const subscription = form.watch((value) => {
      onDataChange?.(value as InterviewFormData);
    });
    return () => subscription.unsubscribe();
  }, [form, onDataChange]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "messages",
  });

  const addNewMessage = (fromUser: boolean) => {
    append({ fromUser, content: "" });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Usuário da Entrevista</CardTitle>
          <CardDescription>
            Defina o usuário associado a esta entrevista.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="userId">
              Usuário <span className="text-red-500">*</span>
            </Label>
            <UserSearchSelect
              value={form.watch("userId")}
              onChange={(userId) => form.setValue("userId", userId)}
              disabled={!!initialData}
            />
            {form.formState.errors.userId && (
              <p className="text-sm text-red-500">
                {form.formState.errors.userId.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mensagens</CardTitle>
          <CardDescription>
            Adicione ou edite as mensagens da conversa.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="rounded-lg border p-4 space-y-3">
              <Label>
                Mensagem {index + 1} (de:{" "}
                {field.fromUser ? "Entrevistado" : "Roxinho"})
              </Label>
              <Textarea
                placeholder="Digite o conteúdo da mensagem..."
                {...form.register(`messages.${index}.content`)}
                className="min-h-[100px]"
              />
              {form.formState.errors.messages?.[index]?.content && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.messages[index]?.content?.message}
                </p>
              )}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => remove(index)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remover Mensagem
              </Button>
            </div>
          ))}

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => addNewMessage(false)}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Resposta
              (Roxinho)
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => addNewMessage(true)}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Resposta
              (Entrevistado)
            </Button>
          </div>
          {form.formState.errors.messages && (
            <p className="text-sm text-red-500">
              {form.formState.errors.messages.message}
            </p>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Salvar
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
