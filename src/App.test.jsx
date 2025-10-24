import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Wrapper pour les tests avec Router
const RouterWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('ContractEasy App', () => {
  test('renders navigation menu', () => {
    render(<App />, { wrapper: RouterWrapper });
    
    // Vérifier que le menu de navigation est présent
    expect(screen.getByText('Démo ContractEasy')).toBeInTheDocument();
    expect(screen.getByText('🏠 Page d\'accueil')).toBeInTheDocument();
    expect(screen.getByText('🔐 Connexion')).toBeInTheDocument();
    expect(screen.getByText('📝 Inscription')).toBeInTheDocument();
    expect(screen.getByText('📊 Tableau de bord')).toBeInTheDocument();
  });

  test('renders homepage by default', () => {
    render(<App />, { wrapper: RouterWrapper });
    
    // Vérifier que la page d'accueil est affichée
    expect(screen.getByText('Simplifiez vos contrats avec ContractEasy')).toBeInTheDocument();
    expect(screen.getByText('Essayer gratuitement')).toBeInTheDocument();
  });

  test('navigation links work', () => {
    render(<App />, { wrapper: RouterWrapper });
    
    // Vérifier que les liens de navigation sont présents
    const homeLink = screen.getByRole('link', { name: /page d'accueil/i });
    const loginLink = screen.getByRole('link', { name: /connexion/i });
    const signupLink = screen.getByRole('link', { name: /inscription/i });
    
    expect(homeLink).toHaveAttribute('href', '/');
    expect(loginLink).toHaveAttribute('href', '/login');
    expect(signupLink).toHaveAttribute('href', '/signup');
  });
});
