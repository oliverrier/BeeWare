import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import { defaultRiddles } from '../models/Riddle';

const Riddle: React.FC = () => {
  const id = useParams<{ id: string }>().id;
  const riddleWithCompnent = defaultRiddles.find((riddle) => riddle.id === id);
  const Component = riddleWithCompnent?.component;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'primary'}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" text="Back" />
          </IonButtons>
          <IonTitle className="ion-text-center">
            Beeware
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      {Component && riddleWithCompnent ? <Component riddle={riddleWithCompnent} /> : 'Rien ici'}
    </IonPage>
  );
};

export default Riddle;
