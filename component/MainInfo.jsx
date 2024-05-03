import {Alert, Text, TouchableHighlight, View} from "react-native";

const MainInfo = ({uniqueIdentifier, styles, orgData, status, setStatus}) => {
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
            <TouchableHighlight onPress={() => {

            }}>
                <View style={styles.row}>
                    <Text style={styles.rowItemHeader}>Организация:</Text>
                    <Text>{orgData.title}</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {

            }}>
                <View style={styles.row}>
                    <Text style={styles.rowItemHeader}>Email администратора:</Text>
                    <Text>{orgData.email}</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {
                // подтверждение
                Alert.alert(
                    status == "work" ? "Вы уверены, что хотите выйти из смены?" : "Вы уверены, что хотите начать смену?",
                    "",
                    [
                        {
                            text: "Отмена",
                            style: "cancel"
                        },
                        {
                            text: "Да",
                            onPress: async () => {
                                // изменение статуса
                                setStatus(status == "work" ? "not_work" : "work")
                            }
                        }
                    ]
                );
            }}>
                <View style={styles.row}>
                    <Text style={styles.rowItemHeader}>Статус:</Text>
                    <Text>{status == "work" ? "На смене" : "Не на смене"}</Text>
                </View>
            </TouchableHighlight>
            <View style={styles.row}>
                <Text style={styles.rowItemAnnotation}>Нажмите выше, чтобы изменить статус</Text>
            </View>
        </View>
    )
}

export default MainInfo;