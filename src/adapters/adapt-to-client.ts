import { ClientNotificationType, ServerNotificationType } from '../types';

const NAME = 'name';

export const adaptNotifications = (server: ServerNotificationType): ClientNotificationType => ({
  name: server.payload.context[NAME],
  description: server.description,
  createdAt: server.createdAt.toString(),
});
