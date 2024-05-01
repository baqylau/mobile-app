import {Text, TouchableHighlight, View} from "react-native";

const MainInfo = ({uniqueIdentifier, styles}) => {
    return (
        <View style={styles.info}>
            <View style={styles.row}>
                <Text style={styles.rowItemHeader2}>Информация</Text>
            </View>
            <TouchableHighlight onPress={() => {

            }}>
                <View style={styles.row}>
                    <Text style={styles.rowItemHeader}>Ваш ID:</Text>
                    <Text>{uniqueIdentifier}</Text>
                </View>
            </TouchableHighlight>
        </View>
    )
}

export default MainInfo;