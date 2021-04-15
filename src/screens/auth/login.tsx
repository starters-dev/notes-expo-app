import React, { useState } from 'react';
import { Linking } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import styled from '@emotion/native';

import { useStores } from '../../stores';
import { useServices } from '../../services';
import useConstants from '../../utils/useConstants';
import Button from '../../components/Button';
import { ScrollContainer } from '../../components/Containers';
import Input from '../../components/Input';

type LoginScreenProps = StackScreenProps<ScreenProps, 'LoginScreen'>;

const C = useConstants();

// Components
const HeaderText = styled.Text(p => ({
  fontSize: C.sizes.l,
  color: p.theme.colors.text,
  marginVertical: C.sizes.s,
}));
const Desc = styled.Text(p => ({
  fontSize: C.sizes.m,
  color: p.theme.colors.text,
  textAlign: 'center',
}));
const Footer = styled.View(p => ({
  marginTop: C.sizes.xxl * 3,
}));

// Screen
const LoginScreen: React.FC<LoginScreenProps> = observer(({
  navigation,
  route,
}) => {
  // const { param } = route.params;
  const { G } = useStores();
  const { } = useServices();

  const [url, setURL] = useState('');

  const openNotes = () => {
    if (!!url) {
      G.setParseURL(url);
      navigation.navigate('Notes');
    }
  };

  const openTutorial = () => {
    Linking.openURL(C.links.medium);
  };

  const tryDemo = () => {
    G.setParseURL(C.links.demo);
    navigation.navigate('Notes');
  };

  return (
    <ScrollContainer>
      <HeaderText>Parse Platform URL</HeaderText>
      <Input
        placeholder='ex.: https://your_id.ngrok.io/parse'
        value={url}
        onChangeText={setURL}
      />
      <Button
        noBg
        title='Go'
        onPress={openNotes}
      />

      <Footer>
        <Desc>
          NOTE:{'\n'}
          If you are confused about what URL should be put in the input field, then you would probably need to check out the tutorial on Medium about configuring Parse Platform or try Demo.
        </Desc>
        <Button
          noBg
          title='Open tutorial →'
          onPress={openTutorial}
        />
        <Button
          noBg
          title='Try Demo'
          onPress={tryDemo}
        />
        <Desc>
          (might not be always available)
        </Desc>
      </Footer>
    </ScrollContainer>
  )
});

export default LoginScreen;