import React from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import CustomErrorBoundary from '../components/CustomErrorBoundary';
import {Text} from "react-native-paper";

const EMPTY_GROCERIES_ITEM = {name: '', order: 0};

const GroceryScreen = () => {
  return (
    <ErrorBoundary FallbackComponent={CustomErrorBoundary}>
      <Text>Groceries</Text>
    </ErrorBoundary>
  );
};

export default GroceryScreen;
