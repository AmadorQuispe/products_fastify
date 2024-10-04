import { Static, Type } from '@sinclair/typebox';

export const Product = Type.Object({
  name: Type.String({ maxLength: 150 }),
  description: Type.String({ maxLength: 255 }),
  price: Type.Number({ minimum: 0 }),
  stock: Type.Number({ minimum: 0 }),
});

export type ProductType = Static<typeof Product>;
