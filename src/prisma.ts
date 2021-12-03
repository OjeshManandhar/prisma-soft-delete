import { Prisma } from '.prisma/client';
import p from './_prisma';

type DeletedExtension = {
  deleted?: Boolean;
};

const ModelNameToPrismaKey: { [index: string]: keyof typeof p } = {
  User: 'user',
  Post: 'post',
  Comment: 'comment'
};

/*
enum RelationType {
  ONE = 'ONE',
  MANY = 'MANY'
}

const config = [
  {
    model: 'User',
    field: 'deletedAt',
    delete: [
      { model: 'Post', relation: RelationType.MANY, field: 'Posts' },
      { model: 'Comment', relation: RelationType.MANY, field: 'Comments' }
    ]
  },
  {
    model: 'Post',
    field: 'deletedAt',
    delete: [
      { model: 'Comment', relation: RelationType.MANY, field: 'Comments' }
    ],
    disconnect: [
      { model: 'Comment', realtion: RelationType.ONE, field: 'PinnedComment' }
    ]
  },
  {
    model: 'Comment',
    field: 'deletedAt',
    delete: [
      { model: 'Comment', relation: RelationType.MANY, field: 'Replies' }
    ]
  }
];
*/

function bringToParent(parent: object) {
  const newParent = {};

  for (const _key in parent) {
    const key = _key as keyof typeof parent;
    const value = parent[key];

    if (typeof value !== 'object') {
      newParent[key] = parent[key];
    } else {
      Object.assign(newParent, bringToParent(parent[key]));
    }
  }

  return newParent;
}

function updateUserWhereUniqueInput(uniqueWhere: Prisma.UserWhereUniqueInput) {
  const newUniqueWhere: Prisma.UserWhereInput = bringToParent(uniqueWhere);

  newUniqueWhere.deletedAt = null;

  return newUniqueWhere;
}

// function updateUserWhereInput(
//   where: Prisma.UserWhereInput,
//   deleted: Boolean = false
// ): Prisma.UserWhereInput {
//   const newWhere: Prisma.UserWhereInput = {
//     ...where,
//     ...(() => (deleted ? {} : { deletedAt: null }))(),
//     Posts: where.Posts ? updatePostWhereInput(where.Posts, deleted) : {},
//     Comments: where.Comments
//       ? updateCommentWhereInput(where.Posts, deleted)
//       : {}
//   };

//   return newWhere;
// }

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
    // findFirst(_args: Prisma.UserFindFirstArgs & DeletedExtension) {
    //   const args = _args as Prisma.UserFindFirstArgs;

    //   if (_args.deleted) {
    //     return p.user.findFirst(args);
    //   }

    //   return p.user.findFirst({
    //     ...args,
    //     where: {
    //       ...args.where,
    //       deletedAt: null
    //     }
    //   });
    // },
    // findMany(_args: Prisma.UserFindManyArgs & DeletedExtension) {
    //   const args = _args as Prisma.UserFindManyArgs;

    //   if (_args.deleted) {
    //     return p.user.findMany(args);
    //   }

    //   return p.user.findMany({
    //     ...args,
    //     where: {
    //       ...args.where,
    //       deletedAt: null
    //     }
    //   });
    // }
  }
};
