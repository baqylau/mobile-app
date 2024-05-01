import {Text, View} from "react-native";

const Header = ({
                    styles,
                    children
                }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{children}</Text>
        </View>
    )
}

export default Header;