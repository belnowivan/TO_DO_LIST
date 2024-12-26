import { faker } from '@faker-js/faker';
import { useEffect, useMemo, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { TaskList, TaskCreator, TaskFilter } from '@components/index';
import { TaskFiltersType, TaskInterface } from '@commonTypes/index';

export const TaskListPage = () => {
    const [toDoList, setToDoList] = useState<Array<TaskInterface>>([]);
    const [filter, setFilter] = useState<keyof typeof TaskFiltersType>(TaskFiltersType.All);

    useEffect(() => {
        try {
            const toDoListStr = localStorage.getItem('TO_DO_LIST');
            const toDoList = JSON.parse(toDoListStr) as Array<TaskInterface>;
            setToDoList(toDoList);
        } catch (e) {
            setToDoList([]);
            console.error(e);
        }
    }, []);

    const onDelete = (id: TaskInterface['id']) => {
        const newToDoList = toDoList.filter((task) => task.id !== id);
        localStorage.setItem('TO_DO_LIST', JSON.stringify(newToDoList));
        setToDoList(newToDoList);
    };

    const onUpdate = (id: TaskInterface['id'], newText: TaskInterface['text']) => {
        const newToDoList = toDoList.map((task) => ({ ...task, text: task.id === id ? newText : task.text }));
        localStorage.setItem('TO_DO_LIST', JSON.stringify(newToDoList));
        setToDoList(newToDoList);
    };

    const onToggle = (id: TaskInterface['id']) => {
        const newToDoList = toDoList.map((task) => ({
            ...task,
            completed: task.id === id ? !task.completed : task.completed,
        }));
        localStorage.setItem('TO_DO_LIST', JSON.stringify(newToDoList));
        setToDoList(newToDoList);
    };

    const handleAddTask = (text: TaskInterface['text']) => {
        if (text.trim() === '') return;

        const newTask: TaskInterface = {
            id: faker.string.uuid(),
            text: text,
            completed: false,
            createdDate: new Date(),
        };

        const updatedToDoList = [...toDoList, newTask];
        localStorage.setItem('TO_DO_LIST', JSON.stringify(updatedToDoList));
        setToDoList(updatedToDoList);
    };

    const filteredToDoList = useMemo(() => {
        return toDoList.filter((task) => {
            if (filter === TaskFiltersType.Completed) {
                return task.completed;
            }
            if (filter === TaskFiltersType.Incomplete) {
                return !task.completed;
            }
            return true;
        });
    }, [toDoList, filter]);

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 3,
                    backgroundColor: '#f4f6f9',
                    borderRadius: 2,
                    boxShadow: 3,
                    maxWidth: 600,
                    margin: '20px auto',
                }}>
                <Typography variant='h5' sx={{ marginBottom: 2, color: '#333' }}>
                    Мои задачи
                </Typography>

                <TaskCreator onCreate={handleAddTask} />

                <TaskFilter onFilterChange={setFilter} currentFilter={filter} />

                <Paper
                    sx={{
                        width: '100%',
                        padding: 2,
                        backgroundColor: 'white',
                        borderRadius: 2,
                        boxShadow: 1,
                        marginTop: 4,
                    }}>
                    <TaskList
                        tasks={filteredToDoList}
                        onToggle={(id: TaskInterface['id']) => onToggle(id)}
                        onDelete={(id: TaskInterface['id']) => onDelete(id)}
                        onUpdate={(id: TaskInterface['id'], text: TaskInterface['text']) => onUpdate(id, text)}
                    />
                </Paper>
            </Box>
        </div>
    );
};
