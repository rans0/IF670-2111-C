import { isPlatform } from "@ionic/core";
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { addOutline, banSharp, pencil, trash } from "ionicons/icons";
import React, { useContext, useRef, useState } from "react";
import avatar1 from "../assets/images/avatar1.png";
import avatar2 from "../assets/images/avatar2.png";
import avatar3 from "../assets/images/avatar3.jpg";
import FriendsContext from "../data/friend-context";
import "../styles/Meet.css";

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
  const nameRef = useRef();
  const friendsCtx = useContext(FriendsContext);
  const [startDeleting, setStartDeleting] = useState(false);
  const [block, setBlock] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<{
    id: string;
    avatar: string;
    name: string;
  } | null>();

  const startEditFriendHandler = (friendId: string) => {
    slidingOptionsRef.current?.closeOpened();
    const friend = FRIENDS_DATA.find((f) => f.id === friendId);
    setSelectedFriend(friend);
    setIsEditing(true);
  };

  const cancelEditingHandler = () => {
    setIsEditing(false);
  };

  const startDeleteFriendHandler = (e: React.MouseEvent) => {
    setStartDeleting(true);
    slidingOptionsRef.current?.closeOpened();
  };

  const startBlockFriendHandler = (e: React.MouseEvent) => {
    slidingOptionsRef.current?.closeOpened();
    setBlock(true);
  };

  const callFriendHandler = () => {
    console.log("Calling....");
  };

  const blockFriendHandler = (e: React.MouseEvent) => {
    setToastMessage("BLocked Friend");
    console.log("Blocking....");
  };

  const deleteFriendHandler = () => {
    setStartDeleting(false);
    setToastMessage("Deleted Friend");
    console.log("Deleting....");
  };

  const editFriendHandler = (e: React.MouseEvent) => {
    slidingOptionsRef.current?.closeOpened();
    console.log("Editing....");
  };

  const startAddFriendHandler = () => {
    console.log("adding friend ...");
    setIsEditing(true);
    setSelectedFriend(null);
  };

  const saveFriendHandler = () => {
    // const enteredName = nameRef.current?.value;
  };

  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);

  return (
    <>
      <IonAlert
        isOpen={startDeleting}
        header="Are you sure ?"
        message="Do you want to delete your friend? This cannot be undone"
        buttons={[
          {
            text: "No",
            role: "cancel",
            handler: () => {
              setStartDeleting(false);
            },
          },
          {
            text: "Yes",
            handler: deleteFriendHandler,
          },
        ]}
      />
      <IonAlert
        isOpen={block}
        header="Are you sure ?"
        message="Do you want to block your friend? This cannot be undone"
        buttons={[
          {
            text: "No",
            role: "cancel",
            handler: () => {
              setBlock(false);
            },
          },
          {
            text: "Yes",
            handler: blockFriendHandler,
          },
        ]}
      />
      <IonToast
        isOpen={!!toastMessage}
        message={toastMessage}
        duration={2000}
        onDidDismiss={() => {
          setToastMessage("");
        }}
      />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            {!isPlatform("android") && (
              <IonButtons slot="end">
                <IonButton onClick={startAddFriendHandler}>
                  <IonIcon icon={addOutline} />
                </IonButton>
              </IonButtons>
            )}
            <IonTitle>Meet</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {/* Modal */}
          <IonModal isOpen={isEditing}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Add Friend</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonGrid>
                <IonRow>
                  <IonInput
                    type="text"
                    placeholder="Add friend"
                    value={selectedFriend?.name}
                  />
                </IonRow>
                <IonRow className="ion-text-center">
                  <IonCol>
                    <IonButton
                      fill="clear"
                      color="dark"
                      onClick={cancelEditingHandler}
                    >
                      Cancel
                    </IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton color="secondary" expand="block">
                      Save
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonContent>
          </IonModal>
          {/* End modal */}
          <IonList>
            {FRIENDS_DATA.map((friend) => (
              <IonItemSliding key={friend.id} ref={slidingOptionsRef}>
                <IonItemOptions side="start">
                  <IonItemOption
                    color="danger"
                    onClick={startBlockFriendHandler}
                  >
                    <IonIcon icon={banSharp} slot="icon-only" />
                  </IonItemOption>
                  <IonItemOption
                    color="warning"
                    onClick={startDeleteFriendHandler}
                  >
                    <IonIcon icon={trash} slot="icon-only" />
                  </IonItemOption>
                </IonItemOptions>
                <IonItemOptions side="end">
                  <IonItemOption
                    color="warning"
                    onClick={startEditFriendHandler.bind(null, friend.id)}
                  >
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
          {isPlatform("android") && (
            <IonFab horizontal="end" vertical="bottom" slot="fixed">
              <IonFabButton color="secondary" onClick={startAddFriendHandler}>
                <IonIcon icon={addOutline} />
              </IonFabButton>
            </IonFab>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Meet;
