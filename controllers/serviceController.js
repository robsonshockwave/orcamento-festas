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

  getAll: async (req, res) => {
    try {
      const services = await ServiceModel.find();
      res.status(200).json(services);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao buscar os serviços.' });
    }
  },

  get: async (req, res) => {
    try {
      const id = req.params.id;

      const service = await ServiceModel.findById(id);

      if (!service) {
        return res.status(404).json({ error: 'Serviço não encontrado.' });
      }

      res.status(200).json(service);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao buscar o serviço.' });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const service = await ServiceModel.findById(id);

      if (!service) {
        return res.status(404).json({ error: 'Serviço não encontrado.' });
      }

      const deletedService = await ServiceModel.findByIdAndDelete(id);

      res
        .status(200)
        .json({ message: 'Serviço excluido com sucesso!', deletedService });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao excluir o serviço.' });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;

      const service = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
      };

      const updatedService = await ServiceModel.findByIdAndUpdate(id, service);

      if (!updatedService) {
        return res.status(404).json({ error: 'Serviço não encontrado.' });
      }

      res
        .status(200)
        .json({ message: 'Serviço atualizado com sucesso!', updatedService });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao atualizar o serviço.' });
    }
  },
};

module.exports = serviceController;
