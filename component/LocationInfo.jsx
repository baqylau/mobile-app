import {Text, View} from 'react-native';

const LocationInfo = ({location, styles}) => {
    if (!location.lat || !location.long || !location.speed) {
        return null;
    }

    const info = [
        {label: 'Широта', value: location.lat},
        {label: 'Долгота', value: location.long},
        {label: 'Скорость', value: `${(location.speed * 3.6).toFixed(2)} км/ч`}
    ];

    return (
        <>
            {info.map((item, index) => (
                <View key={index} style={styles.row}>
                    <Text style={styles.rowItemHeader}>{item.label}:</Text>
                    <Text>{item.value}</Text>
                </View>
            ))}
        </>
    );
};

export default LocationInfo;