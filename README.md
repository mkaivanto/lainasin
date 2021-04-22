# Lainasin

An app to keep track of what items you loaned to whom and when you are expecting to get it back.

- React Native
- SQLite for data persistence
- React Redux for app state
- React Native Paper for UI
- React Native Paper Dates for choosing a day
- React Navigation for routes
- React Native Image Picker for handling camera & library

## Features

- UI in Finnish
- Add loans
  - item
  - borrower
  - expiry day
  - image
- Mark loans as returned
- Remove loans
- Sort loans
- Separate screen for expired loans

TODO:

- local push notifications
- android support

## To develop

1. `yarn install`

2. `yarn run start`

3. and in a separate terminal `yarn run ios`
