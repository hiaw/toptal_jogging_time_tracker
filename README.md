# Jogging Time Logger


## Mobile app

To launch in iOS or Android,


```
cd jogging_time_tracker
react-native run-ios 
react-native run-android
```

## Server

To start the server,

```
cd jogging_time_tracker_featherjs
npm start
```

## Test

### Mobile Unit testing

To run unit test,

```
cd jogging_time_tracker
npm test
npm run cover
```

![E2E Test](doc/detox_test.png "E2E Test Result")

### Mobile E2E testing

To run the e2e test, restart server. 

```
cd jogging_time_tracker
npm run detox-build
npm run detox-text
```

![Test Coverage](doc/jest_cover.png "Test Coverage Result")

![E2E test demo](doc/jest_demo.gif "Test Coverage Test demo")


### Server

To run server unit test

```
cd jogging_time_tracker_featherjs
npm test
```
