import store from '../store';

export default class NotificationController {
  static setNotification(type, message) {
    store.commit('setNotificationType', type);
    store.commit('setNotificationMessage', message);
    store.commit('setNotificationVisibility', true);
  }
}
