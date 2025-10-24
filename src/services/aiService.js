// Service IA pour les suggestions de clauses
export class AIService {
  constructor() {
    this.apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    this.baseURL = 'https://api.openai.com/v1/chat/completions';
  }

  // Générer une clause de contrat
  async generateClause(context, type = 'general') {
    try {
      const prompt = this.getPromptForType(type, context);
      
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'Tu es un expert en droit des contrats. Génère des clauses professionnelles et juridiquement valides.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Erreur IA:', error);
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
  async analyzeContract(contractText) {
    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'Tu es un expert en droit des contrats. Analyse les contrats et suggère des améliorations.'
            },
            {
              role: 'user',
              content: `Analyse ce contrat et suggère des améliorations :\n\n${contractText}`
            }
          ],
          max_tokens: 300,
          temperature: 0.5
        })
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Erreur analyse IA:', error);
      return 'Analyse non disponible. Vérifiez votre connexion.';
    }
  }
}

// Instance singleton
export const aiService = new AIService();
