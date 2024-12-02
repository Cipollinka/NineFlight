import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Book} from '@/types/common';
import HeartIcon from '@/assets/icons/heart.svg';
import CustomText from '@/components/ui/Text';

interface Props {
  book: Book;
  isFavorite?: boolean;
  onFavoritePress: (id: number, isFavorite?: boolean) => void;
  onPress: () => void;
}

export default function Item({
  book,
  isFavorite,
  onFavoritePress,
  onPress,
}: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          borderRadius: 16,
          backgroundColor: '#0B1948',
          marginBottom: 20,
          position: 'relative',
          overflow: 'hidden',
        }}>
        {book?.image && (
          <Image
            source={{uri: book?.image}}
            style={{width: '100%', height: 142}}
          />
        )}

        <TouchableOpacity
          style={{position: 'absolute', top: 10, right: 10}}
          onPress={() => onFavoritePress(book.id, isFavorite)}>
          <View
            style={{
              width: 32,
              height: 32,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 9999,
              backgroundColor: '#12266A',
            }}>
            <HeartIcon
              width={24}
              height={24}
              fill={isFavorite ? '#1DD063' : '#12266A'}
              color={isFavorite ? '#1DD063' : 'white'}
            />
          </View>
        </TouchableOpacity>

        <View style={{paddingHorizontal: 16, paddingVertical: 12}}>
          <CustomText fw="bold" fs={16}>
            {book?.title}
          </CustomText>
          <CustomText mt={5} fs={12} color="#999999">
            {book?.text.slice(0, 150).trim()}...
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
}
