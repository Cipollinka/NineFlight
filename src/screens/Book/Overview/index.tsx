import React, {useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import books from '@/constants/books.json';
import Row from '@/components/layout/Row';
import Title from '@/components/ui/Title';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import HeartIcon from '@/assets/icons/heart.svg';
import Item from './Item';
import BottomNavigation from '@/components/BottomNavigation';
import {useUserStore} from '@/stores/userStore';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';

export default function BookOverview() {
  const nav = useNavigation<UseNavigationProp>();
  const [isFavorite, setIsFavorite] = useState(false);

  const favoriteBooks = useUserStore(state => state.favoriteBooks);
  const addFavoriteBook = useUserStore(state => state.addFavoriteBook);
  const removeFavoriteBook = useUserStore(state => state.removeFavoriteBook);

  const accessor = isFavorite
    ? books.filter(book => favoriteBooks.includes(book.id))
    : books;

  const handleFavorite = (id: number, isFavoriteBook?: boolean) => {
    if (isFavoriteBook) {
      removeFavoriteBook(id);
    } else {
      addFavoriteBook(id);
    }
  };

  return (
    <BackgroundWrapper>
      <Container>
        <Row justify="space-between" style={{width: '100%'}}>
          <Title title="Useful topics" />
          <TouchableOpacity onPress={() => setIsFavorite(prev => !prev)}>
            <View
              style={{
                width: 44,
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 9999,
                backgroundColor: '#12266A',
              }}>
              <HeartIcon
                fill={isFavorite ? '#1DD063' : '#12266A'}
                color={isFavorite ? '#1DD063' : 'white'}
              />
            </View>
          </TouchableOpacity>
        </Row>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginTop: 24}}>
          {accessor.map(book => (
            <Item
              key={book.id}
              book={book}
              isFavorite={favoriteBooks.includes(book.id)}
              onFavoritePress={handleFavorite}
              onPress={() => nav.navigate(Screens.BOOK_DETAILS, {book})}
            />
          ))}
          <View style={{marginBottom: 80}} />
        </ScrollView>
      </Container>

      <BottomNavigation />
    </BackgroundWrapper>
  );
}
