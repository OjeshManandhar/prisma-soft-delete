// packages
import { Router } from 'express';

// db
import prisma from '../prisma';

const router = Router();

// create
router.post('/', async (req, res) => {
  res.send(await prisma.post.create({ data: req.body }));
});

// list
router.get('/', async (req, res) => {
  res.send(
    await prisma.post.findMany({
      include: {
        Author: {
          select: {
            username: true,
            gender: true
          }
        },
        PinnedComment: {
          select: {
            opinion: true,
            Author: { select: { username: true } }
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    })
  );
});

// find
router.get('/:opinion', async (req, res) => {
  const opinion = req.params.opinion;

  res.send(
    await prisma.post.findMany({
      where: { opinion: { contains: opinion } },
      include: {
        Author: {
          select: {
            username: true,
            gender: true
          }
        },
        PinnedComment: {
          select: {
            opinion: true,
            Author: { select: { username: true } }
          }
        }
      },
      includeDeleted: true
    })
  );
});

// update
router.put('/:id', async (req, res) => {
  res.send(
    await prisma.post.update({
      where: { id: req.params.id },
      data: req.body
    })
  );
});

// delete
router.put('/:id', async (req, res) => {
  res.send(
    await prisma.post.delete({
      where: { id: req.params.id }
    })
  );
});

// pin comment
router.patch('/:id', async (req, res) => {
  res.send(
    await prisma.post.update({
      where: { id: req.params.id },
      data: {
        PinnedComment: {
          ...(() => {
            const commentId = req.body.commentId;

            return commentId
              ? { connect: { id: commentId } }
              : { disconnect: true };
          })()
        }
      }
    })
  );
});

export default router;
