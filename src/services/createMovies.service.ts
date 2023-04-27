import { Repository } from "typeorm";
import { Movie } from "../entities";
import { Tmovie, TmovieRequest } from "../interfaces/movies.interface";
import { AppDataSource } from "../data-source";
import { movieSchema } from "../schemas/movies.schemas";

export const createMoviesService = async (
  movieData: TmovieRequest
): Promise<Tmovie> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  const movie: Movie = movieRepository.create(movieData);
  await movieRepository.save(movie);
  const returnMovie: Tmovie = movieSchema.parse(movie);
  return returnMovie;
};
