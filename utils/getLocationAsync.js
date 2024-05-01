import * as Location from "expo-location";

async function getLocationAsync() {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.error('Location permission not granted');
        return;
    }
    try {
        let location = await Location.getCurrentPositionAsync({});
        return location;
    } catch (error) {
        console.error('Error getting location', error);
    }
}

export default getLocationAsync;