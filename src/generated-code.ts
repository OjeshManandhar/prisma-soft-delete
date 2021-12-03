import p from './_prisma';

// types
import type { Prisma } from '@prisma/client';

type DeletedExtension = {
  includeDeleted?: Boolean;
};

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
): Prisma.UserWhereInput | undefined {
  if (!where) return;

  const newWhere: Prisma.UserWhereInput = {
    ...where,
    deletedAt: null,
  };

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
): Prisma.PostWhereInput | undefined {
  if (!where) return;

  const newWhere: Prisma.PostWhereInput = {
    ...where,
    deletedAt: null,
  };

  return newWhere;
}

function updateCommentWhereUniqueInput(
  uniqueWhere: Prisma.CommentWhereUniqueInput
): Prisma.CommentWhereInput {
  const newUniqueWhere: Prisma.CommentWhereInput =
    bringChildKeysToParent(uniqueWhere);

  newUniqueWhere.deletedAt = null;

  return newUniqueWhere;
}

function updateCommentWhereInput(
  where?: Prisma.CommentWhereInput,
): Prisma.CommentWhereInput | undefined {
  if (!where) return;

  const newWhere: Prisma.CommentWhereInput = {
    ...where,
    deletedAt: null,
  };

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
      const { includeDeleted, ...args } = _args;

      if (includeDeleted) {
        return p.user.findUnique(args);
      }

      if (Object.keys(args.where).length !== 1) {
        throw new Error('Please give only one argument for findUnique');
      }

      return p.user.findFirst({
        ...args,
        where: updateUserWhereUniqueInput(args.where),
      });
    },
    findFirst(_args: Prisma.UserFindFirstArgs & DeletedExtension) {
      const { includeDeleted, ...args } = _args;

      if (includeDeleted) {
        return p.user.findFirst(args);
      }

      return p.user.findFirst({
        ...args,
        where: updateUserWhereInput(args.where),
      });
    },
    findMany(_args: Prisma.UserFindManyArgs & DeletedExtension) {
      const { includeDeleted, ...args } = _args;

      if (includeDeleted) {
        return p.user.findMany(args);
      }

      return p.user.findMany({
        ...args,
        where: updateUserWhereInput(args.where),
      });
    }
  },
      post: {
    ...p.post,
    findUnique(_args: Prisma.PostFindUniqueArgs & DeletedExtension) {
      const { includeDeleted, ...args } = _args;

      if (includeDeleted) {
        return p.post.findUnique(args);
      }

      if (Object.keys(args.where).length !== 1) {
        throw new Error('Please give only one argument for findUnique');
      }

      return p.post.findFirst({
        ...args,
        where: updatePostWhereUniqueInput(args.where),
      });
    },
    findFirst(_args: Prisma.PostFindFirstArgs & DeletedExtension) {
      const { includeDeleted, ...args } = _args;

      if (includeDeleted) {
        return p.post.findFirst(args);
      }

      return p.post.findFirst({
        ...args,
        where: updatePostWhereInput(args.where),
      });
    },
    findMany(_args: Prisma.PostFindManyArgs & DeletedExtension) {
      const { includeDeleted, ...args } = _args;

      if (includeDeleted) {
        return p.post.findMany(args);
      }

      return p.post.findMany({
        ...args,
        where: updatePostWhereInput(args.where),
      });
    }
  },
      comment: {
    ...p.comment,
    findUnique(_args: Prisma.CommentFindUniqueArgs & DeletedExtension) {
      const { includeDeleted, ...args } = _args;

      if (includeDeleted) {
        return p.comment.findUnique(args);
      }

      if (Object.keys(args.where).length !== 1) {
        throw new Error('Please give only one argument for findUnique');
      }

      return p.comment.findFirst({
        ...args,
        where: updateCommentWhereUniqueInput(args.where),
      });
    },
    findFirst(_args: Prisma.CommentFindFirstArgs & DeletedExtension) {
      const { includeDeleted, ...args } = _args;

      if (includeDeleted) {
        return p.comment.findFirst(args);
      }

      return p.comment.findFirst({
        ...args,
        where: updateCommentWhereInput(args.where),
      });
    },
    findMany(_args: Prisma.CommentFindManyArgs & DeletedExtension) {
      const { includeDeleted, ...args } = _args;

      if (includeDeleted) {
        return p.comment.findMany(args);
      }

      return p.comment.findMany({
        ...args,
        where: updateCommentWhereInput(args.where),
      });
    }
  },
    
};
  