// packages
import { Router } from 'express';

// db
import prisma from '../prisma';

const router = Router();

// create
router.post('/', async (req, res) => {
  res.send(await prisma.user.create({ data: req.body }));
});

// list
router.get('/', async (req, res) => {
  res.send(await prisma.user.findMany({ orderBy: { createdAt: 'asc' } }));
});

// find
router.get('/:username', async (req, res) => {
  const username = req.params.username;

  res.send(
    await prisma.user.findMany({
      where: {
        OR: [
          {
            id: '2bd34ec9-54ea-4bdf-ac2e-6cbec6bfe944',
          },
          {
            username: { contains: username },
          },
        ],
      },
      orderBy: { username: 'asc' },
      includeDeleted: !true,
    }),
  );
});

// update
router.put('/:id', async (req, res) => {
  res.send(
    await prisma.user.update({
      where: { id: req.params.id },
      data: req.body,
    }),
  );
});

// delete
router.delete('/:id', async (req, res) => {
  res.send(await prisma.user.delete({ where: { id: req.params.id } }));
});

export default router;
