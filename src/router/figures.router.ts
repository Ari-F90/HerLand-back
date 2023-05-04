import { Router } from 'express';
import { FiguresController } from '../controllers/figures.controller.js';
import { FigureMongoRepo } from '../repository/figures.mongo.repo.js';

// eslint-disable-next-line new-cap
export const figuresRouter = Router();

const repoFigures = new FigureMongoRepo();
const figureController = new FiguresController(repoFigures);

figuresRouter.get('/', figureController.getAll.bind(figureController));
figuresRouter.get('/:id', figureController.getOneFigure.bind(figureController));
figuresRouter.post('/', figureController.post.bind(figureController));
figuresRouter.patch('/:id', figureController.patch.bind(figureController));
figuresRouter.delete('/:id', figureController.delete.bind(figureController));
