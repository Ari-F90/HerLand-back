import createDebug from 'debug';
import { Figure } from '../entities/figure';
import { HTTPError } from '../errors/errors';
import { FigureModel } from './figures.mongo.model';
import { FigureRepo } from './repo.interface';

const debug = createDebug('HER: figure-mongo-repo');

export class FigureMongoRepo implements FigureRepo<Figure> {
  public constructor() {
    debug('Figure Mongo Repo instantiated');
  }

  async queryAll(): Promise<Figure[]> {
    debug('Query All method');
    const data = await FigureModel.find().exec();
    return data;
  }

  async queryId(id: string): Promise<Figure> {
    debug('Query Id method: ' + id);
    const data = await FigureModel.findById(id).exec();
    if (!data)
      throw new HTTPError(
        404,
        'Id not found',
        'Id not found while doing queryId'
      );
    return data;
  }

  async search(query: { key: string; value: unknown }): Promise<Figure[]> {
    debug('Search method');
    const data = FigureModel.find({ [query.key]: query.value }).exec();
    return data;
  }

  async create(figure: Partial<Figure>): Promise<Figure> {
    debug('Create method');
    const data = await FigureModel.create(figure);
    debug('data');
    return data;
  }

  async update(figure: Partial<Figure>): Promise<Figure> {
    debug('Update method ' + figure.name);
    const data = await FigureModel.findByIdAndUpdate(figure.id, figure, {
      new: true,
    }).exec();
    if (!data)
      throw new HTTPError(404, 'Figure not found', 'Not found in update');
    return data;
  }

  async delete(id: string): Promise<void> {
    debug('Delete method ' + id);
    const data = await FigureModel.findByIdAndDelete(id).exec();
    if (!data) throw new HTTPError(404, 'Delete not possible', 'Id not found');
  }
}
