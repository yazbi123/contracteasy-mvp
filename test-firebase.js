// 🔥 Script de test Firebase pour ContractEasy
// Exécutez avec : node test-firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

// Configuration Firebase (remplacez par vos clés)
const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "contracteasy-test.firebaseapp.com",
  projectId: "contracteasy-test",
  storageBucket: "contracteasy-test.appspot.com",
  messagingSenderId: "VOTRE_SENDER_ID",
  appId: "VOTRE_APP_ID"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Test d'authentification
async function testAuth() {
  console.log('🔥 Test d\'authentification Firebase...');
  
  try {
    // Test d'inscription
    const userCredential = await createUserWithEmailAndPassword(auth, 'test@contracteasy.com', 'password123');
    console.log('✅ Inscription réussie:', userCredential.user.email);
    
    // Test de connexion
    const signInCredential = await signInWithEmailAndPassword(auth, 'test@contracteasy.com', 'password123');
    console.log('✅ Connexion réussie:', signInCredential.user.email);
    
  } catch (error) {
    console.error('❌ Erreur d\'authentification:', error.message);
  }
}

// Test de Firestore
async function testFirestore() {
  console.log('🔥 Test de Firestore...');
  
  try {
    // Ajouter un contrat de test
    const docRef = await addDoc(collection(db, 'contracts'), {
      name: 'Contrat de test',
      client: 'Client Test',
      status: 'En attente',
      createdAt: new Date().toISOString()
    });
    console.log('✅ Contrat ajouté avec ID:', docRef.id);
    
    // Lire les contrats
    const querySnapshot = await getDocs(collection(db, 'contracts'));
    console.log('✅ Nombre de contrats:', querySnapshot.size);
    
  } catch (error) {
    console.error('❌ Erreur Firestore:', error.message);
  }
}

// Exécuter les tests
async function runTests() {
  console.log('🚀 Démarrage des tests Firebase...\n');
  
  await testAuth();
  console.log('');
  await testFirestore();
  
  console.log('\n✅ Tests terminés !');
  console.log('📊 Vérifiez votre console Firebase pour voir les données');
}

runTests().catch(console.error);
