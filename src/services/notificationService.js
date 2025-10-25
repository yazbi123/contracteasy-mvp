// src/services/notificationService.js
import { saveNotification, getNotifications } from './firestoreService';

export class NotificationService {
  constructor() {
    this.notifications = [];
    this.listeners = [];
  }

  // Ajouter un listener pour les notifications
  addListener(callback) {
    this.listeners.push(callback);
  }

  // Notifier tous les listeners
  notifyListeners(notification) {
    this.listeners.forEach(callback => callback(notification));
  }

  // Créer une notification
  async createNotification(userId, type, title, message, priority = 'normal') {
    const notification = {
      type,
      title,
      message,
      priority,
      userId,
      createdAt: new Date(),
      read: false,
      id: Date.now().toString()
    };

    try {
      const result = await saveNotification(notification, userId);
      if (result.success) {
        this.notifyListeners(notification);
        return { success: true, notification };
      }
      return { success: false, error: result.error };
    } catch (error) {
      console.error('Erreur création notification:', error);
      return { success: false, error: error.message };
    }
  }

  // Récupérer les notifications d'un utilisateur
  async getUserNotifications(userId) {
    try {
      const result = await getNotifications(userId);
      if (result.success) {
        this.notifications = result.notifications;
        return { success: true, notifications: result.notifications };
      }
      return { success: false, error: result.error };
    } catch (error) {
      console.error('Erreur récupération notifications:', error);
      return { success: false, error: error.message };
    }
  }

  // Marquer une notification comme lue
  markAsRead(notificationId) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.notifyListeners({ type: 'update', notification });
    }
  }

  // Vérifier les contrats qui expirent bientôt
  async checkExpiringContracts(contracts, userId) {
    const now = new Date();
    const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    for (const contract of contracts) {
      const dueDate = new Date(contract.dueDate);
      
      if (dueDate <= threeDaysFromNow && dueDate > now) {
        await this.createNotification(
          userId,
          'urgent',
          'Contrat expire bientôt',
          `Le contrat "${contract.name}" expire dans ${Math.ceil((dueDate - now) / (24 * 60 * 60 * 1000))} jour(s)`,
          'high'
        );
      } else if (dueDate <= oneWeekFromNow && dueDate > threeDaysFromNow) {
        await this.createNotification(
          userId,
          'warning',
          'Contrat à surveiller',
          `Le contrat "${contract.name}" expire dans ${Math.ceil((dueDate - now) / (24 * 60 * 60 * 1000))} jour(s)`,
          'medium'
        );
      }
    }
  }

  // Notifications pour signatures en attente
  async checkPendingSignatures(contracts, userId) {
    const pendingContracts = contracts.filter(c => c.status === 'pending');
    
    if (pendingContracts.length > 0) {
      await this.createNotification(
        userId,
        'info',
        'Signatures en attente',
        `${pendingContracts.length} contrat(s) en attente de signature`,
        'normal'
      );
    }
  }

  // Notification de bienvenue
  async sendWelcomeNotification(userId) {
    await this.createNotification(
      userId,
      'success',
      'Bienvenue sur ContractEasy !',
      'Votre compte a été créé avec succès. Commencez par créer votre premier contrat.',
      'normal'
    );
  }

  // Notification de contrat créé
  async notifyContractCreated(userId, contractName) {
    await this.createNotification(
      userId,
      'success',
      'Contrat créé',
      `Le contrat "${contractName}" a été créé avec succès`,
      'normal'
    );
  }

  // Notification de contrat signé
  async notifyContractSigned(userId, contractName) {
    await this.createNotification(
      userId,
      'success',
      'Contrat signé',
      `Le contrat "${contractName}" a été signé`,
      'normal'
    );
  }

  // Notification de rappel hebdomadaire
  async sendWeeklyReminder(userId, contracts) {
    const pendingCount = contracts.filter(c => c.status === 'pending').length;
    const expiringCount = contracts.filter(c => {
      const dueDate = new Date(c.dueDate);
      const oneWeekFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      return dueDate <= oneWeekFromNow && dueDate > new Date();
    }).length;

    if (pendingCount > 0 || expiringCount > 0) {
      await this.createNotification(
        userId,
        'info',
        'Rappel hebdomadaire',
        `${pendingCount} contrat(s) en attente, ${expiringCount} contrat(s) expire bientôt`,
        'normal'
      );
    }
  }

  // Obtenir le nombre de notifications non lues
  getUnreadCount() {
    return this.notifications.filter(n => !n.read).length;
  }

  // Obtenir les notifications par priorité
  getNotificationsByPriority(priority) {
    return this.notifications.filter(n => n.priority === priority);
  }

  // Nettoyer les anciennes notifications (plus de 30 jours)
  async cleanOldNotifications(userId) {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const oldNotifications = this.notifications.filter(n => 
      new Date(n.createdAt) < thirtyDaysAgo
    );

    // Ici vous pourriez implémenter la suppression des anciennes notifications
    // en utilisant une fonction de suppression dans firestoreService
    console.log(`${oldNotifications.length} anciennes notifications à nettoyer`);
  }
}

// Instance singleton
export const notificationService = new NotificationService();
