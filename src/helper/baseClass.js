// src/helper/baseClass.js
import logger from '../utils/logger.js'
import validator from 'validator'
import { prisma } from '../lib/prisma.js'

class BaseClass {
  // Table nomi validatsiyasi
  validateTableName(name) {
    if (!/^[a-z_]+$/i.test(name)) {
      throw new Error('Invalid table name')
    }
  }

  // CREATE
  async create(modelName, info) {
    this.validateTableName(modelName)

    try {
      const result = await prisma[modelName].create({ data: info })
      logger.info(`${modelName} created successfully`)
      return result
    } catch (err) {
      logger.warn(`Failed to create ${modelName}: ${err.message}`)
      throw err
    }
  }

  // GET ONE
  async getOne(modelName, id) {
    this.validateTableName(modelName)

    if (!validator.isUUID(id)) return 400

    try {
      const result = await prisma[modelName].findUnique({ where: { id } })
      return result || 404
    } catch (err) {
      logger.warn(`Failed to get ${modelName}: ${err.message}`)
      throw err
    }
  }

  // UPDATE
  async update(modelName, id, info) {
    this.validateTableName(modelName)

    const check = await this.getOne(modelName, id)
    if (check === 404) return 404
    if (check === 400) return 400

    try {
      const result = await prisma[modelName].update({
        where: { id },
        data: info
      })
      logger.info(`${modelName} updated successfully`)
      return result
    } catch (err) {
      logger.warn(`Failed to update ${modelName}: ${err.message}`)
      throw err
    }
  }

  // DELETE
  async delete(modelName, id) {
    this.validateTableName(modelName)
    if (!validator.isUUID(id)) return 400

    const check = await this.getOne(modelName, id)
    if (check === 404) return 404

    try {
      await prisma[modelName].delete({ where: { id } })
      logger.info(`${modelName} deleted successfully`)
      return 200
    } catch (err) {
      logger.warn(`Failed to delete ${modelName}: ${err.message}`)
      throw err
    }
  }

  // SEARCH AND PAGINATION (GET ALL)
  async searchAndPaginate(modelName, searchQuery, limit, offset, include = {}) {
    this.validateTableName(modelName)

    // Prisma fieldlaridan filter yasash
    const modelFields = Object.keys(prisma[modelName]._meta?.fields || {})
    const where = searchQuery
      ? {
          OR: modelFields.map(field => ({
            [field]: { contains: searchQuery, mode: 'insensitive' }
          }))
        }
      : undefined

    try {
      const result = await prisma[modelName].findMany({
        where,
        skip: offset ? parseInt(offset, 10) : undefined,
        take: limit ? parseInt(limit, 10) : undefined,
        include
      })
      return result
    } catch (err) {
      logger.warn(`Failed to search ${modelName}: ${err.message}`)
      throw err
    }
  }

  // DUPLICATE CHECK
  async isDuplicate(modelName, info) {
    this.validateTableName(modelName)

    const where = Object.fromEntries(
      Object.entries(info).map(([k, v]) => [
        k,
        { equals: String(v).trim(), mode: 'insensitive' }
      ])
    )

    try {
      const exists = await prisma[modelName].findFirst({ where })
      return exists ? 409 : 404
    } catch (err) {
      logger.warn(`Failed duplicate check ${modelName}: ${err.message}`)
      throw err
    }
  }
};

// Singleton export
const baseClass = new BaseClass();
export default baseClass
