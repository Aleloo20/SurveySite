import React, { useState, useEffect } from 'react';
import {
    Container, Typography, TextField, Button, Grid, List, ListItem,
    ListItemText, ListItemSecondaryAction, IconButton, Tabs, Tab, Box, MenuItem, AppBar, Toolbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';

const mockSurveys = [
    {
        id: 1,
        title: 'Sample Survey 1',
        description: 'This is a sample survey.',
        dueDate: '2021-11-18',
        questions: [{ questionText: 'Sample Question 1', questionType: 'text' }]
    },
    {
        id: 2,
        title: 'Sample Survey 2',
        description: 'This is another sample survey.',
        dueDate: '2021-11-26',
        questions: [{ questionText: 'Sample Question 2', questionType: 'multiple choice', options: ['Option 1', 'Option 2'] }]
    }
];

const useStyles = () => ({
    tabContent: {
        padding: '20px',
    },
    button: {
        marginTop: '20px',
    },
    table: {
        minWidth: 650,
    },
    formControl: {
        margin: '10px',
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: '10px',
    },
});

export default function Survey() {
    const [surveys, setSurveys] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [questions, setQuestions] = useState([{ questionText: '', questionType: 'text', options: [] }]);
    const [editingSurvey, setEditingSurvey] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [template, setTemplate] = useState('MCQ Survey');
    const navigate = useNavigate();
    const classes = useStyles();

    useEffect(() => {
        // Simulate fetching surveys from a server
        setSurveys(mockSurveys);
    }, []);

    const handleQuestionChange = (index, field, event) => {
        const newQuestions = questions.slice();
        newQuestions[index][field] = event.target.value;
        setQuestions(newQuestions);
    };

    const handleAddOption = (index) => {
        const newQuestions = questions.slice();
        newQuestions[index].options = [...newQuestions[index].options, ''];
        setQuestions(newQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, event) => {
        const newQuestions = questions.slice();
        newQuestions[questionIndex].options[optionIndex] = event.target.value;
        setQuestions(newQuestions);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { questionText: '', questionType: 'text', options: [] }]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const survey = { title, description, dueDate, questions };

        if (editingSurvey) {
            // Update survey
            const updatedSurveys = surveys.map((s) => (s.id === editingSurvey.id ? { ...editingSurvey, title, description, dueDate, questions } : s));
            setSurveys(updatedSurveys);
            setEditingSurvey(null);
        } else {
            // Create new survey
            survey.id = surveys.length ? surveys[surveys.length - 1].id + 1 : 1;
            setSurveys([...surveys, survey]);
        }

        setTitle('');
        setDescription('');
        setDueDate('');
        setQuestions([{ questionText: '', questionType: 'text', options: [] }]);
        setTabIndex(0); // Switch back to the survey list tab
    };

    const handleEdit = (survey) => {
        setEditingSurvey(survey);
        setTitle(survey.title);
        setDescription(survey.description);
        setDueDate(survey.dueDate);
        setQuestions(survey.questions);
        setTabIndex(1); // Switch to the form tab
    };

    const handleDelete = (id) => {
        setSurveys(surveys.filter((survey) => survey.id !== id));
    };

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                My Surveys
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setTabIndex(1)} className={classes.button}>
                Add Survey
            </Button>
            {tabIndex === 0 && (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Due Date</TableCell>
                                <TableCell>Update</TableCell>
                                <TableCell>Delete</TableCell>
                                <TableCell>Show Result</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {surveys.map((survey) => (
                                <TableRow key={survey.id}>
                                    <TableCell component="th" scope="row">
                                        {survey.title}
                                    </TableCell>
                                    <TableCell>{survey.description}</TableCell>
                                    <TableCell>{new Date(survey.dueDate).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => handleEdit(survey)}>
                                            Update
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="secondary" onClick={() => handleDelete(survey.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="default">
                                            Show Result
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {tabIndex === 1 && (
                <Box className={classes.tabContent}>
                    <Typography variant="h5" component="h2">
                        Create MCQ Survey
                    </Typography>
                    <Box display="flex" marginBottom={2}>
                        <Button variant="contained" color={template === 'MCQ Survey' ? 'primary' : 'default'} onClick={() => setTemplate('MCQ Survey')}>
                            MCQ Survey
                        </Button>
                        <Button variant="contained" color={template === 'True/False Survey' ? 'primary' : 'default'} onClick={() => setTemplate('True/False Survey')}>
                            True/False Survey
                        </Button>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Survey Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            label="Due Date"
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                            multiline
                            rows={4}
                        />
                        <Typography variant="h6" component="h2" gutterBottom>
                            Questions
                        </Typography>
                        {questions.map((question, index) => (
                            <Box key={index} marginBottom={2}>
                                <TextField
                                    label={`Question ${index + 1}`}
                                    value={question.questionText}
                                    onChange={(event) => handleQuestionChange(index, 'questionText', event)}
                                    fullWidth
                                    required
                                    margin="normal"
                                />
                                <TextField
                                    select
                                    label="Question Type"
                                    value={question.questionType}
                                    onChange={(event) => handleQuestionChange(index, 'questionType', event)}
                                    fullWidth
                                    margin="normal"
                                >
                                    <MenuItem value="text">Text</MenuItem>
                                    <MenuItem value="multiple choice">Multiple Choice</MenuItem>
                                </TextField>
                                {question.questionType === 'multiple choice' && (
                                    <Box>
                                        {question.options.map((option, optionIndex) => (
                                            <TextField
                                                key={optionIndex}
                                                label={`Option ${optionIndex + 1}`}
                                                value={option}
                                                onChange={(event) => handleOptionChange(index, optionIndex, event)}
                                                fullWidth
                                                required
                                                margin="normal"
                                            />
                                        ))}
                                        <Button onClick={() => handleAddOption(index)} color="primary">
                                            Add Option
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        ))}
                        <Button onClick={handleAddQuestion} color="primary" className={classes.button}>
                            Add Question
                        </Button>
                        <Grid container justify="flex-end" style={{ marginTop: '20px' }}>
                            <Button type="submit" variant="contained" color="primary" className={classes.button}>
                                {editingSurvey ? 'Update' : 'Publish'}
                            </Button>
                            <Button variant="contained" color="secondary" onClick={() => setTabIndex(0)} className={classes.button}>
                                Cancel
                            </Button>
                        </Grid>
                    </form>
                </Box>
            )}
        </Container>
    );
}







