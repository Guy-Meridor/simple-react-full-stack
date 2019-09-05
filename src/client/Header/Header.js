import React from 'react';
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Links from './Links.json'
const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#1976d2',
        '& a': {
            textDecoration: 'none',
            color: 'white',
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        }
    },
    rightToolbar: {
        marginLeft: 'auto',
        '& a': {
            marginLeft: '2em',
        }
    },
    logo: {
        height: '50px',
        width: '50px'
    }

}));


export default function Header() {
    const classes = useStyles();
    return (
            <AppBar className={classes.root} position="static">
                <Toolbar>
                    <Link to='/'>
                        <img className={classes.logo} src="/assets/logo.png"></img>
                    </Link>
                    <Link to='/'>
                        <Typography variant="h6">
                            Song Analyzer
                        </Typography>
                    </Link>
                    <section className={classes.rightToolbar}>
                        {Links.map(link => (
                            <Link key={link.route} to={link.route}>
                                {link.text}
                            </Link>
                        ))}
                    </section>
                </Toolbar>
            </AppBar>
    );
}