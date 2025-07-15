import React, { useEffect, useState } from 'react';
import { modalService, ModalInstance } from './services/service';

export const ModalRoot: React.FC = () => {
  const [modals, setModals] = useState<ModalInstance[]>([]);

  useEffect(() => {
    const unsubscribe = modalService.subscribe((newModals) => {
      setModals([...newModals]);
    });
    return () => unsubscribe();
  }, []);

  if (modals.length === 0) return null;

  return (
    <>
      {modals.map((modal, index) => {
        const ModalComponent = modal.component;
        return (
          <div 
            key={modal.id} 
            className="modal-container" 
            style={{ zIndex: 1000 + index }}
          >
            <div 
              className="modal-backdrop" 
              onClick={() => modal.props.onClose(undefined)} 
            />
            <div className="modal-content">
              <ModalComponent {...modal.props} />
            </div>
          </div>
        );
      })}
    </>
  );
};