import {StyleSheet} from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: Constants.statusBarHeight
    },
    header: {
        width: '100%',
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',

    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    info: {
        width: '100%',
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    rowItemHeader: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    rowItemHeader2: {
        fontWeight: 'bold',
        marginRight: 10,
        fontSize: 20,
    },
    image: {
        flex: 1,
        alignItems: "center"
    },
    map: {
        width: '100%',
        height: "100%",
    }
});

export default styles;