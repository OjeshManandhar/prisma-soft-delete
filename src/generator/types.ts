// prisma
import prisma from './../_prisma';

export enum RelationType {
  ONE = 'ONE',
  MANY = 'MANY'
}

type RelationDescription =
  | {
      modelName: string;
      field: string;
      type: RelationType.ONE;
      disconnect?: boolean;
    }
  | {
      modelName: string;
      field: string;
      type: RelationType.MANY;
      delete?: boolean;
    };

type ModelDescription = {
  model: keyof typeof prisma;
  modelName: string;
  field: string;
  relations: RelationDescription[];
};

export type ConfigType = ModelDescription[];
