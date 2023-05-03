import { FigureMongoRepo } from '../repository/figures.mongo.repo';
import { FiguresController } from './figures.controller';
import { Response, Request, NextFunction } from 'express';

describe('Given the Figures Controller', () => {
  const mockRepo: FigureMongoRepo = {
    queryAll: jest.fn(),
    queryId: jest.fn(),
    search: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const resp = {
    json: jest.fn(),
    status: jest.fn(),
  } as unknown as Response;

  const next = jest.fn();

  const mockController = new FiguresController(mockRepo);

  describe('When the getOneFigure method is used', () => {
    const req = {
      body: {},
      params: { id: '' },
    } as unknown as Request;
    test('Then it should return the information', async () => {
      await mockController.getOneFigure(req, resp, next);
      expect(mockRepo.queryId).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then if there are errors, the next function should have been called', async () => {
      (mockRepo.queryId as jest.Mock).mockRejectedValue(new Error(''));
      await mockController.getOneFigure(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
