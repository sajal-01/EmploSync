import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
  Button,
} from 'react-native';
import styles from './styles';
import Svg, { Image, Ellipse, ClipPath } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
  runOnJS,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';

export default function Auth() {
  const { height, width } = Dimensions.get('window');
  const imagePosition = useSharedValue(1);
  const formButtonScale = useSharedValue(1);
  const [style, setStyle] = useState(styles.topContainer);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleAuth = async () => {
    if (isRegistering) {
      try {
        const response = await axios.post('http://localhost:8000/register', {
          name,
          email,
          password,
        });
        const token = response.data.token;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('isSignedIn', 'true');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        imagePosition.value = 1;
      } catch (error) {
        console.log('Register error', error);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:8000/login', {
          email,
          password,
        });
        const token = response.data.token;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('isSignedIn', 'true');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        imagePosition.value = 1;
      } catch (error) {
        console.log('Login error', error);
      }
    }
  };

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / 1.8, 0]
    );
    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
      transform: [
        { rotate: withTiming(interpolation + 'deg', { duration: 1000 }) },
      ],
    };
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value === 0
          ? withDelay(400, withTiming(1, { duration: 800 }))
          : withTiming(0, { duration: 300 }),
    };
  });

  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: formButtonScale.value }],
    };
  });

  const loginHandler = () => {
    imagePosition.value = 0;
    if (isRegistering) {
      runOnJS(setIsRegistering)(false);
    }
  };

  const registerHandler = () => {
    imagePosition.value = 0;
    if (!isRegistering) {
      runOnJS(setIsRegistering)(true);
    }
  };

  const testRequest = async () => {
    try {
      const response = await axios.get('http://localhost:8000');
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Animated.View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
        <Svg height={height} width={width}>
          <ClipPath id="clipPathId">
            <Ellipse cx={width / 2} rx={height} ry={height + 1} />
          </ClipPath>
          <Image
            href={require('./assets/login-background.jpg')}
            width={width + 200}
            height={height + 100}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clipPathId)"
          />
        </Svg>
        <Pressable
          onPress={() => {
            imagePosition.value = 1;
            setStyle(styles.topContainer);
          }}
        >
          <Animated.View
            style={[styles.closeButtonContainer, closeButtonContainerStyle]}
          >
            <AntDesign name="close" size={24} color="black" />
          </Animated.View>
        </Pressable>
      </Animated.View>
      <View style={styles.topContainer}>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable style={styles.button} onPress={loginHandler}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable style={styles.button} onPress={registerHandler}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="black"
            style={styles.textInput}
            value={email}
            onChangeText={(text) => setEmail(text)}
            textContentType="emailAddress"
          />
          {isRegistering && (
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="black"
              style={styles.textInput}
              value={name}
              onChangeText={(text) => setName(text)}
              textContentType="name"
            />
          )}
          <TextInput
            placeholder="Password"
            placeholderTextColor="black"
            style={styles.textInput}
            value={password}
            onChangeText={(text) => setPassword(text)}
            type="password"
          />
          <Pressable
            onPress={() => {
              runOnJS(handleAuth)();
              formButtonScale.value = withSequence(
                withSpring(1.3),
                withTiming(1, { duration: 300 })
              );
              setStyle(styles.bottomContainer);
            }}
          >
            <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
              <Text style={styles.buttonText}>
                {isRegistering ? 'REGISTER' : 'LOG IN'}
              </Text>
            </Animated.View>
          </Pressable>
        </Animated.View>
      </View>
    </Animated.View>
  );
}
