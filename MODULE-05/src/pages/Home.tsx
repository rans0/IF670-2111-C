import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center">
        <h2>00000032731 - Kharansyah TS</h2>
        <IonButton expand="block" routerLink="/bmi">BMI CALCULATOR</IonButton>
        <IonButton expand="block" routerLink="/bmr">BMR CALCULATOR</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
