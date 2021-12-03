import { Prisma } from '.prisma/client';
import p from './_prisma';

type DeletedExtension = {
  deleted?: Boolean;
};

/*
enum RelationType {
  ONE = 'ONE',
  MANY = 'MANY'
}

const config = [
  {
    model: 'User',
    modelName: 'user',
    field: 'deletedAt',
    relations: [
      { model: 'Post', type: RelationType.MANY, field: 'Posts', delete: true },
      {
        model: 'Comment',
        type: RelationType.MANY,
        field: 'Comments',
        delete: true
      }
    ]
  },
  {
    model: 'Post',
    modelName: 'post',
    field: 'deletedAt',
    relations: [
      {
        model: 'Comment',
        relation: RelationType.MANY,
        field: 'Comments',
        delete: true
      },
      {
        model: 'Comment',
        realtion: RelationType.ONE,
        field: 'PinnedComment',
        disconnect: true
      }
    ]
  },
  {
    model: 'Comment',
    modelName: 'comment',
    field: 'deletedAt',
    relations: [
      { model: 'Comment', relation: RelationType.MANY, field: 'Replies' }
    ]
  }
];
*/

/**
 * =========================
 * utils
 * =========================
 */

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

/**
 * =========================
 * update field values
 * =========================
 */

function updateUserWhereUniqueInput(
  uniqueWhere: Prisma.UserWhereUniqueInput
): Prisma.UserWhereInput {
  const newUniqueWhere: Prisma.UserWhereInput =
    bringChildKeysToParent(uniqueWhere);

  newUniqueWhere.deletedAt = null;

  return newUniqueWhere;
}

function updateUserWhereInput(
  where?: Prisma.UserWhereInput,
  deleted: Boolean = false
): Prisma.UserWhereInput | undefined {
  // const newWhere: Prisma.UserWhereInput = {
  //   ...where,
  //   ...(() => (deleted ? {} : { deletedAt: null }))(),
  //   Posts: where.Posts ? updatePostWhereInput(where.Posts, deleted) : {},
  //   Comments: where.Comments
  //     ? updateCommentWhereInput(where.Posts, deleted)
  //     : {}
  // };

  if (!where) return;

  const newWhere: Prisma.UserWhereInput = { ...where };

  if (!deleted) newWhere.deletedAt = null;

  return newWhere;
}

function updatePostWhereUniqueInput(
  uniqueWhere: Prisma.PostWhereUniqueInput
): Prisma.PostWhereInput {
  const newUniqueWhere: Prisma.PostWhereInput =
    bringChildKeysToParent(uniqueWhere);

  newUniqueWhere.deletedAt = null;

  return newUniqueWhere;
}

function updatePostWhereInput(
  where?: Prisma.PostWhereInput,
  deleted: Boolean = false
): Prisma.PostWhereInput | undefined {
  if (!where) return;

  const newWhere: Prisma.PostWhereInput = { ...where };

  if (!deleted) newWhere.deletedAt = null;

  return newWhere;
}

/**
 * =========================
 * update field operations
 * =========================
 */

export default {
  ...p,
  user: {
    ...p.user,
    findUnique(_args: Prisma.UserFindUniqueArgs & DeletedExtension) {
      const { deleted, ...args } = _args;

      if (deleted) {
        return p.user.findUnique(args);
      }

      if (Object.keys(args.where).length !== 1) {
        throw new Error('Please give only one argument for findUnique');
      }

      return p.user.findFirst({
        ...args,
        where: updateUserWhereUniqueInput(args.where)
      });
    },
    findFirst(_args: Prisma.UserFindFirstArgs & DeletedExtension) {
      const { deleted, ...args } = _args;

      if (deleted) {
        return p.user.findFirst(args);
      }

      return p.user.findFirst({
        ...args,
        where: updateUserWhereInput(args.where)
      });
    },
    findMany(_args: Prisma.UserFindManyArgs & DeletedExtension) {
      const { deleted, ...args } = _args;

      if (deleted) {
        return p.user.findMany(args);
      }

      return p.user.findMany({
        ...args,
        where: updateUserWhereInput(args.where)
      });
    }
  },
  post: {
    ...p.post,
    findUnique(_args: Prisma.PostFindUniqueArgs & DeletedExtension) {
      const { deleted, ...args } = _args;

      if (deleted) {
        return p.post.findUnique(args);
      }

      if (Object.keys(args.where).length !== 1) {
        throw new Error('Please give only one argument for findUnique');
      }

      return p.post.findFirst({
        ...args,
        where: updatePostWhereUniqueInput(args.where)
      });
    },
    findFirst(_args: Prisma.PostFindFirstArgs & DeletedExtension) {
      const { deleted, ...args } = _args;

      if (deleted) {
        return p.post.findFirst(args);
      }

      console.log('updatePostWhereInput:', updatePostWhereInput(args.where));

      return p.post.findFirst({
        ...args,
        where: updatePostWhereInput(args.where)
      });
    },
    findMany(_args: Prisma.PostFindManyArgs & DeletedExtension) {
      const { deleted, ...args } = _args;

      if (deleted) {
        return p.post.findMany(args);
      }

      console.log('updatePostWhereInput:', updatePostWhereInput(args.where));

      return p.post.findMany({
        ...args,
        where: updatePostWhereInput(args.where)
      });
    }
  }
};
