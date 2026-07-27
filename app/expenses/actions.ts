"use server";
import pool from "@/lib/db";
import { redirect } from "next/navigation";

export async function createExpense(
  prevState: { message: string },
  formData: FormData,
) {
  const amountRaw = formData.get("amount");
  const category = formData.get("category");
  const spentAt = formData.get("spent_at");
  const memo = formData.get("memo");

  const amount = Number(amountRaw);
  if (!Number.isInteger(amount) || amount <= 0) {
    return { message: "금액은 1 이상의 정수여야 합니다." };
  }
  if (typeof category !== "string" || category.trim() === "") {
    return { message: "카테고리를 입력하세요." };
  }
  if (typeof spentAt !== "string" || spentAt.trim() === "") {
    return { message: "날짜를 입력하세요" };
  }
  await pool.query(
    "insert into expenses (amount, category, spent_at, memo) values ($1, $2, $3, $4)",
    [amount, category.trim(), spentAt, memo || null],
  );
  redirect("/expenses");
}
