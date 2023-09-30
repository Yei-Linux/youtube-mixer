import { Button } from '@/componets/ui/Button';
import { Modal, ModalBody, ModalContent } from '@nextui-org/react';
import classNames from 'classnames';
import { FC } from 'react';

export interface IExitQuestionModal {
  isOpen: boolean;
  onOpenChange: () => void;
  onReturnToLoadNewVideo: () => void;
}
export const ExitQuestionModal: FC<IExitQuestionModal> = ({
  isOpen,
  onOpenChange,
  onReturnToLoadNewVideo,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <div className="flex flex-col gap-3 p-4">
                <p>
                  Are you sure do you want to abandon your video edition
                  session?
                </p>
                <div className="w-full flex justify-end gap-3">
                  <Button
                    className={classNames(
                      'bg-[white]',
                      '!text-[#848aff]',
                      'border border-[#848aff]'
                    )}
                    onClick={() => {
                      onClose();
                      onReturnToLoadNewVideo();
                    }}
                  >
                    Yes 🥶
                  </Button>
                  <Button
                    onClick={() => {
                      onClose();
                    }}
                  >
                    No 😎
                  </Button>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
