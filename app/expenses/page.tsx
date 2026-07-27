import pool from "@/lib/db";
import { deleteExpense } from "@/app/expenses/actions";
export const dynamic = "force-dynamic";

export default async function Page() {
  const expensesList = await pool.query(
    "select * from expenses order by spent_at desc",
  );

  return (
    <ul>
      {expensesList.rows.map((item) => {
        return (
          <li key={item.id}>
            <p>지출명: {item.memo}</p>
            <p>금액: {item.amount}</p>
            <p>
              지출일: {item.spent_at.getFullYear()}년{" "}
              {item.spent_at.getMonth() + 1}월{item.spent_at.getDate()}일
            </p>
            <form action={deleteExpense}>
              <input type="hidden" value={item.id} name="id" />
              <button type="submit">삭제</button>
            </form>
          </li>
        );
      })}
    </ul>
  );
}
