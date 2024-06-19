import {Button, Text} from 'react-native-paper';
import {View} from 'react-native';
import React from 'react';
type CustomErrorBoundaryProps = {error: Error; resetError: Function};
const CustomErrorBoundary = ({error, resetError}: CustomErrorBoundaryProps) => {
  return (
    <View>
      <Text>
        OOOPS! {error.name}: {error.message}
      </Text>
      <Button onPress={() => resetError()}>
        Ritorna a quello che stavi facendo...
      </Button>
    </View>
  );
};

export default CustomErrorBoundary;
