const prisma = require('../prismaClient');


exports.addTransaction = async (req, res) => {
  const {amount, type, note, categoryName } =req.body;
  let category = await prisma.category.findFirst({
                                                  where: { name: categoryName }
                                                });
  if (!category) category = await prisma.category.create(
                                                { data: { name: categoryName }
                                              });
  const tx = await prisma.transaction.create({
    data: {
      amount: parseFloat(amount),
      type,
      note,
      user: { connect: { id: req.user.id }},
      category: { connect: { id: category.id }}
    }
  });
  res.json(tx);
};

exports.listTransactions = async (req, res) => {
  const { month } =req.query;
  const where = {userId: req.user.id };
  if (month) {
    const start = new Date(month +'-01');
    const end = new Date(start.getFullYear(), start.getMonth()+1, 1);
    where.createdAt = { gte:start, lt:end };
  }
  const txs = await prisma.transaction.findMany({
    where,
    include:{ category: true },
    orderBy:{ createdAt: 'desc' }
  });
  res.json(txs);
};
