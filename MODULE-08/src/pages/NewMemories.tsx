import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Memoriescontext from "../data/memories-context";
import { camera } from "ionicons/icons";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { base64FromPath } from "@ionic/react-hooks/filesystem";
import { useContext, useRef, useState } from "react";

import "../assets/NewMemories.css";
import { useHistory } from "react-router";

const NewMemories = () => {
  const memoriesCtx = useContext(Memoriescontext);
  const history = useHistory();

  const [takenPhoto, setTakenPhoto] = useState<{
    path: string;
    preview: string;
  }>();

  const [choosenMemoryType, setChoosenMemoryType] = useState<"good" | "bad">(
    "good"
  );

  const titleRef = useRef<HTMLIonInputElement>(null);

  const selectedMemoryTypeHandler = (event: CustomEvent) => {
    const selectedMemoryType = event.detail.value;
    setChoosenMemoryType(selectedMemoryType);
  };

  const addMemoryHandler = async () => {
    const enteredTitle = titleRef.current?.value;
    if (
      !enteredTitle ||
      enteredTitle.toString().trim().length === 0 ||
      !takenPhoto ||
      !choosenMemoryType
    ) {
      return;
    }

    const filename = new Date().getTime() + ".jpeg";
    const base64 = await base64FromPath(takenPhoto!.preview);
    await Filesystem.writeFile({
      path: filename,
      data: base64,
      directory: Directory.Data,
    });

    memoriesCtx.addMemory(
      filename,
      base64,
      enteredTitle.toString(),
      choosenMemoryType
    );
    history.length > 0 ? history.goBack() : history.replace("/goodmemories");
  };

  const takePhotohHandler = async () => {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 80,
      width: 500,
    });

    console.log(image);

    if (!image || !image.path || !image.webPath) {
      return;
    }

    setTakenPhoto({
      path: image.path,
      preview: image.webPath,
    });
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Add New Memories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard className="new-memories-card">
                <IonInput
                  type="text"
                  ref={titleRef}
                  placeholder="Fill Memory Title"
                />
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard className="new-memories-card">
                <IonSelect onIonChange={selectedMemoryTypeHandler} value="good">
                  <IonSelectOption value="good">Good Memory</IonSelectOption>
                  <IonSelectOption value="bad">Bad Memory</IonSelectOption>
                </IonSelect>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow className="ion-text-center">
            <IonCol>
              <div className="image-preview">
                {!takenPhoto && <h3>No Photo Choosen</h3>}
                {takenPhoto && <img src={takenPhoto.preview} alt="preview" />}
              </div>
              <IonButton fill="clear" onClick={takePhotohHandler}>
                <IonIcon slot="start" icon={camera} />
                <IonLabel>Take Photo</IonLabel>
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow className="ion-margin-top">
            <IonCol className="ion-text-center">
              <IonButton onClick={addMemoryHandler}>Add Memory</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default NewMemories;
