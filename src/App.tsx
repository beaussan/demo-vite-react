import React, { useEffect, useState } from 'react';
import { Card } from './components/Card';
import { TodoItem } from './components/TodoItem';
import { motion, AnimatePresence } from 'framer-motion';
import { TodoInput } from './components/TodoInput';
import { Provider as UrqlProvider } from 'urql';
import { distinctUntilChanged } from 'rxjs/operators';
import { correctToken$ } from './services/TokenService';
import { createAnonymousClient, createAuthClient } from './services/urqlClient';
import { useObservable } from './hooks/useObservable';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
    },
  },
};

function ClientProvider(props: React.PropsWithChildren<{}>) {
  const token = useObservable(
    correctToken$.pipe(distinctUntilChanged((prev, curr) => prev === curr)),
  );

  const [urqlClient, setUrqlClient] = useState(createAnonymousClient());
  const [isAnonymousClient, setIsAnonymousClient] = useState(true);

  console.log('TOKEN CLIENT PROVIDER : ', token);
  useEffect(() => {
    const hasNoToken = token === undefined || token === null;
    if (!hasNoToken && isAnonymousClient) {
      setUrqlClient(createAuthClient());
      setIsAnonymousClient(false);
    }
    if (hasNoToken && !isAnonymousClient) {
      setUrqlClient(createAnonymousClient());
      setIsAnonymousClient(true);
    }
  }, [isAnonymousClient, token]);

  return <UrqlProvider value={urqlClient}>{props.children}</UrqlProvider>;
}

function App() {
  const [todos, setTodos] = useState([
    { title: 'My first todo !', isDone: false, id: 0 },
    { title: 'My first todo 1', isDone: true, id: 1 },
    { title: 'My first todo 2', isDone: false, id: 2 },
    { title: 'My first todo 3', isDone: false, id: 3 },
  ]);

  const toggleTodo = (todoId: number) => {
    setTodos((oldTodos) =>
      oldTodos.map((item) => {
        if (item.id === todoId) {
          return {
            ...item,
            isDone: !item.isDone,
          };
        }
        return item;
      }),
    );
  };

  const addTodo = (newTodoName: string) => {
    setTodos((oldTodos) => {
      const length = oldTodos.length;
      return [
        ...oldTodos,
        {
          title: newTodoName,
          isDone: false,
          id: length,
        },
      ];
    });
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center p-4">
      <Card>
        <div className="font-bold text-2xl mb-8">My todos</div>
        <AnimatePresence>
          <motion.div
            className="space-y-2"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {todos.map((todo) => (
              <TodoItem
                toggleIsDone={() => toggleTodo(todo.id)}
                todo={todo}
                key={todo.id}
              />
            ))}
            <TodoInput addTodo={addTodo} />
          </motion.div>
        </AnimatePresence>
      </Card>
    </div>
  );
}

function AppWrapper() {
  return (
    <ClientProvider>
      <App />
    </ClientProvider>
  );
}

export default AppWrapper;
