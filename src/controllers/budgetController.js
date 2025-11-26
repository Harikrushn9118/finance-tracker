const prisma = require('../prismaClient');

exports.setBudget = async (req, res) =>{
  const {month, amount} =req.body;
  const data = {month, amount: parseFloat(amount),userId:req.user.id };
  const existing = await prisma.budget.findFirst({ where: {userId:req.user.id, month }});
  let resp;
  if (existing) resp = await prisma.budget.update({ where: { id:existing.id },data });
  else resp = await prisma.budget.create({ data });
  res.json(resp);
};

exports.budgetStatus = async (req,res) => {
  const {month} =req.query;
  const m = month || `${new Date().getFullYear()}-${String(new Date().getMonth()+1).padStart(2,'0')}`;
  const budget = await prisma.budget.findFirst({ where: {userId:req.user.id, month: m }});
  const start = new Date(m + '-01');
  const end = new Date(start.getFullYear(),start.getMonth()+1,1);
  const expenseSum = await prisma.transaction.aggregate({
    where: { userId:req.user.id, type:'expense',createdAt: { gte:start, lt:end }},
    _sum: { amount:true }
  });
  const spent = expenseSum._sum.amount || 0;
  res.json({ month:m, budget:budget? budget.amount:0, spent, remaining:(budget ? budget.amount :0) - spent });
};
