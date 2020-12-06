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
import { apertureOutline, navigateCircleOutline } from 'ionicons/icons';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../../data/app-context';
import { Riddle } from '../../models/Riddle';
import { checkCode } from '../../utils/utils';

interface Position {
  latitude: number;
  longitude: number;
}

const TreasureHunt: React.FC<{ riddle: Riddle }> = (props) => {
  const appCtx = useContext(AppContext);
  const history = useHistory();

  const [inputCode, setInputCode] = useState('');
  const [userPosition, setUserPosition] = useState<Position | undefined>(
    undefined
  );
  const [startPosition, setStartPosition] = useState<Position | undefined>(
    undefined
  );
  const [win, setWin] = useState(false);

  const successfulRiddle = () => {
    if (!props.riddle || !checkCode('Tre4surE', inputCode)) return;
    let updateRiddle = { ...props.riddle };
    updateRiddle.isSuccess = true;
    updateRiddle.timeSec = (new Date().getTime() - timeStart.getTime()) / 1000;
    appCtx.updateRiddle(updateRiddle);
    history.replace('/');
  };

  const getLocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      setUserPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      if (!startPosition) {
        setStartPosition(userPosition);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cheat = () => {
    setUserPosition({
      latitude: 50,
      longitude: 3,
    });
  };

  getLocation();

  const timeStart = new Date();

  if (
    !win &&
    userPosition &&
    startPosition &&
    (userPosition.latitude !== startPosition.latitude ||
      userPosition.longitude !== startPosition.longitude)
  ) {
    setWin(true);
  }

  return (
    <IonContent fullscreen>
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCard>
            <p>Cette zone changera en fonction de l'énigme. Chasse au trésor</p>
          </IonCard>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol>
            <p>Position de départ :</p>
            {startPosition ? (
              <p>
                {startPosition.latitude} - {startPosition.longitude}
              </p>
            ) : (
              <p>Pas de coordonnées</p>
            )}
          </IonCol>

          <IonCol>
            <p>Position actuelle :</p>
            {userPosition ? (
              <p>
                {userPosition.latitude} - {userPosition.longitude}
              </p>
            ) : (
              <p>Pas de coordonnées</p>
            )}
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol size="1">
            <IonButton mode="ios" fill="outline" onClick={getLocation}>
              <IonIcon icon={navigateCircleOutline} />
              <IonLabel>getLocation</IonLabel>
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol size="1">
            <IonButton mode="ios" fill="outline" onClick={cheat}>
              <IonIcon icon={apertureOutline} />
              <IonLabel>cheat</IonLabel>
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
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
      {win && (
        <IonItem color="primary">
          <IonLabel className="ion-text-center">Le code est: Tre4surE</IonLabel>
        </IonItem>
      )}
    </IonContent>
  );
};

export default TreasureHunt;
