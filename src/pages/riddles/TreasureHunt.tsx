import { GeolocationPosition } from '@capacitor/core';
import { Geolocation } from '@capacitor/core/dist/esm/web/geolocation';
import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
} from '@ionic/react';
import { save } from 'ionicons/icons';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../data/app-context';
import { Riddle } from '../../models/Riddle';
import { checkCode } from '../../utils/utils';

interface Position {
  latitude: number;
  longitude: number;
}

const TreasureHunt: React.FC<{ riddle: Riddle }> = (props) => {
  const getLocation = async () => {
    try {
      position = await Geolocation.getCurrentPosition();
      console.log('position: ', position);
      setUserPosition({ ...position.coords });
    } catch (error) {
      console.log(error);
    }
  };

  const successfulRiddle = () => {
    if (!props.riddle || !checkCode('Tre4surE', inputCode)) return;
    let updateRiddle = { ...props.riddle };
    updateRiddle.isSuccess = true;
    updateRiddle.timeSec = (new Date().getTime() - timeStart.getTime()) / 1000;
    appCtx.updateRiddle(updateRiddle);
  };

  const appCtx = useContext(AppContext);

  const [inputCode, setInputCode] = useState('');
  const [userPosition, setUserPosition] = useState({} as Position);

  let position: GeolocationPosition;

  getLocation();

  const timeStart = new Date();
  const startPosition = userPosition;

  return (
    <IonContent fullscreen>
      <IonGrid>
        <IonRow>
          <IonCard>
            <p>Cette zone changera en fonction de l'énigme. Chasse au trésor</p>
          </IonCard>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonCard>
              <p>Position de départ :</p>
              {startPosition ? (
                <p>
                  {startPosition.latitude} - {startPosition.longitude}
                </p>
              ) : (
                <p>Pas de coordonnées</p>
              )}
            </IonCard>
          </IonCol>

          <IonCol>
            <IonCard>
              <p>Position actuelle :</p>
              {userPosition ? (
                <p>
                  {userPosition.latitude} - {userPosition.longitude}
                </p>
              ) : (
                <p>Pas de coordonnées</p>
              )}
            </IonCard>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="1" offset="4">
            <IonButton mode="ios" fill="outline" onClick={() => getLocation()}>
              <IonIcon icon={save} />
              <IonLabel>getLocation</IonLabel>
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonItem>
            <IonInput
              className="ion-text-center"
              onIonChange={(event) => setInputCode(event.detail.value || '')}
            ></IonInput>
            <IonButton color="primary" onClick={successfulRiddle}>
              Valider
            </IonButton>
          </IonItem>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default TreasureHunt;
