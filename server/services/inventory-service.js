import prisma from "../prisma/prisma-client.js";
import customIdTypeController from "./customIdType-service.js";
import filterKeysByCondition from "../utils/filterKeysByCondition.js";
import InventoryDto from "../dtos/inventory-dto.js";
import tagService from "./tag-service.js";

class InventoryService {
  async create(inventoryData) {
    const CustomIdType = await customIdTypeController.createType(inventoryData.customIdType);

    let category = await prisma.category.findUnique({
      where: { name: inventoryData.categoryName },
    });
    if (!category) {
      category = await prisma.category.create({ data: { name: inventoryData.categoryName } });
    }

    let fields = [
      ["title", inventoryData.title, () => true],
      ["description", inventoryData.description, v => v && v.trim() !== ""],
      ["imageUrl", inventoryData.imageUrl, v => v && v.trim() !== ""],
      ["categoryId", category.id, () => true],
      ["creatorId", inventoryData.creatorId, () => true],
      ["customIdTypeId", CustomIdType.id, () => true],
      ["isPublic", inventoryData.isPublic, v => v],
    ];

    if (inventoryData.customFields) {
      const types = ["string", "text", "int", "link", "bool"];
      types.forEach(type => {
        inventoryData.customFields[type]?.forEach((field, index) => {
          const prefix = `custom${type.charAt(0).toUpperCase() + type.slice(1)}${index + 1}`;
          fields.push([`${prefix}State`, field.state, () => true]);
          if (field.name !== "NONE") {
            fields.push([`${prefix}Name`, field.name, () => true]);
            fields.push([`${prefix}Description`, field.description, v => v && v.trim() !== ""]);
            fields.push([`${prefix}Order`, field.order, () => true]);
          }
        });
      });
    }

    const data = filterKeysByCondition(fields);
    const inventory = await prisma.inventory.create({ data });
    const inventoryDto = new InventoryDto(inventory);

    await tagService.addMany(inventoryData.tags, inventoryDto.id);

    return { tags: inventoryData.tags, inventory: inventoryDto };
  }
}

const inventoryService = new InventoryService();
export default inventoryService;
