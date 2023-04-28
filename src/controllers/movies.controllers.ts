import { Request, Response } from "express";
import {
  Tmovie,
  TmoviePagination,
  TmovieRequest,
  TupdateMovies,
} from "../interfaces/movies.interface";
import { createMoviesService } from "../services/createMovies.service";
import { updateMovieService } from "../services/updateMovies.service";
import { listMoviesService } from "../services/listUser.service";

import { deleteMoviesService } from "../services/deleteMovies.service";

export const createMovieControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieData: TmovieRequest = req.body;
  const newMovie = await createMoviesService(movieData);
  return res.status(201).json(newMovie);
};
export const updateMovieControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieData: TupdateMovies = req.body;
  const id: number = parseInt(req.params.id);
  const updateMovie: Tmovie = await updateMovieService(movieData, id);
  return res.status(200).json(updateMovie);
};
export const listMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const page: number = Number(req.query.page) || 1;
  const perPage: number = Number(req.query.perPage) || 5;
  const order: "asc" | "desc" =
    req.query.order === "desc" || req.query.order === "asc"
      ? req.query.order
      : "asc";
  const sort: string =
    req.query.sort === "duration"
      ? "duration"
      : req.query.sort === "price"
      ? "price"
      : "id";
  const movies: TmoviePagination = await listMoviesService(
    page,
    perPage,
    order,
    sort
  );
  return res.json(movies);
};
export const deleteMovieControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);
  const deleteMovie: Tmovie = await deleteMoviesService(id);
  return res.status(204).json(deleteMovie);
};
