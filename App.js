import {useEffect, useRef, useState} from "react";
import {Button, Image, StatusBar, Text, TextInput, TouchableHighlight, View} from 'react-native';

import * as Application from 'expo-application';
import * as Notifications from 'expo-notifications';
import {Accelerometer} from 'expo-sensors';
import Constants from 'expo-constants';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';

import LocationInfo from "./component/LocationInfo";
import Header from "./component/Header";
import MainInfo from "./component/MainInfo";
import Map from "./component/Map";

import registerForPushNotificationsAsync from "./utils/registerForPushNotificationsAsync";
import getLocationAsync from "./utils/getLocationAsync";
import sendLocationData from "./utils/sendLocationData";

import styles from './styles/main';
import getOrgData from "./utils/getOrgData";

const API_URL = 'https://baqylau-backend.undefined.ink/api';

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
    const [orgId, setOrgId] = useState('');
    const [newOrgId, setNewOrgId] = useState('');
    const [orgData, setOrgData] = useState({});
    const [status, setStatus] = useState("not_work");

    const [mode, setMode] = useState("user");

    const installationId = Constants.installationId;
    const deviceId = Application.androidId;
    const uniqueIdentifier = `${installationId}${deviceId ? `_dev_${deviceId}` : ''}`;

    useEffect(() => {
        if (status === "not_work") return
        try {
            Accelerometer.setUpdateInterval(500);
            const subscription = Accelerometer.addListener(data => {
                accelerometerBuffer.push(data);
            });

            return () => subscription.remove();
        } catch (error) {
            console.error('Failed to subscribe to accelerometer:', error);
        }
    }, [status]);

    useEffect(() => {
        try {
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
                        if (status === "work") {
                            await sendLocationData(API_URL, location, uniqueIdentifier, expoPushToken, accelerometerBuffer, orgId);
                            accelerometerBuffer = [];
                            speedsBuffer = [];
                        }

                        setLocation({
                            lat: location.coords.latitude,
                            long: location.coords.longitude,
                            speed: location.coords.speed
                        })
                    }
                });
            }, 1000);

            return () => clearInterval(interval);
        } catch (error) {
            console.error('Failed to get location:', error);
        }
    }, [expoPushToken, status]);

    useEffect(() => {
        try {
            registerForPushNotificationsAsync()
                .then((token) => setExpoPushToken(token ?? ''))
                .catch((error) => setExpoPushToken(`${error}`));
        } catch (error) {
            console.error('Failed to register for push notifications:', error);
        }
    }, []);

    useEffect(() => {

        try {
            AsyncStorage.getItem('orgId').then(async (orgId) => {
                setOrgId(orgId);
                if (orgId) {
                    const data = await getOrgData(API_URL, orgId);
                    if (!data || !data.success) {
                        return alert("Ошибка при получении данных об организации", "error");
                    }
                    setOrgData(data.organization);
                }
            });

            AsyncStorage.getItem('mode').then((mode) => {
                setMode(mode ?? "user");
            })
        } catch (error) {
            console.error('Failed to get async storage data:', error);
        }
    }, [])

    return (
        <>
            <View style={styles.container}>
                {orgId ? (
                    <>
                        <Header styles={styles} icon={
                            <Ionicons name="exit-outline" size={24} color="#F38181" onPress={() => {
                                setOrgId('');
                                AsyncStorage.removeItem('orgId');
                            }} />
                        }>Baqylau</Header>

                        <MainInfo uniqueIdentifier={uniqueIdentifier} styles={styles} orgData={orgData} status={status}
                                  setStatus={setStatus}/>

                        <View style={styles.info}>
                            <View style={styles.row}>
                                <Text style={styles.rowItemHeader2}>Локация</Text>
                            </View>
                            {!location.lat && !location.long && !location.speed && <View style={styles.row}>
                                <Text style={styles.rowItemHeader}>У нас нет вашей точной локации</Text>
                            </View>}

                            <LocationInfo location={location} styles={styles}/>
                        </View>

                        {/*<Map location={location} styles={styles}/>*/}

                        <View style={styles.image}>
                            <Image source={require("./assets/city.png")} style={{
                                width: 300,
                                objectFit: "contain",
                                marginTop: 20
                            }} />
                        </View>
                    </>
                ) : (
                    <>
                        {mode === "user" ? (
                            <>
                        <View style={styles.info}>
                            <View style={styles.row}>
                                <Text style={styles.rowItemHeader2}>Ввведите идентификатор организации</Text>
                            </View>
                            <View style={styles.row}>
                                <TextInput style={styles.input}
                                           placeholder="Идентификатор организации"
                                           onChangeText={(text) => setNewOrgId(text)}
                                           value={newOrgId}
                                />
                            </View>
                            <View style={styles.row}>
                                <TouchableHighlight style={styles.button}
                                                    onPress={async () => {
                                                        const data = await getOrgData(API_URL, newOrgId);
                                                        if (!data || !data.success) {
                                                            return alert("Ошибка при получении данных об организации", "error");
                                                        }
                                                        AsyncStorage.setItem('orgId', newOrgId);
                                                        setOrgId(newOrgId);
                                                        setOrgData(data.organization);
                                                    }}>
                                    <Text style={styles.buttonText}>Сохранить</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                                <TouchableHighlight style={styles.mode} onPress={() => {
                                    setMode("admin");
                                    AsyncStorage.setItem('mode', "admin");
                                }}>
                                    <Text style={styles.modeText}>Я администратор</Text>
                                </TouchableHighlight>

                                </>
                            ) : (
                                <>
                                    <Header styles={styles} icon={
                                        <Ionicons name="exit-outline" size={24} color="#F38181" onPress={() => {
                                            setMode("user");
                                            AsyncStorage.setItem('mode', "user");
                                        }} />
                                    }>Baqylau</Header>

                                    <WebView
                                        style={styles.container}
                                        source={{ uri: 'https://baqylau-frontend.undefined.ink/' }}
                                    />
                                </>
                        )}
                    </>
                )}
            </View>

            <StatusBar backgroundColor={"#E3FDFD"} barStyle={"dark-content"}/>
        </>
    );
}
