# Groceries

This repository is based off NativeScript’s [TypeScript & Angular 2 Getting Started Guide](http://docs.nativescript.org/angular/tutorial/ng-chapter-0). It assumes that you have some knowledge of both [NativeScript](https://www.nativescript.org/) and [Angular 2](https://angular.io/)

### Quick-start

Be sure to have followed NativeScript's [installation guide](https://docs.nativescript.org/angular/start/quick-setup.html). To start contributing or view the application, clone the repo. CD into that newly created directory and run

```
npm install
npm run start:android or npm run start:ios
```

## Explanation of Branches

### master

Master implements some of the principles discussed in Victor Savkin's article [Tackling State](https://vsavkin.com/managing-state-in-angular-2-applications-caf78d123d02#.o4ylm05j2)

### ngrx

NgRx implements (you guessed it) some of the principles of [ngrx](https://github.com/ngrx) based off [various](https://gist.github.com/btroncone/a6e4347326749f938510) [articles](http://onehungrymind.com/build-better-angular-2-application-redux-ngrx/)

### ngrx_effects

This branch implements refactors services in favor of [effects](https://github.com/ngrx/effects)
