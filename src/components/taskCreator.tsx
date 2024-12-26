import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import type { TaskInterface } from '@commonTypes/index';

interface TaskCreatorProps {
    onCreate: (text: TaskInterface['text']) => void;
}

export const TaskCreator = ({ onCreate }: TaskCreatorProps) => {
    const [newTaskText, setNewTaskText] = useState('');

    return (
        <Box sx={{ display: 'flex', width: '100%', marginBottom: 2 }}>
            <TextField
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                label='Новая задача'
                variant='outlined'
                fullWidth
            />
            <Button
                variant='contained'
                color='primary'
                disabled={!newTaskText}
                sx={{ marginLeft: 2 }}
                onClick={() => {
                    onCreate(newTaskText);
                    setNewTaskText('');
                }}>
                Добавить
            </Button>
        </Box>
    );
};
