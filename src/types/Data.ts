interface Account {
  username: string;
  password: string;
}

interface BodyOptions {
  account: Account;
  saveCredentials: boolean;
  useSavedCredentials: boolean;
}

export { Account, BodyOptions };
