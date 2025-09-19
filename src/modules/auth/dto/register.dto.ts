/**
 * Data Transfer Object for registration request
 */
export class RegisterDto {
  username: string;
  password: string;
  
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
