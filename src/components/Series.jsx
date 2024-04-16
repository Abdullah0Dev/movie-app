import { View, Text, Pressable, Image, FlatList } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const Series = () => {
  return (
    <View className='mt-5'>
      <View className='flex flex-row mx-5 justify-between leading-6 items-center mb-3'>
        <Pressable>
          <Text className='text-white font-bold text-xl'>Series</Text>
        </Pressable>
        <Pressable>
          <Text className='text-white/50 font-medium text-base' >See All</Text>
        </Pressable>
      </View>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
        renderItem={() => (
          <View className='w-52 border rounded-2xl border-white/20 h-80'>
            <Image
              source={{ uri: `https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-15-Pro/Blue-Titanium/Apple-iPhone-15-Pro-Blue-Titanium-thumbnail.png` }}
              className='w-52 h-80 rounded-xl ' />
            <LinearGradient
              colors={['transparent', ' rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
              className=' absolute w-full h-72 bottom-0'
              start={{ x: 0.5, y: 0.01 }} end={{ x: 0.5, y: 0.7 }}
            />
          </View>
        )}
        keyExtractor={(item) => item.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces
        contentContainerStyle={{ gap: 20 }}
      />

    </View>
  )
}

export default Series