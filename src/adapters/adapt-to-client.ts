import { ClientNotificationType, ServerNotificationType } from '../types';

export const adaptNotifications = (server: ServerNotificationType): ClientNotificationType => ({
  name: server.payload.context.name,
  description: server.description,
  createdAt: server.createdAt.toString(),
})
