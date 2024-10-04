CREATE FUNCTION update_updated_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    NEW.updatedat = NOW();
    RETURN NEW;
  END;
$$;

CREATE SEQUENCE products_sequence start 1000 increment 1;
CREATE TABLE PRODUCTS (
	ID INT not null primary key default NEXTVAL('products_sequence'),
	NAME VARCHAR(150) NOT NULL,
	DESCRIPTION VARCHAR(255),
	PRICE NUMERIC(8,2),
	STOCK INT NOT NULL,
	CREATEDAT TIMESTAMP default CURRENT_TIMESTAMP,
	UPDATEDAT TIMESTAMP default CURRENT_TIMESTAMP
);

CREATE TRIGGER t_products_updated BEFORE UPDATE ON PRODUCTS FOR EACH ROW EXECUTE PROCEDURE update_updated_column();