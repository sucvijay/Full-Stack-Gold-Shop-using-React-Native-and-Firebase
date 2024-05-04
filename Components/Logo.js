import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'


export default function Logo() {
    return (
        <View style={styles.header}>
            <Image style={{ width: '100%', height: 50 }} resizeMode='stretch' source={require('./lgo.png')} />
            <View style={{ width: '95%', flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                <View style={{ width: '60%', justifyContent: 'center' }}>
                    <Text style={{ paddingRight: 20, fontSize: 13, fontWeight: 'bold', }}>வாழ்வோம் வாழவைப்போம்</Text>
                </View >
                <View style={{ height: '90%', width: 130, backgroundColor: 'white', borderWidth: 0.5, justifyContent: 'center', backgroundColor: '#ffba39' }}>

                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#0c678f' }}>₹ 4825 /g
                    </Text>

                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    header: {
        backgroundColor: 'grey',
        justifyContent: 'flex-start',
        width: '100%',
        backgroundColor: 'yellow',
        height: 80,
        marginTop: 20

    }
})