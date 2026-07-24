"use client";

import { createExpense } from "@/app/expenses/actions";
import { useActionState } from "react";

export default function Page() {
  const [state, formAction, pending] = useActionState(createExpense, {
    message: "",
  });
  return (
    <form action={formAction}>
      <input type="number" name="amount" placeholder="금액" required />
      <input type="date" name="spent_at" required />
      <input type="text" name="category" placeholder="카테고리" required />
      <input type="text" name="memo" placeholder="메모" />
      <button type="submit" disabled={pending}>
        저장
      </button>
      {state.message && <p style={{ color: "red" }}>{state.message}</p>}
    </form>
  );
}
