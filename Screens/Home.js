import React from 'react'
// import { Text } from 'react-native'
import HomeSwiper from '../Components/HomeSwiper'
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';

export default function Home({navigation}) {

  // const showProfile = () => {
  //   console.log("press");
    
  // }

  // const [visible, setVisible] = React.useState(false);

  // const showModal = () => setVisible(true);
  // const hideModal = () => setVisible(false);
  // const containerStyle = {backgroundColor: 'yellow', padding: 20};
  
  return (
    <>
     {/* <Text>Home page</Text>  */}

     {/* <PaperProvider> */}
     <HomeSwiper/>
     <Text>hsdvfzyuhddzvsdv</Text>
    {/* <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <Text>Example Modal.  Click outside this area to dismiss.</Text>
      </Modal>
    </Portal> */}
   
  {/* </PaperProvider> */}
    
    </>
  )
}
