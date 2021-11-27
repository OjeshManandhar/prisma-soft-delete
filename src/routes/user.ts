// packages
import { Router } from 'express';

// db
import prisma from '../_prisma';

const router = Router();

// create
router.post('/', async (req, res) => {
  res.send(await prisma.user.create({ data: req.body }));
});

// list
router.get('/', async (req, res) => {
  res.send(await prisma.user.findMany({ orderBy: { createdAt: 'asc' } }));
});

// update
router.put('/:id', async (req, res) => {
  res.send(
    await prisma.user.update({
      where: { id: req.params.id },
      data: req.body
    })
  );
});

// delete
router.delete('/:id', async (req, res) => {
  res.send(await prisma.user.delete({ where: { id: req.params.id } }));
});

export default router;
