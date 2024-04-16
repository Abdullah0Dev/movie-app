import { Stack } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';



export const Navigation = () => {
    return (<NavigationNav />)

}

const NavigationNav = () => {
    return (

        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="person/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="[id]" options={{ headerShown: false }} />
        </Stack>
    )
}   