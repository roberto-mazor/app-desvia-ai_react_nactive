import { AuthController } from '@/controllers/AuthController';
import { PostController } from '@/controllers/PostController';
import { IPost, IUser } from '@/types';
import FeedScreen from '@/views/screens/FeedScreen';
import LoginScreen from '@/views/screens/LoginScreen';
import NewPostScreen from '@/views/screens/NewPostScreen';
import PostDetailScreen from '@/views/screens/PostDetailScreen';
import RegisterScreen from '@/views/screens/RegisterScreen';
import { LocationObjectCoords } from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('login');
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<IUser | null>(null);

  // Estados de Login
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');

  // Estados de Registro
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Estados de Posts
  const [posts, setPosts] = useState<IPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);

  // Estados do Formulário de Novo Post
  const [photo, setPhoto] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('');
  const [coords, setCoords] = useState<LocationObjectCoords | null>(null);
  const [details, setDetails] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      try {
        const currentUser = await AuthController.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setCurrentScreen('feed');
        }
        const loadedPosts = await PostController.getPosts();
        setPosts(loadedPosts);
      } catch (error) {
        console.log('Erro ao inicializar:', error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  // Ações de Login e Cadastro
  const handleLogin = async () => {
    try {
      const loggedUser = await AuthController.login(loginEmail, loginPassword);
      setUser(loggedUser);
      setLoginEmail('');
      setLoginPassword('');
      setCurrentScreen('feed');
    } catch (error: any) {
      Alert.alert('Erro no Login', error.message);
    }
  };

  const handleRegister = async () => {
    try {
      await AuthController.register(name, email, password);
      Alert.alert('Sucesso', 'Conta criada com sucesso! Faça login.');
      setName('');
      setEmail('');
      setPassword('');
      setCurrentScreen('login');
    } catch (error: any) {
      Alert.alert('Erro no Cadastro', error.message);
    }
  };

  // Ações de Criação de Post
  const handleTakePhoto = async () => {
    try {
      const uri = await PostController.takePhoto();
      if (uri) setPhoto(uri);
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    }
  };

  const handlePickGallery = async () => {
    try {
      const uri = await PostController.pickImageFromGallery();
      if (uri) setPhoto(uri);
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    }
  };

  const handleGetLocation = async () => {
    try {
      const result = await PostController.getLocation();
      setLocation(result.formattedAddress);
      setCoords(result.coords);
    } catch (error: any) {
      Alert.alert('Erro no GPS', error.message);
    }
  };

  const handleCreatePost = async () => {
    try {
      const updatedPosts = await PostController.createPost({
        photo,
        location,
        details,
        author: user?.name || 'Anônimo',
        coords,
      });
      setPosts(updatedPosts);
      setPhoto(null);
      setLocation('');
      setCoords(null);
      setDetails('');
      setCurrentScreen('feed');
      Alert.alert('Sucesso', 'Registro publicado com sucesso!');
    } catch (error: any) {
      Alert.alert('Atenção', error.message);
    }
  };

  const handleLogout = async () => {
    await AuthController.logout();
    setUser(null);
    setCurrentScreen('login');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {currentScreen === 'login' && (
        <LoginScreen
          email={loginEmail}
          setEmail={setLoginEmail}
          password={loginPassword}
          setPassword={setLoginPassword}
          onLogin={handleLogin}
          onNavigateToRegister={() => setCurrentScreen('register')}
        />
      )}

      {currentScreen === 'register' && (
        <RegisterScreen
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onRegister={handleRegister}
          onNavigateToLogin={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'feed' && (
        <FeedScreen
          posts={posts}
          onNewPost={() => setCurrentScreen('new_post')}
          onLogout={handleLogout}
          onSelectPost={(post) => {
            setSelectedPost(post);
            setCurrentScreen('post_detail');
          }}
        />
      )}

      {currentScreen === 'new_post' && (
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
          onCancel={() => setCurrentScreen('feed')}
        />
      )}

      {currentScreen === 'post_detail' && selectedPost && (
        <PostDetailScreen
          post={selectedPost}
          onBack={() => {
            setSelectedPost(null);
            setCurrentScreen('feed');
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
});