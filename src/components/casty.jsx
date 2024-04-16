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
    const [person, setPerson] = useState(null)
    const [details, setDetails] = useState(null)
    const [similar, setSimilar] = useState(null)
    const [randomPage, setRandomPage] = useState(1)


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
                const personData = await fetchAPIKey(`person/${id}?language=en-US​`);
                //https://api.themoviedb.org/3/person/person_id?language=en-US
                setDetails(data)
                setGenres(dataCredits.cast.map((credits) => credits))
                setSimilar(dataSimilar.results.map((Dis) => Dis))
                setPerson(personData)
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
    }


    return (
        <ScrollView className='bg-black h-full'>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/original${person.profile_path}` }}
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
                <Text className='text-white z-50 font-medium text-base absolute bottom-4 left-4'>Preview</Text>
            </View>
            <LinearGradient
                colors={['transparent', ' rgba(0,0,0,0.3)']}
                className=' absolute w-full h-72 bottom-0'
                start={{ x: 0.5, y: 0.01 }} end={{ x: 0.5, y: 0.5 }}
            />
            <Text className='text-3xl text-center -mt-[10vh] bg-black/30 py-2 w-fit text-orange-500'>{person.name}</Text>

            <View className='flex  '>
                <Text className='text-red-500 font-bold bg-black/30 py-2  text-center text-base'>
                    {person.known_for_department}  {"  "}
                </Text>
            </View>


            <View className='flex flex-row gap-3 ml-5 mt-2'>
                <Text className='text-medium text-base text-green-400'> <Text className='text-bold text-green-200  text-lg'> deathday </Text> {person.deathday || 'Alive'}</Text>
                <Text className='text-medium text-base text-white/50'> <Text className='text-bold text-white  text-lg'> birthday </Text> {person.birthday}</Text>
            </View>
            <View className='flex flex-row gap-3 ml-5 mt-1'>
                <FontAwesome
                    name="location"
                    size={15}
                    style={{
                        color: 'white', backgroundColor: 'red',
                        borderRadius: 50, padding: 7,
                    }}
                />
                <Text className='text-medium text-lg text-white'>place_of_birth</Text>
            </View>

            <View className='ml-5  mt-9'>
                <Text className='text-white font-medium text-2xl'>Biography</Text>
                <Text className='text-white/50 text-base font-medium mt-2'>
                    {person.biography}
                </Text>
            </View>
            <View className='mt-4'>
                <Text className='text-extrabold ml-5  text-2xl text-white'>Also Known AS</Text>
                <FlatList
                    data={person.also_known_as}
                    renderItem={({ item }) => (

                        <Pressable
                            onPress={() => handleDetails(item?.id)}
                            className='flex flex-row ml-5 mt-4'>
                            <View className='items-center'>

                                <Text className='text-medium text-lg text-white'>
                                    {item.also_known_as}
                                </Text>
                            </View>
                        </Pressable>)}
                    keyExtractor={({ item }) => item?.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    bounces
                    contentContainerStyle={{ gap: 20 }}
                />
            </View>
        </ScrollView>
    )
}


export default Details
