import { Router } from "express";
import {
  createMovieControllers,
  listMovieController,
  updateMovieControllers,
} from "../controllers/movies.controllers";
import { dataIsValidMidd } from "../middlewares/dataIsValid.midd";
import {
  movieSchemaRequest,
  updateMovieSchema,
} from "../schemas/movies.schemas";
import { verifyNameMidd } from "../middlewares/verifyNameExists.midd";
import { verifyIdMidd } from "../middlewares/verifyIdExists,midd";
const moviesRoutes: Router = Router();
moviesRoutes.post(
  "",
  dataIsValidMidd(movieSchemaRequest),
  verifyNameMidd,
  createMovieControllers
);
moviesRoutes.get("", listMovieController);
moviesRoutes.patch(
  "/:id",
  dataIsValidMidd(updateMovieSchema),
  verifyIdMidd,
  verifyNameMidd,
  updateMovieControllers
);
export default moviesRoutes;
