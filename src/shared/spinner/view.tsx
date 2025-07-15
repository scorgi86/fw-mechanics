import React from 'react';
import './Spinner.css';

interface SpinnerProps {
  loading: boolean;
  progress?: number;
  local?: boolean;
}

export const Spinner: React.FC<SpinnerProps> = ({ 
  loading, 
  progress, 
  local = false 
}) => {
  if (!loading) return null;

  return (
    <div className={`spinner-overlay ${local ? 'local' : 'global'}`}>
      <div className="spinner">
        <div className="spinner-circle"></div>
        {progress !== undefined && (
          <div className="spinner-progress">{Math.round(progress)}%</div>
        )}
      </div>
    </div>
  );
};