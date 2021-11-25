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
      include: {
        Author: { select: { username: true } }
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
