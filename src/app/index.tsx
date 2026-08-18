import React, { useState } from 'react';
import LoginScreen from '../views/screens/LoginScreen';
import RegisterScreen from '../views/screens/RegisterScreen';
// import FeedScreen from '../views/screens/FeedScreen';
// import NewPostScreen from '../views/screens/NewPostScreen'

type ScreenType = 'login' | 'register' | 'feed' | 'new_post';

export default function Index() {
  // Altere a string abaixo ('login', 'register', 'feed', 'new_post') para testar qualquer tela diretamente
  const [screen, setScreen] = useState<ScreenType>('login');

  // Estados temporários para testar a digitação
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');

  // Dados mocados para visualizar o Feed
  const mockPosts = [
    {
      id: '1',
      author: 'João Silva',
      photo: 'https://via.placeholder.com/300',
      location: 'Rua das Flores, 123',
      details: 'Buraco fundo na faixa da direita.',
      date: '17/08/2026',
    },
  ];

  if (screen === 'login') {
    return (
      <LoginScreen
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onLogin={() => setScreen('feed')}
        onNavigateToRegister={() => setScreen('register')}
      />
    );
  }

  if (screen === 'register') {
    return (
      <RegisterScreen
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onRegister={() => setScreen('login')}
        onNavigateToLogin={() => setScreen('login')}
      />
    );
  }

  if (screen === 'new_post') {
    return (
      <NewPostScreen
        photo={null}
        location={location}
        setLocation={setLocation}
        details={details}
        setDetails={setDetails}
        onTakePhoto={() => alert('Simulação: Câmera acionada!')}
        onGetLocation={() => setLocation('Lat: -22.73, Long: -47.33')}
        onCreatePost={() => setScreen('feed')}
        onCancel={() => setScreen('feed')}
      />
    );
  }

  return (
    <FeedScreen
      posts={mockPosts}
      onNavigateToNewPost={() => setScreen('new_post')}
      onLogout={() => setScreen('login')}
    />
  );
}