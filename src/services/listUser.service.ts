import { Repository } from "typeorm";
import { Movie } from "../entities";
import { Tmovie, TmoviePagination } from "../interfaces/movies.interface";
import { AppDataSource } from "../data-source";
import { movieSchema } from "../schemas/movies.schemas";
import { Request } from "express";

export const listMoviesService = async (
  page: number,
  perPage: number,
  order: "asc" | "desc",
  sort: string
): Promise<TmoviePagination> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  let movies: Tmovie[] | undefined;
  let myPrevPage: string | null = `http://localhost:3000/movies/?page=${
    page - 1
  }&perPage=${perPage}`;
  let myNextPage: string | null = `http://localhost:3000/movies/?page=${
    page + 1
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

  if (!sort) {
    order = "asc";
  }
  if (sort == "price") {
    orderObj = { price: order };
    /*if (order != "asc" && order != "desc") {
      order = "asc";
    }*/
  } else if (sort == "duration") {
    orderObj = { duration: order };
    /* if (order != "asc" && order != "desc") {
      order = "asc";
    }*/
  }
  if (sort != "price" && sort != "duration") {
    orderObj = { id: order };
    /* if (order != "asc" && order != "desc") {
      order = "asc";
    }*/
  }

  const totalCount: number = await movieRepository.count();

  let numberPages: number = totalCount / perPage;

  let numberPageInt =
    numberPages > Math.trunc(numberPages)
      ? Math.trunc(numberPages) + 1
      : numberPages;

  if (page > numberPageInt) {
    myNextPage = null;
  }

  /* if (!page || !perPage) {
    movies = await movieRepository.find();
  } else {*/
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
