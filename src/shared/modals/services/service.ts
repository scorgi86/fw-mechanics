type ModalComponentProps<TResult = unknown> = {
  onClose: (result?: TResult) => void;
  [key: string]: unknown;
};

type ModalComponent<TProps = object, TResult = unknown> = React.ComponentType<TProps & ModalComponentProps<TResult>>;

export type TKey = string|number;

export interface ModalInstance {
  key: TKey;
  component: ModalComponent;
  props: ModalComponentProps;
}

export interface IModalProps<TProps, TResult> {
  component: ModalComponent<TProps, TResult>;
  key?: string|number;
  props?: TProps
}

class ModalService {
  private subscribers: Array<(modals: ModalInstance[]) => void> = [];
  private modalStack: ModalInstance[] = [];

  subscribe(callback: (modals: ModalInstance[]) => void): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  private notify() {
    this.subscribers.forEach(callback => callback([...this.modalStack]));
  }

  openModal<TProps, TResult>({ key, component, props }: IModalProps<TProps, TResult>): Promise<TResult | undefined> {
    return new Promise((resolve) => {
      const modalId = key || Date.now();
      
      const handleClose = (result?: TResult) => {
        this.closeModal(modalId);
        resolve(result);
      };

      const modal: ModalInstance = {
        key: modalId,
        component: component as ModalComponent,
        props: {
          ...props,
          onClose: handleClose
        } as ModalComponentProps
      };

      this.modalStack.push(modal);
      this.notify();
    });
  }

  closeModal(modalId: TKey) {
    this.modalStack = this.modalStack.filter(modal => modal.key !== modalId);
    this.notify();
  }

  closeAll() {
    this.modalStack = [];
    this.notify();
  }
}

// Создаем синглтон
export const modalService = new ModalService();