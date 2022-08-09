interface SignInData {
  email: string;
  password: string;
}
interface SignUpData extends SignInData {
  username: string;
}
interface Payload {
  message: string;
  success: boolean;
}

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export type { SignInData, SignUpData, Payload, User };
