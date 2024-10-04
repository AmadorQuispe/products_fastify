import { Product } from '../model/product';
import { ProductNotFoundException } from '../model/product-not-found-exception';
import { ProductValidationException } from '../model/product-validation-exception';
import { ProductRepository } from '../repository/product.repository';

export class ProductService {
  private readonly productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAll(): Promise<Product[]> {
    return this.productRepository.getAll();
  }

  async getById(productId: number): Promise<Product> {
    const product = await this.productRepository.getById(productId);
    if (product === null) {
      throw new ProductNotFoundException('Product not found');
    }
    return product;
  }

  async create(product: Product): Promise<Product | null> {
    if (!product.name || !product.description || !product.price || !product.stock) {
      throw new ProductValidationException('All fields are required');
    }
    if (product.price < 0 || product.stock < 0) {
      throw new ProductValidationException('Price and stock must be greater than 0');
    }
    return this.productRepository.create(product);
  }

  async update(productId: number, product: Product): Promise<Product | null> {
    const existingProduct = await this.getById(productId);
    if (existingProduct == null) {
      throw new ProductNotFoundException('Product not found');
    }
    if (!product.name || !product.description || !product.price || !product.stock) {
      throw new ProductValidationException('All fields are required');
    }
    if (product.price < 0 || product.stock < 0) {
      throw new ProductValidationException('Price and stock must be greater than 0');
    }
    return this.productRepository.update(productId, product);
  }

  async delete(productId: number): Promise<boolean> {
    const existingProduct = await this.getById(productId);
    if (existingProduct == null) {
      throw new ProductNotFoundException('Product not found');
    }
    return this.productRepository.delete(productId);
  }
}
