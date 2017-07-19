# Timelog Tracker Server by Daniel Chong for Toptal project interview

## About

This feathersjs app provide the REST backend for the mobile Timelog Tracker app

## Prerequisite

[Feathers](http://feathersjs.com), `node`

```
$ npm install -g feathers-cli             # Install Feathers CLI
```

## Get Started
```
yarn
npm start
```

## Testing
```
npm run mocha
```

## Test Result
```
  Feathers application tests
    ✓ starts and shows the index page (50ms)
      ✓ shows a 404 HTML page
      ✓ shows a 404 JSON error without stack trace

  REST filter timelog service
    ✓ should get list of timelogs (98ms)
    ✓ should limit timelog number
    ✓ should filter by timelog description

  REST filter timelog service
    ✓ should get list of timelogs
    ✓ should filter by description
    ✓ should filter by amount
    ✓ should limit results
    ✓ should filter by date
    ✓ should filter by date

  timelog service
    ✓ registered the timelogs service
    ✓ runs create

  REST timelog service
    ✓ should create the timelog data
    ✓ should create another the timelog data
    ✓ should get list of timelogs
    ✓ should get the timelog
    ✓ should update the timelog
    ✓ should delete the timelog
    ✓ should now only give single timelog

  REST as Admin timelog service
    ✓ registered the timelogs service
    ✓ should create the timelog data
    ✓ should create another the timelog data
    ✓ should get the timelog
    ✓ should update the timelog
    ✓ should delete the timelog

  REST as Admin timelog list service
    ✓ should create an timelog data
    ✓ user should get list of timelogs
    ✓ admin should get list of timelogs

  REST as Manager timelog service
    ✓ should create another the timelog data
    ✓ should not get the timelog
    ✓ should not update the timelog
    ✓ should not delete the timelog

  REST as Manager timelog list service
    ✓ should create an timelog data
    ✓ user should get list of timelogs
    ✓ manager should not get list of timelogs

  user service
    ✓ registered the users service
    ✓ runs create (106ms)

  REST user service
    ✓ should not get list of users
    ✓ should get the user
    ✓ should update the user
    ✓ should delete the user

  REST as Admin user service
    ✓ registered the users service
    ✓ should create the user data (123ms)
    ✓ should get list of users
    ✓ should get the user
    ✓ should update the user
    ✓ should delete the user

  REST as Manager user service
    ✓ registered the users service
    ✓ should create the user data (105ms)
    ✓ should get list of users
    ✓ should get the user
    ✓ should update the user
    ✓ should delete the user


  55 passing (5s)
```
