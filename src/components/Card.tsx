import React from 'react';
import {StyleSheet, Dimensions, Image, View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
const {width: wWidth} = Dimensions.get('window');
import Animated, {
  Easing,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {snapPoint} from 'react-native-redash';

const aspectRatio = 722 / 368;
const CARD_WIDTH = wWidth - 128;
const CARD_HEIGHT = CARD_WIDTH * aspectRatio;
const side = (wWidth + CARD_WIDTH + 50) / 2;
const IMAGE_WIDTH = CARD_WIDTH * 0.9;
const SNAP_POINTS = [-side, 0, side];

interface CardProps {
  card: {
    source: ReturnType<typeof require>;
  };
  index: number;
}

export const Card = ({card: {source}}: CardProps) => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const rotateZ = useSharedValue(Math.random() * 20 - 10);
  const scale = useSharedValue(1);
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number; y: number}
  >({
    onStart: (_, ctx) => {
      ctx.x = x.value;
      ctx.y = y.value;
      scale.value = withTiming(1.1, {easing: Easing.inOut(Easing.ease)});
      rotateZ.value = withTiming(0, {easing: Easing.inOut(Easing.ease)});
    },
    onActive: ({translationX, translationY}, ctx) => {
      x.value = ctx.x + translationX;
      y.value = ctx.y + translationY;
    },
    onEnd: ({velocityX, velocityY}) => {
      const dest = snapPoint(x.value, velocityX, SNAP_POINTS);
      x.value = withSpring(dest, {velocity: velocityX});
      y.value = withSpring(0, {velocity: velocityY});
      scale.value = withTiming(1, {easing: Easing.inOut(Easing.ease)});
    },
  });

  const style = useAnimatedStyle(() => ({
    transform: [
      {
        rotateX: '30deg',
      },
      {
        rotateZ: `${rotateZ.value}deg`,
      },
      {
        perspective: 1500,
      },
      {
        translateX: x.value,
      },
      {
        translateY: y.value,
      },
      {
        scale: scale.value,
      },
    ],
  }));

  return (
    <View style={styles.container} pointerEvents="box-none">
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.card, style]}>
          <Image
            source={source}
            style={{
              width: IMAGE_WIDTH,
              height: IMAGE_WIDTH * aspectRatio,
            }}
            resizeMode="contain"
          />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    alignItems: 'center',
    hadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 3,
    borderColor: 'black',
  },
});
