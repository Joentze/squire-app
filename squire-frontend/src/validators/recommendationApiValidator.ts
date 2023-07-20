export const validateApiArgs = (
  queryText: string,
  queryNo: number,
  projectId: string,
  buildId: string
): void => {
  if (queryText === undefined || queryText.replace(/ /g, "") === "")
    throw new Error("Query Text field cannot be empty");
  if (queryNo <= 0) throw new Error("Query Number field cannot be less than 0");
  if (projectId.replace(/ /g, "") === "")
    throw new Error("Project Id cannot be empty");
  if (buildId.replace(/ /g, "") === "" || buildId === undefined)
    throw new Error("Build Id cannot be empty");
};
