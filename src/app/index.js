import { View, Text, ImageBackground, ScrollView } from 'react-native'
import React from 'react'
import { Hero, Series, Trending, Seasons, Episodes } from '../components'
 

const HomePage = () => {
  return (
    <ScrollView className='bg-black w-full'>
      <Hero />
      <Trending />
      <Series />
      <Seasons />
      <Episodes />
    </ScrollView>
  )
}
   
export default HomePage