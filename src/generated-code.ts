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

function updateUserWhereUniqueInputToWhereInput(
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

function updateUserArgs(args: Prisma.UserArgs) {
  const newArgs: Prisma.UserArgs = {
    ...args,
    select: updateUserSelectAndInclude(args.select),
    include: updateUserSelectAndInclude(args.include),
  };

  return newArgs;
}

function updateUserFindFirstAndManyArgs(
  args: Prisma.UserFindFirstArgs | Prisma.UserFindManyArgs,
): Prisma.UserFindFirstArgs | Prisma.UserFindManyArgs {
  const newArgs = {
    ...args,
    select: updateUserSelectAndInclude(args.select),
    include: updateUserSelectAndInclude(args.include),
    where: updateUserWhereInput(args.where),
  };

  return newArgs;
}

function updateUserSelectAndInclude(
  select?: Prisma.UserSelect | Prisma.UserInclude | null,
): Prisma.UserSelect | Prisma.UserInclude | null | undefined {
  if (!select) return select;

  const newSelect = { ...select };
  
  if (select.Posts && typeof select.Posts === 'object') {
    newSelect.Posts = updatePostFindFirstAndManyArgs(select.Posts);
  }

  if (select.Comments && typeof select.Comments === 'object') {
    newSelect.Comments = updateCommentFindFirstAndManyArgs(select.Comments);
  }

  return newSelect;
}

function updatePostWhereUniqueInputToWhereInput(
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
      where?.Author || undefined,
    ),
    PinnedComment: updateCommentXORCommentRelationFilterCommentWhereInput(
      where?.PinnedComment || undefined,
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

function updatePostArgs(args: Prisma.PostArgs) {
  const newArgs: Prisma.PostArgs = {
    ...args,
    select: updatePostSelectAndInclude(args.select),
    include: updatePostSelectAndInclude(args.include),
  };

  return newArgs;
}

function updatePostFindFirstAndManyArgs(
  args: Prisma.PostFindFirstArgs | Prisma.PostFindManyArgs,
): Prisma.PostFindFirstArgs | Prisma.PostFindManyArgs {
  const newArgs = {
    ...args,
    select: updatePostSelectAndInclude(args.select),
    include: updatePostSelectAndInclude(args.include),
    where: updatePostWhereInput(args.where),
  };

  return newArgs;
}

function updatePostSelectAndInclude(
  select?: Prisma.PostSelect | Prisma.PostInclude | null,
): Prisma.PostSelect | Prisma.PostInclude | null | undefined {
  if (!select) return select;

  const newSelect = { ...select };
  
  if (select.Author && typeof select.Author === 'object') {
    newSelect.Author = updateUserArgs(select.Author);
  }

  if (select.PinnedComment && typeof select.PinnedComment === 'object') {
    newSelect.PinnedComment = updateCommentArgs(select.PinnedComment);
  }

  if (select.Comments && typeof select.Comments === 'object') {
    newSelect.Comments = updateCommentFindFirstAndManyArgs(select.Comments);
  }

  return newSelect;
}

function updateCommentWhereUniqueInputToWhereInput(
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
      where?.Author || undefined,
    ),
    Post: updatePostXORPostRelationFilterPostWhereInput(
      where?.Post || undefined,
    ),
    ParentComment: updateCommentXORCommentRelationFilterCommentWhereInput(
      where?.ParentComment || undefined,
    ),
    PinnedInPost: updatePostXORPostRelationFilterPostWhereInput(
      where?.PinnedInPost || undefined,
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

function updateCommentArgs(args: Prisma.CommentArgs) {
  const newArgs: Prisma.CommentArgs = {
    ...args,
    select: updateCommentSelectAndInclude(args.select),
    include: updateCommentSelectAndInclude(args.include),
  };

  return newArgs;
}

function updateCommentFindFirstAndManyArgs(
  args: Prisma.CommentFindFirstArgs | Prisma.CommentFindManyArgs,
): Prisma.CommentFindFirstArgs | Prisma.CommentFindManyArgs {
  const newArgs = {
    ...args,
    select: updateCommentSelectAndInclude(args.select),
    include: updateCommentSelectAndInclude(args.include),
    where: updateCommentWhereInput(args.where),
  };

  return newArgs;
}

function updateCommentSelectAndInclude(
  select?: Prisma.CommentSelect | Prisma.CommentInclude | null,
): Prisma.CommentSelect | Prisma.CommentInclude | null | undefined {
  if (!select) return select;

  const newSelect = { ...select };
  
  if (select.Author && typeof select.Author === 'object') {
    newSelect.Author = updateUserArgs(select.Author);
  }

  if (select.Post && typeof select.Post === 'object') {
    newSelect.Post = updatePostArgs(select.Post);
  }

  if (select.ParentComment && typeof select.ParentComment === 'object') {
    newSelect.ParentComment = updateCommentArgs(select.ParentComment);
  }

  if (select.PinnedInPost && typeof select.PinnedInPost === 'object') {
    newSelect.PinnedInPost = updatePostArgs(select.PinnedInPost);
  }

  if (select.Replies && typeof select.Replies === 'object') {
    newSelect.Replies = updateCommentFindFirstAndManyArgs(select.Replies);
  }

  return newSelect;
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
        where: updateUserWhereUniqueInputToWhereInput(args.where),
      });
    },
    findFirst(_args: Prisma.UserFindFirstArgs & DeletedExtension) {
      const { includeDeleted, ...args } = _args;

      if (includeDeleted) {
        return p.user.findFirst(args);
      }

      return p.user.findFirst(updateUserFindFirstAndManyArgs(args));
    },
    findMany(_args: Prisma.UserFindManyArgs & DeletedExtension) {
      const { includeDeleted, ...args } = _args;

      if (includeDeleted) {
        return p.user.findMany(args);
      }

      return p.user.findMany(updateUserFindFirstAndManyArgs(args));
    },
    async update(_args: Prisma.UserUpdateArgs & DeletedExtension) {
      const { includeDeleted, ...args } = _args;

      if (includeDeleted) {
        return p.user.update(args);
      }

      const foundUser = await p.user.findUnique({
        where: args.where,
        rejectOnNotFound: false,
      });

      if (foundUser?.deletedAt) {
        throw new Error('User to update not found');
      }

      // TODO check if data has connected a deleted record or not

      if (args.select) {
        args.select = updateUserSelectAndInclude(
          args.select,
        ) as Prisma.UserSelect;
      }

      if (args.include) {
        args.include = updateUserSelectAndInclude(
          args.include,
        ) as Prisma.UserInclude;
      }

      return p.user.update(args);
    },
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
        where: updatePostWhereUniqueInputToWhereInput(args.where),
      });
    },
    findFirst(_args: Prisma.PostFindFirstArgs & DeletedExtension) {
      const { includeDeleted, ...args } = _args;

      if (includeDeleted) {
        return p.post.findFirst(args);
      }

      return p.post.findFirst(updatePostFindFirstAndManyArgs(args));
    },
    findMany(_args: Prisma.PostFindManyArgs & DeletedExtension) {
      const { includeDeleted, ...args } = _args;

      if (includeDeleted) {
        return p.post.findMany(args);
      }

      return p.post.findMany(updatePostFindFirstAndManyArgs(args));
    },
    async update(_args: Prisma.PostUpdateArgs & DeletedExtension) {
      const { includeDeleted, ...args } = _args;

      if (includeDeleted) {
        return p.post.update(args);
      }

      const foundPost = await p.post.findUnique({
        where: args.where,
        rejectOnNotFound: false,
      });

      if (foundPost?.deletedAt) {
        throw new Error('Post to update not found');
      }

      // TODO check if data has connected a deleted record or not

      if (args.select) {
        args.select = updatePostSelectAndInclude(
          args.select,
        ) as Prisma.PostSelect;
      }

      if (args.include) {
        args.include = updatePostSelectAndInclude(
          args.include,
        ) as Prisma.PostInclude;
      }

      return p.post.update(args);
    },
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
        where: updateCommentWhereUniqueInputToWhereInput(args.where),
      });
    },
    findFirst(_args: Prisma.CommentFindFirstArgs & DeletedExtension) {
      const { includeDeleted, ...args } = _args;

      if (includeDeleted) {
        return p.comment.findFirst(args);
      }

      return p.comment.findFirst(updateCommentFindFirstAndManyArgs(args));
    },
    findMany(_args: Prisma.CommentFindManyArgs & DeletedExtension) {
      const { includeDeleted, ...args } = _args;

      if (includeDeleted) {
        return p.comment.findMany(args);
      }

      return p.comment.findMany(updateCommentFindFirstAndManyArgs(args));
    },
    async update(_args: Prisma.CommentUpdateArgs & DeletedExtension) {
      const { includeDeleted, ...args } = _args;

      if (includeDeleted) {
        return p.comment.update(args);
      }

      const foundComment = await p.comment.findUnique({
        where: args.where,
        rejectOnNotFound: false,
      });

      if (foundComment?.deletedAt) {
        throw new Error('Comment to update not found');
      }

      // TODO check if data has connected a deleted record or not

      if (args.select) {
        args.select = updateCommentSelectAndInclude(
          args.select,
        ) as Prisma.CommentSelect;
      }

      if (args.include) {
        args.include = updateCommentSelectAndInclude(
          args.include,
        ) as Prisma.CommentInclude;
      }

      return p.comment.update(args);
    },
  },
    
};
  