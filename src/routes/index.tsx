import { useEffect, useState } from 'react';
import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { OneSignal, OSNotification } from 'react-native-onesignal';
import { NotificationEventTypeMap } from 'react-native-onesignal/dist/models/NotificationEvents'

import { AppRoutes } from './app.routes';
import { Notification } from '../components/Notification';

const linking = {
  prefixes: ['com.rocketseat.igniteshoes://', 'igniteshoesapp://'],
  config: {
    screens: {
     details: {
      path: 'details/:productId',
      parse: {
        productId: (productId: string) => productId,
      },
      },
    },
  },
};

export function Routes() {
  const [notification, setNotification] = useState<OSNotification>()
  const { colors } = useTheme()

  const theme = DefaultTheme
  theme.colors.background = colors.gray[700]

  useEffect(() => {
    const unsubscribe = OneSignal.Notifications.addEventListener(
      'foregroundWillDisplay',
      (
        notificationReceivedEvent: NotificationEventTypeMap['foregroundWillDisplay'],
      ) => {
        const response = notificationReceivedEvent.getNotification()

        setNotification(response)
      },
    )

    return () => unsubscribe
  }, [])

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />
      {notification?.title && (
        <Notification
          data={notification}
          onClose={() => setNotification(undefined)}
        />
      )}
    </NavigationContainer>
  )
}