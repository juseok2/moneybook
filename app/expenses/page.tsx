import pool from "@/lib/db";
import { deleteExpense } from "@/app/expenses/actions";
import Link from "next/link";
export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const today = new Date();
  const params = await searchParams;
  let month = params.month;

  if (month === undefined || !/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) {
    month =
      String(today.getFullYear()) +
      "-" +
      (today.getMonth() + 1 < 10
        ? "0" + String(today.getMonth() + 1)
        : String(today.getMonth() + 1));
  }

  const expensesList = await pool.query(
    "select * from expenses where spent_at >= $1::date and spent_at < $1::date + INTERVAL '1 month' order by spent_at desc",
    [month + "-01"],
  );

  return (
    <>
      <p>{month} 지출</p>
      <br />
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
              <Link href={`/expenses/${item.id}/edit`}>수정</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
