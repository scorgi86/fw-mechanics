import { useCallback, useEffect, useState } from "react"
import { modalService } from "../services/service"

interface IStatusFormHook<T = unknown> {
    defaultOpenState: boolean;
    onResult: (result: T) => void;
    onClose: () => void;
    onOpen: () => void;
}

const Component = () => {
    return <Modal>
        Допустим, диалог формы статуса
    </Modal>
}

export const useStatusModal = ({ defaultOpenState, onResult, onClose, onOpen }: IStatusFormHook) => {
    const [statusModalKey] = useState(() => {
        return `status-modal-${Date.now()}`;
    });

    const show = useCallback(() => {
        modalService.openModal({
            key: statusModalKey,
            component: Component,
            props: {
                onClose,
                onOpen,
                onResult,
            }
        })
    }, [onClose, onOpen, onResult, statusModalKey]);

    const close = useCallback(() => {
        modalService.closeModal(statusModalKey);
    }, [statusModalKey]);

    useEffect(() => {
        if (defaultOpenState) {
            modalService.openModal({
                key: statusModalKey,
                component: Component
            });
        }

        return () => {
            modalService.close(statusModalKey);
        }
    }, [defaultOpenState, statusModalKey]);

    return {
        show,
        close,
    }
}