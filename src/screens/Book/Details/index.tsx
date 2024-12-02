import React from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import Title from '@/components/ui/Title';
import Row from '@/components/layout/Row';
import BackButton from '@/components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {UseNavigationProp} from '@/types/navigation';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import HeartIcon from '@/assets/icons/heart.svg';
import {useUserStore} from '@/stores/userStore';
import {Book} from '@/types/common';

export default function BookDetails({route}: {route: any}) {
  const book = route.params.book as Book;
  const nav = useNavigation<UseNavigationProp>();

  const isFavorite = useUserStore(state =>
    state.favoriteBooks.includes(book.id),
  );
  const addFavoriteBook = useUserStore(state => state.addFavoriteBook);
  const removeFavoriteBook = useUserStore(state => state.removeFavoriteBook);

  const handleFavorite = () => {
    if (isFavorite) {
      removeFavoriteBook(book.id);
    } else {
      addFavoriteBook(book.id);
    }
  };

  return (
    <BackgroundWrapper>
      <Container>
        <Row justify="space-between" mt={10} style={{width: '100%'}}>
          <BackButton onPress={() => nav.goBack()} />

          <TouchableOpacity onPress={handleFavorite}>
            <View
              style={{
                width: 44,
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 9999,
                backgroundColor: '#12266A',
                marginBottom: 15,
              }}>
              <HeartIcon
                fill={isFavorite ? '#1DD063' : '#12266A'}
                color={isFavorite ? '#1DD063' : 'white'}
              />
            </View>
          </TouchableOpacity>
        </Row>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Title title="Topic" />

          <Image
            source={{uri: book.image}}
            style={{
              width: '100%',
              height: 200,
              borderRadius: 24,
              marginTop: 16,
            }}
          />

          <CustomText mt={32} fs={24} fw="bold">
            {book.title}
          </CustomText>

          <CustomText mt={20} align="justify" style={{lineHeight: 22}}>
            {book.text}
          </CustomText>
        </ScrollView>
      </Container>
    </BackgroundWrapper>
  );
}
