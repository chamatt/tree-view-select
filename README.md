# Tree View Select

This repository is an implementation of a code challenge. You can find it's description below.

You can try out the live version here: [https://tree-view-select.vercel.app](tree-view-select.vercel.app)

Highlights:

- Implements the challenge fully
- Fully keyboard accessible
- Fully typed in typescript
- Uses Context API + useReducer for handling the logic of the application
- The state of each tab is isolated and persisted in the localStorage using an individual id
- It saves the state to localstorage after a 500ms debounce.
- Uses Jest + React-Testing-Library for testing
- 100% test coverage

![image](https://user-images.githubusercontent.com/20344348/126103168-0ee81ea8-ce5d-4aea-94cd-1b8c0d02f801.png)

## Available Commads

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn test:ci`

Runs the tests in CI mode

### `yarn build`

Builds the app for production to the `build` folder.

# Challenge Description:

The original description can be found here: [Hi-Platform Front-end Code Challenge](https://github.com/HiPlatform/prova-frontend)

In our frontend challenge, we ask you to implement the following component.
The component is a simple item tree, where each item can have several children linked to it.
Below you can see how the tree can be rendered:

### Video:

![tree.gif](https://github.com/HiPlatform/prova-frontend/blob/master/tree.gif?raw=true)

### Screenshot:

![tree.png](https://github.com/HiPlatform/prova-frontend/blob/master/tree.png?raw=true)

Along with this repository, there's a file `data.json` containing the data to render the tree. The structure of a single item looks like this:

```
 "1": {
    "id": "a853dddc-b639-41e6-a876-958b1e7f65d1",
    "name": "Harald Svante August",
    "children": {}
  }
```

##### [](https://github.com/chamatt/tree-view-select#behaviour)Expected Behaviour:

- For each item, the user must be able to check/uncheck the row checkbox.
- For each item that has a children (that is, a parent item), when the user checks or unchecks the checkbox, the state must be cascated down to it's descendents.
- For each item that's also a parent, the user must be able to show/hide the children.

##### [](https://github.com/chamatt/tree-view-select#freedom)Leeway:

- You may use whatever tech stack best fits your skills.
- You are free to structure you code the way you deem best.
- You are free to implement the code using any patterns you find most appropriate.
- You can add functionalities to the component as you wish, but keep it simple.

##### [](https://github.com/chamatt/tree-view-select#nice-to-have)We value attention to details in the following points:

- Coupling and Cohesion
- Tests
- Performance
- State Recovery (e.g. recovering the checkbox states after a page refresh)
- User Experience (click area, scroll jump, etc.)

Have fun!
