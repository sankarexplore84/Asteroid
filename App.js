import React,{ useState } from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation }) {
  const [text, setText] = useState('');

  randomClick = () =>{
      const randomUrl = 'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=BgUWrUClBtPfnbT8ohKg1CPAxCshu2jGToPAUjYW';
      
      fetch(randomUrl)
      .then((response) => response.json())
      .then((jsonData) => {
        const random = jsonData.near_earth_objects[Math.floor(Math.random() * jsonData.near_earth_objects.length)];
        const randomId = random.id;

        const randUrl = 'https://api.nasa.gov/neo/rest/v1/neo/'+randomId+'?api_key=BgUWrUClBtPfnbT8ohKg1CPAxCshu2jGToPAUjYW';
  
        fetch(randUrl)
        .then((response) => response.json())
        .then((json) => {
          navigation.navigate('Random Asteroid Details', {
            name: json.name,
            nasa_jpl_url: json.nasa_jpl_url,
            is_potentially_hazardous_asteroid: json.is_potentially_hazardous_asteroid
          });
        })
        .catch((error) => console.error(error))
        .finally(() => {
          //this.setState({ isLoading: false });
        });  
      })
      .catch((error) => console.error(error))
      .finally(() => {
        //this.setState({ isLoading: false });
      });  
 }
 submitClick = () =>{
  const url = 'https://api.nasa.gov/neo/rest/v1/neo/'+text+'?api_key=BgUWrUClBtPfnbT8ohKg1CPAxCshu2jGToPAUjYW';
  
  fetch(url)
  .then((response) => response.json())
  .then((json) => {
    navigation.navigate('Details', {
      name: json.name,
      nasa_jpl_url: json.nasa_jpl_url,
      is_potentially_hazardous_asteroid: json.is_potentially_hazardous_asteroid
    });
  })
  .catch((error) => console.error(error))
  .finally(() => {
    //this.setState({ isLoading: false });
  });  
}
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <TextInput
          style={{height: 45,width: "95%",borderColor: "gray",borderWidth: 2}}
          // Adding hint in TextInput using Placeholder option.
          placeholder="Enter Asteroid ID"
          //set the value in state.
          onChangeText={text => setText(text)}
          defaultValue={text}
          // Making the Under line Transparent.
          underlineColorAndroid="transparent"
        />
      <Button
        onPress={this.submitClick}
        disabled={!text}
        title="Submit"
        color="#00B0FF"
      />
      <Button
        onPress={this.randomClick}
        title="Random Asteroid"
        color="#00B0FF"
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  /* 2. Get the param */

 const { name, nasa_jpl_url, is_potentially_hazardous_asteroid } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>name: {JSON.stringify(name)}</Text>
      <Text>nasa_jpl_url: {JSON.stringify(nasa_jpl_url)}</Text>
      <Text>is_potentially_hazardous_asteroid: {JSON.stringify(is_potentially_hazardous_asteroid)}</Text>
    
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function RandomAsteroidDetailsScreen({ route, navigation }) {
  /* 2. Get the param */

 const { name, nasa_jpl_url, is_potentially_hazardous_asteroid } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Random Asteroid Details Screen</Text>
      <Text>name: {JSON.stringify(name)}</Text>
      <Text>nasa_jpl_url: {JSON.stringify(nasa_jpl_url)}</Text>
      <Text>is_potentially_hazardous_asteroid: {JSON.stringify(is_potentially_hazardous_asteroid)}</Text>
      
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Random Asteroid Details" component={RandomAsteroidDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
