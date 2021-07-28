const { contact: service } = require('../../services')

const { HttpCode } = require('../../helpers')

const updateContact = async (req, res) => {
  try {
    const { contactId } = req.params
    const result = await service.update(
      req.user.id,
      contactId,
      { ...req.body },
      { new: true }
    )

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
      message: 'Missing fields',
    })
  }
}

module.exports = updateContact
