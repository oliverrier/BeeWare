import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonTitle,
} from '@ionic/react';
import React, { useContext, useState } from 'react';
import AppContext from '../../data/app-context';
import { Riddle } from '../../models/Riddle';
import { checkCode } from '../../utils/utils';
import { useHistory } from "react-router-dom";
import { Plugins } from '@capacitor/core';
import { setTimeout } from 'timers';



const Light: React.FC<{ riddle: Riddle }> = (props) => {
  const appCtx = useContext(AppContext);
  const history = useHistory();
  const { Device } = Plugins;

  const [timeStart] = useState(new Date())
  const [inputCode, setInputCode] = useState('');
  const [isWin, setWin] = useState(false)
  const [lightOff] = useState('https://cdn.discordapp.com/attachments/563058373663260673/785229310998216714/ligthoff.png');
  const [lightOn] = useState('https://cdn.discordapp.com/attachments/563058373663260673/785229329139367966/ligthon.png');
  const [isUp, setIsUp] = useState(false);
  let interval: any = undefined;


  const checkBattery = async () => {
    const info = await Device.getBatteryInfo();
    console.log(info)
    info.isCharging ? setWin(true) : setTimeout(checkBattery, 100);
  }


  if (!isUp) {
    setIsUp(true);
    checkBattery()
  }

  const successfulRiddle = () => {
    if (!props.riddle || !checkCode('ggwp', inputCode)) return;
    let updateRiddle = { ...props.riddle };
    updateRiddle.isSuccess = true;
    updateRiddle.timeSec = (new Date().getTime() - timeStart.getTime()) / 1000;
    appCtx.updateRiddle(updateRiddle);
    history.replace("/")
  };

  return (
    <IonContent>
      <IonCard>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol>
              <IonCardHeader>
                <IonTitle>{props.riddle!.name}</IonTitle>
              </IonCardHeader>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size="7">
              <IonCardHeader>
                <IonImg src={!isWin ? lightOff : lightOn} />
              </IonCardHeader>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol>
              <IonList>
                <IonItem>
                  <IonInput
                    className="ion-text-center"
                    onIonChange={(event) =>
                      setInputCode(event.detail.value || '')
                    }
                  ></IonInput>
                  <IonButton color="primary" onClick={successfulRiddle}>
                    Valider
                  </IonButton>
                </IonItem>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCard>
    </IonContent>
  );
};

export default Light;
