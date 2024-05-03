import {Text, View} from "react-native";

const Header = ({
                    styles,
                    children,
                    icon
                }) => {
    return (
        <View style={styles.header}>
            {icon ? icon : <View style={{width: 24}}></View>}
            <Text style={styles.headerText}>{children}</Text>
            {icon ? <View style={{width: 24}}></View> : <View style={{width: 24}}></View>}
        </View>
    )
}

export default Header;