import { Schema } from 'mongoose';

export const toJSONPlugin = (schema: Schema) => {
  schema.set('toJSON', {
    transform: (doc, returnedObject: any) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
      delete returnedObject.password;
    }
  });
};
