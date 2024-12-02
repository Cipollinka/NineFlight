import {TextInput, TextInputProps, View, Text} from 'react-native';
import React from 'react';

interface InputProps extends TextInputProps {
  error?: string;
}

export default function Input({style, error, ...props}: InputProps) {
  return (
    <View style={{marginBottom: 10}}>
      <TextInput
        {...props}
        placeholderTextColor={'#999999'}
        style={[
          {
            backgroundColor: '#0B1948',
            height: 40,
            paddingHorizontal: 16,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 16,
            fontSize: 16,
            color: '#fff',
            borderColor: error ? 'red' : '#0B1948',
            borderWidth: error ? 2 : 1,
          },
          style,
        ]}
      />
      {error && (
        <Text style={{color: 'red', fontSize: 12, marginTop: 4}}>
          {error} {/* Display error message */}
        </Text>
      )}
    </View>
  );
}
