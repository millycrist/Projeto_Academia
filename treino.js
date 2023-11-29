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

const TreinoPage = () => {
  const navigation = useNavigation();

  const [treinos, setTreinos] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [atividade, setAtividade] = useState('');
  const [completed, setCompleted] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const handleAdicionarAtividade = () => {
    if (!selectedDay || !atividade) {
      alert('Por favor, selecione um dia e insira uma atividade.');
      return;
    }

    if (editMode && editItemId) {
      // Edit existing workout
      const updatedTreinos = treinos.map((treino) =>
        treino.id === editItemId ? { ...treino, dia: selectedDay, atividade, completed } : treino
      );
      setTreinos(updatedTreinos);
      setEditMode(false);
      setEditItemId(null);
    } else {
      // Add new workout
      const novoTreino = {
        id: Math.random().toString(),
        dia: selectedDay,
        atividade,
        completed,
      };

      setTreinos((prevTreinos) => [...prevTreinos, novoTreino]);
    }

    setAtividade('');
    setSelectedDay('');
    setCompleted(false);
  };

  const handleExcluirAtividade = (id) => {
    setTreinos((prevTreinos) => prevTreinos.filter((treino) => treino.id !== id));
  };

  const handleEditarAtividade = (id) => {
    const treinoToEdit = treinos.find((treino) => treino.id === id);
    if (treinoToEdit) {
      setSelectedDay(treinoToEdit.dia);
      setAtividade(treinoToEdit.atividade);
      setCompleted(treinoToEdit.completed || false);
      setEditMode(true);
      setEditItemId(id);
    }
  };

  const days = ['Seg', 'Ter', 'Quar', 'Quin', 'Sex', 'Sáb', 'Dom'];

  return (
    <ImageBackground
      source={require('../assets/fundo2.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Treino Semanal</Text>

        <View style={styles.dayPicker}>
          {days.map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayButton,
                selectedDay === day ? styles.selectedDayButton : null,
              ]}
              onPress={() => setSelectedDay(day)}
            >
              <Text style={styles.dayButtonText}>{day}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Atividade"
          value={atividade}
          onChangeText={(text) => setAtividade(text)}
        />

        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxLabel}>Concluído</Text>
          <TouchableOpacity
            style={[styles.checkbox, completed ? styles.checkboxChecked : null]}
            onPress={() => setCompleted(!completed)}
          ></TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.adicionarButton]}
            onPress={handleAdicionarAtividade}
          >
            <Text style={styles.buttonText}>
              {editMode ? 'Editar Atividade' : 'Adicionar Atividade'}
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={treinos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.treinoItem}>
              <Text>{`Dia: ${item.dia}`}</Text>
              <Text>{`Atividade: ${item.atividade}`}</Text>
              <Text>{`Concluído: ${item.completed ? 'Sim' : 'Não'}`}</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.excluirButton]}
                  onPress={() => handleExcluirAtividade(item.id)}
                >
                  <Text style={[styles.link, { color: 'white' }]}>Excluir</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.editarButton]}
                  onPress={() => handleEditarAtividade(item.id)}
                >
                  <Text style={[styles.link, { color: 'white' }]}>Editar</Text>
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: '40%',
    color: 'white',
    textAlign: 'center',
  },
  dayPicker: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  dayButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedDayButton: {
    backgroundColor: 'black',
    borderColor: 'black',
  },
  dayButtonText: {
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    color: 'white',
    marginRight: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'white',
  },
  checkboxChecked: {
    backgroundColor: 'black',
    borderColor: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  adicionarButton: {
    flex: 1,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  treinoItem: {
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
  // Estilos para o header no final
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
    marginTop: 10,
  },
  excluirButton: {
    backgroundColor: 'black',
    flex: 1,
    marginRight: 5,
  },
  editarButton: {
    backgroundColor: 'black',
    flex: 1,
    marginLeft: 5,
  },
});

export default TreinoPage;
