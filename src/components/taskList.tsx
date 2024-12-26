import { List } from '@mui/material';
import { Task } from '@components/task';
import type { TaskInterface } from '@commonTypes/index';

interface TaskListProps {
    tasks: Array<TaskInterface>;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, newText: string) => void;
}

export const TaskList = ({ tasks, onToggle, onDelete, onUpdate }: TaskListProps) => {
    return (
        <List>
            {tasks.map((task) => (
                <Task key={task.id} onUpdate={onUpdate} onToggle={onToggle} onDelete={onDelete} {...task} />
            ))}
        </List>
    );
};
