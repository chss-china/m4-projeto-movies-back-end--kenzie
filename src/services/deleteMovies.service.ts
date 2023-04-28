import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
export const deleteMoviesService = async (id: number): Promise<Movie> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  const item = await movieRepository.findOneOrFail({
    where: { id },
  });
  await movieRepository.remove(item);

  return item;
};
