import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import LoginScreen from '../views/screens/LoginScreen';
import RegisterScreen from '../views/screens/RegisterScreen';
import FeedScreen from '../views/screens/FeedScreen';
import NewPostScreen from '../views/screens/NewPostScreen';
import { AuthController } from '../controllers/AuthController';
import { PostController } from '../controllers/PostController';
import { PostModel } from '../models/PostModel';
import { IUser, IPost } from '../types';

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
      const user = await AuthController.login(name, email, password);
      setCurrentUser(user);
      setScreen('feed');
    } catch (err: any) {
      Alert.alert('Erro', err.message);
    }
  };



}

