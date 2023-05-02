import { FigureModel } from './figures.mongo.model';
import { FigureMongoRepo } from './figures.mongo.repo';

jest.mock('./figures.mongo.model');

describe('Given Figure Mongo Repo', () => {
  const mockRepo = new FigureMongoRepo();
  const mockExec = (mockValue: unknown) => ({
    exec: jest.fn().mockResolvedValue(mockValue),
  });
  describe('When a new class is instantiated', () => {
    test('Then the repo should be instantiated', () => {
      expect(mockRepo).toBeInstanceOf(FigureMongoRepo);
    });
  });

  describe('When the query all method is used', () => {
    test('Then it should return the result of figures', async () => {
      const mockValue = [
        { id: '1', name: 'figure1' },
        { id: '2', name: 'figure2' },
      ];
      (FigureModel.find as jest.Mock).mockImplementation(() =>
        mockExec(mockValue)
      );
      const result = await mockRepo.queryAll();
      expect(FigureModel.find).toHaveBeenCalled();
      expect(result).toEqual([
        { id: '1', name: 'figure1' },
        { id: '2', name: 'figure2' },
      ]);
    });
  });

  describe('When the query Id method is used', () => {
    test('Then it should return the result of a figure', async () => {
      const mockValueId = { id: '1' };
      (FigureModel.findById as jest.Mock).mockImplementation(() =>
        mockExec(mockValueId)
      );
      const result = await mockRepo.queryId('1');
      expect(FigureModel.findById).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
    test('Then the resolved value is null, it should throw an error', () => {
      const mockValueId = null;
      (FigureModel.findById as jest.Mock).mockImplementation(() =>
        mockExec(mockValueId)
      );
      expect(mockRepo.queryId('3')).rejects.toThrow();
    });
  });

  describe('When the search method is used', () => {
    test('Then it should return an object', async () => {
      const mockValue = [{ id: '4' }];
      (FigureModel.find as jest.Mock).mockImplementation(() =>
        mockExec(mockValue)
      );
      const result = await mockRepo.search({ key: 'name', value: 'figure4' });
      expect(FigureModel.find).toHaveBeenCalled();
      expect(result).toEqual([{ id: '4' }]);
    });
  });
  describe('When the create method is used', () => {
    test('Then it should return an object', async () => {
      (FigureModel.create as jest.Mock).mockResolvedValue({
        id: '1',
        name: 'figure1',
      });
      const result = await mockRepo.create({ name: 'figure1' });
      expect(result).toEqual({ id: '1', name: 'figure1' });
    });
  });
  describe('When the update method is used', () => {
    const mockUpdated = { name: 'figure2' };
    test('Then it should return the searched object', async () => {
      (FigureModel.findByIdAndUpdate as jest.Mock).mockImplementation(() =>
        mockExec(mockUpdated)
      );
      const result = await mockRepo.update({ name: 'figure2' });
      expect(FigureModel.findByIdAndUpdate).toHaveBeenCalled();
      expect(result).toEqual(mockUpdated);
    });
    test('Then the resolved value is null, it should throw an error', () => {
      const mockValue = null;
      (FigureModel.findByIdAndUpdate as jest.Mock).mockImplementation(() =>
        mockExec(mockValue)
      );
      expect(mockRepo.update({ name: 'figure2' })).rejects.toThrow();
    });
  });
  describe('When the delete method is used', () => {
    test('Then it should delete the object', async () => {
      (FigureModel.findByIdAndDelete as jest.Mock).mockImplementation(() =>
        mockExec({})
      );
      const result = await mockRepo.delete('1');
      expect(FigureModel.findByIdAndDelete).toHaveBeenCalled();
      expect(result).toBe(undefined);
    });
    test('Then the resolved value is null, it should throw an error', () => {
      const mockValue = null;
      (FigureModel.findByIdAndDelete as jest.Mock).mockImplementation(() =>
        mockExec(mockValue)
      );
      expect(mockRepo.delete('2')).rejects.toThrow();
    });
  });
});
