import fs from 'fs/promises';
import { resourceLimits } from 'worker_threads';

// types
import { ConfigType, RelationType } from './types';

const config: ConfigType = [
  {
    model: 'user',
    modelName: 'User',
    field: 'deletedAt',
    relations: [
      {
        modelName: 'Post',
        field: 'Posts',
        type: RelationType.MANY,
        delete: true,
      },
      {
        modelName: 'Comment',
        field: 'Comments',
        type: RelationType.MANY,
        delete: true,
      },
    ],
  },
  {
    model: 'post',
    modelName: 'Post',
    field: 'deletedAt',
    relations: [
      {
        modelName: 'Comment',
        field: 'Comments',
        type: RelationType.MANY,
        delete: true,
      },
      {
        modelName: 'Comment',
        field: 'PinnedComment',
        type: RelationType.ONE,
        disconnect: true,
      },
    ],
  },
  {
    model: 'comment',
    modelName: 'Comment',
    field: 'deletedAt',
    relations: [
      {
        modelName: 'Comment',
        field: 'Replies',
        type: RelationType.MANY,
        delete: true,
      },
    ],
  },
];

const constants = {
  head: `import p from './_prisma';

// types
import type { Prisma } from '@prisma/client';

type DeletedExtension = {
  includeDeleted?: Boolean;
};

`,

  utils: `  /**
   * =========================
   * utils
   * =========================
   */
  
  function objectHasKeys(obj: object | null | undefined): Boolean {
    return Boolean(obj && Object.keys(obj).length !== 0);
  }
  
  function bringChildKeysToParent(parent: object) {
    const newParent = {};
  
    for (const _key in parent) {
      const key = _key as keyof typeof parent;
      const value = parent[key];
  
      if (typeof value !== 'object') {
        newParent[key] = parent[key];
      } else {
        Object.assign(newParent, bringChildKeysToParent(parent[key]));
      }
    }
  
    return newParent;
  }

`,

  updateFieldValuesComment: `/**
 * =========================
 * update field values
 * =========================
 */

`,

  export: {
    start: `/**
 * =========================
 * update field operations
 * =========================
 */

export default {
  ...p,
  `,

    end: `
};
  `,
  },
};

function doesSomeModelHasThisModelInRelations(
  modelName: string,
  type: RelationType,
) {
  for (const model of config) {
    if (
      model.relations.find(
        rel => rel.modelName === modelName && rel.type === type,
      )
    ) {
      return true;
    }
  }

  return false;
}

function generate() {
  let generatedFileContent = constants.head + constants.utils;
  let updateFieldValueFunctions = constants.updateFieldValuesComment;
  let updateFieldOperations = '';

  for (const modelDescription of config) {
    const { model, modelName, field, relations } = modelDescription;

    updateFieldValueFunctions =
      updateFieldValueFunctions +
      `function update${modelName}WhereUniqueInput(
  uniqueWhere: Prisma.${modelName}WhereUniqueInput,
): Prisma.${modelName}WhereInput {
  const newUniqueWhere: Prisma.${modelName}WhereInput =
    bringChildKeysToParent(uniqueWhere);

  newUniqueWhere.${field} = null;

  return newUniqueWhere;
}

function update${modelName}WhereInput(
  where?: Prisma.${modelName}WhereInput,
): Prisma.${modelName}WhereInput | undefined {
  if (!objectHasKeys(where)) return { ${field}: null };

  const newWhere: Prisma.${modelName}WhereInput = {
    ...where,
${relations
  .filter(rel => rel.type === RelationType.MANY)
  .map(
    rel =>
      `    ${rel.field}: update${rel.modelName}ListRelationFilter(where?.${rel.field})`,
  )
  .join(',\n')},
    ${field}: null,
  };

  return newWhere;
}

${
  doesSomeModelHasThisModelInRelations(modelName, RelationType.MANY)
    ? `function update${modelName}ListRelationFilter(
  listRelationFilter?: Prisma.${modelName}ListRelationFilter,
): Prisma.${modelName}ListRelationFilter | undefined {
  if (!objectHasKeys(listRelationFilter)) return;

  const newListRelationFilter: Prisma.${modelName}ListRelationFilter = {};

  for (const _key in listRelationFilter) {
    const key = _key as keyof typeof listRelationFilter;
    const value = listRelationFilter[key];

    if (objectHasKeys(value)) {
      newListRelationFilter[key] = update${modelName}WhereInput(value);
    }
  }

  return newListRelationFilter;
}

`
    : ''
}`;

    updateFieldOperations =
      updateFieldOperations +
      `  ${model}: {
    ...p.${model},
    findUnique(_args: Prisma.${modelName}FindUniqueArgs & DeletedExtension) {
      const { includeDeleted, ...args } = _args;

      if (includeDeleted) {
        return p.${model}.findUnique(args);
      }

      if (Object.keys(args.where).length !== 1) {
        throw new Error('Please give only one argument for findUnique');
      }

      return p.${model}.findFirst({
        ...args,
        where: update${modelName}WhereUniqueInput(args.where),
      });
    },
    findFirst(_args: Prisma.${modelName}FindFirstArgs & DeletedExtension) {
      const { includeDeleted, ...args } = _args;

      if (includeDeleted) {
        return p.${model}.findFirst(args);
      }

      return p.${model}.findFirst({
        ...args,
        where: update${modelName}WhereInput(args.where),
      });
    },
    findMany(_args: Prisma.${modelName}FindManyArgs & DeletedExtension) {
      const { includeDeleted, ...args } = _args;

      if (includeDeleted) {
        return p.${model}.findMany(args);
      }

      return p.${model}.findMany({
        ...args,
        where: update${modelName}WhereInput(args.where),
      });
    }
  },
    `;
  }

  generatedFileContent +=
    updateFieldValueFunctions +
    constants.export.start +
    updateFieldOperations +
    constants.export.end;

  return generatedFileContent;
}

const generatedFileContent = generate();

fs.writeFile('./src/generated-code.ts', generatedFileContent).then(res => {
  console.log('Written to file');
});
