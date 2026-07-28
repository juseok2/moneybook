"use client";

import { useActionState } from "react";
import { updateExpense } from "../../actions";

type Expense = {
  id: number;
  amount: number;
  category: string;
  memo: string | null;
  spent_at: string;
};

export default function EditForm({ item }: { item: Expense }) {
  const [state, formAction, pending] = useActionState(updateExpense, {
    message: "",
  });

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={item.id}></input>
      <input
        type="number"
        name="amount"
        placeholder="금액"
        required
        defaultValue={item.amount}
      />
      <input
        type="date"
        name="spent_at"
        required
        defaultValue={item.spent_at}
      />
      <input
        type="text"
        name="category"
        placeholder="카테고리"
        required
        defaultValue={item.category}
      />
      <input
        type="text"
        name="memo"
        placeholder="메모"
        defaultValue={item.memo ?? ""}
      />
      <button type="submit" disabled={pending}>
        수정
      </button>
      {state.message && <p style={{ color: "red" }}>{state.message}</p>}
    </form>
  );
}
