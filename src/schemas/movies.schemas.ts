import { z } from "zod";
const movieSchema = z.object({
  id: z.number(),
  name: z.string().max(50),
  description: z.string().nullish().optional(),
  duration: z.number().positive(),
  price: z.number().int(),
});
const movieSchemaRequest = movieSchema.omit({ id: true });
const updateMovieSchema = movieSchema.partial().omit({
  id: true,
});
export { movieSchema, movieSchemaRequest, updateMovieSchema };
