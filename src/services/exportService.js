// src/services/exportService.js
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export class ExportService {
  constructor() {
    this.pdf = null;
  }

  // Exporter un contrat en PDF
  async exportContractToPDF(contractData, options = {}) {
    try {
      const {
        filename = `contrat-${contractData.name || 'sans-nom'}.pdf`,
        format = 'a4',
        orientation = 'portrait',
        includeSignatures = true,
        includeWatermark = true
      } = options;

      // Créer un nouveau PDF
      this.pdf = new jsPDF({
        orientation,
        unit: 'mm',
        format
      });

      // Ajouter le contenu du contrat
      await this.addContractContent(contractData);
      
      // Ajouter les signatures si demandé
      if (includeSignatures) {
        this.addSignatureSection(contractData);
      }

      // Ajouter le watermark si demandé
      if (includeWatermark) {
        this.addWatermark();
      }

      // Ajouter les métadonnées
      this.addMetadata(contractData);

      // Sauvegarder le PDF
      this.pdf.save(filename);
      
      return { success: true, filename };
    } catch (error) {
      console.error('Erreur export PDF:', error);
      return { success: false, error: error.message };
    }
  }

  // Ajouter le contenu du contrat au PDF
  async addContractContent(contractData) {
    const pageWidth = this.pdf.internal.pageSize.getWidth();
    const pageHeight = this.pdf.internal.pageSize.getHeight();
    const margin = 20;
    const lineHeight = 7;
    let yPosition = margin;

    // Titre du contrat
    this.pdf.setFontSize(18);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text(contractData.name || 'CONTRAT', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Informations du contrat
    this.pdf.setFontSize(12);
    this.pdf.setFont('helvetica', 'normal');
    
    const contractInfo = [
      `Client: ${contractData.client || 'Non spécifié'}`,
      `Date: ${new Date().toLocaleDateString('fr-FR')}`,
      `Statut: ${contractData.status || 'Brouillon'}`,
      `Échéance: ${contractData.dueDate || 'Non spécifiée'}`
    ];

    contractInfo.forEach(info => {
      this.pdf.text(info, margin, yPosition);
      yPosition += lineHeight;
    });

    yPosition += 10;

    // Contenu du contrat
    this.pdf.setFontSize(11);
    this.pdf.setFont('helvetica', 'normal');
    
    const content = contractData.content || 'Contenu du contrat non disponible.';
    const lines = this.pdf.splitTextToSize(content, pageWidth - 2 * margin);
    
    lines.forEach(line => {
      if (yPosition > pageHeight - margin - 20) {
        this.pdf.addPage();
        yPosition = margin;
      }
      this.pdf.text(line, margin, yPosition);
      yPosition += lineHeight;
    });
  }

  // Ajouter la section signatures
  addSignatureSection(contractData) {
    const pageWidth = this.pdf.internal.pageSize.getWidth();
    const pageHeight = this.pdf.internal.pageSize.getHeight();
    const margin = 20;

    // Vérifier si on a besoin d'une nouvelle page
    if (this.pdf.internal.getCurrentPageInfo().pageNumber === 1) {
      const currentY = this.pdf.internal.getCurrentPageInfo().pageNumber * pageHeight;
      if (currentY > pageHeight - 100) {
        this.pdf.addPage();
      }
    }

    // Section signatures
    this.pdf.setFontSize(12);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('SIGNATURES', pageWidth / 2, pageHeight - 80, { align: 'center' });

    // Lignes de signature
    const signatureY = pageHeight - 60;
    this.pdf.line(margin, signatureY, pageWidth - margin, signatureY);
    this.pdf.line(margin, signatureY + 20, pageWidth - margin, signatureY + 20);

    // Labels
    this.pdf.setFontSize(10);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.text('Signature du client', margin + 10, signatureY + 15);
    this.pdf.text('Signature de l\'entreprise', pageWidth - margin - 80, signatureY + 15);
  }

  // Ajouter un watermark
  addWatermark() {
    const pageWidth = this.pdf.internal.pageSize.getWidth();
    const pageHeight = this.pdf.internal.pageSize.getHeight();

    this.pdf.setGState(new this.pdf.GState({ opacity: 0.1 }));
    this.pdf.setFontSize(50);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('ContractEasy', pageWidth / 2, pageHeight / 2, { 
      align: 'center',
      angle: 45 
    });
    this.pdf.setGState(new this.pdf.GState({ opacity: 1 }));
  }

  // Ajouter les métadonnées
  addMetadata(contractData) {
    this.pdf.setProperties({
      title: contractData.name || 'Contrat',
      subject: 'Contrat généré par ContractEasy',
      author: 'ContractEasy',
      creator: 'ContractEasy MVP',
      producer: 'ContractEasy PDF Generator'
    });
  }

  // Exporter plusieurs contrats en un seul PDF
  async exportMultipleContractsToPDF(contracts, options = {}) {
    try {
      const {
        filename = 'contrats-multiples.pdf',
        format = 'a4',
        orientation = 'portrait'
      } = options;

      this.pdf = new jsPDF({
        orientation,
        unit: 'mm',
        format
      });

      // Page de couverture
      this.addCoverPage(contracts);

      // Ajouter chaque contrat
      for (let i = 0; i < contracts.length; i++) {
        if (i > 0) {
          this.pdf.addPage();
        }
        await this.addContractContent(contracts[i]);
      }

      this.pdf.save(filename);
      return { success: true, filename };
    } catch (error) {
      console.error('Erreur export multiple PDF:', error);
      return { success: false, error: error.message };
    }
  }

  // Page de couverture pour export multiple
  addCoverPage(contracts) {
    const pageWidth = this.pdf.internal.pageSize.getWidth();
    const pageHeight = this.pdf.internal.pageSize.getHeight();

    // Titre
    this.pdf.setFontSize(24);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('CONTRATS', pageWidth / 2, pageHeight / 2 - 20, { align: 'center' });

    // Sous-titre
    this.pdf.setFontSize(16);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, pageWidth / 2, pageHeight / 2, { align: 'center' });

    // Liste des contrats
    this.pdf.setFontSize(12);
    this.pdf.text('Liste des contrats:', 20, pageHeight / 2 + 30);
    
    contracts.forEach((contract, index) => {
      this.pdf.text(`${index + 1}. ${contract.name} - ${contract.client}`, 30, pageHeight / 2 + 40 + (index * 10));
    });
  }

  // Exporter un rapport de contrats
  async exportContractReport(contracts, options = {}) {
    try {
      const {
        filename = 'rapport-contrats.pdf',
        includeCharts = true
      } = options;

      this.pdf = new jsPDF();
      
      // Titre du rapport
      this.pdf.setFontSize(20);
      this.pdf.setFont('helvetica', 'bold');
      this.pdf.text('RAPPORT DE CONTRATS', 20, 30);

      // Statistiques
      const stats = this.calculateContractStats(contracts);
      this.addStatsToPDF(stats);

      // Tableau des contrats
      this.addContractsTable(contracts);

      // Graphiques si demandé
      if (includeCharts) {
        this.addChartsToPDF(stats);
      }

      this.pdf.save(filename);
      return { success: true, filename };
    } catch (error) {
      console.error('Erreur export rapport:', error);
      return { success: false, error: error.message };
    }
  }

  // Calculer les statistiques des contrats
  calculateContractStats(contracts) {
    const total = contracts.length;
    const byStatus = contracts.reduce((acc, contract) => {
      acc[contract.status] = (acc[contract.status] || 0) + 1;
      return acc;
    }, {});

    const expiringSoon = contracts.filter(c => {
      const dueDate = new Date(c.dueDate);
      const oneWeekFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      return dueDate <= oneWeekFromNow && dueDate > new Date();
    }).length;

    return {
      total,
      byStatus,
      expiringSoon,
      pending: byStatus.pending || 0,
      signed: byStatus.signed || 0,
      expired: byStatus.expired || 0
    };
  }

  // Ajouter les statistiques au PDF
  addStatsToPDF(stats) {
    this.pdf.setFontSize(14);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('Statistiques', 20, 50);

    this.pdf.setFontSize(12);
    this.pdf.setFont('helvetica', 'normal');
    
    const statsText = [
      `Total des contrats: ${stats.total}`,
      `En attente: ${stats.pending}`,
      `Signés: ${stats.signed}`,
      `Expirés: ${stats.expired}`,
      `Expirent bientôt: ${stats.expiringSoon}`
    ];

    statsText.forEach((text, index) => {
      this.pdf.text(text, 20, 70 + (index * 10));
    });
  }

  // Ajouter le tableau des contrats
  addContractsTable(contracts) {
    this.pdf.setFontSize(12);
    this.pdf.setFont('helvetica', 'bold');
    
    // En-têtes du tableau
    this.pdf.text('Nom', 20, 120);
    this.pdf.text('Client', 80, 120);
    this.pdf.text('Statut', 140, 120);
    this.pdf.text('Échéance', 180, 120);

    // Ligne de séparation
    this.pdf.line(20, 125, 200, 125);

    // Données du tableau
    this.pdf.setFont('helvetica', 'normal');
    contracts.forEach((contract, index) => {
      const y = 130 + (index * 10);
      this.pdf.text(contract.name || 'N/A', 20, y);
      this.pdf.text(contract.client || 'N/A', 80, y);
      this.pdf.text(contract.status || 'N/A', 140, y);
      this.pdf.text(contract.dueDate || 'N/A', 180, y);
    });
  }

  // Ajouter des graphiques au PDF (version simplifiée)
  addChartsToPDF(stats) {
    // Ici vous pourriez ajouter des graphiques simples
    // Pour l'instant, on ajoute juste du texte
    this.pdf.setFontSize(12);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.text('Graphiques disponibles dans la version complète', 20, 250);
  }
}

// Instance singleton
export const exportService = new ExportService();
