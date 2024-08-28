const { Brand } = require('../models');
const logger = require('../../logger');
const { checkGrant } = require('../services/acl');

exports.index = async (req, res) => {
  try {
    logger.info('Getting all brands');
    const brands = await Brand.findAll();
    res.status(200).json(brands);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ status: 500, message: error });
  }
};

exports.create = async (req, res) => {
  const data = req.body;
  console.log(data);
  console.log(req.user)

  try {
    // const grant = checkGrant(req.user, 'createAny', 'brand');
    // console.log("###### " + grant)
    const brand = await Brand.create(data);
    res.status(200).json({
      status: 200,
      message: 'Client created',
      data: { brand: brand.id },
    });
  } catch (error) {
    logger.error('Error on creating brand', error);
    res.status(500).json({ message: 'Error on creating brand' });
  }
};

exports.update = async (req, res) => {
  const data = req.body;
  const { id } = req.params;

  try {
    await Brand.update(data, { where: { id } });
    res.status(200).json({ status: 200, message: 'Brand updated' });
  } catch (error) {
    logger.error('Error on updating Brand', error);
    res
      .status(500)
      .json({ status: 500, message: 'Error on updating Brand' });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const affectedRows = await Brand.destroy({ where: { id } });
    if (affectedRows === 0) {
      return res
        .status(404)
        .json({ status: 404, message: 'Brand not found' });
    }
    return res
      .status(200)
      .json({ status: 200, message: 'Brand deleted' });
  } catch (error) {
    logger.error('Error on deleting Brand', error);
    res
      .status(500)
      .json({ status: 500, message: 'Error on deleting Brand' });
  }
};
