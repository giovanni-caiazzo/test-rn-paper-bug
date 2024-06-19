import React from 'react';
import {StyleSheet} from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import CustomErrorBoundary from '../components/CustomErrorBoundary';
import {
  Portal,
  Text,
  Modal,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native-paper';

const MenuScreen = () => {
  const [value, setValue] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  return (
    <ErrorBoundary FallbackComponent={CustomErrorBoundary}>
      <TextInput value={value} onChangeText={setValue} />
      <Button onPress={() => setVisible(true)}>Test</Button>
      <ActivityIndicator />
      <Portal>
        <Modal visible={visible} dismissableBackButton={true}>
          <Text>Test</Text>
        </Modal>
      </Portal>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weekContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    gap: 10,
  },
});

export default MenuScreen;
