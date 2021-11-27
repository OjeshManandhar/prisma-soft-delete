// packages
import { Router } from 'express';

// db
import prisma from '../_prisma';

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
        isReply: false
      },
      include: {
        Author: { select: { username: true } },
        Replies: {
          select: {
            id: true,
            opinion: true,
            Author: { select: { username: true } }
          }
        }
      }
    })
  );
});

// update
router.put('/:id', async (req, res) => {
  res.send(
    await prisma.comment.update({
      where: { id: req.params.id },
      data: req.body
    })
  );
});

// delete
router.put('/:id', async (req, res) => {
  res.send(
    await prisma.comment.delete({
      where: { id: req.params.id }
    })
  );
});

export default router;
