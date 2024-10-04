import { FastifyReply, FastifyRequest } from "fastify";
import { ProductService } from "../service/product.service";
import { ProductValidationException } from "../model/product-validation-exception";
import { ProductType } from "./product.dto";
import { ProductNotFoundException } from "../model/product-not-found-exception";

export type ProductRequest = FastifyRequest<{ Body: ProductType; Reply: ProductType | { message: string } }>;
export type ProductUpdateRequest = FastifyRequest<{ Body: ProductType; Params: { id: number }; Reply: ProductType | { message: string } }>;

export class ProductController {
    private readonly productService: ProductService;
    constructor(productService: ProductService) {
        this.productService = productService;
    }

    async getAll(_:FastifyRequest, res:FastifyReply) {
        const products = await this.productService.getAll();
        res.status(200).send({ products });
    }

    async create(request: ProductRequest, reply: FastifyReply) {
        try {
          const newProduct = await this.productService.create(request.body);
          if (newProduct == null) {
            return reply.status(400).send({ message: 'Product not created' });
          }
          return reply.status(200).send(newProduct);
        } catch (error) {
          if (error instanceof ProductValidationException) {
            return reply.status(400).send({ message: error.message });
          }
          return reply.status(500).send({ message: 'Internal Server Error' });
        }
    }

    async update(request: ProductUpdateRequest, reply: FastifyReply) {
        try {
            const productId = request.params.id;
            const product = request.body as any;
            const updatedProduct = await this.productService.update(productId, product);
            if (updatedProduct == null) {
              return reply.status(400).send({ message: 'Product not updated' });
            }
            reply.status(200).send(updatedProduct);
          } catch (error) {
            if (error instanceof ProductValidationException) {
              return reply.status(400).send({ message: error.message });
            }
            if (error instanceof ProductNotFoundException) {
              return reply.status(404).send({ message: error.message });
            }
            return reply.status(500).send({ message: 'Internal Server Error' });
          }
    }

    async getById(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
        try {
            const productId = Number(request.params.id);
            const product = await this.productService.getById(productId);
            return reply.status(200).send(product);
          } catch (error) {
            if (error instanceof ProductNotFoundException) {
              return reply.status(404).send({ message: error.message });
            }
            return reply.status(500).send({ message: 'Internal Server Error' });
          }
    }

    async delete(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
        try {
            const productId = Number(request.params.id);
            const deletedProduct = await this.productService.delete(productId);
            if (!deletedProduct) {
              return reply.status(400).send({ message: 'Product not deleted' });
            }
            return reply.status(200).send({ message: 'Product deleted' });
          } catch (error) {
            if (error instanceof ProductNotFoundException) {
              return reply.status(404).send({ message: error.message });
            }
            return reply.status(500).send({ message: 'Internal Server Error' });
          }
    }
}