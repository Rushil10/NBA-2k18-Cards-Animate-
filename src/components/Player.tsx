import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {Card} from './Card';

const cards = [
  {
    source: require('../assets/kenny.png'),
  },
  {
    source: require('../assets/kyrie.png'),
  },
  {
    source: require('../assets/jh.png'),
  },
  {
    source: require('../assets/sc.png'),
  },
  {
    source: require('../assets/mj.png'),
  },
  {
    source: require('../assets/lj.png'),
  },
];

export const assets = cards.map(card => card.source);

export const Player = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      {cards.map((card, index) => (
        <Card card={card} key={index} index={index} />
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
