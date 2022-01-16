import React, {useState} from 'react';
import {SafeAreaView, View, Text, TextInput, TouchableOpacity} from 'react-native';
import {css} from './Css';

import firebase from './FirebaseConnection';

export default function Login({changeStatus, navigation}) {

	const [tipo,setTipo] = useState('login');
	const [nome,setNome] = useState('');
	const [email,setEmail] = useState('');
	const [senha,setSenha] = useState('');

	function handleLogin() {
		if (tipo === 'login') {
			const user = firebase.auth().signInWithEmailAndPassword(email,senha).then((user)=>{
				changeStatus(user.user.uid);
			}).catch((erro)=>{
				alert('Não existe nenhum usuário com esta conta')
			})
		} else {
			const user = firebase.auth().createUserWithEmailAndPassword(email,senha).then((user)=>{
				changeStatus(user.user.uid);
			}).catch((erro)=>{
				alert('Ops... parece que houve algum erro ao cadastrar')
			})
		}
	}

	return (
		<SafeAreaView style={css.container} >
			<TextInput
				placeholder="Seu nome: "
				style={tipo === 'login' ? [css.input,css.some] : css.input}
				value={nome}
				onChangeText={(text)=>setNome(text)}
			/>
			<TextInput
				placeholder="Seu e-mail: "
				style={css.input}
				value={email}
				onChangeText={(text)=>setEmail(text)}
				keyboardType='email-address'
			/>
			<TextInput
				placeholder="Sua senha: "
				style={css.input}
				value={senha}
				onChangeText={(text)=>setSenha(text)}
				secureTextEntry={true}
			/>
			<TouchableOpacity style={[css.botao,{backgroundColor: tipo==='login' ? '#3ea6f2' : '#141414'}]} onPress={handleLogin} >
				<Text style={css.btnText} >
					{tipo === 'login' ? 'Acessar' : 'Criar conta'}
				</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={()=>setTipo(tipo => tipo === 'login' ? 'cadastrar' : 'login')} >
				<Text style={{textAlign:'center'}} >
					{tipo === 'login' ? 'Criar uma conta' : 'Já possuo uma conta'}
				</Text>
			</TouchableOpacity>
		</SafeAreaView>
	)
}