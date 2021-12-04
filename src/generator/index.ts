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
        modelName: 'User',
        field: 'Author',
        type: RelationType.ONE,
      },
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
      },
    ],
  },
  {
    model: 'comment',
    modelName: 'Comment',
    field: 'deletedAt',
    relations: [
      {
        modelName: 'User',
        field: 'Author',
        type: RelationType.ONE,
      },
      {
        modelName: 'Post',
        field: 'Post',
        type: RelationType.ONE,
      },
      {
        modelName: 'Comment',
        field: 'ParentComment',
        type: RelationType.ONE,
      },
      {
        modelName: 'Post',
        field: 'PinnedInPost',
        type: RelationType.ONE,
        disconnect: true,
      },
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

function doesSomeModelHasThisModelInRelation(
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
${(() => {
  const list = relations
    .filter(rel => rel.type === RelationType.ONE)
    .map(
      rel =>
        `    ${rel.field}: update${rel.modelName}XOR${rel.modelName}RelationFilter${rel.modelName}WhereInput(
      where?.${rel.field} || undefined
    )`,
    );

  return list.length > 0 ? list.join(',\n') + ',\n' : '';
})()}${(() => {
        const list = relations
          .filter(rel => rel.type === RelationType.MANY)
          .map(
            rel =>
              `    ${rel.field}: update${rel.modelName}ListRelationFilter(where?.${rel.field})`,
          );

        return list.length > 0 ? list.join(',\n') + ',' : '\n';
      })()}
    ${field}: null,
  };

  return newWhere;
}

${
  doesSomeModelHasThisModelInRelation(modelName, RelationType.ONE)
    ? `function update${modelName}XOR${modelName}RelationFilter${modelName}WhereInput(
  filter?: Prisma.XOR<Prisma.${modelName}RelationFilter, Prisma.${modelName}WhereInput>,
): Prisma.XOR<Prisma.${modelName}RelationFilter, Prisma.${modelName}WhereInput> | undefined {
  if (!objectHasKeys(filter)) return;

  const newFilter: Prisma.XOR<
    Prisma.${modelName}RelationFilter,
    Prisma.${modelName}WhereInput
  > = {};

  const keys = Object.keys(filter!);

  if (keys.length === 1 && (keys[0] === 'is' || keys[0] === 'isNot')) {
    const key = keys[0];

    if (typeof filter![key] !== 'object') {
      throw new Error(\`Provide an object for \${key}\`);
    }

    newFilter[key] = update${modelName}WhereInput(
      filter![key] as Prisma.${modelName}WhereInput,
    );
  } else {
    Object.assign(
      newFilter,
      update${modelName}WhereInput(filter as Prisma.${modelName}WhereInput),
    );
  }

  return newFilter;
}

`
    : ''
}${
        doesSomeModelHasThisModelInRelation(modelName, RelationType.MANY)
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
        throw new Error('Give only one argument for findUnique');
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
