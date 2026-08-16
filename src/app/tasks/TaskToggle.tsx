"use client";

import { useRef, useTransition } from "react";
import { setTaskDone } from "./actions";
import { IconCheck } from "@/components/icons";

export function TaskToggle({ taskId, done }: { taskId: string; done: boolean }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <form ref={formRef} action={setTaskDone}>
      <input type="hidden" name="taskId" value={taskId} />
      <input type="hidden" name="done" value={String(!done)} />
      <button
        type="submit"
        disabled={isPending}
        aria-label={done ? "סמן כלא הושלמה" : "סמן כהושלמה"}
        onClick={(e) => {
          e.preventDefault();
          startTransition(() => formRef.current?.requestSubmit());
        }}
        className="w-5 h-5 rounded-md border flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-50"
        style={{
          borderColor: done ? "var(--success)" : "var(--border)",
          background: done ? "var(--success)" : "transparent",
          color: "#fff",
        }}
      >
        {done && <IconCheck className="w-3 h-3" strokeWidth={3} />}
      </button>
    </form>
  );
}
