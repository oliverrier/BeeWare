import React, { useState, useEffect, useRef } from 'react';
import AppContext from './app-context';
import { Riddle, defaultRiddles } from '../models/Riddle';
import { Profile, defaultProfile } from '../models/Profile';
import { GeolocationPosition, Plugins } from '@capacitor/core';

const { Storage } = Plugins;

const AppContextProvider: React.FC = (props) => {
  const [riddles, setRiddles] = useState<Riddle[]>(defaultRiddles);
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      Storage.set({ key: 'profile', value: JSON.stringify(profile) });
      Storage.set({ key: 'riddles', value: JSON.stringify(riddles) });
    }
    else {
      didMountRef.current = true;
    }

  }, [profile, riddles]);

  const updateRiddle = (updateRiddle: Riddle) => {
    const index = riddles.map((el) => el.id).indexOf(updateRiddle.id);
    setRiddles((prevState) => {
      let newList = [...prevState];
      newList.splice(index, 1, updateRiddle);
      return newList;
    });
  };

  const updateProfile = (updateProfile: Profile) => {
    setProfile(updateProfile);
  };

  const initContext = async () => {
    const profileData = await Storage.get({ key: 'profile' });
    const riddlesData = await Storage.get({ key: 'riddles' });
    const storedProfile = profileData.value
      ? JSON.parse(profileData.value)
      : defaultProfile;
    const storedRiddles = riddlesData.value
      ? JSON.parse(riddlesData.value)
      : defaultRiddles;
    setProfile(storedProfile);
    setRiddles(storedRiddles);
  };

  return <AppContext.Provider value={{ initContext, riddles, profile, updateProfile, updateRiddle, }}>
    {props.children}
  </AppContext.Provider>
};

export default AppContextProvider;
