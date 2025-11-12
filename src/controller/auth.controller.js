import { ApiError } from '../errors/apiError.js'
import baseClass from '../helper/baseClass.js'
import bcrypt from 'bcrypt'
import { prisma } from '../lib/prisma.js'
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from '../helper/jwt.js'

export const AUTH = {
  async register(req, res, next) {
    try {
      const info = req.body
      if (!info || Object.keys(info).length === 0) {
        return next(ApiError(400, "Malumotlarni to'g'ri kiriting!"))
      }
      const clientExist = await prisma.client.findUnique({
        where: { email: info.email },
      })
      if (clientExist) {
        return next(new ApiError(403, "Email oldin ro'yxatdan o'tgan"))
      }

      info.password = await bcrypt.hash(info.password, 10)
      const code = Math.floor(100000 + Math.random() * 900000)
      info.verify_code = `${code}`;
      info.role.push("client");
      const result = await baseClass.create('client', info)

      
      res.status(200).send({
        success: true,
        message: `client muvaffaqqiyatli yaratildi`,
        data: {
          full_name: result.full_name,
          phone_number: result.phone_number,
          address: result.address,
          location: result.location,
          email: result.email,
          is_active: result.is_active
        },
      })
    } catch (err) {
      next(err)
    }
  },
  async login(req, res, next) {
    try {
      const { password, email } = req.body
      const clientExist = await prisma.client.findUnique({ where: { email } })
      if (!clientExist) {
        return next(new ApiError(403, "Email oldin ro'yxatdan o'tmagan"))
      }
      const isValidPassword = await bcrypt.compare(
        password,
        clientExist.password,
      )
      if (!isValidPassword)
        return next(new ApiError(401, "Email yoki parol noto'g'ri"))
      if (clientExist.is_active)
        return next(new ApiError(401, 'Userni verify qilishingiz kerak'))
      const accessToken = generateAccessToken(clientExist)
      const refreshToken = generateRefreshToken(clientExist)

      res.cookie('accessToken', accessToken, {
        maxAge: 60 * 60 * 1000,
      })

      res.cookie('refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 7 * 1000,
      })

      res.status(200).send({
        success: true,
        date: clientExist,
        message: 'User muvaffaqqiyatli login qilindi',
      })
    } catch (err) {
      next(err)
    }
  },
  async updateAccess(req, res, next) {
    try {
      const refreshToken = req.cookies?.refreshToken
      console.log(refreshToken)
      if (!refreshToken) {
        return next(new ApiError(401, "Refresh token yo'q"))
      }

      const decoded = await verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
      )
      const user = prisma.client.findUnique({ where: decoded.id })
      if (!user) return next(new ApiError(404, 'User topilmadi'))
      const accessToken = generateAccessToken(user)
      res.cookie('accessToken', accessToken, {
        maxAge: 60 * 60 * 1000,
      })
      return res.status(200).send({
        success: true,
        message: 'Access token yangilandi',
        data: { accessToken },
      })
    } catch (err) {
      next(err)
    }
  },
  // LOG OUT
async logout(req, res, next){
  try {
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    return res.send({
      success: true,
      message: "Tizimdan muvaffaqiyatli chiqdingiz."
    });
  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    next(new ApiError(500, "Logoutda xatolik yuz berdi."));
  }
},

// Profile
async profile (req, res, next){
  try {
    if (!req.user) throw next (new ApiError(403, "User hali login qilmagan"));
    return res.status(200).send({ 
      success: true,
      message: "Foydalanuvchi profili",
      user: req.user 
    });
  } catch (err) {
    next(err);
  }
},

//Delete User 
async  deleteUser (req, res, next){
  try {
    const userId = req.user?.id;
    if (!userId) throw next (new ApiError(403, "User hali login qilmagan"));

    const deletedUser = await prisma.user.delete({
      where: { id: userId }
    });

    res.clearCookie("token");
    res.clearCookie("refreshToken");

    return res.json({
      success: true,
      message: `Foydalanuvchi ${deletedUser.email} muvaffaqiyatli o'chirildi.`
    });
  } catch (err) {
    // Agar foydalanuvchi topilmasa
    if (err.code === "P2025") { 
      return next(ApiError.notFound("Foydalanuvchi topilmadi."));
    }
    next(new ApiError(500, "Foydalanuvchini o'chirishda xatolik yuz berdi."));
  }
  },

  async verifyUser(req, res, next) {
    try {
      const { email, code } = req.body
      const user = prisma.client.findUnique({ where: email })
      if (Object.keys(user).length === 0)
        return next(new ApiError(404, 'User topilmadi'))
      if (user.is_active)
        return next(new ApiError(400, 'User allaqachon faollashtirilgan'))
      if (user.verifyCode !== code) {
        console.log(user.verifyCode)
        return next(new ApiError(400, "Noto'gri kod"))
      }
      user.isActive = true
      user.verifyCode = null

      res.status(200).send({
        success: true,
        message: 'Email muvaffaqqiyatli tasdiqlandi!',
        data: user,
      })
    } catch (err) {
      next(err)
    }
  },
}
