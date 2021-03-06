// packages
import { Router } from 'express';

// db
import prisma from '../prisma';

const router = Router();

// create
router.post('/', async (req, res) => {
  res.send(await prisma.comment.create({ data: req.body }));
});

// list
router.get('/', async (req, res) => {
  res.send(
    await prisma.comment.findMany({
      where: {
        isReply: false,
      },
      include: {
        Author: { select: { username: true } },
        Replies: {
          select: {
            id: true,
            opinion: true,
            Author: { select: { username: true } },
          },
        },
      },
    }),
  );
});

// find
router.get('/:opinion', async (req, res) => {
  const opinion = req.params.opinion;

  res.send(
    await prisma.comment.findMany({
      where: { opinion: { contains: opinion } },
      include: {
        Author: { select: { username: true } },
        Replies: {
          select: {
            id: true,
            opinion: true,
            Author: { select: { username: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      includeDeleted: !true,
    }),
  );
});

// update
router.put('/:id', async (req, res) => {
  res.send(
    await prisma.comment.update({
      where: { id: req.params.id },
      data: req.body,
    }),
  );
});

// delete
router.put('/:id', async (req, res) => {
  res.send(
    await prisma.comment.delete({
      where: { id: req.params.id },
    }),
  );
});

export default router;
