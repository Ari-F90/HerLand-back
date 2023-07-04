import { Schema, model } from 'mongoose';
import { Figure } from '../entities/figure';

const figureSchema = new Schema<Figure>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quote: {
    type: String,
    required: true,
  },
  birth: {
    type: String,
    required: true,
  },
  description1: {
    type: String,
    required: true,
  },
  description2: {
    type: String,
    required: true,
  },
  description3: {
    type: String,
    required: true,
  },
  description4: {
    type: String,
    required: true,
  },
});

figureSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.__id;
  },
});

export const FigureModel = model('Figure', figureSchema, 'figures');
