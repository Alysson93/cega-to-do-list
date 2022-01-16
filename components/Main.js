import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {css} from './Css'
import firebase from './FirebaseConnection';
import Login from './Login';
import TaskList from './TaskList';

export default function Main({navigation,route}) {

	const [user,setUser] = useState(null);
	const [tasks,setTasks] = useState([]);


	useEffect(()=>{
		function getUser() {
			if(!user) {
				return;
			}
			firebase.database().ref('tarefas').child(user).once('value',(snapshot)=>{
				setTasks([]);
				snapshot?.forEach((childItem)=>{
					let data = {
						key: childItem.key,
						nome: childItem.val().nome,
						descricao: childItem.val().descricao,
						pendente: childItem.val().pendente
					}
					setTasks(oldTasks => [...oldTasks,data]);
				});
			});
		}
		getUser();
	},[user]);


	//função para editar task
  	function handleEdit(key,nome,descricao) {
  		firebase.database().ref('tarefas').child(user).child(key).update({
  			nome: nome,
  			descricao: descricao
  		}).then(()=>{
  			const taskIndex = tasks.findIndex(item=>item.key === key);
  			let taskClone = tasks;
  			taskClone[taskIndex].nome = nome;
  			taskClone[taskIndex].descricao = descricao;
  			setTasks([...taskClone]);
  			navigation.navigate("Cega To do list");
  		})
  	} 

	//função para editar status da task
  	function handleStatus(key,pendente) {
  		firebase.database().ref('tarefas').child(user).child(key).update({
  			pendente: !(pendente)
  		}).then(()=>{
  			const taskIndex = tasks.findIndex(item=>item.key === key);
  			let taskClone = tasks;
  			taskClone[taskIndex].pendente = !(pendente);
  			setTasks([...taskClone]);
  			console.log(pendente);
  			navigation.navigate("Cega To do list");
  		})
  	} 


	//função para deletar task
	function handleDelete(key) {
		firebase.database().ref('tarefas').child(user).child(key).remove().then(()=>{
			const findTasks = tasks.filter(item=>item.key !== key);
			setTasks(findTasks);
		})
	}


	if (!user) {
		return <Login changeStatus={(user)=>setUser(user)} />
	}
	return (
		<View style={css.container} >
			<TouchableOpacity style={[css.botao,{backgroundColor:'#3ea6f2'}]} onPress={()=>navigation.navigate('Criar task',{user:user,setUser:setUser,tasks:tasks,setTasks:setTasks})} >
				<Text style={css.btnText} >Crie uma nova task</Text>
			</TouchableOpacity>
			<FlatList
				data={tasks}
				keyExtractor={(item)=>item.key}
				renderItem={({item})=>(
					<TaskList data={item} deleteItem={handleDelete} navigation={navigation} editItem={handleEdit} editStatus={handleStatus} />
				)}
			/>
		</View>
	)
}