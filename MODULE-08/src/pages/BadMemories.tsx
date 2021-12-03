import {
  IonButton,
  IonButtons,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import Memoriescontext from "../data/memories-context";
import { useContext } from "react";
import { addOutline } from "ionicons/icons";

const BadMemories = () => {
  const memoriesCtx = useContext(Memoriescontext);
  const badMemories = memoriesCtx.memories.filter(
    (memory) => memory.type === "bad"
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bad Memories</IonTitle>
          {!isPlatform("android") && (
            <IonButtons slot="end">
              <IonButton routerLink="/newmemories">
                <IonIcon icon={addOutline} />
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h2>Bad Memories</h2>
        <IonGrid>
          {badMemories.length === 0 && (
            <IonRow>
              <IonCol>
                <h2>Bad Memories</h2>
              </IonCol>
            </IonRow>
          )}
          {badMemories.map((memory) => (
            <IonRow key={memory.id}>
              <IonCol>
                <img src={memory.base64Url} alt={memory.title} />
                <IonCardHeader>
                  <IonCardTitle>{memory.title}</IonCardTitle>
                </IonCardHeader>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
        {isPlatform("android") && (
          <IonFab horizontal="end" vertical="bottom" slot="fixed">
            <IonFabButton color="secondary" routerLink="/tabs/new">
              <IonIcon icon={addOutline} />
            </IonFabButton>
          </IonFab>
        )}
        {isPlatform("android") && (
          <IonFab horizontal="end" vertical="bottom" slot="fixed">
            <IonFabButton color="secondary" href="/goodmemories">
              <IonIcon icon={addOutline} />
            </IonFabButton>
          </IonFab>
        )}
      </IonContent>
    </IonPage>
  );
};

export default BadMemories;
