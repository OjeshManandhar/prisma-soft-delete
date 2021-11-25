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
      data: { PinnedComment: { connect: { id: req.body.commentId } } }
    })
  );
});

export default router;
