import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import LoginScreen from '@/views/screens/LoginScreen';
import RegisterScreen from '@/views/screens/RegisterScreen';
import FeedScreen from '@/views/screens/FeedScreen';
import NewPostScreen from '@/views/screens/NewPostScreen';
import { AuthController } from '@/controllers/AuthController';
import { PostController } from '@/controllers/PostController';
import { PostModel } from '@/models/PostModel';
import { IUser, IPost } from '@/types';

type ScreenType = 'login' | 'register' | 'feed' | 'new_post';

export default function Index() {
  const [screen, setScreen] = useState<ScreenType>('login');
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);

  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Post States
  const [photo, setPhoto] = useState<string | null>(null);
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');

  useEffect(() => {
    PostModel.getPosts().then(setPosts);
  }, []);

  const handleLogin = async () => {
    try {
      const user = await AuthController.login(email, password);
      setCurrentUser(user);
      setScreen('feed');
    } catch (err: any) {
      Alert.alert('Erro', err.message);
    }
  };

  const handleRegister = async () => {
    try {
      await AuthController.register(name, email, password);
      Alert.alert('Sucesso', 'Cadastrado com sucesso!');
      setScreen('login');
    } catch (err: any) {
      Alert.alert('Erro', err.message);
    }
  };

  const handleCreatePost = async () => {
    if (!currentUser) return;
    try {
      const updated = await PostController.createPost(photo, location, details, currentUser.name);
      setPosts(updated);
      setPhoto(null); setLocation(''); setDetails('');
      setScreen('feed');
    } catch (err: any) {
      Alert.alert('Erro', err.message);
    }
  };

  if (screen === 'login') {
    return <LoginScreen email={email} setEmail={setEmail} password={password} setPassword={setPassword} onLogin={handleLogin} onRegister={() => setScreen('register')} />;
  }

  if (screen === 'register') {
    return <RegisterScreen name={name} setName={setName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} onRegister={handleRegister} onLogin={() => setScreen('login')} />;
  }

  if (screen === 'new_post') {
    return (
      <NewPostScreen
        photo={photo} location={location} setLocation={setLocation} details={details} setDetails={setDetails}
        onTakePhoto={async () => setPhoto(await PostController.takePhoto())}
        onGetLocation={async () => setLocation(await PostController.getLocation())}
        onCreatePost={handleCreatePost} onCancel={() => setScreen('feed')}
      />
    );
  }

  return <FeedScreen posts={posts} onNewPost={() => setScreen('new_post')} onLogout={() => { setCurrentUser(null); setScreen('login'); }} />;
}