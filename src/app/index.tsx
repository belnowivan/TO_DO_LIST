import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskListPage } from '@pages/index';

export const App = () => {
    return (
        <BrowserRouter basename='/TO_DO_LIST'>
            <Routes>
                <Route path='/' element={<TaskListPage />} />
            </Routes>
        </BrowserRouter>
    );
};
