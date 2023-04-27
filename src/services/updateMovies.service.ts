import { AppDataSource } from "../data-source";
import { Tmovie, TupdateMovies } from "../interfaces/movies.interface";
import { Movie } from "../entities";
import { Repository } from "typeorm";
import { movieSchema, updateMovieSchema } from "../schemas/movies.schemas";

export const updateMovieService = async (
  movieData: TupdateMovies,
  id: number
): Promise<Tmovie> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const oldMovieData: Movie | null = await movieRepository.findOneBy({
    id: id,
  });

  const newMovieData: Movie = movieRepository.create({
    ...oldMovieData,
    ...movieData,
  });
  await movieRepository.save(newMovieData);

  const returnMovie: Tmovie = movieSchema.parse(newMovieData);

  return returnMovie;
};
