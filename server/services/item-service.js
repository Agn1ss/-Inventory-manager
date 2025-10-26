import ItemDto from "../dtos/item-dto.js";
import ApiError from "../exceptions/api-error.js";
import prisma from "../prisma/prisma-client.js";
import customIdTypeService from "./custom-id-type-service.js";

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

    return { item: itemDto, likesCount: 0};
  }

  async update(inventoryId, itemId, itemData) {
    return await prisma.$transaction(async tx => {
      const existingItem = await tx.item.findUnique({
        where: { id: itemId },
        select: { id: true, version: true, createdAt: true, updatedAt: true },
      });

      if (!existingItem) {
        throw ApiError.BadRequest(`Item with id "${itemId}" not found`);
      }

      if (existingItem.version !== itemData.version) {
        throw ApiError.BadRequest(
          `Item was updated by someone else. Expected version ${itemData.version}, but found ${existingItem.version}`
        );
      }

      const inventory = await tx.inventory.findUnique({
        where: { id: inventoryId },
        include: { customIdType: true },
      });

      if (!inventory) {
        throw ApiError.BadRequest(`Inventory with id "${inventoryId}" not found`);
      }

      const data = {};

      const fieldGroups = ["string", "text", "int", "link", "bool"];
      for (const type of fieldGroups) {
        const fields = itemData.customFields?.[type] || [];
        for (let i = 0; i < fields.length; i++) {
          const { key, value } = fields[i];
          const stateKey = `custom${type.charAt(0).toUpperCase() + type.slice(1)}${i + 1}State`;

          if (inventory[stateKey] && inventory[stateKey] !== "NONE") {
            data[key] = value;
          }
        }
      }

      const customIdUpdatedAt = new Date(inventory.customIdType.updatedAt);
      const itemUpdatedAt = new Date(existingItem.updatedAt || existingItem.createdAt);

      if (customIdUpdatedAt > itemUpdatedAt) {
        data.customId = await customIdTypeService.generateId(
          inventory.customIdType.id,
          existingItem.createdAt
        );
      }

      const updatedItem = await tx.item.update({
        where: { id: itemId },
        data: {
          ...data,
          version: { increment: 1 },
        },
      });

      const itemDto = new ItemDto(updatedItem);
      const likes = await this.getLikes(existingItem.id) || 0;


      return {item: itemDto, likesCount: likes};
    });
  }

  async getOne(id) {
    const item = await prisma.item.findUnique({ where: { id } });
    if (!item) {
      throw new ApiError.NotFound(`item ${id} not founded`);
    }

    const itemDto = new ItemDto(item);
    const likes = await this.getLikes(item.id) || 0;

    return {item: itemDto, likesCount: likes};
  }

  async delete(id) {
    try {
      await prisma.item.delete({
        where: { id },
      });
    } catch (e) {
      throw ApiError.BadRequest(`item ${id} not founded`);
    }
  }

  async like(userId, itemId) {
    const item = await prisma.item.findUnique({where: {id: itemId}})
    if(!item) {
      throw ApiError.BadRequest(`item ${id} not founded`);
    }
    const existingLike = await prisma.like.findUnique({
      where: {
        itemId_userId: { itemId, userId },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          itemId_userId: { itemId, userId },
        },
      });
      return `like on item ${itemId} remuved`;
    } else {
      await prisma.like.create({
        data: {
          userId,
          itemId,
        },
      });
      return`Item ${itemId} liked`;
    }
  }

  async getLikes(itemId) {
    const count = await prisma.like.count({
      where: { itemId },
    });

    return count;
  }
}

const itemService = new ItemService();
export default itemService;
