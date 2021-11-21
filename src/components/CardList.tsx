import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const [selectedImage, setSelectedImage] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSelectedImage = (imgUrl: string): void => {
    setSelectedImage(imgUrl);
    onOpen();
  };

  return (
    <>
      <SimpleGrid columns={3} spacing="40px">
        {cards.map(card => (
          <Card
            data={card}
            key={card.id}
            viewImage={() => handleSelectedImage(card.url)}
          />
        ))}
      </SimpleGrid>

      <ModalViewImage
        isOpen={isOpen}
        onClose={onClose}
        imgUrl={selectedImage}
      />
    </>
  );
}
