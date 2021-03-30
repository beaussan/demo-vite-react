import React from 'react';
import { CheckTodo } from './CheckTodo';
import { motion } from 'framer-motion';
import { Todo } from '../todo.model';

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export const TodoItem = ({
  todo,
  toggleIsDone,
}: {
  todo: Todo;
  toggleIsDone: () => void;
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      onClick={toggleIsDone}
      className="flex hover:bg-gray-50 hover:shadow-lg transition-all duration-300 cursor-pointer p-2 rounded-lg"
    >
      <span className="flex-1">{todo.title}</span>
      <div>
        <CheckTodo checked={todo.isDone} />
      </div>
    </motion.div>
  );
};
