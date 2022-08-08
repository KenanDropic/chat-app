export interface SignInData {
  email: string;
  password: string;
}
export interface SignUpData extends SignInData {
  username: string;
}
export interface Payload {
  message: string;
  success: boolean;
}
