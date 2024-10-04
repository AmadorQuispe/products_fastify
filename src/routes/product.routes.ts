import { FastifyInstance } from "fastify";
import { ProductController } from "../controller/product.controller";
import { ProductService } from "../service/product.service";

export const productRoutes = async (fastify: FastifyInstance) => {

    const productService = new ProductService();
    const productController = new ProductController(productService);
    
    fastify.get('/api/products', productController.getAll.bind(productController));
    
    fastify.post('/api/products',productController.create.bind(productController));
    
    fastify.put('/api/products/:id',productController.update.bind(productController));
    
    fastify.get('/api/products/:id', productController.getById.bind(productController));
    
    fastify.delete('/api/products/:id', productController.delete.bind(productController));
};