import { dataSource } from '../database/data-source';
import { Product } from '../model/product';

export class ProductRepository {
  async getAll() {
    try {
      const resultSet = await dataSource.executeQuery(`
        SELECT id,name,description,price,stock,createdat,updatedat FROM products ORDER BY createdat
      `);
      return resultSet.rows.map((row) => ({
        id: row.id,
        name: row.name,
        description: row.name,
        price: row.price,
        stock: row.stock,
        createdAt: row.createdat,
        updatedAt: row.updatedat,
      }));
    } catch (error) {
      throw new Error('Query not found');
    }
  }

  async getById(productId: number): Promise<Product | null> {
    const resultSet = await dataSource.executeQuery(
      `SELECT id,name,description,price,stock,createdat,updatedat FROM products WHERE id=$1;`,
      [productId]
    );
    if (resultSet.rows.length > 0) {
      return {
        id: resultSet.rows[0].id,
        name: resultSet.rows[0].name,
        description: resultSet.rows[0].description,
        price: resultSet.rows[0].price,
        stock: resultSet.rows[0].stock,
        createdAt: resultSet.rows[0].createdat,
        updatedAt: resultSet.rows[0].updatedat,
      };
    }
    return null;
  }

  async create(product: Product): Promise<Product | null> {
    const resultSet = await dataSource.executeQuery(
      `INSERT INTO products(name,description,price,stock) VALUES($1,$2,$3,$4) RETURNING *;`,
      [product.name, product.description, product.price, product.stock]
    );
    if (resultSet.rows.length > 0) {
      return {
        id: resultSet.rows[0].id,
        name: resultSet.rows[0].name,
        description: resultSet.rows[0].description,
        price: resultSet.rows[0].price,
        stock: resultSet.rows[0].stock,
        createdAt: resultSet.rows[0].createdAt,
        updatedAt: resultSet.rows[0].updatedAt,
      };
    }
    return null;
  }

  async update(productId: number, product: Product): Promise<Product | null> {
    const resultSet = await dataSource.executeQuery(
      `UPDATE products SET name=$1,description=$2,price=$3,stock=$4 WHERE id=$5 RETURNING *;`,
      [product.name, product.description, product.price, product.stock, productId]
    );
    if (resultSet.rowCount && resultSet.rowCount > 0) {
      return {
        id: resultSet.rows[0].id,
        name: resultSet.rows[0].name,
        description: resultSet.rows[0].description,
        price: resultSet.rows[0].price,
        stock: resultSet.rows[0].stock,
        createdAt: resultSet.rows[0].createdAt,
        updatedAt: resultSet.rows[0].updatedAt,
      };
    }
    return null;
  }

  async delete(productId: number): Promise<boolean> {
    try {
      await dataSource.executeQuery(`DELETE FROM products WHERE id=$1;`, [productId]);
      return true;
    } catch (error) {
      return false;
    }
  }
}
