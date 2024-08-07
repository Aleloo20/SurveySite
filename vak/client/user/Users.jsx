import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import { list, create } from './api-user.js'; // Assuming create function exists in api-user.js
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import ArrowForward from '@material-ui/icons/ArrowForward';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    card: {
        // Define your card styles here
    },
    textField: {
        margin: theme.spacing(1),
        width: '100%',
    },
    error: {
        // Define your error icon styles here
    },
    submit: {
        margin: theme.spacing(1),
    },
    title: {
        // Define your title styles here
    },
    root: {
        padding: theme.spacing(3),
    },
}));

export default function Users() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        list(signal).then((data) => {
            if (data && data.error) {
                setError(data.error);
            } else {
                setUsers(data);
            }
        });
        return function cleanup() {
            abortController.abort();
        };
    }, []);

    const clickSubmit = () => {
        const user = { name: name || undefined, email: email || undefined, password: password || undefined };
        create(user).then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setUsers([...users, data]);
                setName('');
                setEmail('');
                setPassword('');
                setProfile(data); // Save the user to profile
            }
        });
    };

    const classes = useStyles();
    return (
        <Paper className={classes.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                All Users
            </Typography>
            <List dense>
                {users.map((item, i) => (
                    <Link component={RouterLink} to={"/user/" + item._id} key={i}>
                        <ListItem button>
                            <ListItemAvatar>
                                <Avatar />
                            </ListItemAvatar>
                            <ListItemText primary={item.name} />
                            <ListItemSecondaryAction>
                                <IconButton>
                                    <ArrowForward />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Card>
                <Typography variant="h6" className={classes.title}>
                    Add User
                </Typography>
                <TextField
                    id="name"
                    label="Name"
                    className={classes.textField}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    margin="normal"
                />
                <TextField
                    id="email"
                    label="Email"
                    className={classes.textField}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    className={classes.textField}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                />
                {error && (
                    <Typography variant="body2" color="error" className={classes.error}>
                        {error}
                    </Typography>
                )}
                <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>
                    Submit
                </Button>
            </Card>
            {profile && (
                <Card>
                    <Typography variant="h6" className={classes.title}>
                        User Profile
                    </Typography>
                    <Typography variant="body1">Name: {profile.name}</Typography>
                    <Typography variant="body1">Email: {profile.email}</Typography>
                </Card>
            )}
        </Paper>
    );
}
