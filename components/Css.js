import {StyleSheet} from 'react-native';

const css = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 25,
		paddingHorizontal: 10,
		backgroundColor: '#f2fcfc'
	},botao: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 45,
		marginBottom: 10,
		backgroundColor: '#000',
		borderRadius: 4,
		padding: 10
	}, btnText: {
		color: '#fff',
		fontSize: 17
	}, input: {
		marginBottom: 10,
		backgroundColor: '#fff',
		borderRadius: 4,
		height: 45,
		padding: 10,
		borderWidth: 1,
		borderColor: '#141414'
	}, inputText: {
		marginBottom: 10,
		backgroundColor: '#fff',
		borderRadius: 4,
		height: 180,
		padding: 10,
		borderWidth: 1,
		borderColor: '#141414'
	},some: {
		display: 'none'
	},containerList: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#121212',
		alignItems: 'center',
		marginBottom: 10,
		padding: 10,
		borderRadius: 4
	}, botao2: {
		flex: 1,
		flexDirection: 'row',		
	}, botaoHalf: {
		width: '50%',
		backgroundColor: '#3ea6f2'
	},status: {
		position: 'absolute',
		right: 10
	}
});

export {css};