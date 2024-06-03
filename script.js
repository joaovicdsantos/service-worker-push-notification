const checKPermission = () => {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service Worker not supported');
  }

  if (!('Notification' in window)) {
    throw new Error('Notification not supported');
  }
}

const registerSW = async () => {
  const registration = await navigator.serviceWorker.register('sw.js');
  return registration;
}

const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();

  if (permission !== 'granted') {
    throw new Error('Permission not granted');
  }
}

const main = async () => {
  checKPermission();
  await requestNotificationPermission();
  await registerSW();
  // reg.showNotification("Hello World", { body: "This is a notification" });
}
