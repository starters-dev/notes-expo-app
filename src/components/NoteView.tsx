import React from 'react';
import { ListRenderItemInfo, Animated } from 'react-native';
import styled from '@emotion/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useConstants from '../utils/useConstants';

type Props = {
  info: ListRenderItemInfo<Note>;
  onPress: (id: string, index: number) => void;
  onLongPress?: (id: string, index: number) => void;
}

const C = useConstants();

const View = styled.View(p => ({
  backgroundColor: p.theme.colors.secondBg,
  borderRadius: C.sizes.m,
  marginVertical: C.sizes.s,
  padding: C.sizes.m,
}));
const Title = styled.Text(p => ({
  color: p.theme.colors.text,
  fontSize: C.sizes.l,
}));
const Content = styled.Text(p => ({
  color: p.theme.colors.text,
  fontSize: C.sizes.m,
  marginTop: C.sizes.s,
}));

const NoteView: React.FC<Props> = ({
  info,
  onPress,
  onLongPress,
}) => {
  const { item, index } = info;

  const _onPress = (id: string, index: number) => () => onPress(id, index);
  const _onLongPress = (id: string, index: number) => () => onLongPress && onLongPress(id, index);

  return (
    <TouchableOpacity onPress={_onPress(item.objectId, index)} onLongPress={_onLongPress(item.objectId, index)}>
        <View>
          <Title>{ item.title }</Title>
          <Content numberOfLines={3}>{ item.content }</Content>
        </View>
    </TouchableOpacity>
  )
};

export default NoteView;