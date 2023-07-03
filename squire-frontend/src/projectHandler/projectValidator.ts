export const validateProjectAdder = (
  name: string | undefined,
  description: string | undefined,
  uid: string | undefined
): void => {
  if (name === undefined || name === "")
    throw new Error("Project name field cannot be empty");
  if (description === undefined || description === "")
    throw new Error("Project descriptionfield cannot be empty");
  if (uid === undefined || uid === "") throw new Error("User is not logged in");
};
