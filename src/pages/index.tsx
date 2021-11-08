import { Button, Box } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

type GetImagesResponse = {
  after: string;
  data: Card[];
};

export default function Home(): JSX.Element {
  const fetchImages = async ({
    pageParam = null,
  }): Promise<GetImagesResponse> => {
    const response = await api.get('images', {
      params: { after: pageParam },
    });

    const { data } = response;

    return data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: lastReq => {
      if (lastReq.after) {
        return lastReq.after;
      }
      return null;
    },
  });

  const formattedData = useMemo(() => {
    return data?.pages.flatMap<Card>(page => {
      return page.data;
    });
  }, [data]);

  return (
    <>
      {isError && <Error />}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <Box maxW={1120} px={20} mx="auto" my={20}>
            <CardList cards={formattedData} />
            {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
          </Box>
        </>
      )}
    </>
  );
}
