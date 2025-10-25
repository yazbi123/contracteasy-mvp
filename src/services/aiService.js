// Service IA avancé pour ContractEasy
import axios from 'axios';

export class AIService {
  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    this.xaiKey = import.meta.env.VITE_XAI_API_KEY;
    this.baseURL = 'https://api.openai.com/v1/chat/completions';
    this.xaiURL = 'https://api.x.ai/v1/chat/completions';
  }

  // Générer une clause de contrat avec support multi-API
  async generateClause(context, type = 'general', provider = 'openai') {
    try {
      const prompt = this.getPromptForType(type, context);
      const apiKey = provider === 'xai' ? this.xaiKey : this.apiKey;
      const baseURL = provider === 'xai' ? this.xaiURL : this.baseURL;
      
      if (!apiKey) {
        return this.getFallbackClause(type);
      }

      const response = await axios.post(baseURL, {
        model: provider === 'xai' ? 'grok-beta' : 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Tu es un expert juridique français spécialisé dans la rédaction de contrats. Génère des clauses professionnelles, claires et conformes au droit français.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        timeout: 30000
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error(`Erreur IA ${provider}:`, error);
      return this.getFallbackClause(type);
    }
  }

  // Prompts selon le type de clause
  getPromptForType(type, context) {
    const prompts = {
      payment: `Génère une clause de paiement pour un contrat de ${context.service} avec un montant de ${context.amount}€.`,
      confidentiality: `Génère une clause de confidentialité pour un contrat avec ${context.client}.`,
      termination: `Génère une clause de résiliation pour un contrat de ${context.duration}.`,
      liability: `Génère une clause de responsabilité pour un contrat de prestation de service.`,
      general: `Génère une clause générale pour un contrat de ${context.service || 'prestation'}.`
    };

    return prompts[type] || prompts.general;
  }

  // Clauses de fallback si l'IA n'est pas disponible
  getFallbackClause(type) {
    const fallbackClauses = {
      payment: `Article X - Modalités de paiement\nLe paiement s'effectuera selon les modalités convenues entre les parties.`,
      confidentiality: `Article X - Confidentialité\nLes parties s'engagent à maintenir la confidentialité des informations échangées.`,
      termination: `Article X - Résiliation\nLe présent contrat peut être résilié par l'une ou l'autre des parties avec un préavis de 30 jours.`,
      liability: `Article X - Responsabilité\nChaque partie est responsable de ses propres actes et omissions.`,
      general: `Article X - Dispositions générales\nLe présent contrat est régi par le droit français.`
    };

    return fallbackClauses[type] || fallbackClauses.general;
  }

  // Analyser un contrat existant
  async analyzeContract(contractText, provider = 'openai') {
    try {
      const apiKey = provider === 'xai' ? this.xaiKey : this.apiKey;
      const baseURL = provider === 'xai' ? this.xaiURL : this.baseURL;
      
      if (!apiKey) {
        return 'Analyse non disponible. Clé API manquante.';
      }

      const response = await axios.post(baseURL, {
        model: provider === 'xai' ? 'grok-beta' : 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Tu es un expert juridique français. Analyse les contrats et identifie les points clés, risques potentiels et suggestions d\'amélioration.'
          },
          {
            role: 'user',
            content: `Analyse ce contrat et fournis un rapport structuré :\n\n${contractText}`
          }
        ],
        max_tokens: 500,
        temperature: 0.5
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        timeout: 30000
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error(`Erreur analyse IA ${provider}:`, error);
      return 'Analyse non disponible. Vérifiez votre connexion et votre clé API.';
    }
  }

  // Générer un contrat complet
  async generateFullContract(contractType, details, provider = 'openai') {
    try {
      const apiKey = provider === 'xai' ? this.xaiKey : this.apiKey;
      const baseURL = provider === 'xai' ? this.xaiURL : this.baseURL;
      
      if (!apiKey) {
        return this.getFallbackContract(contractType);
      }

      const prompt = `Génère un contrat complet de ${contractType} avec ces détails: ${JSON.stringify(details)}`;
      
      const response = await axios.post(baseURL, {
        model: provider === 'xai' ? 'grok-beta' : 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Tu es un expert juridique français. Génère des contrats complets et professionnels avec préambule, clauses principales, conditions générales et signatures.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        timeout: 30000
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error(`Erreur génération contrat ${provider}:`, error);
      return this.getFallbackContract(contractType);
    }
  }

  // Vérification de conformité RGPD
  async checkGDPRCompliance(contractText, provider = 'openai') {
    try {
      const apiKey = provider === 'xai' ? this.xaiKey : this.apiKey;
      const baseURL = provider === 'xai' ? this.xaiURL : this.baseURL;
      
      if (!apiKey) {
        return 'Vérification RGPD non disponible. Clé API manquante.';
      }

      const response = await axios.post(baseURL, {
        model: provider === 'xai' ? 'grok-beta' : 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Tu es un expert RGPD français. Vérifie la conformité de ce contrat au RGPD et identifie les mentions obligatoires, consentements, droits des personnes et durées de conservation.'
          },
          {
            role: 'user',
            content: `Vérifie la conformité RGPD de ce contrat :\n\n${contractText}`
          }
        ],
        max_tokens: 400,
        temperature: 0.3
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        timeout: 30000
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error(`Erreur vérification RGPD ${provider}:`, error);
      return 'Vérification RGPD non disponible. Vérifiez votre connexion.';
    }
  }

  // Contrat de fallback
  getFallbackContract(type) {
    return `CONTRAT DE ${type.toUpperCase()}

Entre les soussignés :
- [Nom du client]
- [Nom de l'entreprise]

Il est convenu ce qui suit :

Article 1 - Objet
Le présent contrat a pour objet [description du service].

Article 2 - Modalités
[Modalités à définir]

Article 3 - Durée
Le présent contrat prend effet le [date] et se termine le [date].

Article 4 - Conditions financières
[Conditions à définir]

En foi de quoi, les parties ont signé le présent contrat.

[Signatures]`;
  }
}

// Instance singleton
export const aiService = new AIService();
