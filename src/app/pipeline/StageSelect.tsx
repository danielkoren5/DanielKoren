"use client";

import { useRef } from "react";
import { moveDealStage } from "./actions";

export function StageSelect({
  dealId,
  currentStageId,
  stages,
}: {
  dealId: string;
  currentStageId: string;
  stages: { id: string; name: string }[];
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={moveDealStage}
      onClick={(e) => e.stopPropagation()}
      className="mt-1"
    >
      <input type="hidden" name="dealId" value={dealId} />
      <select
        name="stageId"
        defaultValue={currentStageId}
        onChange={() => formRef.current?.requestSubmit()}
        className="field !py-1.5 !text-[11.5px] cursor-pointer"
        aria-label="העברת עסקה לשלב אחר"
      >
        {stages.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
    </form>
  );
}
