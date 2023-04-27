import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { movieSchemaRequest } from "../schemas/movies.schemas";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../error";
export async function verifyIdMidd(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  const id: number = parseInt(req.params.id);

  const movie: Movie | null = await movieRepository.findOne({
    where: { id: id },
  });

  if (!movie) {
    throw new AppError("Movie not found", 404);
  }

  next();
}
