import { login } from "./backend/login";
import { setSessionId } from "./backend/local-storage-utils";

export const signIn = async (email: string, password: string) => {
  const token = await login({
    username: email,
    password: password,
  });
  setSessionId(token);
};
