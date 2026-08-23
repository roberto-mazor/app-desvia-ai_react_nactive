import { AuthController } from '@/controllers/AuthController';
import { PostController } from '@/controllers/PostController';
import { PostModel } from '@/models/PostModel';
import { IPost, IUser } from '@/types';
import FeedScreen from '@/views/screens/FeedScreen';
import LoginScreen from '@/views/screens/LoginScreen';
import NewPostScreen from '@/views/screens/NewPostScreen';
import RegisterScreen from '@/views/screens/RegisterScreen';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

type ScreenType = 'login' | 'register' | 'feed' | 'new_post';

export default function Index() {
  const [screen, setScreen] = useState<ScreenType>('login');
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);

  // Estados de Formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estados da Publicação
  const [photo, setPhoto] = useState<string | null>(null);
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');

  // Estado para guardar a localização 
  const [coords, setCoords] = useState<Location.LocationObjectCoords | null>(null);

  // Carregar posts salvos ao iniciar
  useEffect(() => {
    PostModel.getPosts().then(setPosts);
  }, []);

  // Limpar formulário de autenticação
  const clearAuthFields = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  // --- HANDLERS ---
  const handleLogin = async () => {
    try {
      const user = await AuthController.login(email, password);
      setCurrentUser(user);
      clearAuthFields();
      setScreen('feed');
    } catch (err: any) {
      Alert.alert('Erro no Login', err.message);
    }
  };

  const handleRegister = async () => {
    try {
      await AuthController.register(name, email, password);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      clearAuthFields();
      setScreen('login');
    } catch (err: any) {
      Alert.alert('Erro no Cadastro', err.message);
    }
  };

  const handleTakePhoto = async () => {
    try {
      const photoUri = await PostController.takePhoto();
      if (photoUri) setPhoto(photoUri);
    } catch (err: any) {
      Alert.alert('Câmera', err.message);
    }
  };

  const handlePickGallery = async () => {
    try {
      const photoUri = await PostController.pickImageFromGallery();
      if (photoUri) setPhoto(photoUri);
    } catch (err: any) {
      Alert.alert('Galeria', err.message);
    }
  };

  const handleGetLocation = async () => {
    try {
      const locResult = await PostController.getLocation();
      setLocation(locResult.formattedAddress); // Preenche o Input com o Endereço Reverso
      setCoords(locResult.coords);              // Guarda as coordenadas para o MapView
    } catch (err: any) {
      Alert.alert('Localização', err.message);
    }
  };

  const handleCreatePost = async () => {
    if (!currentUser) return;
    try {
      const updated = await PostController.createPost({
        photo,
        location,
        details,
        author: currentUser.name,
      });
      setPosts(updated);

      // Limpar campos após publicar
      setPhoto(null);
      setLocation('');
      setCoords(null);
      setDetails('');
      setScreen('feed');
    } catch (err: any) {
      Alert.alert('Erro ao Publicar', err.message);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    clearAuthFields();
    setScreen('login');
  };

  // --- RENDERIZAÇÃO CONDICIONAL DAS TELAS ---
  if (screen === 'login') {
    return (
      <LoginScreen
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onLogin={handleLogin}
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
        onRegister={handleRegister}
        onNavigateToLogin={() => setScreen('login')}
      />
    );
  }

  if (screen === 'new_post') {
    return (
      <NewPostScreen
        photo={photo}
        location={location}
        setLocation={setLocation}
        coords={coords}
        details={details}
        setDetails={setDetails}
        onTakePhoto={handleTakePhoto}
        onPickGallery={handlePickGallery}
        onGetLocation={handleGetLocation}
        onCreatePost={handleCreatePost}
        onCancel={() => {
          setPhoto(null);
          setLocation('');
          setCoords(null);
          setDetails('');
          setScreen('feed');
        }}
      />
    );
  }

  return (
    <FeedScreen
      posts={posts}
      onNavigateToNewPost={() => setScreen('new_post')}
      onLogout={handleLogout}
    />
  );
}