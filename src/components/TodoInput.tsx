import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Input } from './Input';

const NewTodoSchema = Yup.object().shape({
  title: Yup.string()
    .required('This is required !')
    .max(50, 'Too long')
    .min(2, 'Too short'),
});

export const TodoInput = ({
  addTodo,
}: {
  addTodo: (title: string) => void;
}) => {
  return (
    <Formik
      initialValues={{ title: '' }}
      validationSchema={NewTodoSchema}
      onSubmit={(values, formikHelpers) => {
        addTodo(values.title);
        formikHelpers.resetForm();
      }}
    >
      {({}) => (
        <Form>
          <div className="flex items-center">
            <Input type="text" name="title" id="title" label="Title" />
            <button
              className="text-white rounded-full bg-blue-500 ml-4 p-2"
              type="submit"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

/*

      <div className="flex items-end">
        <div className="flex-1">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            New todo
          </label>
          <div className="mt-1 flex">
            <input
              type="text"
              name="title"
              id="title"
              value={newTodoName}
              onChange={(event) => setNewTodoName(event.target.value)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
            <div>
              <button
                className="text-white rounded-full bg-blue-500 ml-4 p-2"
                onClick={() => {
                  addTodo(newTodoName);
                  setNewTodoName('');
                }}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Formik>
 */
