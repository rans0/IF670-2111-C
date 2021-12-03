import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import { MAIL_DATA } from "./Mail";

const MailDetail = () => {
  const mail_id = useParams<{ mailId: string }>().mailId;
  const selected_mail = MAIL_DATA.find((m) => m.id === mail_id);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/mail" />
          </IonButtons>
          <IonTitle>
            {selected_mail ? selected_mail?.subject : "no mail found"}
          </IonTitle>
        </IonToolbar>
        <IonContent className="ion-padding">
          <h2>MAIL ID : {mail_id}</h2>
        </IonContent>
      </IonHeader>
    </IonPage>
  );
};

export default MailDetail;
