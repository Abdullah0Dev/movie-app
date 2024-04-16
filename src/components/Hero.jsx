import { View, Text, ImageBackground, TouchableOpacity, Image, Pressable, SafeAreaView, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Link, useRouter } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchAPI } from '../../api/fetchFromAPI';
   
const Hero = () => {
  const [search, setSearch] = useState(false)
  const [discover, setDiscover] = useState(null)
  const [randomMovie, setRandomMovie] = useState(1); // Initialize state with initial random number
const [randomPage, setRandomPage] = useState(2)


const router = useRouter()

const handleDetails = (id) => {
  router.push(`/${id}`);
}  
  
useEffect(() => {
  const intervalId = setInterval(() => {
    const newRandomPage = Math.floor(Math.random() * 30000) + 1; // Random page between 1 and 43
    setRandomPage(newRandomPage)
  }, 100000)   
  return () => clearInterval(intervalId)
}, [])

  const ToggleSearch = () => {
    setSearch(!search)  
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAPI(`discover/movie?language=en-US&page=${randomPage}&sort_by=popularity.desc​`);
       setDiscover(data.results.map((Dis) => Dis)) 
      //  console.log(discover[0].id) 
      // const firstId = data.results.map((Dis) => Dis.id)[0];
      // console.log(data.results.map((Dis) => Dis.id));            
      } catch (error) {
        console.log(error)   
      }  
    }
    fetchData();
  }, [randomPage])

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newRandomNumber = Math.floor(Math.random() * 15) + 1; // Generate new random number
      setRandomMovie(newRandomNumber); // Update state with new random number
    }, 10000); // Change every 1 minute (60000 milliseconds)

    // Clean up function to clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this effect runs only once

  if (discover === null) {
    return null; // or render a loading indicator
  }

  return (
    <ImageBackground
      source={{ uri: `https://image.tmdb.org/t/p/w500${discover[randomMovie].poster_path}` }}
      className='flex  items-center bg-contain h-[70vh] w-full' >
      <SafeAreaView className=' flex flex-row top-3 justify-between w-full px-5 items-center '>
        <Link href={`/profile`} asChild>
          <TouchableOpacity>
            <Image
              source={{ uri: `https://img.freepik.com/premium-vector/young-muslim-woman-wearing-hijab-with-flower-aesthetic-profile_637377-334.jpg` }}
              className='w-12 h-12 rounded-full'
            />
          </TouchableOpacity>
        </Link>
        <Pressable
          onPress={ToggleSearch}
        >
          <FontAwesome
            name="search"
            size={20}
            style={{
              color: 'white', backgroundColor: 'rgba(255,255,255, 0.3)',
              borderRadius: 50, padding: 10,
            }}
          />
        </Pressable>
        {!search ? (
          <View className='absolute ml-3 items-center justify-center px-5 top-14 w-full'>
          <View className=' px-3 flex-row justify-between items-center   rounded-3xl  bg-black/50 py-2 w-full z-40'>
            <TextInput placeholder='Search for movies...' placeholderTextColor='rgba(255,255,255, 0.6)' className='text-white text-base font-medium  ' />
            <FontAwesome name="search" size={20} style={{ color: 'white', backgroundColor: 'rgba(000,000,000, 0.1)', borderRadius: 50, padding: 10, }} />
          </View>
           </View>) :
          (<></>)}
      </SafeAreaView>
      <View className='h-60' />
      {/*  Title */}  
      <View className='absolute bottom-9 z-50 flex flex-row gap-8 items-center  '>
      <Pressable onPress={() =>  handleDetails(discover[randomMovie].id)}>
 
        <View className='bg-gray-500 scale-110 flex flex-row  border border-white/50 items-center py-1 px-4 rounded-2xl'>
          <FontAwesome name="play" size={15} style={{ color: 'white' }} />
          <Text className='text-white font-medium ml-1'>Play</Text>
        </View>
        </Pressable>   
        <Pressable  onPress={() =>  handleDetails(discover[randomMovie].id)}>
        <View className='bg-transparent scale-110 flex flex-row border border-white   items-center py-1 px-4 rounded-2xl'>
          <Text className='text-white  font-medium ml-1'>Details</Text>
        </View>
         </Pressable>
      </View>
      <LinearGradient
        colors={['transparent', ' rgba(0,0,0,0.3)', '#000']}
        className=' absolute w-full h-72 bottom-0'
        start={{ x: 0.5, y: 0.01 }} end={{ x: 0.5, y: 0.7 }}
      />
    </ImageBackground>
  )
}

export default Hero

 
  // import { View, Text } from 'react-native'
  // import React from 'react'
  
  // const Hero = () => {
  //   return (
  //     <View>
  //       <Text>Hero</Text>
  //     </View>
  //   )
  // }
  
  // export default Hero
 