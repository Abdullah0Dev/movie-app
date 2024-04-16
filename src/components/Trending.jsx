import { View, Text, Pressable, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { fetchAPI } from '../../api/fetchFromAPI';

const Trending = () => {
  const [trending, setTrending] = useState(null)
  const router = useRouter()

  const handleDetails = (id) => {
    router.push(`/${id}`);
  }
  const [randomPage, setRandomPage] = useState(3)
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newRandomPage = Math.floor(Math.random() * 1000) + 1; // Random page between 1 and 43
      setRandomPage(newRandomPage)
    }, 3600000)
    return () => clearInterval(intervalId)
  }, [])
 // 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAPI(`trending/movie/day?language=en-US&page=${randomPage}​`);
        setTrending(data.results.map((Dis) => Dis))
        //  console.log(discover[0].id) 
        // const firstId = data.results.map((Dis) => Dis.id)[0];
        // console.log(data.results.map((Dis) => Dis.id));            
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [])


  return (
    <View>
      <View className='flex flex-row mx-5 justify-between items-center mb-2'>
        <Pressable>
          <Text className='text-white font-bold text-xl'>Trending Now</Text>
        </Pressable>
        <Pressable>
          <Text className='text-white/50 font-medium text-base' >See All</Text>
        </Pressable>
      </View>
      <FlatList
        data={trending}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleDetails(item.id)}
          >
            <View className='w-52 border  rounded-2xl border-white/20 h-80'>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                className='w-52 h-80 rounded-2xl ' />
              <LinearGradient
                colors={['transparent', ' rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
                className=' absolute w-full h-72 bottom-0'
                start={{ x: 0.5, y: 0.01 }} end={{ x: 0.5, y: 0.7 }}
              />
            </View>
          </Pressable>
        )}
        keyExtractor={({item}) => item?.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces
        contentContainerStyle={{ gap: 20 }}
      />

    </View>
  )
}

export default Trending