const { contact: service } = require('../../services')

const { HttpCode } = require('../../helpers')

const getContactById = async (req, res) => {
  const { contactId } = req.params

  try {
    const result = await service.findById(req.user.id, contactId)

    res.json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        result,
      },
    })
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Contact Not Found',
    })
  }
}

module.exports = getContactById
