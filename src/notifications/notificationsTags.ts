import { OneSignal } from 'react-native-onesignal';

export function tagUserInfoCreate() {
  OneSignal.User.addTags({
    user_email: "mario.dias@icloud.com",
    user_name: "Mario Dias",
  });
}

export function tagCartUpdate(items_count: string) {
  OneSignal.User.addTags({
    cart_items_count: items_count,
  });
}