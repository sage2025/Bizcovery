# BIZCOVERY

## Description

BIZCOVERY provides Business Continuity measures for micro and small businesses. Unprepared for potential disasters which could disrupt or destroy your business? Don't have the resources for a complex Business Continuity plan? BIZCOVERY could help you should disaster strike.

Sign up for BIZCOVERY at www.biz-covery.com and on the website undertake risk analyses to assess the liklihood and impact of potential disaster events.

Once you have have decided which potential events may affect your business, you put together lists of actions to be taken should the event occur. These actions are taken from suggestions provided by the BIZCOVERY team - with over 20 years experience in the field - and actions which you can add yourselves.

These are published to the app in the form of Action Cards. This means you have immediate access to a coherent plan of attack should disaster strike.

This is a time when seconds and minutes are vital and the response could save the business.

Visit website
https://www.biz-covery.com

Unit 3D North Point House, North Point Business Park, New Mallow Road, Cork T23 AT2P, Ireland.

## Culture & Development process
* We use CI/CD integration with [Github Actions](https://github.com/features/actions)

## Technical guideline
* We use React Native(https://reactnative.dev) and Expo (https://expo.io)
* Our project is using [Expo CLI](https://docs.expo.io/workflow/expo-cli/), you can follow guide from their official website

### Outline of code
* _assets_ - resources used in BIZCOVERY app project.
* _src/components/auth_ - Login and Logout page.
* _src/components/menus_ - critical, people, premises, processes, profile, provider action card pages.
* _src/components/shared_ - components used often in project.

### Expo CLI environments
```bash
$ npm install

# start a local dev server for the app
$ expo start

# build and sign a standalone IPA for the Apple App Store
$ expo build:ios

# build and sign a standalone APK or App Bundle for the Google Play Store
$ expo build:android

# build the web app for production
$ expo build:web
```
