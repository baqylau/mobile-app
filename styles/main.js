import {StyleSheet} from "react-native";
import Constants from "expo-constants";
import Device from "expo-device";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E3FDFD',
        paddingTop: 0,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        maxHeight: 65,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#E3FDFD',
        borderBottomWidth: 1,
        borderBottomColor: '#CBF1F5'
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    info: {
        width: '100%',
        padding: 20,
        paddingBottom: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    rowItemHeader: {
        fontWeight: 'bold',
        marginRight: 10,
        color: "#112D4E"
    },
    rowItemHeader2: {
        fontWeight: 'bold',
        marginRight: 10,
        fontSize: 20,
        color: "#71C9CE",
    },
    rowItemAnnotation: {
        color: '#666',
        fontSize: 12,
    },
    image: {
        flex: 1,
        alignItems: "center"
    },
    map: {
        width: '100%',
        height: "100%",
    },
    input: {
        padding: 12,
        width: "100%",
        backgroundColor: "#CBF1F5",
        borderRadius: 12,
        marginTop: 10,
    },
    button: {
        padding: 12,
        width: "100%",
        backgroundColor: "#71C9CE",
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold"
    },
    mode: {
        width: "100%",
        padding: 20,
        paddingTop: 0,
    },
    modeText: {
        color: "#71C9CE",
        fontWeight: "bold",
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#71C9CE",
        width: "100%",
        textAlign: "center"
    }
});

export default styles;