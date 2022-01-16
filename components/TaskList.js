import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {css} from './Css';


export default function TaskList({data,deleteItem,navigation,editItem,editStatus}) { 

	return (
		<View style={css.containerList} >
			<TouchableOpacity style={{marginRight:10}} onPress={()=>deleteItem(data.key)} >
				<Text style={{color:'red'}} >Excluir</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={()=>navigation.navigate('Editar task',{
				key:data.key,nome:data.nome,descricao:data.descricao,editItem:editItem
			})} >
				<Text style={{color:'#fff'}}>{data.nome}</Text>
			</TouchableOpacity>
			<TouchableOpacity style={css.status} onPress={()=>editStatus(data.key,data.pendente)} >
				<Text style={data.pendente ? {color:'red'} : {color:'lightgreen'} }>
					{data.pendente ? 'Pendente' : 'Finalizada' }
				</Text>
			</TouchableOpacity>
		</View>
	)
}
