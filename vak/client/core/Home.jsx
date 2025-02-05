import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import logo from './../assets/images/logo.jpg';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5),
    },
    title: {
        padding: theme.spacing(3, 2.5, 2),
        color: theme.palette.openTitle,
    },
    media: {
        minHeight: 400,
    },
}));
export default function Home() {
    const classes = useStyles()
    return (
        <Card className={classes.card}>

            <Typography variant="h4" className={classes.title}>Home Page</Typography>
            <CardMedia className={classes.media}
                image={logo} title="Logo" />
            <CardContent>
                <Typography variant="body2" component="p">
                    Welcome to VAK Dynamic Designs home page.
                </Typography>
            </CardContent>
        </Card>
    )
}

