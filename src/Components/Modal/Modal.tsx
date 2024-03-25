import { ModalContent, Modal } from "@nextui-org/react";

interface IModalProps {
  isOpen: boolean;
  setIsOpen: any;
  cancelLabel?: string;
  actionLabel?: string;
  title?: string;
  onAction: () => void;
  children: any;
  size:'2xl'|'4xl'|'5xl';
}

export default function ModalComponent(props: IModalProps) {
  const {
    isOpen,
    setIsOpen,
    cancelLabel = "Close",
    actionLabel = "Save",
    onAction,
    size
  } = props;

  return (
    <Modal
      className="bg-slate-800"
      onClose={() => setIsOpen(false)}
      isOpen={isOpen}
      size={size}
    >
      <ModalContent>
        <>
          <div className="text-center mt-4">{props.title}</div>
          {props.children}
          <div>
            <div className="w-full flex justify-end pr-2">
              <div className="flex gap-4 py-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 hover:bg-[#f31260]/[0.2]  rounded-md text-[#f31260]"
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={onAction}
                  className="px-4  py-2 hover:bg-netral-25/[0.2]  text-netral-25 rounded-md"
                >
                  {actionLabel}  
                </button>
              </div>
            </div>
          </div>
        </>
      </ModalContent>
    </Modal>
  );
}
