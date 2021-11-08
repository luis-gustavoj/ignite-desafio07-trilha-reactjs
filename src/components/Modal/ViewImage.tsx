import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth="fit-content">
        <ModalBody width="fit-content" height="fit-content" p="0" m="0">
          <Image src={imgUrl} maxWidth="900px" maxHeight="600px" />
        </ModalBody>
        <ModalFooter
          width="100%"
          height="32px"
          bg="pGray.800"
          justifyContent="flex-start"
        >
          <Link href={imgUrl} isExternal>
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
