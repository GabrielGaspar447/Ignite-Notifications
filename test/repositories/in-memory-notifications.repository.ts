import { NotificationNotFoundError } from '@core/use-cases/errors/notifications/notification-not-found.error';
import { Notification } from 'src/core/entities/notification/notification.entity';
import { NotificationsRepository } from 'src/core/repositories/notifications.repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async findById(notificationId: string) {
    return this.notifications.find((n) => n.id === notificationId) || null;
  }

  async countByRecipientId(recipientId: string) {
    return this.notifications.filter((n) => n.recipientId === recipientId)
      .length;
  }

  async getByRecipientId(recipientId: string) {
    return this.notifications.filter((n) => n.recipientId === recipientId);
  }

  async create(notification: Notification) {
    this.notifications.push(notification);

    return notification;
  }

  async update(notification: Notification) {
    const index = this.notifications.findIndex((n) => n.id === notification.id);

    if (index === -1) {
      throw new NotificationNotFoundError();
    }

    this.notifications[index] = notification;

    return notification;
  }

  async cancelNotification(notificationId: string) {
    const index = this.notifications.findIndex((n) => n.id === notificationId);

    if (index === -1) {
      throw new NotificationNotFoundError();
    }

    this.notifications[index].cancel();
  }

  async readNotification(notificationId: string) {
    const index = this.notifications.findIndex((n) => n.id === notificationId);

    if (index === -1) {
      throw new NotificationNotFoundError();
    }

    this.notifications[index].read();
  }

  async unreadNotification(notificationId: string) {
    const index = this.notifications.findIndex((n) => n.id === notificationId);

    if (index === -1) {
      throw new NotificationNotFoundError();
    }

    this.notifications[index].unread();
  }
}
