# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


src/
├── app/                        # [Router/View Entry] Ponto de entrada das rotas do Expo Router
│   ├── _layout.tsx             # Configuração do layout global
│   └── index.tsx               # Rota principal (Gerencia fluxo de exibição das telas)
│
├── controllers/                # [Controller] Regras de negócio, manipulação da câmera e geolocalização
│   ├── AuthController.ts       # Validações de login e cadastro
│   └── PostController.ts       # Lógica para fotos, GPS e criação de postagens
│
├── models/                     # [Model] Comunicação direta com o AsyncStorage
│   ├── UserModel.ts            # Leitura e escrita de dados dos usuários
│   └── PostModel.ts            # Leitura e escrita de dados das publicações
│
├── types/                      # Interfaces e Tipagens do TypeScript
│   └── index.ts                # Definição dos tipos IUser, IPost, etc.
│
└── views/                      # [View] Interface do Usuário (UI)
    ├── components/             # Componentes visuais reutilizáveis
    │   ├── CustomButton.tsx    # Botão estilizado do app
    │   └── CustomInput.tsx     # Campo de texto (TextInput) estilizado
    │
    └── screens/                # Interface das Telas sem regras de negócio profundas
        ├── FeedScreen.tsx      # Exibição do feed de buracos
        ├── LoginScreen.tsx     # Formulário de entrada
        ├── NewPostScreen.tsx   # Formulário para tirar foto e enviar relato
        └── RegisterScreen.tsx  # Formulário de cadastro de novo usuário