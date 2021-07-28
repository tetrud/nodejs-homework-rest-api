const { user: service } = require('../../services')
const { HttpCode } = require('../../helpers')

const updateSubscription = async (req, res, next) => {
  try {
    const { subscription, email } = await service.updateSubscription(
      req.user.id,
      req.body,
      {
        new: true,
      }
    )

    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        result: {
          email,
          subscription,
        },
      },
    })
  } catch (error) {
    res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not Found',
    })
  }
}

module.exports = updateSubscription
