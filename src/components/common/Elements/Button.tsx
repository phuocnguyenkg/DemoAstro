import { userApi } from '@/api/game';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, disabled = false, className = '' }) => {
  const onClick = async () => {
    try {
      const res = await userApi.getListUser();
      console.log('%csrc/components/common/Elements/Button.tsx:14 res', 'color: #007acc;', res);
      // Do something
    } catch (error) {
      // Handle error
    }
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`btn ${className}`}>
      {children}
    </button>
  );
};

export default Button;
