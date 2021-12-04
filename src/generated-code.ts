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

/**
 * =========================
 * update field values
 * =========================
 */

function updateUserWhereUniqueInput(
  uniqueWhere: Prisma.UserWhereUniqueInput,
): Prisma.UserWhereInput {
  const newUniqueWhere: Prisma.UserWhereInput =
    bringChildKeysToParent(uniqueWhere);

  newUniqueWhere.deletedAt = null;

  return newUniqueWhere;
}

function updateUserWhereInput(
  where?: Prisma.UserWhereInput,
): Prisma.UserWhereInput | undefined {
  if (!objectHasKeys(where)) return { deletedAt: null };

  const newWhere: Prisma.UserWhereInput = {
    ...where,
    Posts: updatePostListRelationFilter(where?.Posts),
    Comments: updateCommentListRelationFilter(where?.Comments),
    deletedAt: null,
  };

  return newWhere;
}

function updateUserXORUserRelationFilterUserWhereInput(
  filter?: Prisma.XOR<Prisma.UserRelationFilter, Prisma.UserWhereInput>,
): Prisma.XOR<Prisma.UserRelationFilter, Prisma.UserWhereInput> | undefined {
  if (!objectHasKeys(filter)) return;

  const newFilter: Prisma.XOR<
    Prisma.UserRelationFilter,
    Prisma.UserWhereInput
  > = {};

  const keys = Object.keys(filter!);

  if (keys.length === 1 && (keys[0] === 'is' || keys[0] === 'isNot')) {
    const key = keys[0];

    if (typeof filter![key] !== 'object') {
      throw new Error(`Provide an object for ${key}`);
    }

    newFilter[key] = updateUserWhereInput(
      filter![key] as Prisma.UserWhereInput,
    );
  } else {
    Object.assign(
      newFilter,
      updateUserWhereInput(filter as Prisma.UserWhereInput),
    );
  }

  return newFilter;
}

function updatePostWhereUniqueInput(
  uniqueWhere: Prisma.PostWhereUniqueInput,
): Prisma.PostWhereInput {
  const newUniqueWhere: Prisma.PostWhereInput =
    bringChildKeysToParent(uniqueWhere);

  newUniqueWhere.deletedAt = null;

  return newUniqueWhere;
}

function updatePostWhereInput(
  where?: Prisma.PostWhereInput,
): Prisma.PostWhereInput | undefined {
  if (!objectHasKeys(where)) return { deletedAt: null };

  const newWhere: Prisma.PostWhereInput = {
    ...where,
    Author: updateUserXORUserRelationFilterUserWhereInput(
      where?.Author || undefined
    ),
    PinnedComment: updateCommentXORCommentRelationFilterCommentWhereInput(
      where?.PinnedComment || undefined
    ),
    Comments: updateCommentListRelationFilter(where?.Comments),
    deletedAt: null,
  };

  return newWhere;
}

function updatePostXORPostRelationFilterPostWhereInput(
  filter?: Prisma.XOR<Prisma.PostRelationFilter, Prisma.PostWhereInput>,
): Prisma.XOR<Prisma.PostRelationFilter, Prisma.PostWhereInput> | undefined {
  if (!objectHasKeys(filter)) return;

  const newFilter: Prisma.XOR<
    Prisma.PostRelationFilter,
    Prisma.PostWhereInput
  > = {};

  const keys = Object.keys(filter!);

  if (keys.length === 1 && (keys[0] === 'is' || keys[0] === 'isNot')) {
    const key = keys[0];

    if (typeof filter![key] !== 'object') {
      throw new Error(`Provide an object for ${key}`);
    }

    newFilter[key] = updatePostWhereInput(
      filter![key] as Prisma.PostWhereInput,
    );
  } else {
    Object.assign(
      newFilter,
      updatePostWhereInput(filter as Prisma.PostWhereInput),
    );
  }

  return newFilter;
}

function updatePostListRelationFilter(
  listRelationFilter?: Prisma.PostListRelationFilter,
): Prisma.PostListRelationFilter | undefined {
  if (!objectHasKeys(listRelationFilter)) return;

  const newListRelationFilter: Prisma.PostListRelationFilter = {};

  for (const _key in listRelationFilter) {
    const key = _key as keyof typeof listRelationFilter;
    const value = listRelationFilter[key];

    if (objectHasKeys(value)) {
      newListRelationFilter[key] = updatePostWhereInput(value);
    }
  }

  return newListRelationFilter;
}

function updateCommentWhereUniqueInput(
  uniqueWhere: Prisma.CommentWhereUniqueInput,
): Prisma.CommentWhereInput {
  const newUniqueWhere: Prisma.CommentWhereInput =
    bringChildKeysToParent(uniqueWhere);

  newUniqueWhere.deletedAt = null;

  return newUniqueWhere;
}

function updateCommentWhereInput(
  where?: Prisma.CommentWhereInput,
): Prisma.CommentWhereInput | undefined {
  if (!objectHasKeys(where)) return { deletedAt: null };

  const newWhere: Prisma.CommentWhereInput = {
    ...where,
    Author: updateUserXORUserRelationFilterUserWhereInput(
      where?.Author || undefined
    ),
    Post: updatePostXORPostRelationFilterPostWhereInput(
      where?.Post || undefined
    ),
    ParentComment: updateCommentXORCommentRelationFilterCommentWhereInput(
      where?.ParentComment || undefined
    ),
    PinnedInPost: updatePostXORPostRelationFilterPostWhereInput(
      where?.PinnedInPost || undefined
    ),
    Replies: updateCommentListRelationFilter(where?.Replies),
    deletedAt: null,
  };

  return newWhere;
}

function updateCommentXORCommentRelationFilterCommentWhereInput(
  filter?: Prisma.XOR<Prisma.CommentRelationFilter, Prisma.CommentWhereInput>,
): Prisma.XOR<Prisma.CommentRelationFilter, Prisma.CommentWhereInput> | undefined {
  if (!objectHasKeys(filter)) return;

  const newFilter: Prisma.XOR<
    Prisma.CommentRelationFilter,
    Prisma.CommentWhereInput
  > = {};

  const keys = Object.keys(filter!);

  if (keys.length === 1 && (keys[0] === 'is' || keys[0] === 'isNot')) {
    const key = keys[0];

    if (typeof filter![key] !== 'object') {
      throw new Error(`Provide an object for ${key}`);
    }

    newFilter[key] = updateCommentWhereInput(
      filter![key] as Prisma.CommentWhereInput,
    );
  } else {
    Object.assign(
      newFilter,
      updateCommentWhereInput(filter as Prisma.CommentWhereInput),
    );
  }

  return newFilter;
}

function updateCommentListRelationFilter(
  listRelationFilter?: Prisma.CommentListRelationFilter,
): Prisma.CommentListRelationFilter | undefined {
  if (!objectHasKeys(listRelationFilter)) return;

  const newListRelationFilter: Prisma.CommentListRelationFilter = {};

  for (const _key in listRelationFilter) {
    const key = _key as keyof typeof listRelationFilter;
    const value = listRelationFilter[key];

    if (objectHasKeys(value)) {
      newListRelationFilter[key] = updateCommentWhereInput(value);
    }
  }

  return newListRelationFilter;
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
        throw new Error('Give only one argument for findUnique');
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
        throw new Error('Give only one argument for findUnique');
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
        throw new Error('Give only one argument for findUnique');
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
  