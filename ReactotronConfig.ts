import AsyncStorage from "@react-native-async-storage/async-storage";
import Reactotron from "reactotron-react-native";

// Simple Reactotron configuration
const reactotron = Reactotron
  .configure({
    name: "Medicare App",
    host: "localhost", // Add explicit host
  })
  .useReactNative({
    asyncStorage: false,
    networking: {
      ignoreUrls: /symbolicate/,
    },
    editor: false,
    errors: { veto: (stackFrame) => false },
    overlay: false,
  })
  .setAsyncStorageHandler(AsyncStorage)
  .connect();

// Make Reactotron globally available
if (__DEV__) {
  (global as any).__REACTOTRON__ = reactotron;
  (console as any).tron = reactotron;
}

export default reactotron;
