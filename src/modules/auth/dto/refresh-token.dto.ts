/**
 * Data Transfer Object for refresh token request
 */
export class RefreshTokenDto {
  refreshToken: string;
  
  constructor(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
}
