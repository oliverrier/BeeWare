import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonPage, IonProgressBar, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import RiddleListings from '../components/RiddleListings';
import './Home.css';

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonHeader collapse="condense">
                <IonToolbar color={'primary'}>
                    <IonTitle>Beeware</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent >
                <IonCard>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="4" >
                                <IonCardHeader>
                                    <IonCardSubtitle>Pseudo</IonCardSubtitle>
                                    <IonImg src="https://www.searchpng.com/wp-content/uploads/2019/02/Profile-ICon.png" />
                                </IonCardHeader>
                            </IonCol>
                            <IonCol>
                                <IonCardContent>
                                    <p>Temps total passé sur les épreuves: 0min</p>
                                    <p>Énigmes complétés :  3/??</p>
                                    <IonProgressBar type="indeterminate" />
                                </IonCardContent>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCard>
                <RiddleListings />
            </IonContent>
        </IonPage >
    );
};

export default Home;
