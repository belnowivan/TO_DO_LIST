import { Button, ButtonGroup } from '@mui/material';
import { TaskFiltersType } from '@commonTypes/index';

interface TaskFilterProps {
    onFilterChange: (filter: keyof typeof TaskFiltersType) => void;
    currentFilter: keyof typeof TaskFiltersType;
}

export const TaskFilter = ({ onFilterChange, currentFilter }: TaskFilterProps) => {
    return (
        <ButtonGroup variant='contained' aria-label='outlined primary button group'>
            <Button
                disabled={currentFilter === TaskFiltersType.All}
                onClick={() => onFilterChange(TaskFiltersType.All)}>
                Все
            </Button>
            <Button
                disabled={currentFilter === TaskFiltersType.Completed}
                onClick={() => onFilterChange(TaskFiltersType.Completed)}>
                Завершенные
            </Button>
            <Button
                disabled={currentFilter === TaskFiltersType.Incomplete}
                onClick={() => onFilterChange(TaskFiltersType.Incomplete)}>
                Незавершенные
            </Button>
        </ButtonGroup>
    );
};
