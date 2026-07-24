import { createExpense } from "@/app/expenses/actions";

export default function Page() {
  return (
    <form action={createExpense}>
      <input type="number" name="amount" placeholder="금액" required />
      <input type="date" name="spent_at" required />
      <input type="text" name="category" placeholder="카테고리" required />
      <input type="text" name="memo" placeholder="메모" />
      <button type="submit">저장</button>
    </form>
  );
}
