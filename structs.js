import * as s from "superstruct";
import isEmail from "is-email";
import isUuid from "is-uuid";

export const CreateProduct = s.object({
  name: s.size(s.string(), 1, 10),
  description: s.size(s.string(), 10, 100),
  price: s.min(s.number(), 0),
  tags: s.array(s.size(s.string(), 1, 5)),
  favoriteCount: s.optional(s.min(s.number(), 0)),
  images: s.optional(s.array(s.string())),
});

const PatchProdcut = s.partial(CreateProduct);
