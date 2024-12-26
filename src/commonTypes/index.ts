export interface TaskInterface {
    id: string;
    text: string;
    completed: boolean;
    createdDate: Date;
}

export const TaskFiltersType = {
    All: 'All',
    Completed: 'Completed',
    Incomplete: 'Incomplete',
} as const;
