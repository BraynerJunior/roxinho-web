"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { InterviewModel } from "@/models/interview/interview-model";
import {
  createInterview,
  getFullInterviewDetails,
  updateInterview,
} from "@/actions/interviews";
import { InterviewFormData } from "@/lib/validations/interview-schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, X } from "lucide-react";
import { InterviewForm } from "../InterviewForm";
import { InterviewPreview } from "./InterviewPreview";
import { findUserByIdAction } from "@/actions/users/find-users-by-id";

interface InterviewDetailPaneProps {
  selectedId: number | "new" | null;
  onClear: () => void;
  onUpsertRow?: (row: import("@/models/interview/interview-summary-model").InterviewSummary) => void;
}

export function InterviewDetailPane({
  selectedId,
  onClear,
  onUpsertRow,
}: InterviewDetailPaneProps) {
  const [interview, setInterview] = useState<InterviewModel | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<InterviewFormData>>({});
  const [previewUser, setPreviewUser] = useState<InterviewModel["user"] | null>(null);
  const router = useRouter();

  const mode =
    selectedId === "new"
      ? "new"
      : typeof selectedId === "number"
      ? "edit"
      : "placeholder";

  useEffect(() => {
    if (mode === "edit") {
      const fetchDetails = async () => {
        setIsLoading(true);
        setInterview(null);
        try {
          const data = await getFullInterviewDetails(selectedId as number);
          setInterview(data);
          setFormData({
            userId: data.user.id ?? undefined,
            messages: data.messages.map((m) => ({
              id: m.id,
              content: m.content,
              fromUser: m.fromUser,
            })),
          });
          setPreviewUser(data.user);
        } catch (error) {
          console.error("Erro ao buscar detalhes da entrevista:", error);
          onClear();
        } finally {
          setIsLoading(false);
        }
      };
      fetchDetails();
    } else {
      setInterview(null);
      setFormData({});
      setPreviewUser(null);
      setIsLoading(false);
    }
  }, [selectedId, mode, onClear]);

  useEffect(() => {
    const fetchUser = async () => {
      if (formData.userId) {
        try {
          const user = await findUserByIdAction(formData.userId);
          if (user) {
            // map minimal action result to the preview user shape
            setPreviewUser({
              id: user.id,
              name: user.name ?? null,
              avatarUrl: null,
              role: null,
            });
          }
        } catch (err) {
          console.error("Erro ao buscar usuário para preview:", err);
          setPreviewUser(null);
        }
      } else {
        setPreviewUser(null);
      }
    };
    fetchUser();
  }, [formData.userId]);

  const handleCreate = async (data: InterviewFormData) => {
    setIsSubmitting(true);
    const result = await createInterview(data);
    setIsSubmitting(false);

    if (result.success) {
      // optimistic update: insert a lightweight summary row so the table updates immediately
      try {
        const newId = result.interviewId as number | undefined;
        const row = {
          id: newId ?? Date.now(),
          userId: data.userId ?? undefined,
          email: "",
          username: previewUser?.name ?? "Usuário",
          avatarUrl: previewUser?.avatarUrl ?? undefined,
          jobRole: previewUser?.role ?? undefined,
          createdAt: new Date().toISOString(),
        } as import("@/models/interview/interview-summary-model").InterviewSummary;
        onUpsertRow?.(row);
      } catch {
        // ignore optimistic update failures
      }
      router.refresh();
      onClear();
    }
  };

  const handleUpdate = async (data: InterviewFormData) => {
    if (mode !== "edit") return;

    setIsSubmitting(true);
    const result = await updateInterview(selectedId as number, data);
    setIsSubmitting(false);

    if (result.success) {
      // optimistic update: update existing row in the table
      try {
        const row = {
          id: selectedId as number,
          userId: data.userId ?? undefined,
          email: "",
          username: previewUser?.name ?? "Usuário",
          avatarUrl: previewUser?.avatarUrl ?? undefined,
          jobRole: previewUser?.role ?? undefined,
          createdAt: interview?.createdAt ?? new Date().toISOString(),
        } as import("@/models/interview/interview-summary-model").InterviewSummary;
        onUpsertRow?.(row);
      } catch {
        // ignore
      }
      router.refresh();
      onClear();
    }
  };

  if (mode === "placeholder") {
    return (
      <Card className="sticky top-20 border-dashed">
        <CardContent className="flex justify-center items-center h-48">
          <p className="text-sm text-muted-foreground">
            Selecione uma entrevista para ver os detalhes ou crie uma nova.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="sticky top-20">
        <CardContent className="flex justify-center items-center h-48">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="sticky top-20 space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {mode === "new" ? "Nova Entrevista" : "Editar Entrevista"}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClear}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="col-span-1">
          {!isLoading &&
            (mode === "new" || (mode === "edit" && interview)) && (
              <InterviewForm
                key={interview?.id || "new"}
                initialData={interview ?? undefined}
                onSubmit={mode === "new" ? handleCreate : handleUpdate}
                onCancel={onClear}
                isSubmitting={isSubmitting}
                onDataChange={setFormData}
              />
            )}
        </div>
        <div className="col-span-1">
          {/* InterviewPreview already renders its own Card; render it directly to avoid double-wrapping */}
          <InterviewPreview formData={formData} user={previewUser} createdAt={interview?.createdAt} />
        </div>
      </div>
    </div>
  );
}
