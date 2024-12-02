import {TextInputProps} from 'react-native';
import React, {useState} from 'react';
import Input from './Input';

const lineHeight = 20;
const padding = 20;

export default function TextArea({style, ...props}: TextInputProps) {
  const [height, setHeight] = useState(40);
  const [prevLines, setPrevLines] = useState(1);

  const calculateHeight = (lineBreaks: number) => {
    return lineBreaks * lineHeight + padding;
  };

  const handleTextChange = (input: string) => {
    props.onChangeText && props.onChangeText(input);
    const lineBreaks = input.split('\n').length;

    if (prevLines === lineBreaks) {
      return;
    }
    setPrevLines(lineBreaks);

    setHeight(calculateHeight(lineBreaks));
  };

  return (
    <Input
      {...props}
      multiline
      onChangeText={handleTextChange}
      style={[style, {height: height, paddingTop: 10}]}
      textAlignVertical="center"
    />
  );
}
