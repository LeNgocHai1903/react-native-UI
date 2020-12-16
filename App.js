// redux
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/ConfigureStore";
const { persistor, store } = ConfigureStore();
import { PersistGate } from "redux-persist/es/integration/react";
import React from "react";
import Main from "./components/MainComponent";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}
