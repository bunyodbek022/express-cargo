import logger from '../utils/logger.js'
import validator from 'validator'
import { prisma } from '../lib/prisma.js'

class BaseClass {
  validateTableName(name) {
    if (!/^[a-z_]+$/i.test(name)) {
      throw new Error('Invalid table name')
    }
  }

  // CREATE
  async create(modelName, info) {
    this.validateTableName(modelName)
      const result = await prisma[modelName].create({ data: info })
      logger.info(`${modelName} created successfully`)
      return result
      
  }

  // GET ONE
    async getOne(modelName, id) {
      
    this.validateTableName(modelName)
    if (!validator.isUUID(id)) {
        return 400
    }
      
    const result = await prisma[modelName].findUnique({ where: { id } })
    return result || 404
    
  }

  //UPDATE
  async update(modelName, id, info) {
      this.validateTableName(modelName)
      
      const check = this.getOne(modelName, id);
      if (check === 404) return 404;
      if (check === 400) return 400;

      const result = await prisma[modelName].update({
          where: { id },
          data: info
      });
      logger.info(`${modelName} updated successfully`)
      return result;
  }
    
  //DELETE
  async delete(modelName, id) {
    this.validateTableName(modelName)
    if (!validator.isUUID(id)) {
        return 400
    }
    const check = this.getOne(modelName, id);
    if (check === 404) return check;

      await prisma[modelName].delete({ where: { id } });
      logger.info(`${modelName} deleted successfully`)
      return 200;
      
  }

  // SEARCH AND PAGINATION WITH GET ALL
  async searchAndPaginate(
    searchQuery,
    modelName,
    limit,
    offset,
    includeRelation = {},
  ) {
    this.validateTableName(modelName)

    const where = searchQuery
      ? {
          OR: Object.keys(prisma[modelName].rawAttributes || {}).map(
            (field) => ({
              [field]: { contains: searchQuery, mode: 'insensitive' },
            }),
          ),
        }
      : undefined

    const result = await prisma[modelName].findMany({
      where,
      skip: offset ? parseInt(offset, 10) : undefined,
      take: limit ? parseInt(limit, 10) : undefined,
      include: includeRelation,
    })

    return result
  }

  // DUBLICATE CHECK
  async isDuplicate(modelName, info) {
    this.validateTableName(modelName)

    const where = Object.fromEntries(
      Object.entries(info).map(([k, v]) => [
        k,
        { equals: String(v).trim(), mode: 'insensitive' },
      ]),
    )

    const exists = await prisma[modelName].findFirst({ where })

    return exists ? 409 : 404
  }

}
const baseClass = new BaseClass()

export default baseClass
