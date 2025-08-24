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

  getAll: async (req, res) => {
    try {
      const parties = await PartyModel.find();
      res.status(200).json(parties);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao buscar as festas.' });
    }
  },

  get: async (req, res) => {
    try {
      const id = req.params.id;

      const party = await PartyModel.findById(id);

      if (!party) {
        return res.status(404).json({ error: 'Festa não encontrada.' });
      }

      res.status(200).json(party);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao buscar a festa.' });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const party = await PartyModel.findById(id);

      if (!party) {
        return res.status(404).json({ error: 'Festa não encontrada.' });
      }

      const deletedParty = await PartyModel.findByIdAndDelete(id);

      res
        .status(200)
        .json({ message: 'Festa excluida com sucesso!', deletedParty });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao excluir a festa.' });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;

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

      const updatedParty = await PartyModel.findByIdAndUpdate(id, party);

      if (!updatedParty) {
        return res.status(404).json({ error: 'Festa não encontrada.' });
      }

      res
        .status(200)
        .json({ message: 'Festa atualizada com sucesso!', updatedParty });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao atualizar a festa.' });
    }
  },
};

module.exports = partyController;
