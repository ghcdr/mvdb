import { render, screen } from '@testing-library/react';
import { App } from './contents/Main';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';


test('Test home', () => {
    const history = createMemoryHistory()
    history.push('/home');
    render(
        <Router history={history}>
            <App />
        </Router>
    );
    screen.debug()
    //const loading = screen.getByText('Loading...');
    //expect(loading).toBeInTheDocument();
});
