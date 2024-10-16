import React, { useReducer, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASKS':
      return [...state, action.payload];
    case 'TOGGLE_TASKS':
      return state.map((task) =>
        task.id === action.payload ? { ...task, done: !task.done } : task
      );
    case 'REMOVE_TASKS':
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
};

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, dispatch] = useReducer(taskReducer, []);

  const addTask = () => {
    if (task.length > 0) {
      const newTask = { id: Date.now().toString(), title: task, done: false };
      dispatch({ type: 'ADD_TASKS', payload: newTask });
      setTask('');
    } else {
      Alert.alert('Error', 'Task cannot be empty');
    }
  };

  const toggleTask = (taskId) => {
    dispatch({ type: 'TOGGLE_TASKS', payload: taskId });
  };

  const removeTask = (taskId) => {
    dispatch({ type: 'REMOVE_TASKS', payload: taskId });
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => toggleTask(item.id)} style={styles.taskTextContainer}>
        <Text style={item.done ? styles.taskDone : styles.taskText}>
          {item.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => removeTask(item.id)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new..."
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  taskTextContainer: {
    flex: 1,
  },
  removeButton: {
    padding: 10,
  },
  addButton: {
    padding: 15,
    marginLeft: 200,
  },

});