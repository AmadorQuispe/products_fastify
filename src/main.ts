import Fastify, { FastifyInstance, FastifyRequest } from 'fastify';
import { envConfig } from './env-config';
import { AppDataSource } from './database/data-source';
import { ProductService } from './service/product.service';
import { ProductType } from './controller/model.product';
import { ProductValidationException } from './model/product-validation-exception';
import { ProductNotFoundException } from './model/product-not-found-exception';

const server: FastifyInstance = Fastify({});

const productService = new ProductService();

server.get('/api/products', async (_request, reply) => {
  const products = await productService.getAll();
  reply.status(200).send({ products });
});

server.post<{ Body: ProductType; Reply: ProductType | { message: string } }>(
  '/api/products',
  async (request, reply) => {
    try {
      const newProduct = await productService.create(request.body);
      if (newProduct == null) {
        return reply.status(400).send({ message: 'Product not created' });
      }
      reply.status(200).send(newProduct);
    } catch (error) {
      if (error instanceof ProductValidationException) {
        reply.status(400).send({ message: error.message });
      }
      reply.status(500).send({ message: 'Internal Server Error' });
    }
  }
);

server.put<{ Body: ProductType; Params: { id: number }; Reply: ProductType | { message: string } }>(
  '/api/products/:id',
  async (request, reply) => {
    try {
      const productId = request.params.id;
      const product = request.body as any;
      const updatedProduct = await productService.update(productId, product);
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
      reply.status(500).send({ message: 'Internal Server Error' });
    }
  }
);

server.get('/api/products/:id', async (request: FastifyRequest<{ Params: { id: number } }>) => {
  try {
    const productId = Number(request.params.id);
    const product = await productService.getById(productId);
    return product;
  } catch (error) {
    if (error instanceof ProductNotFoundException) {
      return { message: error.message };
    }
    return { message: 'Internal Server Error' };
  }
});

server.delete('/api/products/:id', async (request: FastifyRequest<{ Params: { id: number } }>) => {
  try {
    const productId = Number(request.params.id);
    const deletedProduct = await productService.delete(productId);
    if (!deletedProduct) {
      return { message: 'Product not deleted' };
    }
    return { message: 'Product deleted' };
  } catch (error) {
    if (error instanceof ProductNotFoundException) {
      return { message: error.message };
    }
    return { message: 'Internal Server Error' };
  }
});

server.setErrorHandler((error, _request, reply) => {
  console.log(error);
  reply.status(500).send({ message: 'Internal Server Error' });
});

const start = async () => {
  try {
    await AppDataSource.initDatabase();
    await server.listen({ port: envConfig.port });
    server.log.info(`Server listening on ${server.server.address() as string}`);
    // const address = server.server.address();
    // const port = typeof address === 'string' ? address : address?.port;
  } catch (err) {
    console.log((err as any)?.code);

    server.log.error(err);
    process.exit(1);
  }
};

start()
  .then(() => {})
  .catch(() => {});
