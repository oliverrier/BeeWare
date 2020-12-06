import {
  Filesystem,
  FilesystemDirectory,
  Camera,
  CameraResultType,
  CameraSource,
} from '@capacitor/core';
import {
  IonAlert,
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../data/app-context';
import { Riddle } from '../models/Riddle';
import { base64FromPath } from '@capacitor-community/react-hooks/filesystem';

const User: React.FC = () => {
  const appCtx = useContext(AppContext);
  const [showAlert, setShowAlert] = useState(false);
  const [profileBase64, setProfileBase64] = useState<string>();

  const updateBase64 = async () => {
    if (!appCtx.profile.picture) return;
    const file = await Filesystem.readFile({
      path: appCtx.profile.picture,
      directory: FilesystemDirectory.Data,
    });
    setProfileBase64('data:image/jpeg;base64,' + file.data);
  };

  useEffect(() => {
    updateBase64();
  }, [appCtx.profile.picture]);

  const takePhotoHandler = async () => {
    const photo = await Camera.getPhoto({
      quality: 80,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      width: 500,
    });

    if (!photo || !photo.webPath) return;

    const base64 = await base64FromPath(photo.webPath);
    const fileName = new Date().getTime() + '.jpeg';
    await Filesystem.writeFile({
      path: fileName,
      data: base64,
      directory: FilesystemDirectory.Data,
    });

    let updatedProfile = { ...appCtx.profile };
    updatedProfile.picture = fileName;
    appCtx.updateProfile(updatedProfile);
  };

  const updateUsername = (newUsername: string) => {
    let updatedProfile = { ...appCtx.profile };
    updatedProfile.username = newUsername;
    appCtx.updateProfile(updatedProfile);
  };

  return (
    <IonPage>
      <IonContent>
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
        <IonCard>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonCardHeader>
                  <IonImg
                    src={
                      profileBase64
                        ? profileBase64
                        : 'https://www.searchpng.com/wp-content/uploads/2019/02/Profile-ICon.png'
                    }
                    onClick={takePhotoHandler}
                  />
                  <IonCardTitle onClick={() => setShowAlert(true)}>
                    {appCtx.profile.username}
                  </IonCardTitle>
                </IonCardHeader>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonCardContent>
            <IonGrid>
              {appCtx.riddles.map((riddle: Riddle) => (
                <IonRow key={riddle.id}>
                  <IonCol>
                    <IonItem color={riddle.isSuccess ? 'primary' : 'secondary'}>
                      <IonLabel>
                        {riddle.name} : {riddle.timeSec} seconds
                      </IonLabel>
                    </IonItem>
                  </IonCol>
                </IonRow>
              ))}
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={'Username'}
        inputs={[
          {
            name: 'usernameInput',
            type: 'text',
            id: 'profile-username',
            value: appCtx.profile.username,
            placeholder: 'Your username',
          },
        ]}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Confirm Cancel');
            },
          },
          {
            text: 'Ok',
            handler: (alertData) => updateUsername(alertData.usernameInput),
          },
        ]}
      />
    </IonPage>
  );
};

export default User;
