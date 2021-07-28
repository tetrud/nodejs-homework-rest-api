const { HttpCode } = require('../../helpers')

const getCurrent = (req, res, next) => {
  try {
    const currentUser = {
      email: req.user.email,
      subscription: req.user.subscription,
    }
    res.json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        result: currentUser,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getCurrent
