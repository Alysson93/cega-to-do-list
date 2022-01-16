import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {css} from './Css'
import firebase from './FirebaseConnection';

export default function EditaTask({navigation,route}) {

	//atributos da Task
	const [key,setKey] = useState(route.params.key)
	const [nome,setNome] = useState(route.params.nome);
	const [descricao,setDescricao] = useState(route.params.descricao)
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
			<TouchableOpacity style={css.botao} onPress={()=>route.params.editItem(key,nome,descricao)} >
				<Text style={css.btnText} >Sair e salvar alterações</Text>
			</TouchableOpacity>
			
		</View>
	)
}