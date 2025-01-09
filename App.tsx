import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { NotificationClickEvent, OneSignal } from 'react-native-onesignal'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';
import { tagUserInfoCreate } from './src/notifications/notificationsTags';
import { useEffect } from 'react';

OneSignal.initialize("72c66226-ce43-46f5-a0bc-489aa4228f60")
OneSignal.Notifications.requestPermission(true)

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate();

  // useEffect(() => {
  //   const handleNotificationClick = (event: NotificationClickEvent): void => {
  //     console.log(event);
  //   }
  //     OneSignal.Notifications.addEventListener('click', handleNotificationClick);

  //     return () => {
  //       OneSignal.Notifications.removeEventListener('click', handleNotificationClick);
  //     }
  //   }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}