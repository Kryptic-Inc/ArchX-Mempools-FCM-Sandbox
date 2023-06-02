# ArchX-Mempools-FCM-Sandbox

This is a basic React Native application that provides a sandbox for testing Firebase Cloud Messaging (FCM) for sending push notifications.

## Prerequisites

Before getting started, make sure you have the following installed on your machine:

- Node.js: Install Node.js from the official website: https://nodejs.org
- Android Studio: Download and install Android Studio from the official website: https://developer.android.com/studio

Make sure to set up Android Studio properly, including installing the necessary SDKs and setting up an Android Virtual Device (AVD) for running the emulator.

## Getting Started

1. Clone the repository:

```
git clone <repository_url>
```

2. Install dependencies:

```
cd ArchX-Mempools-FCM-Sandbox
npm install
```

3. Configure Firebase

   - Go to the Firebase Console: https://console.firebase.google.com/
   - Create a new project or select an existing project.
   - Set up an Android app in your Firebase project:
     - Click on the "Add app" button and select "Android".
     - Follow the setup instructions and download the `google-services.json` file.

4. Add `google-services.json` to the Android app directory:

   - Copy the `google-services.json` file you downloaded from the Firebase console.
   - Paste it into the `android/app/` directory of the cloned repository.

5. Rename the application and package name:

   - Run the following command in the root directory of the cloned repository:

   ```bash
   npx react-native-rename "Your App Name" -b "com.yourPackageName"


   ```

   Replace "Your App Name" with your desired app name and "com.yourPackageName" with your desired package name or bundle identifier. The package name or bundle identifier should match the identifier entered when creating the Android app in the Firebase console for the google-services.json file. This command will update the necessary files with your new package name and app name.

6. Run the app:

   - Connect your Android device or start an Android emulator.
   - Run the following command to start the Metro server:

   ```
   npx react-native start
   ```

   - Open a new terminal window and run the following command to install and launch the app on your Android device or emulator:

   ```
   npx react-native run-android
   ```

7. Test FCM:

   - On the app screen, you will find a switch to enable FCM and a token container.
   - Toggle the switch to enable FCM registration.
   - If the registration is successful, you will see a permission token displayed in the container.
   - Copy the permission token from the container and use it in your backend to send test notifications.

8. Send a test notification message

   - Install and run the app on the android device.

   - Make sure the app is in the background on the device.

   - In the Firebase console, open the Messaging page.

   - If this is your first message, select Create your first campaign. Otherwise, on the Campaigns tab, select New campaign and then Notifications.

   - Enter the message text. All other fields are optional.

   - Select Send test message from the right pane.

   - In the field labeled Add an FCM registration token, enter the registration token you obtained in a previous section of this guide.

   - Select Test.

   This will send a test notification message to the device with the specified registration token. Check your device to see if the notification is received successfully.
