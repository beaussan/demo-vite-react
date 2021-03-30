import React from 'react';
import { FieldHookConfig, useField } from 'formik';

type InputProps = {
  label: string;
  className?: string;
} & FieldHookConfig<string>;

export const Input = ({ label, className, ...rest }: InputProps) => {
  const [field, meta] = useField(rest as any);
  const hasError = meta.touched && meta.error;

  return (
    <div className="flex-1">
      <label
        htmlFor="title"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1 flex flex-col">
        <input
          type="text"
          id="title"
          {...field}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        />
        <div className="text-red-500 text-sm">{hasError && meta.error}</div>
      </div>
    </div>
  );
};
