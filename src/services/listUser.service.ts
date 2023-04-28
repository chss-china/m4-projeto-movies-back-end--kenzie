import { Repository } from "typeorm";
import { Movie } from "../entities";
import { Tmovie, TmoviePagination } from "../interfaces/movies.interface";
import { AppDataSource } from "../data-source";

export const listMoviesService = async (
  page: number,
  perPage: number,
  order: "asc" | "desc",
  sort: string
): Promise<TmoviePagination> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  let movies: Tmovie[] | undefined;
  let myPrevPage: string | null = `http://localhost:3000/movies?page=${
    page - 1
  }&perPage=${perPage}`;

  if (page <= 1) {
    myPrevPage = null;
  }
  let numberIntPerPage = Number.isInteger(perPage);
  if (numberIntPerPage === false || perPage <= 0 || perPage > 5) {
    perPage = 5;
  }
  let numberInt = Number.isInteger(page);

  if (numberInt == false || page <= 0) {
    page = 1;
  }

  let orderObj = {};

  if (sort == "price") {
    orderObj = { price: order };
  } else if (sort == "duration") {
    orderObj = { duration: order };
  }

  const totalCount: number = await movieRepository.count();

  let numberPages: number = totalCount / perPage;
  let myNextPage: string | null = `http://localhost:3000/movies?page=${
    page + 1
  }&perPage=${perPage}`;

  let numberPageInt =
    numberPages > Math.trunc(numberPages)
      ? Math.trunc(numberPages)
      : numberPages;

  if (page > numberPageInt) {
    myNextPage = null;
  }

  if (!sort) {
    movies = await movieRepository.find({
      skip: (page - 1) * perPage,
      take: perPage,
    });
  }

  movies = await movieRepository.find({
    skip: (page - 1) * perPage,
    take: perPage,
    order: orderObj,
  });

  const objReturnMovies: TmoviePagination = {
    prevPage: myPrevPage,
    nextPage: myNextPage,
    count: totalCount,
    data: movies,
  };

  return objReturnMovies;
};
