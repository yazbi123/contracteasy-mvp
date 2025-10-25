// src/services/firestoreService.js
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy 
} from 'firebase/firestore';
import { db } from '../firebase/config';

// Contrats
export const saveContract = async (contractData, userId) => {
  try {
    const contractWithUser = {
      ...contractData,
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, 'contracts'), contractWithUser);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Erreur sauvegarde contrat:', error);
    return { success: false, error: error.message };
  }
};

export const getContracts = async (userId) => {
  try {
    const contractsRef = collection(db, 'contracts');
    const q = query(
      contractsRef, 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const contracts = [];
    
    querySnapshot.forEach((doc) => {
      contracts.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, contracts };
  } catch (error) {
    console.error('Erreur récupération contrats:', error);
    return { success: false, error: error.message };
  }
};

export const updateContract = async (contractId, contractData) => {
  try {
    const contractRef = doc(db, 'contracts', contractId);
    await updateDoc(contractRef, {
      ...contractData,
      updatedAt: new Date()
    });
    return { success: true };
  } catch (error) {
    console.error('Erreur mise à jour contrat:', error);
    return { success: false, error: error.message };
  }
};

export const deleteContract = async (contractId) => {
  try {
    await deleteDoc(doc(db, 'contracts', contractId));
    return { success: true };
  } catch (error) {
    console.error('Erreur suppression contrat:', error);
    return { success: false, error: error.message };
  }
};

// Templates
export const saveTemplate = async (templateData, userId) => {
  try {
    const templateWithUser = {
      ...templateData,
      userId,
      createdAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, 'templates'), templateWithUser);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Erreur sauvegarde template:', error);
    return { success: false, error: error.message };
  }
};

export const getTemplates = async (userId) => {
  try {
    const templatesRef = collection(db, 'templates');
    const q = query(
      templatesRef, 
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    const templates = [];
    
    querySnapshot.forEach((doc) => {
      templates.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, templates };
  } catch (error) {
    console.error('Erreur récupération templates:', error);
    return { success: false, error: error.message };
  }
};

// Notifications
export const saveNotification = async (notificationData, userId) => {
  try {
    const notificationWithUser = {
      ...notificationData,
      userId,
      createdAt: new Date(),
      read: false
    };
    
    const docRef = await addDoc(collection(db, 'notifications'), notificationWithUser);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Erreur sauvegarde notification:', error);
    return { success: false, error: error.message };
  }
};

export const getNotifications = async (userId) => {
  try {
    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef, 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const notifications = [];
    
    querySnapshot.forEach((doc) => {
      notifications.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, notifications };
  } catch (error) {
    console.error('Erreur récupération notifications:', error);
    return { success: false, error: error.message };
  }
};
