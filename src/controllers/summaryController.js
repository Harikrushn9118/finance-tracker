const prisma = require('../prismaClient');

exports.monthlySummary = async (req, res)=> {
  const { month } = req.query;
  const start = month ? new Date(month + '-01'):new Date(new Date().getFullYear(),new Date().getMonth(), 1);
  const end = new Date(start.getFullYear(),start.getMonth()+1, 1);
  const txs = await prisma.transaction.findMany({
    where: { userId: req.user.id, createdAt: { gte: start, lt: end }},
  });
  const income = txs.filter(t => t.type ==='income').reduce((s,a)=>s+a.amount,0);
  const expense = txs.filter(t => t.type ==='expense').reduce((s,a)=>s+a.amount,0);
  res.json({ income, expense, balance: income - expense, totalTransactions: txs.length });
};

exports.topCategory = async (req, res) => {
  const txs = await prisma.$queryRaw`
    SELECT c.name, SUM(t.amount) as total
    FROM Transaction t
    JOIN Category c ON t.categoryId = c.id
    WHERE t.userId = ${req.user.id}
    GROUP BY c.name
    ORDER BY total DESC
    LIMIT 1;
  `;
  res.json(txs[0] || { name: null, total: 0 });
};
