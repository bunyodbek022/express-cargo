/* eslint-disable no-unused-vars */
import { ApiError } from '../utils/apiError.js'
import baseClass from '../helper/baseClass.js'

export const Client = {
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
  async create(req, res, next) {
    try {
      const info = req.body
      if (!info)
        return next(
          new ApiError(404, 'Create uchun qandaydir malumot kiriting!'),
        )
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
  async update(req, res, next) {
    try {
      const { id } = req.params
      const info = req.body
      if (!info)
        return next(
          new ApiError(404, 'Update uchun qandaydir malumot kiriting!'),
        )

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
