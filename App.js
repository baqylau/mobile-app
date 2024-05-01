import {useEffect, useRef, useState} from "react";
import {Text, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';

import * as Application from 'expo-application';
import * as Notifications from 'expo-notifications';
import {Accelerometer} from 'expo-sensors';
import Constants from 'expo-constants';

import LocationInfo from "./component/LocationInfo";
import Header from "./component/Header";
import MainInfo from "./component/MainInfo";
import Map from "./component/Map";

import registerForPushNotificationsAsync from "./utils/registerForPushNotificationsAsync";
import getLocationAsync from "./utils/getLocationAsync";
import sendLocationData from "./utils/sendLocationData";

import styles from './styles/main';

let accelerometerBuffer = [];
let speedsBuffer = [];

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function App() {
    const [location, setLocation] = useState({lat: 0, long: 0, speed: null});

    const [expoPushToken, setExpoPushToken] = useState('');

    const installationId = Constants.installationId;
    const deviceId = Application.androidId;
    const uniqueIdentifier = `${installationId}${deviceId ? `_dev_${deviceId}` : ''}`;

    useEffect(() => {
        Accelerometer.setUpdateInterval(500);
        const subscription = Accelerometer.addListener(data => {
            accelerometerBuffer.push(data);
        });

        return () => subscription.remove();
    }, []);

    useEffect(() => {
        getLocationAsync().then(location => {
            if (location) {
                setLocation({
                    lat: location.coords.latitude,
                    long: location.coords.longitude,
                    speed: location.coords.speed
                });
            }
        });

        const interval = setInterval(() => {
            getLocationAsync().then(async location => {
                if (location) {
                    await sendLocationData(location, uniqueIdentifier, expoPushToken, accelerometerBuffer, speedsBuffer);
                    accelerometerBuffer = [];
                    speedsBuffer = [];

                    setLocation({
                        lat: location.coords.latitude,
                        long: location.coords.longitude,
                        speed: location.coords.speed
                    })
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [expoPushToken]);

    useEffect(() => {
        registerForPushNotificationsAsync()
            .then((token) => setExpoPushToken(token ?? ''))
            .catch((error) => setExpoPushToken(`${error}`));
    }, []);

    return (
        <View style={styles.container}>

            <Header styles={styles}>Baqylau</Header>

            <MainInfo uniqueIdentifier={uniqueIdentifier} styles={styles}/>

            <View style={styles.info}>
                <View style={styles.row}>
                    <Text style={styles.rowItemHeader2}>Локация</Text>
                </View>
                {!location.lat && !location.long && !location.speed && <View style={styles.row}>
                    <Text style={styles.rowItemHeader}>У нас нет вашей точной локации</Text>
                </View>}

                <LocationInfo location={location} styles={styles}/>
            </View>

            <Map location={location} styles={styles}/>

            <StatusBar backgroundColor={"#fff"}
                       style="dark"
                       translucent={false}
                       hidden={false}
                       animated={true}
            />
        </View>
    );
}
