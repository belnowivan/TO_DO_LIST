import { Checkbox, IconButton, ListItem, ListItemText, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import type { TaskInterface } from '@commonTypes/index';

interface TaskProps extends TaskInterface {
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, newText: string) => void;
}

export const Task = ({ onToggle, onDelete, onUpdate, ...task }: TaskProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.text);

    const handleSave = () => {
        if (editedText.trim() === '') {
            setEditedText(task.text);
            return;
        }
        onUpdate(task.id, editedText);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedText(task.text);
        setIsEditing(false);
    };

    return (
        <ListItem
            secondaryAction={
                <IconButton edge='end' aria-label='delete' onClick={() => onDelete(task.id)}>
                    <DeleteIcon />
                </IconButton>
            }>
            <Checkbox
                edge='start'
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                tabIndex={-1}
                disableRipple
            />
            {isEditing ? (
                <TextField
                    error={!editedText.trim()}
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSave();
                        if (e.key === 'Escape') handleCancel();
                    }}
                    autoFocus
                    fullWidth
                    variant='standard'
                />
            ) : (
                <ListItemText
                    primary={editedText}
                    style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                    onClick={() => setIsEditing(true)}
                />
            )}
        </ListItem>
    );
};
