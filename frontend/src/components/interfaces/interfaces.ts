interface FormProps {
  status: string;
}
interface FormValues {
  username?: string;
  email: string;
  password: string;
}
interface Roles {
  allowedRoles: string[];
}

export type { FormProps, FormValues, Roles };
