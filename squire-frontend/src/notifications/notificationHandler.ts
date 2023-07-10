import { notifications } from "@mantine/notifications";

const NotificationConfiguration = {
  withCloseButton: true,
  autoClose: 3000,
};

enum NotificationType {
  ERROR = "red",
  SUCCESS = "green",
  INFORMATION = "pink",
}

export const showNotification = (
  type: NotificationType,
  title: string,
  message: string
) => {
  notifications.show({
    ...NotificationConfiguration,
    color: type,
    title,
    message,
  });
};
