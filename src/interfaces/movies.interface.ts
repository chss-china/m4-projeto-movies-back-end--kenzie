import { z } from "zod";
import {
  movieSchema,
  movieSchemaRequest,
  updateMovieSchema,
} from "../schemas/movies.schemas";
import { DeepPartial } from "typeorm";
type TmovieRequest = z.infer<typeof movieSchemaRequest>;
type Tmovie = z.infer<typeof movieSchema>;
//type TupdateMovies = z.infer<typeof updateMovieSchema>;
type TupdateMovies = DeepPartial<TmovieRequest>;
type TmoviePagination = {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: Tmovie[];
};
export { TmovieRequest, Tmovie, TupdateMovies, TmoviePagination };
