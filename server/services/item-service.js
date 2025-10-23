import ItemDto from "../dtos/item-dto.js";
import ApiError from "../exceptions/api-error.js";
import prisma from "../prisma/prisma-client.js";
import customIdTypeService from "./custom-id-type-service.js";

function filterKeysByCondition(fieldArray) {
  return fieldArray.reduce((acc, [key, value, condition]) => {
    if (typeof condition === "function" ? condition(value) : condition) {
      acc[key] = value;
    }
    return acc;
  }, {});
}

class ItemService {
  async create(inventoryId, creatorId) {
    const inventory = await prisma.inventory.findUnique({
      where: { id: inventoryId },
      include: {
        customIdType: {
          select: { id: true, isTypeNotEmpty: true },
        },
      },
    });
    if (!inventoryId || !inventory) {
      throw ApiError.NotFound(`Inventory ${inventoryId} not founded`);
    }

    const data = {
      inventoryId: inventoryId,
      creatorId: creatorId,
    };

    data.customId = inventory.customIdType.isTypeNotEmpty
      ? await customIdTypeService.generateId(inventory.customIdTypeId)
      : null;

    const fieldTypes = [
      { type: "String", prefix: "customString", defaultValue: name => name ?? "" },
      { type: "Text", prefix: "customText", defaultValue: () => "" },
      { type: "Int", prefix: "customInt", defaultValue: () => 0 },
      { type: "Link", prefix: "customLink", defaultValue: () => "" },
      { type: "Bool", prefix: "customBool", defaultValue: () => false },
    ];

    for (const fType of fieldTypes) {
      for (let i = 1; i <= 3; i++) {
        const stateKey = `${fType.prefix}${i}State`;
        const nameKey = `${fType.prefix}${i}Name`;
        const valueKey = `${fType.prefix}${i}`;

        const state = inventory[stateKey];
        if (state && state !== "NONE") {
          let value;
          if (fType.type === "String") {
            value = inventory[nameKey] ?? nameKey;
          } else {
            value = fType.defaultValue();
          }
          data[valueKey] = value;
        }
      }
    }

    const item = await prisma.item.create({ data });

    const itemDto = new ItemDto(item);

    return itemDto;
  }

  // async update(id) {
  //   const item = await prisma.item.findUnique({ where: { id } });
  //   if (!item) {
  //     throw new ApiError.NotFound(`item ${id} not founded`);
  //   }
  //   // проверять updatedAt у CustomIdType и только тогда вызывать generateId 
  //   // оптимистическая блокировка 
  //   // передавать время создания item в generateId

  //   const itemDto = new ItemDto(item);

  //   return itemDto;
  // }


  async getOne(id) {
    const item = await prisma.item.findUnique({ where: { id } });
    if (!item) {
      throw new ApiError.NotFound(`item ${id} not founded`);
    }

    const itemDto = new ItemDto(item);

    return itemDto;
  }
}

const itemService = new ItemService();
export default itemService;
