create table categories (
    id integer generated always as identity primary key,
    name text UNIQUE NOT NULL
);

insert into categories(name) values('식비'),('교통'),('통신'),('쇼핑'),('여가'),('의료'),('경조사'),('기타');

delete from expenses;
ALTER TABLE expenses ADD COLUMN category_id integer NOT NULL;
ALTER TABLE expenses DROP COLUMN category;
ALTER TABLE expenses ADD CONSTRAINT expenses_category_id_fk FOREIGN KEY (category_id) REFERENCES categories (id);