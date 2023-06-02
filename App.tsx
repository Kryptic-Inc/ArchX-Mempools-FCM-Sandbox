import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Pressable,
  Alert,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import Clipboard from '@react-native-clipboard/clipboard';

function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [fcmToken, setFcmToken] = useState('');

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Toast.show({
        text1: 'New FCM Message',
        text2: JSON.stringify(remoteMessage),
      });
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      Toast.show({
        text1: 'Background FCM Message',
        text2: JSON.stringify(remoteMessage),
      });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const checkPermissionAndFetchToken = async () => {
      let hasPermission;
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      } else {
        hasPermission = await messaging().hasPermission();
      }

      if (hasPermission) {
        setIsEnabled(true);
        const token = await messaging().getToken();
        setFcmToken(token);
      }
    };
    checkPermissionAndFetchToken();
  }, []);

  const requestPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (!hasPermission) {
        return await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      }
    }
    return await messaging().requestPermission();
  };

  const registerOnFirebase = async () => {
    const granted = await requestPermission();
    if (granted) {
      const token = await messaging().getToken();
      setFcmToken(token);
    } else {
      Toast.show({text1: 'Permission denied'});
    }
  };

  const unregisterOnFirebase = async () => {
    await messaging().deleteToken();
    setFcmToken('');
  };

  const toggleSwitch = async () => {
    setIsEnabled(previousState => !previousState);
    if (!isEnabled) {
      await registerOnFirebase();
    } else {
      await unregisterOnFirebase();
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString(fcmToken);
  };

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Enable FCM:</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <Pressable style={styles.tokenContainer} onPress={copyToClipboard}>
        {fcmToken !== '' && <Text style={styles.tokenText}>{fcmToken}</Text>}
      </Pressable>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    marginRight: 10,
  },
  tokenContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'black',
    borderRadius: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
  },
  tokenText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default App;
