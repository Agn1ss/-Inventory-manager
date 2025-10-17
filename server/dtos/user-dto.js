export default class UserDto {
    constructor(user) {
      this.id = user.id;
      this.name = user.name;
      this.email = user.email;
      this.isBlocked = user.isBlocked;
      this.role = user.role;
    }
  }