import {
  NotificationType,
  showNotification,
} from "../notifications/notificationHandler";

export const checkFile = (fileObject: any) => {
  if (
    fileObject.type !==
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    showNotification(
      NotificationType.ERROR,
      "There was an error",
      "The file you dropped was not an Excel File (.XLSX)!"
    );
    throw new Error("File type is incorrect");
  }
};
