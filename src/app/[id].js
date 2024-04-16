import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable, SafeAreaView, TextInput, KeyboardAvoidingView, ScrollView, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { fetchAPIKey } from '../../api/fetchFromAPI'; 
const Details = () => {

  const { id } = useLocalSearchParams()
  const router = useRouter()

  const [genres, setGenres] = useState(null)
  const [details, setDetails] = useState(null)
  const [similar, setSimilar] = useState(null)
  const [randomPage, setRandomPage] = useState(1)
  const [showPersonDetails, setShowPersonDetails] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newRandomPage = Math.floor(Math.random() * 9000) + 1; // Random page between 1 and 43
      setRandomPage(newRandomPage)
    }, 100000)
    return () => clearInterval(intervalId)
  }, [])


  useEffect(() => {
    const fetchDataDetails = async () => {
      try {
        const data = await fetchAPIKey(`movie/${id}?language=en-US​`);
        const dataCredits = await fetchAPIKey(`movie/${id}/credits?language=en-US​​`);
        const dataSimilar = await fetchAPIKey(`movie/${id}/similar?language=en-US&page=${randomPage}​`);
        setDetails(data)
        setGenres(dataCredits.cast.map((credits) => credits))
        setSimilar(dataSimilar.results.map((Dis) => Dis))
        // console.log(dataCredits.cast.map((credits) => credits))   
      } catch (error) {
        console.log(error)
      }
    }
    fetchDataDetails();
  }, [id, randomPage])

  if (details === null) {
    return null; // or render a loading indicator
  }
  if (similar === null) {
    return null; // or render a loading indicator
  }
  // Similar Movies:)

  const handleDetails = (id) => {
    router.push(`/${id}`);
    // setShowPersonDetails(true);

  }
  const handlePersonDetails = (id) => {
    router.push(`/person/${id}`);
  }
 

  return (
    <ScrollView className='bg-black h-full'>

      <View>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/original${details.backdrop_path}` }}
          className='w-full  h-[45vh]'
        />
        <View className='absolute'>
          <View className=' flex flex-row justify-between w-full px-5 mt-5 '>
            <TouchableOpacity
              onPress={() => router.back()}  >
              <FontAwesome
                name="chevron-left"
                size={20}
                style={{
                  color: 'white', backgroundColor: 'rgba(255,255,255, 0.3)',
                  borderRadius: 50, width: 40, padding: 10, aspectRatio: 1
                }}
              />
            </TouchableOpacity>

            <Pressable
            //   onPress={ToggleSearch}
            >
              <FontAwesome
                name="heart"
                size={25}
                style={{
                  color: 'white', backgroundColor: 'rgba(255,255,255, 0.3)',
                  borderRadius: 50, padding: 7,
                }}
              />
            </Pressable>
          </View>
        </View>
        <LinearGradient
          colors={['transparent', ' rgba(0,0,0,0.3)']}
          className=' absolute w-full h-72 bottom-0'
          start={{ x: 0.5, y: 0.01 }} end={{ x: 0.5, y: 0.5 }}
        />
        <Text className='text-3xl text-center -mt-[10vh] text-orange-500' >{details.original_title}</Text>

        <View className='flex  '>
          <Text className='text-red-500  text-center text-base'>{details.genres.map((name) => {
            return (
              <Text>{name.name} {" "}</Text>
            )
          })}</Text>
        </View>

        <View className='flex flex-row justify-around w-full mt-9'>
          <Pressable>
            <FontAwesome
              name="plus"
              size={20}
              style={{
                color: 'white', backgroundColor: 'rgba(000,000,000, 0.1)',
                borderRadius: 50, padding: 7,
              }}
            />
          </Pressable>
          <Pressable>
            <FontAwesome
              name="download"
              size={20}
              style={{
                color: 'white', backgroundColor: 'rgba(000,000,000, 0.1)',
                borderRadius: 50, padding: 7,
              }}
            />
          </Pressable>
        </View>
        <View className='flex flex-row gap-3 ml-5 mt-2'>
          <Text className='text-medium text-base text-green-400'>95% matches</Text>
          <Text className='text-medium text-base text-white/50'>{details.release_date}</Text>
        </View>
        <View className='flex flex-row gap-3 ml-5 mt-1'>
          <FontAwesome
            name="thumbs-up"
            size={15}
            style={{
              color: 'white', backgroundColor: 'red',
              borderRadius: 50, padding: 7,
            }}
          />
          <Text className='text-medium text-lg text-white'>Most Liked</Text>
        </View>
        <View className='bg-gray-500 mt-5 mx-5 flex flex-row justify-center border border-white/50 items-center py-2 px-4 rounded-2xl'>
          <FontAwesome name="play" size={15} style={{ color: 'white' }} />
          <Text className='text-white font-bold text-base ml-1'>Play</Text>
        </View>
        <View className='ml-5  mt-9'>
          <Text className='text-white font-medium text-2xl'>Prolog</Text>
          <Text className='text-white/50 text-base font-medium mt-2'>
            {details.overview}
          </Text>
        </View>
        <View className='mt-4'>
          <Text className='text-extrabold ml-5  text-2xl text-white'>Top Cast</Text>
          <FlatList
            data={genres}
            renderItem={({ item }) => (

              <Pressable
                onPress={() => handlePersonDetails(item?.id)}
                className='flex flex-row ml-5 mt-4'>
                <View className='items-center'>
                  <TouchableOpacity>
                    <Image
                      source={{ uri: `https://image.tmdb.org/t/p/original${item.profile_path}` }}
                      className='w-12 h-12 rounded-full border-white border'
                    />
                  </TouchableOpacity>
                  <Text className='text-medium text-lg text-white'>
                    {item.original_name.length > 15 ? item.original_name.slice(0, 12) + '..' : item.original_name}
                  </Text>
                  <Text className='text-base text-white/50'> {item.character.length > 15 ? item.character.slice(0, 12) + '..' : item.character}</Text>
                </View>
              </Pressable>)}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces
            contentContainerStyle={{ gap: 20 }}
          />
        </View>
        <View className='mt-8'>
          <Text className='text-white ml-5 font-bold mb-5 text-2xl'>Similar Movies</Text>
          <FlatList
            data={similar}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleDetails(item.id)}
                className='w-32 border rounded-2xl rounded-tr-3xl border-white/20 h-52'>
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/original${item.poster_path}` }}
                  className='w-32 h-52 rounded-xl ' />
                <LinearGradient
                  colors={['transparent', ' rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
                  className=' absolute w-full h-72 bottom-0'
                  start={{ x: 0.5, y: 0.01 }} end={{ x: 0.5, y: 0.7 }}
                />
              </Pressable>
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces
            contentContainerStyle={{ gap: 20 }}
          />
        </View>
      </View>
    </ScrollView>
  )
}


export default Details

