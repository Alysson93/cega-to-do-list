import React, {useState, useEffect} from 'react';
import {View, Text, Button, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {css} from './Css'
import firebase from './FirebaseConnection';


export default function CriaTask({navigation,route}) {

	//atributos das tasks
	const [nome,setNome] = useState('');
	const [descricao,setDescricao] =useState('');
  const [date, setDate] = useState(new Date());
  //


  //configuração de hora e data
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  //
	

  //função para adicionar tasks
	function handleAdd() {
		if (nome === '') {
			alert('A task tem que ter um título')
		} else {
			let tarefas = firebase.database().ref('tarefas').child(route.params.user);
			let chave = tarefas.push().key;
			tarefas.child(chave).set({
				nome: nome,
				descricao: descricao,
				date: date,
				pendente: true
			}).then(()=>{
				const dados = {
					key: chave,
					nome: nome,
					descricao: descricao,
					pendente: true,
					date: date
				};
				route.params.setTasks(oldTasks=>[...oldTasks,dados]);
				navigation.navigate('Cega To do list',{dados:route.params.tasks});
			})
		}
	}

	return (
		<View style={css.container} >
			<Text>Título:</Text>
			<TextInput style={css.input} value={nome} onChangeText={(text)=>setNome(text)} />
			<Text>Descrição:</Text>
			<TextInput style={css.inputText} multiline = {true} numberOfLines = {4} value={descricao} onChangeText={(text)=>setDescricao(text)} />
		    <View style={css.botao2} >
		        <TouchableOpacity style={[css.botao,css.botaoHalf]} onPress={showDatepicker}>
		        	<Text style={css.btnText} >Data</Text>
		        </TouchableOpacity>     
		        <TouchableOpacity style={[css.botao,css.botaoHalf]} onPress={showTimepicker}>
		        	<Text style={css.btnText} >Hora</Text>
		        </TouchableOpacity>
		      {show && (
		        <DateTimePicker
		          testID="dateTimePicker"
		          value={date}
		          mode={mode}
		          is24Hour={true}
		          display="default"
		          onChange={onChange}
		        />
		      )}
		    </View>
			<TouchableOpacity style={css.botao} onPress={()=>handleAdd()}>
				<Text style={css.btnText} >Adicionar task</Text>
			</TouchableOpacity>
		</View>
	)
}