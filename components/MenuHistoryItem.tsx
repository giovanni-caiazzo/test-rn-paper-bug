import {format} from 'date-fns';
import it from 'date-fns/locale/it';
import {StyleSheet, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import React, {useMemo} from 'react';
type MenuItem = {
  id: string;
  date: number;
  p: string;
  c: string;
};
type DayOfTheWeekPropsType = {
  menuItemData: MenuItem;
};

const MenuHistoryItem = ({menuItemData}: DayOfTheWeekPropsType) => {
  const {colors} = useTheme();
  const day = useMemo(
    () => new Date(menuItemData.date * 1000),
    [menuItemData.date],
  );

  if (!menuItemData) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.day}>
          {format(day, 'EEE', {locale: it}).toUpperCase()}
        </Text>
        <Text style={styles.numberOfDay}>
          {format(day, 'dd', {locale: it})}
        </Text>
      </View>
      <View style={styles.meals}>
        <View style={styles.mealContainer}>
          <Text style={{color: colors.primary}}>P:</Text>
          <Text>{menuItemData.p}</Text>
        </View>
        <View style={styles.mealContainer}>
          <Text style={{color: colors.primary}}>C:</Text>

          <Text>{menuItemData.c}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 25,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  numberOfDay: {textAlign: 'center'},
  day: {
    fontWeight: 'bold',
  },
  meals: {
    flexDirection: 'column',
    gap: 10,
    flex: 1,
  },
  textInput: {
    flex: 1,
  },
  mealContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

export default MenuHistoryItem;
