export interface UserPassportPayload {
  sub: number;
  iat: number;
  exp: number;
}

export interface UserRefreshPassportPayload extends UserPassportPayload {
  refreshToken: string;
}
