import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../img/logo.png';
import MainMenu from './MainMenu';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	logo: {
		width: '300px'
	}
}));

export default function TopBar() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<MainMenu />
					<img src={logo} className={classes.logo} alt="logo cliente" />
				</Toolbar>
			</AppBar>
		</div>
	);
}