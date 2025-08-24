const { Party: PartyModel } = require('../models/Party');

const checkPartyBudget = (budget, services) => {
  const priceSum = services.reduce((sum, service) => sum + service.price, 0);
  return budget >= priceSum;
};

const partyController = {
  create: async (req, res) => {
    try {
      const party = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        budget: req.body.budget,
        image: req.body.image,
        services: req.body.services,
      };

      // BUDGET < VALOR DOS SERVIÇOS != NOVO SERVIÇO
      if (party.services && !checkPartyBudget(party.budget, party.services)) {
        return res.status(406).json({
          error: 'O orçamento da festa é menor que o valor total dos serviços.',
        });
      }

      const response = await PartyModel.create(party);

      res.status(201).json({ message: 'Festa criada com sucesso!', response });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao criar a festa.' });
    }
  },
};

module.exports = partyController;
