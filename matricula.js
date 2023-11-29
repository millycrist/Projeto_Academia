import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ImageBackground, Modal, Pressable } from 'react-native';
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

      <TouchableOpacity style={styles.headerButton} onPress={() => navigateToPage('form4s')}>
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

  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cep, setCep] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');

  const handleInserir = () => {
    const novoUsuario = {
      id: Math.random().toString(),
      nome,
      email,
      cpf,
      telefone,
      endereco,
      cep,
    };

    setUsuarios((prevUsuarios) => [...prevUsuarios, novoUsuario]);
    alert('Usuário inserido com sucesso!');
    setNome('');
    setEmail('');
    setCpf('');
    setTelefone('');
    setEndereco('');
    setCep('');
  };

  const handleAlterar = () => {
    // Logic for updating user information with selectedUserId
    const updatedUsuarios = usuarios.map((usuario) =>
      usuario.id === selectedUserId
        ? { ...usuario, nome, email, cpf, telefone, endereco, cep }
        : usuario
    );

    setUsuarios(updatedUsuarios);
    alert('Usuário alterado com sucesso!');
    setModalVisible(false);
  };

  const handleExcluir = (id) => {
    setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id !== id));
    alert('Usuário excluído com sucesso!');
  };

  const openModal = (id) => {
    const selectedUser = usuarios.find((user) => user.id === id);
    setSelectedUserId(id);
    setNome(selectedUser.nome);
    setEmail(selectedUser.email);
    setCpf(selectedUser.cpf);
    setTelefone(selectedUser.telefone);
    setEndereco(selectedUser.endereco);
    setCep(selectedUser.cep);
    setModalVisible(true);
  };

  return (
    <ImageBackground source={require('../assets/fundo2.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Matricula</Text>
        <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={(text) => setNome(text)} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} keyboardType="email-address" />
        <TextInputMask style={styles.input} placeholder="CPF" type="cpf" value={cpf} onChangeText={(text) => setCpf(text)} />
        <TextInputMask
          style={styles.input}
          placeholder="Telefone"
          type="cel-phone"
          options={{ maskType: 'BRL', withDDD: true, dddMask: '(99) ' }}
          value={telefone}
          onChangeText={(text) => setTelefone(text)}
          keyboardType="phone-pad"
        />
        <TextInput style={styles.input} placeholder="Endereço" value={endereco} onChangeText={(text) => setEndereco(text)} />
        <TextInputMask style={styles.input} placeholder="CEP" type="zip-code" value={cep} onChangeText={(text) => setCep(text)} />

        <TouchableOpacity style={styles.button} onPress={handleInserir}>
          <Text style={styles.buttonText}>Inserir</Text>
        </TouchableOpacity>

        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.usuarioItem}>
              <Text>{`Nome: ${item.nome}`}</Text>
              <Text>{`Email: ${item.email}`}</Text>
              <Text>{`CPF: ${item.cpf}`}</Text>
              <Text>{`Telefone: ${item.telefone}`}</Text>
              <Text>{`Endereço: ${item.endereco}`}</Text>
              <Text>{`CEP: ${item.cep}`}</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => openModal(item.id)}>
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleExcluir(item.id)}>
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        {/* Editar modal */}
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Editar Usuário</Text>
              <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={(text) => setNome(text)} />
              <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} keyboardType="email-address" />
              <TextInputMask style={styles.input} placeholder="CPF" type="cpf" value={cpf} onChangeText={(text) => setCpf(text)} />
              <TextInputMask
                style={styles.input}
                placeholder="Telefone"
                type="cel-phone"
                options={{ maskType: 'BRL', withDDD: true, dddMask: '(99) ' }}
                value={telefone}
                onChangeText={(text) => setTelefone(text)}
                keyboardType="phone-pad"
              />
              <TextInput style={styles.input} placeholder="Endereço" value={endereco} onChangeText={(text) => setEndereco(text)} />
              <TextInputMask style={styles.input} placeholder="CEP" type="zip-code" value={cep} onChangeText={(text) => setCep(text)} />

              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={[styles.button, styles.editButton]} onPress={handleAlterar}>
                  <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

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
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: '5%', // Use porcentagem
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
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: 'black',
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
  link: {
    color: 'black',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  // Adicione os estilos para o header no final
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: 'black', // Change the color as needed
  },
  deleteButton: {
    backgroundColor: 'black', // Change the color as needed
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default FormularioPage;
