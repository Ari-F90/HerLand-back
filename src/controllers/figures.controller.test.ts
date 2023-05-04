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

  describe('When the getAll method is used', () => {
    (mockRepo.queryAll as jest.Mock).mockResolvedValue([
      {
        id: '1',
        name: 'figure1',
      },
      {
        id: '2',
        name: 'figure2',
      },
    ]);
    (mockRepo.search as jest.Mock).mockResolvedValue([
      { id: '1', name: 'figure1', category: 'Science' },
      { id: '2', name: 'figure2' },
    ]);
    test('Then if all the information is OK', async () => {
      const req = {
        query: { page: '1' },
      } as unknown as Request;
      await mockController.getAll(req, resp, next);
      expect(mockRepo.queryAll).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then if there are errors, next function should have been called', async () => {
      const req = {
        query: { page: '21' },
      } as unknown as Request;
      await mockController.getAll(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
    test('Then if there are errors, next function should have been called', async () => {
      const req = {
        query: { page: undefined },
      } as unknown as Request;
      await mockController.getAll(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
    test('Then if there is a category, the search method should have been called', async () => {
      const req = {
        query: { page: '1', category: 'Science' },
      } as unknown as Request;
      await mockController.getAll(req, resp, next);
      expect(mockRepo.search).toHaveBeenCalled();
    });
  });
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
  describe('When the patch method is used', () => {
    const req = {
      body: {
        id: '1',
      },
      params: {
        id: '1',
      },
    } as unknown as Request;
    const resp = { json: jest.fn() } as unknown as Response;
    test('Then if all the information is OK, it should update the figure', async () => {
      await mockController.patch(req, resp, next);
      expect(mockRepo.update).toHaveBeenCalledWith(req.body);
      expect(req.params.id).toBe('1');
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then if there are errors, the next function should have been called', async () => {
      (mockRepo.update as jest.Mock).mockRejectedValue(new Error(''));
      await mockController.patch(req, resp, next);
      expect(mockRepo.update).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
    test('Then if there is an error, the next function should have been called', async () => {
      const req = {
        body: {
          id: '2',
        },
      } as unknown as Request;
      (mockRepo.update as jest.Mock).mockRejectedValue(new Error(''));
      await mockController.patch(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('When the delete method is used', () => {
    const req = {
      body: {},
      params: { id: '1' },
    } as unknown as Request;
    test('Then if all the information is OK, it should delete the figure', async () => {
      await mockController.delete(req, resp, next);
      expect(mockRepo.delete).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then if there are errors, the next function should have been called', async () => {
      (mockRepo.delete as jest.Mock).mockRejectedValue(new Error(''));
      await mockController.delete(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
