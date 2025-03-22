export function checkFields<T extends Partial<User.User>>(
  data: T,
  requiredFields: Array<keyof T>
): string[] {
  const errors: string[] = [];

  requiredFields.forEach((field) => {
    if (!data[field] || data[field]?.toString().trim() === "") {
      errors.push(`${String(field)} is required`);
    }
  });

  return errors;
}
