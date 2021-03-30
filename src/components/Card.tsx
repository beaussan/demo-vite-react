import React, { ReactNode } from 'react';

export const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-4 w-full h-full sm:h-auto sm:w-96 bg-white shadow-2xl rounded-lg">
      {children}
    </div>
  );
};
