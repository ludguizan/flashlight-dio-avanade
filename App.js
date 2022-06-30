import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

import ecoLight from './assets/icons/eco-light.png';
import ecoLightOff from './assets/icons/eco-light-off.png';
import dio from './assets/icons/logo-dio.png';
import dioWhite from './assets/icons/logo-dio-white.png';

const App = () => {
  const [toggle, setToggle] = useState(false); 

  const handleChangeToggle = ()=> setToggle(oldTouggle => !oldTouggle);

  useEffect(()=>{
    //Liga flash do celular
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    // Quando o celular for chacoalhado, mudaremos o toggle
    
    const subscription = RNShake.addListener(()=>{
      setToggle(oldTouggle => !oldTouggle);
    });
    //Essa func vai ser chamada quando o componente
    //for ser desmontado
    return () => subscription.remove();
  }, []);

  return (
    <View style={toggle ? style.containerLight : style.container}>
      <TouchableOpacity onPress={handleChangeToggle}>
      <Image 
        style={toggle ? style.lightingOn : style.lightingOff}
        source={toggle ? ecoLight : ecoLightOff}
      />

      <Image 
        style={style.logoDio} 
        source={toggle ? dio : dioWhite} 
      />
      </TouchableOpacity>      
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    widht: 150,
    height: 150,
  },
  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    widht: 150,
    height: 150,
  },

  logoDio: {
    resizeMode: 'contain',
    alignSelf: 'center',
    widht: 100,
    height: 100,
    marginTop: 60,
  },
  
});