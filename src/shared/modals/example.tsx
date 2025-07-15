import React from 'react';
import { ParentComponent } from './examples/parentModal';
import { ModalRoot } from './view';
import './modal.css';

export const App: React.FC = () => {
  return (
    <div className="app">
      <ParentComponent />
      <ModalRoot />
    </div>
  );
};