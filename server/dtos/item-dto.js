export default class ItemDto {
  constructor(item) {
    this.id = item.id;
    this.inventoryId = item.inventoryId;
    this.creatorId = item.creatorId;
    this.customId = item.customId;
    this.version = item.version;

    this.customFields = {
      string: [
        { key: "customString1", value: item.customString1 },
        { key: "customString2", value: item.customString2 },
        { key: "customString3", value: item.customString3 },
      ],
      text: [
        { key: "customText1", value: item.customText1 },
        { key: "customText2", value: item.customText2 },
        { key: "customText3", value: item.customText3 },
      ],
      int: [
        { key: "customInt1", value: item.customInt1 },
        { key: "customInt2", value: item.customInt2 },
        { key: "customInt3", value: item.customInt3 },
      ],
      link: [
        { key: "customLink1", value: item.customLink1 },
        { key: "customLink2", value: item.customLink2 },
        { key: "customLink3", value: item.customLink3 },
      ],
      bool: [
        { key: "customBool1", value: item.customBool1 },
        { key: "customBool2", value: item.customBool2 },
        { key: "customBool3", value: item.customBool3 },
      ],
    };
  }
}
