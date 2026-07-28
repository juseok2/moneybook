import { notFound } from "next/navigation";
import EditForm from "./edit-form";
import pool from "@/lib/db";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const idRaw = (await params).id;

  const id = Number(idRaw);

  if (!Number.isInteger(id) || id <= 0) {
    notFound();
  }

  const expense = await pool.query(
    "select id, amount, category, memo, spent_at::text from expenses where id = $1",
    [id],
  );
  const editExpense = expense.rows[0];

  if (editExpense === undefined) {
    notFound();
  }
  return <EditForm item={editExpense}></EditForm>;
}
