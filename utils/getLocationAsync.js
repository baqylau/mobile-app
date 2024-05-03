import * as Location from "expo-location";

async function getLocationAsync() {
    try {
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
    } catch (error) {
        console.error('Error getting location permission', error);
    }
}

export default getLocationAsync;