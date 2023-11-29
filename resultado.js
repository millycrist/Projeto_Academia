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
import { TextInputMask } from 'react-native-masked-text';
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
  const [pergunta3, setPergunta3] = useState('');
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
    const novoUsuario = {
      id: Math.random().toString(),
      peso,
      altura,
      pergunta1,
      pergunta2,
      pergunta3,
      imc,
    };

    setUsuarios((prev) => [...prev, novoUsuario]);
    alert('Usuário inserido com sucesso!');
    setPeso('');
    setAltura('');
    setPergunta1('');
    setPergunta2('');
    setPergunta3('');
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
        <Text style={styles.title}>Resultado na Academia</Text>

        <TextInput
          style={styles.input}
          placeholder="Peso (kg)"
          value={peso}
          onChangeText={(text) => setPeso(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Altura (m)"
          value={altura}
          onChangeText={(text) => setAltura(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Principal objetivo? (Emagrecer ou ganhar massa)"
          value={pergunta1}
          onChangeText={(text) => setPergunta1(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Planeja treinar quantas vezes por semana?"
          value={pergunta2}
          onChangeText={(text) => setPergunta2(text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleCalcularIMC}>
          <Text style={styles.buttonText}>Calcular IMC</Text>
        </TouchableOpacity>
        <Text style={styles.imcText}>{`IMC: ${imc}`}</Text>
        <TouchableOpacity style={styles.button} onPress={handleInserir}>
          <Text style={styles.buttonText}>Inserir</Text>
        </TouchableOpacity>

        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.usuarioItem}>
              <Text>{`Peso: ${item.peso} kg`}</Text>
              <Text>{`Altura: ${item.altura} m`}</Text>
              <Text>{`Principal objetivo?: ${item.pergunta1}`}</Text>
              <Text>{`Planeja treinar quantas vezes por semana?: ${item.pergunta2}`}</Text>
              <Text>{`IMC: ${item.imc}`}</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.editButton} onPress={() => handleAlterar(item.id)}>
                  <Text style={styles.link}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleExcluir(item.id)}>
                  <Text style={styles.link}>Excluir</Text>
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
    marginBottom: 20,
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
    color: 'white',
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
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
});

export default FormularioPage;
