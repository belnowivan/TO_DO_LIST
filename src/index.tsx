import { createRoot } from 'react-dom/client';
import { App } from '@app/index';
import { fakerRU as faker } from '@faker-js/faker';
import { TaskInterface } from '@commonTypes/index';

const generateTestData = (options = { count: { min: 0, max: 20 } }): Array<TaskInterface> => {
    const generateTask = (): TaskInterface => ({
        id: faker.string.uuid(),
        text: faker.word.verb(),
        completed: faker.datatype.boolean(),
        createdDate: faker.date.anytime(),
    });
    return faker.helpers.multiple(generateTask, options);
};

const container = document.getElementById('root');
if (typeof container === null) {
    console.log('container is null!');
} else {
    console.log('leeets go render!');
    localStorage.setItem('git', JSON.stringify([]));
    const root = createRoot(container!);
    root.render(
        <div>
            <button
                style={{ position: 'sticky', top: '20px' }}
                onClick={() => {
                    localStorage.setItem('TO_DO_LIST', JSON.stringify(generateTestData()));
                    document.location.reload();
                }}>
                Generate
            </button>
            <button
                style={{ position: 'sticky', top: '20px' }}
                onClick={() => {
                    localStorage.setItem('TO_DO_LIST', JSON.stringify([]));
                    document.location.reload();
                }}>
                Clear
            </button>
            <App />
        </div>
    );
}
