// Service API pour ContractEasy
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export class ApiService {
  // Méthodes pour les contrats
  static async getContracts() {
    try {
      const response = await fetch(`${API_BASE_URL}/contracts`);
      if (!response.ok) throw new Error('Erreur lors de la récupération des contrats');
      return await response.json();
    } catch (error) {
      console.error('Erreur API:', error);
      return [];
    }
  }

  static async getContract(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/contracts/${id}`);
      if (!response.ok) throw new Error('Contrat non trouvé');
      return await response.json();
    } catch (error) {
      console.error('Erreur API:', error);
      return null;
    }
  }

  static async createContract(contractData) {
    try {
      const response = await fetch(`${API_BASE_URL}/contracts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contractData)
      });
      if (!response.ok) throw new Error('Erreur lors de la création du contrat');
      return await response.json();
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  }

  static async updateContract(id, contractData) {
    try {
      const response = await fetch(`${API_BASE_URL}/contracts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contractData)
      });
      if (!response.ok) throw new Error('Erreur lors de la mise à jour du contrat');
      return await response.json();
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  }

  static async deleteContract(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/contracts/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Erreur lors de la suppression du contrat');
      return true;
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  }

  // Méthodes pour les signatures
  static async addSignatory(contractId, signatoryData) {
    try {
      const response = await fetch(`${API_BASE_URL}/contracts/${contractId}/signatures`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signatoryData)
      });
      if (!response.ok) throw new Error('Erreur lors de l\'ajout du signataire');
      return await response.json();
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  }

  static async updateSignatureStatus(contractId, signatoryId, status) {
    try {
      const response = await fetch(`${API_BASE_URL}/contracts/${contractId}/signatures/${signatoryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error('Erreur lors de la mise à jour du statut');
      return await response.json();
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  }

  // Méthodes pour les templates
  static async getTemplates() {
    try {
      const response = await fetch(`${API_BASE_URL}/templates`);
      if (!response.ok) throw new Error('Erreur lors de la récupération des templates');
      return await response.json();
    } catch (error) {
      console.error('Erreur API:', error);
      return [];
    }
  }

  // Méthodes pour les notifications
  static async getNotifications(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications?userId=${userId}`);
      if (!response.ok) throw new Error('Erreur lors de la récupération des notifications');
      return await response.json();
    } catch (error) {
      console.error('Erreur API:', error);
      return [];
    }
  }

  static async markNotificationAsRead(notificationId) {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ read: true })
      });
      if (!response.ok) throw new Error('Erreur lors de la mise à jour de la notification');
      return await response.json();
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  }

  // Méthodes pour l'authentification
  static async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) throw new Error('Identifiants incorrects');
      return await response.json();
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  }

  static async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) throw new Error('Erreur lors de l\'inscription');
      return await response.json();
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  }

  // Méthodes pour l'upload de fichiers
  static async uploadContract(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData
      });
      if (!response.ok) throw new Error('Erreur lors de l\'upload');
      return await response.json();
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  }
}

export default ApiService;
