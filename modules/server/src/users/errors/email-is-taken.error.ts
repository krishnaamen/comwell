export class EmailIsTakenError extends Error {
  email: string;

  constructor(email: string) {
    super(`duplicate email: "${email}"`);
    this.email = email;
  }
}
