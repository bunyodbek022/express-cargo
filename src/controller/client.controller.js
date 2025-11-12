/* eslint-disable no-unused-vars */
import { ApiError } from '../errors/apiError.js'
import baseClass from '../helper/baseClass.js'
import bcrypt from 'bcrypt'
import { prisma } from '../lib/prisma.js'
import { generateAccessToken, generateRefreshToken } from '../helper/jwt.js'
export const Client = {
  // GET ALL CLIENTS
  async getAll(req, res, next) {
    try {
      const { limit, page, search } = req.query
      const lim = limit ? parseInt(limit, 10) : 10
      const pa = page ? parseInt(page, 10) : 1
      const off = (pa - 1) * lim
      const result = await baseClass.searchAndPaginate(
        search,
        'client',
        lim,
        off,
        { orders: true },
      )
      const newResult = result.map(({ password, token, ...rest }) => rest)
      return res.status(200).json({
        success: true,
        page: pa,
        limit: lim,
        data: newResult,
      })
    } catch (err) {
      next(err)
    }
  },

  // GET ONE CLIENTS
  async getOne(req, res, next) {
    try {
      const { id } = req.params
      const result = await baseClass.getOne('client', id)
      if (result === 400)
        return next(new ApiError(400, 'id UUID formatida bolishi kerak!'))
      if (result === 404)
        return next(new ApiError(404, 'Bu id dagi malumot topilmadi'))
      res.status(200).send({
        success: true,
        data: result,
      })
    } catch (err) {
      next(err)
    }
  },

  // CREATE CLIENT
  async create(req, res, next) {
    try {
      const info = req.body
      if (!info || Object.keys(info).length === 0) {
        return next(ApiError(400, "Malumotlarni to'g'ri kiriting!"))
      }
      const clientExist = await prisma.client.findUnique({
        where: { email: info.email },
      })
      if (!clientExist) {
        return next(new ApiError(403, "Email oldin ro'yxatdan o'tgan"))
      }

      info.password = await bcrypt.hash(info.password, 10)
      const result = await baseClass.create('client', info)
      res.status(200).send({
        success: true,
        message: `client muvaffaqqiyatli yaratildi`,
        data: result,
      })
    } catch (err) {
      next(err)
    }
  },

  // UPDATE CLIENT INFO
  async update(req, res, next) {
    try {
      const { id } = req.params
      const info = req.body
      if (!info)
        return next(
          new ApiError(404, 'Update uchun qandaydir malumot kiriting!'),
        )
      if (info.email) {
        const emailCheck = await prisma.findUnique({
          where: { email: info.email },
        })
        if (Object.keys(emailCheck).length)
          return next(new ApiError(401, 'Bu emaildagi user allaqachon mavjud!'))
      }

      const result = await baseClass.update('client', id, info)

      if (result === 404)
        return next(new ApiError(404, 'Bu id dagi malumot topilmadi'))
      if (result === 400)
        return next(new ApiError(400, 'id UUID formatida bolishi kerak!'))

      res.status(201).send({
        success: true,
        message: 'client muvaffaqqtiyatli yangilandi',
        data: result,
      })
    } catch (err) {
      next(err)
    }
  },

  // DELETE
  async delete(req, res, next) {
    try {
      const { id } = req.params
      const result = await baseClass.delete('client', id)
      if (result === 400)
        return next(new ApiError(400, 'id UUID formatida bolishi kerak!'))
      if (result === 404)
        return next(new ApiError(404, 'Bu id dagi malumot topilmadi'))

      if (result === 200) {
        res.status(200).send({
          success: true,
          message: "client muvaffaqqtiyatli o'chirildi",
        })
      }
    } catch (err) {
      next(err)
    }
  },
}
