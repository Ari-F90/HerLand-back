import createDebug from 'debug';
import { Response, Request, NextFunction } from 'express';
import { Figure } from '../entities/figure';
import { HTTPError } from '../errors/errors.js';
import { FigureMongoRepo } from '../repository/figures.mongo.repo';

const debug = createDebug('HER: controller:herland');

export class FiguresController {
  constructor(public repoFigures: FigureMongoRepo) {
    debug('Figures controller instantiated');
  }

  async getAll(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('Get all figures method');
      const pageCount = req.query.page || '1';
      const pageNumber = Number(pageCount);
      if (pageNumber < 1 || pageNumber > 20)
        throw new HTTPError(404, 'Not found a valid page', 'Wrong page number');
      const category = req.query.category || 'all';
      let selectedFigure: Figure[];
      debug('Category: ' + category);
      if (category === 'all') {
        selectedFigure = await this.repoFigures.queryAll();
      } else {
        selectedFigure = await this.repoFigures.search({
          key: 'category',
          value: category,
        });
      }

      const figureData = selectedFigure.slice(
        (pageNumber - 1) * 8,
        pageNumber * 8
      );
      resp.status(201);
      resp.json({
        results: figureData,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOneFigure(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('Get one figure method');
      const data = await this.repoFigures.queryId(req.params.id);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async post(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('Post method');
      const newFigure = await this.repoFigures.create(req.body);
      resp.json({
        results: [newFigure],
      });
    } catch (error) {
      next(error);
    }
  }

  async patch(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('Patch method');
      req.body.id = req.params.id ? req.params.id : req.body.id;
      const data = await this.repoFigures.update(req.body);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('Delete method');
      await this.repoFigures.delete(req.params.id);
      resp.json({
        results: [],
      });
    } catch (error) {
      next(error);
    }
  }
}
