import pool from "@/lib/db";
import { notFound } from "next/navigation";
import { updateExpense } from "@/app/expenses/actions";
import EditForm from "@/app/expenses/[id]/edit/edit-form";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isInteger(numId) || numId <= 0) {
    notFound();
  }
  const expense = await pool.query(
    "select id, amount, category, memo, spent_at::text from expenses where id = $1",
    [numId],
  );
  const item = expense.rows[0];
  if (item === undefined) {
    notFound();
  }
  return <EditForm item={item} />;
}
