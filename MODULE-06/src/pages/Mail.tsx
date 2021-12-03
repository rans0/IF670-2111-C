import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

export const MAIL_DATA = [
  { id: "M1", subject: "Magang MBKM udh mulai" },
  { id: "M2", subject: "bimbingan skripsi" },
  { id: "M3", subject: "laporan magang" },
];

const Mail = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Ionic Mail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {MAIL_DATA.map((mail) => (
          <IonCard key={mail.id}>
            <IonCardContent className="ion-text-center">
              <h2>{mail.subject}</h2>
              <IonButton routerLink={`/mail/${mail.id}`}>View mail</IonButton>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Mail;
