type UserSignatureInput = Readonly<{
  firstName?: string | null;
  lastName?: string | null;
}>;

export function getUserSignature(user: UserSignatureInput) {
  const firstName = user.firstName?.trim() ?? "";
  const lastName = user.lastName?.trim() ?? "";

  if (!firstName || !lastName) {
    return "";
  }

  return `${firstName} ${lastName}`;
}
