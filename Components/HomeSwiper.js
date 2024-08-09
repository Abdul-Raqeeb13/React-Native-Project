import React from 'react'
import { View , StyleSheet , Image  , Dimensions, Text } from 'react-native'
import Swiper from 'react-native-swiper'

const {width} = Dimensions.get("window")

export default function Slider() {

  const sliderImage = [

    "https://img.freepik.com/premium-photo/creative-online-shopping-background-social-media-post_1218867-132658.jpg?ga=GA1.1.1778619907.1708775132&semt=ais_hybrid",
    "https://img.freepik.com/premium-photo/online-fashion-shopping-with-laptop_23-2150400630.jpg?ga=GA1.1.1778619907.1708775132&semt=ais_hybrid",
    "https://img.freepik.com/premium-photo/photocomposition-horizontal-shopping-banner-with-woman-big-smartphone_23-2151201773.jpg?ga=GA1.1.1778619907.1708775132&semt=ais_hybrid",
    "https://img.freepik.com/premium-photo/shopping-cart-with-bunch-colorful-items-it_577115-119497.jpg?ga=GA1.1.1778619907.1708775132&semt=ais_hybrid",

  ];

  return (
    <>
      <View style = {{flex:0.43 } }>

      <Swiper
      dot = {<View style = {styles.dotStyle}></View>} 
      activeDot = {<View  style = {styles.activeDotStyle}></View>} 
      autoplay = {true} 
      autoplayTimeout={3}
      showsButtons = {true}
      showsPagination	= {true}
      

       >
      {
        sliderImage.map((v ,i )=>{
          return <Image key = {i} style = {styles.sliderImgStyle}  source = {{uri:v}} />
        })
      }
      </Swiper>
    
      </View>
    </>
  )
}

const styles = StyleSheet.create({
    dotStyle : {
      backgroundColor : "grey",
      margin : 10,
      borderRadius : 10,
      width : 10,
      height : 10
    },

    activeDotStyle : {
      backgroundColor : "black",
      margin : 10,
      borderRadius : 10,
      width : 15,
      height : 15
    },

    sliderImgStyle : {
        height:'100%'
        }
})