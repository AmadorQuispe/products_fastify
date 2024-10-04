import Fastify, { FastifyInstance } from 'fastify';
import { envConfig } from './env-config';
import { dataSource } from './database/data-source';
import { productRoutes } from './routes/product.routes';

const server: FastifyInstance = Fastify({logger: true});

server.register(productRoutes);

server.setErrorHandler((error, _request, reply) => {
  console.log(error);
  reply.status(500).send({ message: 'Internal Server Error' });
});

const start = async () => {
  try {
    await dataSource.checkConnection();
    await server.listen({ port: envConfig.port });
    server.log.info(`Server listening on ${server.server.address() as string}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};


start()
  .then(() => {})
  .catch(() => {});
