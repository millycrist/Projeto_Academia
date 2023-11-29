import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleCadastro = () => {
    // Lógica de validação e armazenamento dos dados de cadastro 
    if (username && password) { 
      
      alert('Cadastro realizado com sucesso!');
      navigation.navigate('matricula'); 
    } else {
     
      alert('Por favor, preencha todos os campos.');
    }
  };  

  return (
    <ImageBackground
      source={require('../assets/fundo1.jpg')} // Substitua pelo caminho da sua imagem
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}></Text>
        <TextInput
          style={styles.input}
          placeholder="Nome de usuário"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.cadastroButton} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fixedTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    position: 'absolute',
    top: 20, 
    color: 'white',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'white',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  cadastroButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Login;
