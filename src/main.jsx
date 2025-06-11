import { createRoot } from 'react-dom/client';
import App from './App';
import { TodoListContextWrapper } from './context/todoListContext';
import './index.css';

createRoot(document.getElementById('root')).render(
  <TodoListContextWrapper>
    <App />
  </TodoListContextWrapper>
);
