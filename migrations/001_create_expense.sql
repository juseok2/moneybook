create table expenses (
    id integer generated always as identity primary key,
    amount integer not null check (amount > 0),
    memo text,
    category text not null,
    spent_at date not null,
    created_at timestamptz not null default now()
);