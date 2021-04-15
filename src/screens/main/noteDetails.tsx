import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { observer } from 'mobx-react';
import { StackScreenProps } from '@react-navigation/stack';
import styled from '@emotion/native';
import { useTheme } from '@emotion/react';

import { useStores } from '../../stores';
import { useServices } from '../../services';
import useConstants from '../../utils/useConstants';
import { SafeContainer, } from '../../components/Containers';
import { useKeyboard } from '../../utils/useKeyboard';
import Button from '../../components/Button';
import { If } from '@kanzitelli/if-component';

type NoteDetailsScreenProps = StackScreenProps<ScreenProps, 'NoteDetailsScreen'>;

const C = useConstants();

// Components
const TitleText = styled.TextInput(p => ({
  fontSize: C.sizes.xl,
  margin: C.sizes.s,
  color: p.theme.colors.text,
  fontWeight: 'bold',
}));
const ContentText = styled.TextInput(p => ({
  flex: 1,
  fontSize: C.sizes.l - 4,
  color: p.theme.colors.text,
  margin: C.sizes.s,
}));

const View = styled.View(p => ({
  backgroundColor: p.theme.colors.secondBg,
  borderRadius: C.sizes.m,
  marginVertical: C.sizes.s,
  padding: C.sizes.m,
}));

// Screen
const NoteDetailsScreen: React.FC<NoteDetailsScreenProps> = observer(({
  navigation,
  route,
}) => {
  const { mode, note } = route.params;
  const { G, ui } = useStores();
  const { api } = useServices();

  const theme = useTheme();
  const [keyboardHeight] = useKeyboard();
  const [title, setTitle] = useState(note?.title);
  const [content, setContent] = useState(note?.content);

  useEffect(() => { start() }, []);

  const start = async () => { }

  const saveNote = async () => {
    ui.setLoading(true);

    if (mode === 'create') {
      const _title = title ?? 'New title';
      const _content = content ?? 'New content';
      const params: NoteInput = { title: _title, content: _content };

      await api.note.create(params)
    }
    if (mode === 'edit' && note) {
      await api.note.update(note.objectId, { title, content })
    }

    ui.setLoading(false);

    navigation.goBack();
  }

  return (
    <SafeContainer style={{ paddingTop: C.sizes.m, paddingHorizontal: C.sizes.m }}>
      <View>
        <TitleText
          placeholder='Title'
          placeholderTextColor={theme.colors.text}
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={{ flex: 1, marginBottom: Platform.OS === 'ios' ? keyboardHeight : 0 }}>
        <ContentText
          placeholder='Content'
          placeholderTextColor={theme.colors.text}
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical='top'
        />

        <If _={ui.loading}
        _then={<ActivityIndicator color={theme.colors.primary} />}
        _else={
          <Button noBg noSpace
            title='Save'
            onPress={saveNote}
          />
        }
        />
      </View>
    </SafeContainer>
  )
});

export default NoteDetailsScreen;