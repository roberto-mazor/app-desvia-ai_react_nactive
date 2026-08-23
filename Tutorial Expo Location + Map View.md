
# LOCALIZAÇÃO E MAPA

## Passo a passo para criar um projeto com expo Location e mapView

* **IMPORTANTE!** Antes de iniciar, é recomendável verificar se a *LOCALIZAÇÃO* do computador e do emulador do Android Studio estão ativas.

* *Nota**: No **SENAC** somente o administrador de rede consegue alterar essa configuração.
### Passo 1. Criar projeto

* Abrir terminal onde você deseja criar o projeto e inserir o código:

```bash
npx create-expo-app projeto-location --template blank-typescript@sdk-54
```
### Passo 2. Abrir o projeto

```bash
cd projeto-location
```

```bash
code .
```

* Para o **Senac**, abrir o terminal e colar:

```bash
$env:NODE_TLS_REJECT_UNAUTHORIZED="0"
```

### Passo 3. Limpeza de código

* Apague os arquivos Claude e outros desnecessários se houver.
* Crie um arquivo `styles.ts` na raiz e cole o conteúdo abaixo:

```typescript
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex:1,
    width:'100%'
  }
});
```

* Substitua o conteúdo de `App.tsx` por esse:

```typescript
import { View } from 'react-native';
import { styles } from "./styles";

export default function App() {
  return (
    <View style={styles.container}>
     
    </View>
  );
}
```
### Passo 4. Iniciando o projeto com expo-location

* No terminal cole:

```npm
npx expo install expo-location
```
* Abra o `app.json e cole esse trecho após o ultimo conjunto existente:
```json
"expo": {
    "plugins": [
    [
        "expo-location",
        {
        "locationAlwaysAndWhenInUsePermission": "Permitir que projeto-location acesse sua localização?"
        }
    ]
    ]
}
```
**Observação**: A mensagem pode ser personalizada como quiser e essa ação serve apenas para *iOS*.


### Passo 5. Obter a permissão do usuário para ter acesso a localização e guardar essa localização.

1) Fazer o import do `requestForegroundPermissionsAsync` do expo-location:

* Esse módulo serve para requisitar a permissão do usuário para acessar a localização do aparelho dele.

```typescript
import { requestForegroundPermissionsAsync } from "expo-location";
```

2) Antes do return, criar uma função assíncrona:

```typescript 
  async function requestLocationPermission(){
    const { granted } = await requestForegroundPermissionsAsync();
  }
```
**Nota***: o `granted` significa *garantia*, ou seja, é a confirmação do usuário para a requisição de localização.

3) import do `getCurrentPositionAsync` no expo-location 
```typescript
import { 
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync //<--- Aqui
} from "expo-location";
```

4) Agora fazemos a verificação. Se a permissão foi concedida, vamos começar a pegar a localização. Após o `const { granted } = await requestForegroundPermissionsAsync();` ainda dentro da função coloque:

```typescript
    if(granted){
      const currentPosition = await getCurrentPositionAsync();
    }
```
5) E criamos o estado para guardar essa localização já com a tipagem. Acima do `async function requestLocationPermission(){` adicione essa linha:

```typescript
const [location, setLocation] = useState<LocationObject | null>(null);
```

**Nota***: Aqui guardamos os atributos de localização( latitude, longitude...) ou `null` caso não for dada a autorização ou não encontrado nada.

6) Feito isso, o código deve acusar erro no `LocationObject` e no `useState`. Faça as importações:

```Typescript
import { useState } from 'react';
import { 
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject, //<----- importe aqui
} from "expo-location";
```

7) Voltando ao `if` vamos guardar o estado com a posição atual:

```Typescript
    if(granted){
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition); //<--- ADICIONE ESSA LINHA
    }
```

8) Aqui, já estamos capturando as informações de localização. Vamos testar e ver no terminal:

* Adione um `console.log` abaixo do `setLocation(currentPosition)`:

```typescript
console.log("LOCALIZAÇÃO ATUAL =>",currentPosition);
```
* Fora da função `async function requestLocationPermission()` vamos chamar um `UseEffect` para ele chamar a função assim que a tela for renderizada. Ou seja, assim que a tela do app abrir, ele ja deve trazer as informações.

```typescript
  useEffect(() => {
    requestLocationPermission(); 
  }, []);
```

**Observação**: Provavelmente o useEffect vai sinalizar erro. É necessário fazer a importação dele ao lado do useState do react:

```typescript
import { 
    useEffect, //<---- Aqui
    useState 
} from 'react';
```

* Agora é só rodar a aplicação: `npx expo start` ou dar um *RELOAD* e o app deve pedir a permissão para acessar a localização. O terminal deve retornar algo parecido com isso:

```bash
LOG  LOCALIZAÇÃO ATUAL => {"coords": {"accuracy": 100, "altitude": 605.
2999877929688, "altitudeAccuracy": 100, "heading": 0, "latitude": -22.7650559,
"longitude": -47.3407859, "speed": 0}, "mocked": false, "timestamp": 1786132476166}
```

### Passo 6. Instalar o mapView
* Agora vamos utilizar essas informações para exibir na tela. Primeiro vamos instalar a biblioteca `react-native-maps` :

```npm
   npx expo install react-native-maps
```

### Passo 7. chamar o mapView

* Dentro do return, abaixo do `<View>` vamos chamar o `<MapView />`
* Lembre-se de fazer o import: `import MapView from "react-native-maps";`
* Vamos adicionar um style para ele (esse style ja esta no arquivo styles) `style={styles.map}`

```ts
map: {
    flex:1,
    width:'100%'
}
```
**Observação**: Essa configuração fará o mapa aparecer na tela inteira

### Passo 8. Juntar o Location com o MapView

* Agora vamos encapsular dentro do `{}` usando o `location && <MapView...` para ele fazer a verificação se tem uma localização ou não, que vem lá do location.

```ts
{
    location &&
    <MapView style={styles.map}/>
}
```
* Aqui o mapa ainda esta abrindo de forma genérica, então podemos passar alguns atributos para ele inicializar à partir da coordenada atual utilizando o `initialRegion`. O `MapView` deve ficar assim:

```ts
{
    location && 
    <MapView
        style={styles.map}
        initialRegion={{
            latitude: location.coords.latitude, //<--- latitude atual
            longitude: location.coords.longitude, //<--- longitude atual
            latitudeDelta: 0.005, //<--- grau aproximação
            longitudeDelta: 0.005 //<--- grau aproximação
        }}
    >
    </MapView>
}
```

### Passo 9. Adicionando um pin

* Faça o import do `{ Marker }` na biblioteca do `react-native-maps`
```ts
import MapView,{Marker} from "react-native-maps";
```

* Dentro do MapView, passe o `<Marker>` junto com as coordenadas:

```ts
<Marker
  coordinate={{
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
  }}
/>
```

### Passo 10. Adicionando uma função para "observar" se houve alteração na loalização.

* Importar o `watchPositionAsync` e o LocationAccuracy` no expo-location:

```ts
import { 
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject, 
  watchPositionAsync, //<--- Aqui
  LocationAccuracy //<--- Aqui
} from "expo-location";
```
* Novo `useEffect` pra fazer essa atualização:
```ts
useEffect(() => {
    
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest, //<--- Define o nível de precisão do GPS.
      timeInterval: 1000, // <-- Define o intervalo mínimo de tempo em milissegundos para solicitar atualizações.
      distanceInterval: 1 //<-- Define a distância mínima em metros que o dispositivo precisa se mover para disparar uma atualização
    }, async (response) => {
      setLocation(response);
      //console.log("Novas coordenadas recebidas: ", response);
    });
}, []);
```

### Passo 11. Geolocalização reversa (Endereço correspondente)

* Importar o `reverseGeocodeAsync` no expo-location:
```ts
import { 
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject, 
  watchPositionAsync,
  LocationAccuracy,
  reverseGeocodeAsync //<-- Aqui
} from "expo-location";
```

* Adicionar após o `setLocation(response)`:
```ts
const enderecoResponse = await reverseGeocodeAsync({
    latitude: response.coords.latitude,
    longitude: response.coords.longitude,
});

console.log("Endereço correspondente: ", enderecoResponse);
```

# Documentação

## Location
`https://docs.expo.dev/versions/latest/sdk/location/`

## MapView
`https://github.com/react-native-maps/react-native-maps`