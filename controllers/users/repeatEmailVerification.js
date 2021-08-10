const { user: service, sendEmail } = require('../../services')
const { HttpCode } = require('../../helpers')

const repeatEmailVerification = async (req, res, next) => {
  const { email } = req.body
  if (!email) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      data: {
        message: 'Missing required field email',
      },
    })
  }

  try {
    const user = await service.getOne({ email })

    if (user) {
      const { email, verify, verifyToken } = user
      if (verify) {
        return res.status(HttpCode.BAD_REQUEST).json({
          status: 'error',
          code: HttpCode.BAD_REQUEST,
          data: {
            message: 'Verification has already been passed',
          },
        })
      }

      await sendEmail(verifyToken, email)
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          message: 'Verification email sent',
        },
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = repeatEmailVerification
