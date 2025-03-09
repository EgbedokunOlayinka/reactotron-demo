import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect} from 'react';
import Reactotron from 'reactotron-react-native';
if (__DEV__) {
  require('./ReactotronConfig');
}

function App(): React.JSX.Element {
  const fetchData = async () => {
    const token = 'testing';
    const bench = Reactotron.benchmark('fetch data function benchmark');
    bench.step('Step 1');
    try {
      const response = await axios.get('https://fakestoreapi.com/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      bench.step('Step 2');
      if (response.data) {
        await axios.get('https://fakestoreapi.com/products/1', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        bench.stop('Step 3');
        await axios.get('https://fakestoreapi.com/productss', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      return response.data;
    } catch (error) {
      console.log('An error occurred');
      return null;
    }
  };

  const runAsyncStorageActions = async () => {
    await AsyncStorage.setItem('productId', '1');
    await AsyncStorage.removeItem('productId');
  };

  const testFunction = () => {
    const bench = Reactotron.benchmark('test function benchmark');
    let res = 1;
    bench.step('Step 1');
    res += 100;
    bench.step('Step 2');
    Array.from({length: res}, (_, i) => i + 1).map(i => {
      res += 1;
    });
    bench.stop('Step 3');
  };

  useEffect(() => {
    fetchData();
    runAsyncStorageActions();
    testFunction();
  }, []);

  return <></>;
}

export default App;
