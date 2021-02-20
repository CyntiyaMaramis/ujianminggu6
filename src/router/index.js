import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Home, TambahData} from '../pages';

const Stack = createStackNavigator();

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{ headerShown:false}} />
                <Stack.Screen name="TambahData" component={TambahData}  />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router
