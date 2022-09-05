import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useSharedValue} from 'react-native-reanimated';

import {Card} from './Card';

const cards = [
  {
    source: require('../assets/kyrie.png'),
  },
  {
    source: require('../assets/sc.png'),
  },
  {
    source: require('../assets/gerrard.jpg'),
  },
  {
    source: require('../assets/mj.png'),
  },
  {
    source: require('../assets/messi.jpg'),
  },
  {
    source: require('../assets/ron.png'),
  },
  {
    source: require('../assets/lj.png'),
  },
  {
    source: require('../assets/kobe.png'),
  },
];

export const assets = cards.map(card => card.source);

export const Player = () => {
  const shuffleBack = useSharedValue(false);
  return (
    <GestureHandlerRootView style={styles.container}>
      {cards.map((card, index) => (
        <Card card={card} key={index} index={index} shuffleBack={shuffleBack} />
      ))}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#de3163',
  },
});
