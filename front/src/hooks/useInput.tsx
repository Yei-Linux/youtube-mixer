import { ChangeEvent, useState } from 'react';

export const useInput = () => {
  const [value, setValue] = useState('');

  const handleType = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setValue(target.value);

  return { value, handleType };
};
