import Reactotron, {asyncStorage} from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage).configure({
  name: require('./package.json').name,
  host: 'localhost',
  onConnect: () => {
    /** since this file gets hot reloaded, let's clear the past logs every time we connect */
    Reactotron.clear();
  },
});

reactotron.use(asyncStorage()).useReactNative().connect();
