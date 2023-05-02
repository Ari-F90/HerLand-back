import { Figure } from '../entities/figure';

export interface FigureRepo<T> {
  queryAll(): Promise<Figure[]>;
  queryId(_id: string): Promise<Figure>;
  search(query: { key: string; value: unknown }): Promise<Figure[]>;
  create(_info: Partial<Figure>): Promise<Figure>;
  update(_info: Partial<Figure>): Promise<Figure>;
  delete(_id: string): Promise<void>;
}
