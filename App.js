import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllExpenses from './screens/AllExpenses';
import ManageExpenses from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import { GlobalStyles } from './constants/styles';
import {Ionicons} from "@expo/vector-icons"
import IconButton from './components/UI/IconButton';
import ExpenseContextProvider from './store/expense-context';

export default function App() {

  const Stack = createNativeStackNavigator();
  const BottomTabs = createBottomTabNavigator();

  function ExpenseOverView(){
    return (
      <BottomTabs.Navigator screenOptions={({navigation}) => ({
        headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor: "white",
        tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({tintColor}) => (
          <IconButton 
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => navigation.navigate("ManageExpenses")}
          />
        )
      })}>
        <BottomTabs.Screen 
          name="RecentExpense" 
          component={RecentExpenses} 
          options={{
            title: "Recent Expense",
            tabBarLabel: "Recent Expense",
            tabBarIcon: ({color, size}) => (
              <Ionicons name="hourglass" color={color} size={size} />
            )
          }}
        />
        <BottomTabs.Screen 
          name="AllExpense" 
          component={AllExpenses} 
          options={{
            title: "All Expense",
            tabBarLabel: "All Expense",
            tabBarIcon: ({color, size}) => (
              <Ionicons name="calendar" color={color} size={size} />
            )
          }}
        />
      </BottomTabs.Navigator>
    )
  }

  return (
    <>
      <StatusBar style="light" />
      <ExpenseContextProvider>
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="ExpenseOverView" 
            component={ExpenseOverView} 
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="ManageExpenses" 
            component={ManageExpenses} 
            options={{
              headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
              headerTintColor: 'white',
              presentation: 'modal'
            }}
          />
        </Stack.Navigator>
        </NavigationContainer>
      </ExpenseContextProvider>
    </>
  );
}
