import express from "express";
import cors from "cors";
import webpush from 'web-push';

const port = 3000;
const apiKeys = {
  publicKey: "BOaMv3wE61jp5l103bfkgsk-M-oGeIVIbSs1hHLSwiZMaZ4dhcK2wQm_Pm2rFKxjdx0M-GexI79fAGFKiSfMCUM",
  privateKey: "mEbdwZE6ozt5-DDpUnXuOavUc_lFsxvjnmFMsxa9Nuk"
}

webpush.setVapidDetails(
  'mailto:joaovicdsantos@gmail.com',
  apiKeys.publicKey,
  apiKeys.privateKey
)

const app = express();

app.use(cors());
app.use(express.json())

app.get("/", (_, res) => {
  res.send("Hello World!");
})

const subDatabase = [];

app.post("/save-subscription", (req, res) => {
  subDatabase.push(req.body);
  res.json({
    status: "success",
    message: "Subscription saved successfully"
  })
})

app.get("/send-notification", (_, res) => {
  subDatabase.forEach((sub) => {
    webpush.sendNotification(sub, "Hello World!")
  })
  res.json({
    status: "success",
    message: "Notification sent successfully"
  })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}!`)
})
