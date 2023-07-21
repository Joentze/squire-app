export const validateMessage = (
  currProject: any,
  currBuild: any,
  message: any
): void => {
  if (currProject === undefined) throw new Error("Project must be filled");
  if (currBuild === undefined) throw new Error("Build must be filled");
  if (message === undefined || message.length === 0)
    throw new Error("You must write a message!");
};
