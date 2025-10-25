// Email Service for transactional emails
class EmailService {
  constructor() {
    this.apiKey = import.meta.env.VITE_SENDGRID_API_KEY;
    this.fromEmail = import.meta.env.VITE_FROM_EMAIL || 'noreply@contracteasy.com';
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://contracteasy-mvp.vercel.app';
  }

  // Send transactional email
  async sendEmail(to, templateId, dynamicData = {}) {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to,
          templateId,
          dynamicData,
          from: this.fromEmail
        })
      });

      if (!response.ok) {
        throw new Error(`Email sending failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  // Welcome email for new users
  async sendWelcomeEmail(userEmail, userName) {
    return this.sendEmail(userEmail, 'welcome', {
      user_name: userName,
      login_url: `${this.baseUrl}/login`,
      dashboard_url: `${this.baseUrl}/dashboard`
    });
  }

  // Contract signature request
  async sendSignatureRequest(signerEmail, contractTitle, contractId, signerName) {
    return this.sendEmail(signerEmail, 'signature_request', {
      signer_name: signerName,
      contract_title: contractTitle,
      signature_url: `${this.baseUrl}/sign/${contractId}`,
      contract_id: contractId
    });
  }

  // Contract signed notification
  async sendContractSignedNotification(ownerEmail, contractTitle, signerName) {
    return this.sendEmail(ownerEmail, 'contract_signed', {
      contract_title: contractTitle,
      signer_name: signerName,
      dashboard_url: `${this.baseUrl}/dashboard`
    });
  }

  // Contract expiration reminder
  async sendExpirationReminder(userEmail, contractTitle, daysUntilExpiry, contractId) {
    return this.sendEmail(userEmail, 'expiration_reminder', {
      contract_title: contractTitle,
      days_until_expiry: daysUntilExpiry,
      contract_url: `${this.baseUrl}/contracts/${contractId}`,
      renewal_url: `${this.baseUrl}/contracts/${contractId}/renew`
    });
  }

  // Payment confirmation
  async sendPaymentConfirmation(userEmail, userName, planName, amount, invoiceUrl) {
    return this.sendEmail(userEmail, 'payment_confirmation', {
      user_name: userName,
      plan_name: planName,
      amount: amount,
      invoice_url: invoiceUrl,
      dashboard_url: `${this.baseUrl}/dashboard`
    });
  }

  // Password reset
  async sendPasswordReset(userEmail, resetToken) {
    return this.sendEmail(userEmail, 'password_reset', {
      reset_url: `${this.baseUrl}/reset-password?token=${resetToken}`,
      expires_in: '24 hours'
    });
  }

  // Account verification
  async sendVerificationEmail(userEmail, verificationToken) {
    return this.sendEmail(userEmail, 'email_verification', {
      verification_url: `${this.baseUrl}/verify-email?token=${verificationToken}`,
      expires_in: '24 hours'
    });
  }

  // Contract renewal reminder
  async sendRenewalReminder(userEmail, contractTitle, contractId, renewalDate) {
    return this.sendEmail(userEmail, 'renewal_reminder', {
      contract_title: contractTitle,
      renewal_date: renewalDate,
      contract_url: `${this.baseUrl}/contracts/${contractId}`,
      renew_url: `${this.baseUrl}/contracts/${contractId}/renew`
    });
  }

  // Weekly digest
  async sendWeeklyDigest(userEmail, userName, contractsSummary) {
    return this.sendEmail(userEmail, 'weekly_digest', {
      user_name: userName,
      contracts_summary: contractsSummary,
      dashboard_url: `${this.baseUrl}/dashboard`
    });
  }

  // Bounce handling
  async handleBounce(email, reason) {
    console.log(`Email bounce for ${email}: ${reason}`);
    // Update user status in database
    // Disable email notifications if too many bounces
  }

  // Complaint handling
  async handleComplaint(email, reason) {
    console.log(`Email complaint for ${email}: ${reason}`);
    // Update user preferences
    // Remove from marketing lists
  }

  // Email templates configuration
  getEmailTemplates() {
    return {
      welcome: {
        subject: 'Bienvenue sur ContractEasy !',
        templateId: 'd-welcome-template-id'
      },
      signature_request: {
        subject: 'Signature de contrat requise',
        templateId: 'd-signature-template-id'
      },
      contract_signed: {
        subject: 'Contrat signé avec succès',
        templateId: 'd-signed-template-id'
      },
      expiration_reminder: {
        subject: 'Rappel : Contrat expirant bientôt',
        templateId: 'd-expiration-template-id'
      },
      payment_confirmation: {
        subject: 'Confirmation de paiement',
        templateId: 'd-payment-template-id'
      },
      password_reset: {
        subject: 'Réinitialisation de votre mot de passe',
        templateId: 'd-reset-template-id'
      },
      email_verification: {
        subject: 'Vérifiez votre adresse email',
        templateId: 'd-verification-template-id'
      },
      renewal_reminder: {
        subject: 'Rappel de renouvellement de contrat',
        templateId: 'd-renewal-template-id'
      },
      weekly_digest: {
        subject: 'Résumé hebdomadaire de vos contrats',
        templateId: 'd-digest-template-id'
      }
    };
  }
}

export default new EmailService();
