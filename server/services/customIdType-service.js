import prisma from "../prisma/prisma-client.js";
import filterKeysByCondition from "../utils/filterKeysByCondition.js";
import ApiError from "../exceptions/api-error.js";

class CustomIdTypeController {
  async createType(idData) {
    const fields = [
      ["fixedText", idData.fixedText, v => v && v.trim() !== ""],
      ["randomType", idData.randomType, v => v],
      ["dateFormat", idData.dateFormat, v => v],
      ["sequenceName", idData.sequenceName, v => v],
    ];

    const data = filterKeysByCondition(fields);

    if (Object.keys(data).length > 0) {
      data.isTypeNotEmpty = true;
    }
    const customIdType = await prisma.customIdType.create({ data });

    return customIdType;
  }

  async updateType(id, updateData) {
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

    const updated = await prisma.customIdType.update({
      where: { id },
      data,
    });

    return updated;
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

}

const customIdTypeController = new CustomIdTypeController();
export default customIdTypeController;
