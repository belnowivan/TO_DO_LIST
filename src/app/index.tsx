import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskListPage } from '@pages/index';

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<TaskListPage />} />
            </Routes>
        </BrowserRouter>
    );
};
