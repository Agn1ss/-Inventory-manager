import prisma from "../prisma/prisma-client.js";
import filterKeysByCondition from "../utils/filterKeysByCondition.js";
import ApiError from "../exceptions/api-error.js";
import dayjs from "dayjs";
import { DATE_FORMAT_TYPES, RANDOM_TYPES } from "../utils/data.js";

class CustomIdTypeService {
  async create() {
    const customIdType = await prisma.customIdType.create({
      data: {},
    });
    return customIdType;
  }

  async update(id, updateData) {
    const fields = [
      ["fixedText", updateData.fixedText, v => v && v.trim() !== ""],
      ["randomType", updateData.randomType, v => v],
      ["dateFormat", updateData.dateFormat, v => v],
      ["sequenceName", updateData.sequenceName, v => v],
    ];

    const data = filterKeysByCondition(fields);

    if (Object.keys(data).length > 0) {
      data.isTypeNotEmpty = true;
    }

    const updatedType = await prisma.customIdType.update({
      where: { id },
      data,
    });

    return updatedType;
  }

  async getOne(id) {
    const customIdType = await prisma.customIdType.findUnique({
      where: { id },
    });

    if (!customIdType) {
      throw ApiError.BadRequest(`CustomIdType with id "${id}" not found`);
    }

    return customIdType;
  }

  async generateId(typeId,date = dayjs()) {
    const type = await prisma.customIdType.findUnique({ where: { id: typeId } });
    if (!type) throw new Error(`CustomIdType with id "${typeId}" not found`);

    const parts = [];

    if (type.fixedText) {
      parts.push(type.fixedText);
    }

    if (type.randomType) {
      parts.push(RANDOM_TYPES[type.randomType]());
    }

    if (type.dateFormat) {
      parts.push(DATE_FORMAT_TYPES[type.dateFormat](date));
    }

    if (type.sequenceName) {
      const seq = String(type.sequenceCounter).padStart(4, "0");
      parts.push(seq);

      await prisma.customIdType.update({
        where: { id: typeId },
        data: { sequenceCounter: { increment: 1 } },
      });
    }

    const customId = parts.filter(Boolean).join("-");

    return customId;
  }
}

const customIdTypeService = new CustomIdTypeService();
export default customIdTypeService;
