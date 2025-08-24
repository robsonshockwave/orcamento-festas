const { Service: ServiceModel } = require('../models/Service');

const serviceController = {
  create: async (req, res) => {
    try {
      const service = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
      };

      const response = await ServiceModel.create(service);

      res
        .status(201)
        .json({ message: 'Serviço criado com sucesso!', response });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao criar o serviço.' });
    }
  },
};

module.exports = serviceController;
