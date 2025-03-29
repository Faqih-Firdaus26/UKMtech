interface MongooseDocument {
  _id: {
    toString(): string;
  };
  __v: number;
  [key: string]: unknown;
}

type MongooseResult<T> = T & MongooseDocument; 