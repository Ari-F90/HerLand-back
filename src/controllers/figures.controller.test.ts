import { FigureMongoRepo } from '../repository/figures.mongo.repo';
import { FiguresController } from './figures.controller';
import { Response, Request } from 'express';
import { Figure } from '../entities/figure';

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
    test('Then if all the information is OK, it should return the information', async () => {
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

  describe('When the post method is used', () => {
    const mockFigure = {
      name: 'test1',
    } as unknown as Figure;
    const mockReq = {
      body: mockFigure,
    } as unknown as Request;
    const mockResp = {
      json: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn();
    test('Then if all the information is OK, it should create the figure', async () => {
      await mockController.post(mockReq, mockResp, mockNext);
      expect(mockRepo.create).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then if there are errors, the next function should have been called', async () => {
      (mockRepo.create as jest.Mock).mockRejectedValue(new Error(''));
      await mockController.post(mockReq, mockResp, mockNext);
      expect(next).toHaveBeenCalled();
    });
  });
});
