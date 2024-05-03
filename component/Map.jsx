import MapView, {Marker} from "react-native-maps";
import {Image} from "react-native";

const Map = ({location, styles}) => {
    return (
        <MapView
            style={styles.map}
            region={{
                latitude: location.lat,
                longitude: location.long,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}

        >
            <Marker coordinate={{latitude: location.lat, longitude: location.long}}>
                <Image source={require("../assets/truck.png")} style={{
                    width: 50,
                    height: 50,
                }}/>
            </Marker>

        </MapView>
    );
}

export default Map;