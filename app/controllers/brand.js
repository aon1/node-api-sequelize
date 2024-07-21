const { Brand } = require('../models')

exports.index = async (req, res) => {
  try {
    const brands = await Brand.findAll()
    res.status(200).json(brands)
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 500, message: error })
  }
}

exports.create = async (req, res) => {
  const data = req.body

  try {
    const brand = await Brand.create(data)
    res.status(200).json({
      status: 200,
      message: 'Client created',
      data: { brand: brand.id }
    })
  } catch (error) {
    console.error('Error on creating client', error)
    res.status(500).json({ message: 'Error on creating brand' })
  }
}

exports.update = async (req, res) => {
  const data = req.body
  const brandId = req.params.brandId

  try {
    await Brand.update(data, { where: { id: brandId } })
    res.status(200).json({ status: 200, message: 'Brand updated' })
  } catch (error) {
    console.error('Error on updating Brand', error)
    res
      .status(500)
      .json({ status: 500, message: 'Error on updating Brand' })
  }
}

exports.delete = async (req, res) => {
  const brandId = req.params.brandId

  try {
    const affectedRows = await Brand.destroy({ where: { id: brandId } })
    if (affectedRows === 0) {
      return res
        .status(404)
        .json({ status: 404, message: 'Brand not found' })
    } else if (affectedRows === 1) {
      return res
        .status(200)
        .json({ status: 200, message: 'Brand deleted' })
    } else {
      return Promise.reject(
        new Error('Unexpected error. Wront ammount deletion of Brand')
      )
    }
  } catch (error) {
    console.error('Error on deleting Brand', error)
    res
      .status(500)
      .json({ status: 500, message: 'Error on deleting Brand' })
  }
}
