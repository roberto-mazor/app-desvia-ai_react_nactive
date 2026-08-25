# DesviaAí

Aplicativo mobile para registrar e consultar buracos nas vias. O usuário pode criar uma conta, entrar com e-mail e senha ou Google, fotografar o problema, informar sua localização e publicar um relato com detalhes.

O projeto é um app [Expo](https://expo.dev) com React Native, TypeScript e Expo Router. A versão atual usa Expo SDK 54, React Native 0.81 e React 19.

## Funcionalidades

- Cadastro local com nome, e-mail e senha.
- Login local com comparação de e-mail sem diferenciar maiúsculas e minúsculas.
- Login com Google via `expo-auth-session`.
- Feed de registros com autor, data, foto, endereço e detalhes.
- Captura de foto pela câmera ou seleção de imagem da galeria.
- Salvamento da foto capturada na galeria do dispositivo.
- Obtenção da localização atual por GPS e geocodificação reversa para exibir rua, bairro e cidade.
- Visualização da posição obtida em um mapa com marcador.
- Persistência local por `AsyncStorage`, sem backend ou API própria.

## Requisitos

- Node.js 20.19 ou superior, conforme a compatibilidade do Expo SDK 54.
- npm.
- Android Studio e um emulador Android, ou um dispositivo Android conectado.
- Xcode 16.1 ou superior para executar no iOS.
- Permissões do dispositivo para câmera, galeria e localização.

O projeto está configurado para orientação retrato, Android 7 ou superior e iOS 15.1 ou superior. O suporte web existe no `app.json`, mas câmera, galeria, GPS e mapa devem ser testados em um dispositivo ou emulador nativo.

## Instalação e execução

Na raiz do projeto:

```bash
npm install
npm run start
```

O comando `npm run start` abre o Expo CLI. A partir dele, é possível abrir o projeto no Expo Go, em um emulador Android ou em um simulador iOS.

Comandos disponíveis:

| Comando | Finalidade |
| --- | --- |
| `npm run start` | Inicia o servidor de desenvolvimento Expo. |
| `npm run android` | Compila e abre a aplicação no Android. |
| `npm run ios` | Compila e abre a aplicação no iOS. |
| `npm run web` | Inicia a aplicação no navegador. |
| `npm run lint` | Executa o ESLint usando a configuração do Expo. |
| `npm run reset-project` | Tenta executar o script de reset do template. |

> **Observação:** o script `reset-project` está declarado no `package.json`, mas o arquivo referenciado (`scripts/reset-project.js`) não está presente na raiz atual. O diretório `app-example/scripts` contém uma cópia do script do template.

## Configuração do login Google

O login Google usa `expo-auth-session/providers/google` e precisa dos IDs de cliente OAuth nas variáveis públicas do Expo. Crie um arquivo `.env` na raiz, sem versionar credenciais, com:

```env
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=seu-client-id-web.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=seu-client-id-android.apps.googleusercontent.com
```

Essas variáveis são lidas em `src/app/index.tsx`. O fluxo consulta `https://www.googleapis.com/userinfo/v2/me` para obter nome, e-mail e ID do usuário. A URI de redirecionamento nativa contém um placeholder (`seu-usuario-expo`) e deve ser ajustada ao publicar ou configurar o projeto em uma conta Expo real.

## Fluxo da aplicação

1. `src/app/_layout.tsx` registra o layout raiz com um `Stack` do Expo Router.
2. `src/app/index.tsx` mantém o estado da sessão, dos formulários e dos posts.
3. A tela inicial é `login`. O usuário pode ir para `register` ou autenticar.
4. Após o login local ou Google, a tela muda para `feed`.
5. Em `feed`, o usuário pode sair ou abrir `new_post`.
6. Em `new_post`, o usuário escolhe uma foto, informa ou obtém o endereço, adiciona detalhes e publica.
7. O controller valida os campos, cria o post e atualiza o feed em memória.

O controle de telas é feito por estado (`login`, `register`, `feed` e `new_post`) dentro da rota principal; não há uma pilha de navegação separada para cada tela de negócio.

## Arquitetura e responsabilidades

### Entrada da aplicação

- `src/app/index.tsx`: orquestra autenticação, carregamento e criação de posts, permissões, estados dos formulários e renderização condicional das telas.
- `src/app/_layout.tsx`: configura o `Stack` global do Expo Router.

### Controllers

`src/controllers/AuthController.ts` expõe:

- `login(email, password)`: valida campos, lê usuários e verifica credenciais.
- `register(name, email, password)`: valida campos, impede e-mail duplicado e salva o novo usuário.
- `formatGoogleUser(userInfo)`: converte a resposta do Google para `IUser`.

`src/controllers/PostController.ts` expõe:

- `takePhoto()`: solicita câmera e galeria, abre a câmera, permite edição e salva a imagem na galeria.
- `pickImageFromGallery()`: solicita acesso à mídia e abre o seletor de imagens.
- `getLocation()`: solicita localização em primeiro plano, obtém coordenadas e tenta convertê-las em endereço.
- `createPost(input)`: exige foto, localização e detalhes, cria o registro com ID baseado em `Date.now()` e salva-o.

### Models e persistência

- `src/models/UserModel.ts`: usa a chave `@users`, trata dados inválidos como lista vazia e persiste usuários serializados em JSON.
- `src/models/PostModel.ts`: lê e grava posts no `AsyncStorage` e coloca o novo registro no início da lista.

Não existe servidor, banco remoto, upload de imagens ou mecanismo de sessão persistente. As imagens são armazenadas como URIs locais do dispositivo.

### Views

- `LoginScreen.tsx`: formulário de login local, login Google e link para cadastro.
- `RegisterScreen.tsx`: formulário de nome, e-mail e senha.
- `FeedScreen.tsx`: lista os posts em `FlatList`, mostra estado vazio e oferece novo registro e logout.
- `NewPostScreen.tsx`: câmera, galeria, GPS, mapa, endereço, detalhes, publicação e cancelamento.
- `CustomButton.tsx`: botão reutilizável com variantes `primary`, `secondary` e `google`.
- `CustomInput.tsx`: wrapper reutilizável de `TextInput` com estilo padrão.

## Tipos

Em `src/types/index.ts`:

```ts
interface IUser {
   id?: string;
   name: string;
   email: string;
   password?: string;
}

interface IPost {
   id: string;
   author: string;
   photo: string;
   location: string;
   details: string;
   date: string;
}
```

O campo `password` é opcional para permitir usuários provenientes do Google, que não possuem senha local.

## Bibliotecas principais

| Biblioteca | Uso no projeto |
| --- | --- |
| `expo` | Base do SDK e ferramentas do projeto. |
| `react` e `react-native` | Componentes, estado, efeitos e UI nativa. |
| `expo-router` | Entrada `expo-router/entry` e roteamento baseado em arquivos. |
| `@react-native-async-storage/async-storage` | Persistência local de usuários e posts. |
| `expo-auth-session` | Fluxo OAuth do login Google. |
| `expo-web-browser` | Finalização do fluxo de autenticação no navegador. |
| `@react-native-google-signin/google-signin` | Plugin/configuração nativa instalado para integração Google. |
| `expo-image-picker` | Câmera e seleção de imagens. |
| `expo-media-library` | Permissão e salvamento de imagens na galeria. |
| `expo-location` | Permissão, GPS e geocodificação reversa. |
| `react-native-maps` | Mapa e marcador da localização do registro. |
| `@expo/vector-icons` | Ícones disponíveis no ecossistema Expo. |
| `react-native-gesture-handler`, `react-native-reanimated` e `react-native-worklets` | Infraestrutura de gestos e animações do React Native/Expo. |
| `react-native-safe-area-context` e `react-native-screens` | Suporte de layout seguro e telas nativas. |
| `expo-splash-screen`, `expo-status-bar`, `expo-system-ui` e `expo-font` | Inicialização, barra de status, sistema e fontes. |
| `expo-image`, `expo-linking`, `expo-constants`, `expo-crypto`, `expo-haptics`, `expo-symbols` | Recursos Expo instalados para imagem, links, metadados, criptografia, feedback tátil e símbolos. |
| `react-dom` e `react-native-web` | Execução no navegador. |
| `typescript`, `eslint` e `eslint-config-expo` | Tipagem estrita e qualidade de código. |

## Estrutura de pastas

```text
.
├── src/
│   ├── app/
│   │   ├── _layout.tsx          # Layout raiz do Expo Router
│   │   └── index.tsx            # Orquestração do fluxo principal
│   ├── controllers/
│   │   ├── AuthController.ts    # Regras de login e cadastro
│   │   └── PostController.ts    # Foto, GPS e criação de posts
│   ├── models/
│   │   ├── PostModel.ts         # Persistência dos posts
│   │   └── UserModel.ts         # Persistência dos usuários
│   ├── types/
│   │   └── index.ts             # Interfaces IUser e IPost
│   └── views/
│       ├── components/
│       │   ├── CustomButton.tsx
│       │   └── CustomInput.tsx
│       └── screens/
│           ├── FeedScreen.tsx
│           ├── LoginScreen.tsx
│           ├── NewPostScreen.tsx
│           └── RegisterScreen.tsx
├── app-example/                 # Exemplo original do template Expo
├── assets/images/               # Ícones, splash screen e favicon
├── app.json                     # Configuração Expo e permissões nativas
├── eslint.config.js             # Configuração ESLint
├── expo-env.d.ts                # Tipos de ambiente Expo
├── tsconfig.json                # TypeScript e alias @/* -> src/*
├── package.json                 # Scripts e dependências
└── Tutorial Expo Location + Map View.md
```

## Permissões e configuração nativa

O `app.json` configura plugins e mensagens de permissão para `expo-image-picker`, `expo-media-library` e `expo-location`. No Android, o projeto declara permissões de câmera, armazenamento, mídia e localização. Ao testar, negá-las impede as operações correspondentes e gera alertas na interface.

Depois de alterar plugins nativos ou permissões, recrie o build nativo quando necessário:

```bash
npx expo prebuild
npm run android
```

## Limitações conhecidas

- Os dados são locais e não são compartilhados entre dispositivos.
- Senhas são armazenadas em texto simples no `AsyncStorage`; isso não é adequado para produção.
- O login Google está apenas formatado no cliente e não cria uma sessão persistida.
- O post guarda URI local da imagem, não um arquivo hospedado.
- `PostModel.getPosts()` lê `@post`, enquanto `savePost()` grava em `@posts`. Por isso, posts criados podem aparecer imediatamente no feed, mas não ser recuperados após reiniciar o app. A chave deve ser padronizada antes de considerar a persistência concluída.
- Não há testes automatizados configurados no momento.

## Documentação complementar

- [Expo SDK 54](https://docs.expo.dev/versions/v54.0.0/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Expo Location](https://docs.expo.dev/versions/v54.0.0/sdk/location/)
- [Expo ImagePicker](https://docs.expo.dev/versions/v54.0.0/sdk/imagepicker/)
- [Expo MediaLibrary](https://docs.expo.dev/versions/v54.0.0/sdk/media-library/)
- [React Native Maps](https://docs.expo.dev/versions/v54.0.0/sdk/map-view/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)