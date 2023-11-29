import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Modal,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
 
const HeaderFinal = () => {
  const navigation = useNavigation();

  const navigateToPage = (pageName) => { 
    navigation.navigate(pageName);
  };
 
  return (
    <View style={styles.headerContainer}>
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

    </View>
  );
};

const EscolherPlanoForm = () => {
  const [planoSelecionado, setPlanoSelecionado] = useState(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editedPlano, setEditedPlano] = useState(null);

  const planos = [
    { id: 1, nome: 'Plano Básico', valor: 50 },
    { id: 2, nome: 'Plano Intermediário', valor: 75 },
    { id: 3, nome: 'Plano Avançado', valor: 100 },
  ];

  const handlePlanoSelecionado = (plano) => {
    setPlanoSelecionado(plano);
  };

  const handleEditPlano = () => {
    setEditModalVisible(true);
    setEditedPlano(planoSelecionado);
  };

  const handleSaveEdit = () => {
    setEditModalVisible(false);
  };

  const handleDeletePlano = () => {
    setPlanoSelecionado(null);
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formLabel}>Escolha seu plano:</Text>
      {planos.map((plano) => (
        <TouchableOpacity
          key={plano.id}
          style={[
            styles.planoButton,
            planoSelecionado === plano ? styles.selectedPlanoButton : null,
          ]}
          onPress={() => handlePlanoSelecionado(plano)}
        >
          <Text style={styles.planoNome}>{plano.nome}</Text>
          <Text style={styles.planoValor}>R$ {plano.valor.toFixed(2)}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.button} onPress={() => alert(`Plano escolhido: ${planoSelecionado?.nome}`)}>
        <Text style={styles.buttonText}>Selecionar Plano</Text>
      </TouchableOpacity>

      {planoSelecionado && (
        <View style={styles.planoSelecionadoContainer}>
          <Text style={styles.planoSelecionadoLabel}>Plano Selecionado:</Text>
          <Text style={styles.planoSelecionadoNome}>{planoSelecionado.nome}</Text>
          <Text style={styles.planoSelecionadoValor}>R$ {planoSelecionado.valor.toFixed(2)}</Text>

          <TouchableOpacity style={styles.editButton} onPress={handleEditPlano}>
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePlano}>
            <Text style={styles.deleteButtonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        visible={isEditModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Editar Plano</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Nome do Plano"
            value={editedPlano?.nome}
            onChangeText={(text) => setEditedPlano((prev) => ({ ...prev, nome: text }))}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Valor do Plano"
            value={editedPlano?.valor.toString()}
            onChangeText={(text) => setEditedPlano((prev) => ({ ...prev, valor: parseFloat(text) }))}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.modalButton} onPress={handleSaveEdit}>
            <Text style={styles.modalButtonText}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={() => setEditModalVisible(false)}>
            <Text style={styles.modalButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const PlanoPage = () => {
  return (
    <ImageBackground
      source={require('../assets/fundo2.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Escolha seu Plano de Academia</Text>

        {/* Adicione o Formulário para Escolher o Plano */}
        <EscolherPlanoForm />
      </View>

      {/* Adicione o Header no Final */}
      <HeaderFinal />
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
    padding: '5%', // Use porcentagem para tornar o layout proporcional
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: '5%', // Use porcentagem
    color: 'white',
    textAlign: 'center',
  },
  headerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButtonText: {
    color: 'white',
    marginLeft: 1,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '5%', // Use porcentagem
    borderRadius: 10,
    marginBottom: '5%', // Use porcentagem
  },
  formLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: '3%', // Use porcentagem
  },
  planoButton: {
    padding: '2%', // Use porcentagem
    marginVertical: '1%', // Use porcentagem
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedPlanoButton: {
    backgroundColor: '#00f',
  },
  planoNome: {
    fontSize: 16,
  },
  planoValor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'black',
    padding: '2%', // Use porcentagem
    borderRadius: 5,
    marginTop: '2%', // Use porcentagem
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  planoSelecionadoContainer: {
    marginTop: '5%', // Use porcentagem
    padding: '2%', // Use porcentagem
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  planoSelecionadoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  planoSelecionadoNome: {
    fontSize: 14,
  },
  planoSelecionadoValor: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: 'black',
    padding: '2%', // Use porcentagem
    borderRadius: 5,
    marginTop: '2%', // Use porcentagem
  },
  editButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: 'black',
    padding: '2%', // Use porcentagem
    borderRadius: 5,
    marginTop: '2%', // Use porcentagem
  },
  deleteButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '5%', // Use porcentagem
    color: 'white',
  },
  modalInput: {
    backgroundColor: 'white',
    padding: '2%', // Use porcentagem
    borderRadius: 5,
    marginBottom: '3%', // Use porcentagem
    width: '80%',
  },
  modalButton: {
    backgroundColor: 'black',
    padding: '2%', // Use porcentagem
    borderRadius: 5,
    marginTop: '2%', // Use porcentagem
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default PlanoPage;
