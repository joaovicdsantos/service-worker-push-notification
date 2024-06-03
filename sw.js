const urlBase64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

const saveSubcription = async (subscription) => {
  const response = await fetch("http://localhost:3000/save-subscription", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(subscription)
  })

  return response.json()
}

self.addEventListener("activate", async () => {
  const subscription = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array("BOaMv3wE61jp5l103bfkgsk-M-oGeIVIbSs1hHLSwiZMaZ4dhcK2wQm_Pm2rFKxjdx0M-GexI79fAGFKiSfMCUM")
  });

  const response = await saveSubcription(subscription);
  console.log(response);
});

self.addEventListener("push", (e) => {
  self.registration.showNotification("Hello World", { body: e.data.text() });
})
