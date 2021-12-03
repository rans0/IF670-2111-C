import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { banSharp, pencil, trash } from "ionicons/icons";
import { useRef } from "react";
import avatar1 from "../assets/images/avatar1.png";
import avatar2 from "../assets/images/avatar2.png";
import avatar3 from "../assets/images/avatar3.jpg";
import "../theme/Meet.css";

export const FRIENDS_DATA = [
  {
    id: "F1",
    avatar: avatar1,
    name: "John Thor",
  },
  { id: "F2", avatar: avatar2, name: "John Ness" },
  { id: "F3", avatar: avatar3, name: "John Doe" },
];

const Meet = () => {
  const callFriendHandler = () => {
    console.log("Calling....");
  };
  const blockFriendHandler = (e: React.MouseEvent) => {
    slidingOptionsRef.current?.closeOpened();
    console.log("Blocking....");
  };

  const deleteFriendHandler = (e: React.MouseEvent) => {
    slidingOptionsRef.current?.closeOpened();
    console.log("Deleting....");
  };

  const editFriendHandler = (e: React.MouseEvent) => {
    slidingOptionsRef.current?.closeOpened();
    console.log("Editing....");
  };

  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Meet</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {FRIENDS_DATA.map((friend) => (
            <IonItemSliding key={friend.id} ref={slidingOptionsRef}>
              <IonItemOptions side="start">
                <IonItemOption color="danger" onClick={blockFriendHandler}>
                  <IonIcon icon={banSharp} slot="icon-only" />
                </IonItemOption>
                <IonItemOption color="warning" onClick={deleteFriendHandler}>
                  <IonIcon icon={trash} slot="icon-only" />
                </IonItemOption>
              </IonItemOptions>
              <IonItemOptions side="end">
                <IonItemOption color="warning" onClick={editFriendHandler}>
                  <IonIcon icon={pencil} slot="icon-only" />
                </IonItemOption>
              </IonItemOptions>
              <IonItem
                lines="full"
                button
                onClick={callFriendHandler}
                className="list-item"
              >
                <img src={friend.avatar} alt="Avatar" />
                <IonLabel>{friend.name}</IonLabel>
              </IonItem>
            </IonItemSliding>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Meet;
