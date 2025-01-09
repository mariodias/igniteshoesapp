import { OneSignal } from 'react-native-onesignal';

export function tagUserInfoCreate() {
  OneSignal.User.addTags({
    user_email: "mario.dias@icloud.com",
    user_name: "Mario Dias",
  });
}