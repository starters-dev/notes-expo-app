import React, { useEffect } from 'react';
import { Alert, ListRenderItemInfo } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import styled from '@emotion/native';

import { useStores } from '../../stores';
import { useServices } from '../../services';
import useConstants from '../../utils/useConstants';
import Button from '../../components/Button';
import { transformArray } from '../../utils/help';
import NoteView from '../../components/NoteView';
import { SafeContainer } from '../../components/Containers';

type NotesScreenProps = StackScreenProps<ScreenProps, 'NotesScreen'>;

const C = useConstants();

// Components
const HeaderButton = styled.Text(p => ({
  color: p.theme.colors.text,
  fontSize: C.sizes.m,
}));
const HeaderButtonBig = styled.Text(p => ({
  color: p.theme.colors.text,
  fontSize: C.sizes.l,
}));

const Footer = styled.View(p => ({
  flexDirection: 'row',
  alignItems: 'center',
}));
const SmallFooterButton = styled.View(p => ({
  flex: 2,
}));
const BigFooterButton = styled.View(p => ({
  flex: 4,
}));

// Screen
const NotesScreen: React.FC<NotesScreenProps> = observer(({
  navigation,
  route,
}) => {
  // const { param } = route.params;
  const { G, ui } = useStores();
  const { t, parse, api } = useServices();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (!!!G.parseURL) openAuth();
      else {
        parse.setServerURL(G.parseURL);
        getNotes();
      }
    });

    updateNavHeader();

    return unsubscribe;
  }, [navigation]);

  useEffect(() => { updateNavHeader() }, [ui.themeMode])

  const openAuth = () => navigation.navigate('Auth');

  const logout = () => {
    G.clearParseURL();
    openAuth();
  }

  const updateNavHeader = () => {
    navigation.setOptions({
      headerRight: () => [(
        <TouchableOpacity onPress={ui.toggleThemeMode}>
          <HeaderButtonBig>{ ui.themeModeEmoji() }</HeaderButtonBig>
        </TouchableOpacity>
      ), (
        <TouchableOpacity onPress={logout} style={{ marginLeft: C.sizes.m }}>
          <HeaderButton>Logout</HeaderButton>
        </TouchableOpacity>
      )]
    });
  }

  const getNotes = async () => {
    ui.setLoading(true);
    const results = await api.note.get();
    G.setNotes(transformArray(results));
    ui.setLoading(false);
  };

  const onNotePressed = (id: string, index: number) => {
    navigation.navigate('NoteDetailsScreen', {
      mode: 'edit',
      note: G.notes.find(it => it.objectId === id),
    });
  }

  const showNoteActions = (id: string, index: number) => {
    Alert.alert(
      'Actions',
      undefined,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            ui.setLoading(true);

            await api.note.delete(id);
            await getNotes();
          }
        }
      ]
    )
  }

  const onAddPressed = () => {
    navigation.navigate('NoteDetailsScreen', {
      mode: 'create',
    })
  }

  const _renderItem = (info: ListRenderItemInfo<Note>) =>
    <NoteView info={info} onPress={onNotePressed} onLongPress={showNoteActions} />

  return (
    <SafeContainer>
      <FlatList
        keyExtractor={it => it.objectId}
        data={G.notes}
        renderItem={_renderItem}
        onRefresh={getNotes}
        contentInsetAdjustmentBehavior={'automatic'}
        contentContainerStyle={{ margin: C.sizes.m, }}
      />
      
      <Footer>
        <SmallFooterButton>
          <Button noBg
            title={ui.loading ? 'Loading...' : 'Refresh'}
            onPress={getNotes}
            textStyle={{ fontSize: 14, }}
          />
        </SmallFooterButton>

        <BigFooterButton>
          <Button noBg
            title={'Add +'}
            onPress={onAddPressed}
            textStyle={{ fontSize: 28, }}
          />
        </BigFooterButton>
      </Footer>
    </SafeContainer>
  )
});

export default NotesScreen;