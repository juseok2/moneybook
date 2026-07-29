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

  const selectYear = Number(month.substring(0, 4));
  const selectMonth = Number(month.substring(5, 7));

  const expensesList = await pool.query(
    "select * from expenses where spent_at >= $1::date and spent_at < $1::date + INTERVAL '1 month' order by spent_at desc",
    [month + "-01"],
  );

  const totalAmount = await pool.query(
    "select coalesce(sum(amount),0) as total from expenses where spent_at >= $1::date and spent_at < $1::date + INTERVAL '1 month'",
    [month + "-01"],
  );

  return (
    <>
      <Link
        href={`/expenses?month=${
          selectMonth - 1
            ? selectYear + "-" + String(selectMonth - 1).padStart(2, "0")
            : selectYear - 1 + "-" + "12"
        }`}
      >
        이전 달
      </Link>
      <Link
        href={`/expenses?month=${
          selectMonth < 12
            ? selectYear + "-" + String(selectMonth + 1).padStart(2, "0")
            : selectYear + 1 + "-" + "01"
        }`}
      >
        다음 달
      </Link>
      <p>{month} 지출</p>
      <p>
        {month} 총 지출 금액 : {totalAmount.rows[0].total}
      </p>
      <br />
      {expensesList.rows.length ? (
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
      ) : (
        <p>해당 달에 지출이 없습니다.</p>
      )}
    </>
  );
}
