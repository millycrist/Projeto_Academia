import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
 
const HeaderFinal = () => {
  const navigation = useNavigation();

  const navigateToPage = (pageName) => { 
    navigation.navigate(pageName);
  }; 

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerButton} onPress={() => navigateToPage('matricula')}>
        <FontAwesome5 name="user-plus" size={20} color="white" />
        <Text style={styles.headerButtonText}></Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.headerButton} onPress={() => navigateToPage('saude')}>
        <FontAwesome5 name="heartbeat" size={20} color="white" />
        <Text style={styles.headerButtonText}></Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.headerButton} onPress={() => navigateToPage('resultado')}>
        <FontAwesome5 name="poll" size={20} color="white" />
        <Text style={styles.headerButtonText}></Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.headerButton} onPress={() => navigateToPage('plano')}>
        <FontAwesome5 name="file-alt" size={20} color="white" />
        <Text style={styles.headerButtonText}></Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.headerButton} onPress={() => navigateToPage('treino')}>
        <FontAwesome5 name="dumbbell" size={20} color="white" />
        <Text style={styles.headerButtonText}></Text>
      </TouchableOpacity>
    </View>
  );
};

const FormularioPage = () => {
  const navigation = useNavigation();

  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [pergunta1, setPergunta1] = useState('');
  const [pergunta2, setPergunta2] = useState('');
  const [imc, setImc] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  const handleCalcularIMC = () => {
    if (!peso || !altura) {
      alert('Por favor, preencha peso e altura para calcular o IMC.');
      return;
    }

    const pesoFloat = parseFloat(peso.replace(',', '.'));
    const alturaFloat = parseFloat(altura.replace(',', '.'));

    if (isNaN(pesoFloat) || isNaN(alturaFloat) || pesoFloat <= 0 || alturaFloat <= 0) {
      alert('Peso e altura devem ser valores válidos e maiores que zero.');
      return;
    }

    const imcCalculado = (pesoFloat / (alturaFloat * alturaFloat)).toFixed(2);
    setImc(imcCalculado);
  };

  const handleInserir = () => {
    if (!peso || !altura || !pergunta1 || !pergunta2) {
      alert('Preencha todos os campos antes de inserir o usuário.');
      return;
    }

    const novoUsuario = {
      id: Math.random().toString(),
      peso,
      altura,
      pergunta1,
      pergunta2,
      imc,
    };

    setUsuarios((prev) => [...prev, novoUsuario]);
    alert('Usuário inserido com sucesso!');
    setPeso('');
    setAltura('');
    setPergunta1('');
    setPergunta2('');
    setImc('');
  };

  const handleAlterar = (id) => {
    const usuarioParaAlterar = usuarios.find((usuario) => usuario.id === id);
    navigation.navigate('EditarUsuario', { usuario: usuarioParaAlterar });
  };

  const handleExcluir = (id) => {
    setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id !== id));
    alert('Usuário excluído com sucesso!');
  };

  return (
    <ImageBackground
      source={require('../assets/fundo2.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Informações da saúde</Text>

        <TextInput
          style={styles.input}
          placeholder="Tem Pressão Alta? "
          value={peso}
          onChangeText={(text) => setPeso(text)}
          keyboardType="text"
        />
        <TextInput
          style={styles.input}
          placeholder="Fez cirurgia recentemente?"
          value={altura}
          onChangeText={(text) => setAltura(text)}
          keyboardType="text"
        />
        <TextInput
          style={styles.input}
          placeholder="Tem algum problema articular? Se sim, Qual?"
          value={pergunta1}
          onChangeText={(text) => setPergunta1(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Tem Problema Respiratorio?"
          value={pergunta2}
          onChangeText={(text) => setPergunta2(text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleInserir}>
          <Text style={styles.buttonText}>Inserir</Text>
        </TouchableOpacity>

        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.usuarioItem}>
              <Text>{`Tem Pressão Alta?: ${item.peso} `}</Text>
              <Text>{`Fez cirurgia recentemente?: ${item.altura} `}</Text>
              <Text>{`Tem algum problema articular?: ${item.pergunta1}`}</Text>
              <Text>{`Tem Problema Respiratorio?: ${item.pergunta2}`}</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.editButton} onPress={() => handleAlterar(item.id)}>
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleExcluir(item.id)}>
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        {/* Adicione o Header no Final */}
        <HeaderFinal />
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 120,
    color: 'white',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  usuarioItem: {
    marginBottom: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  imcText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButtonText: {
    color: 'white',
    marginLeft: 1,
  },
  link: {
    color: 'black',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
});

export default FormularioPage;
