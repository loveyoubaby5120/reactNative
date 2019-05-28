import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
const db: any = openDatabase({ name: 'UserDatabase.db', location: 'default' });
import * as RNFS from 'react-native-fs';

export class HomeScreen extends React.Component<any, { readTxtResult: string }> {
    constructor(props) {
        super(props);
        super(props);

        this.state = {
            readTxtResult: '',
        };
    }

    readFile() {
        const path = RNFS.DocumentDirectoryPath + '/test.txt';

        return RNFS.readFile(path)
            .then((result) => {
                console.log(result);

                this.setState({
                    readTxtResult: result,
                })
            })
            .catch((err) => {
                console.log(err.message);

            });
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                    flexDirection: 'column',
                }}>
                <View style={{ marginTop: 30 }}>
                    <TouchableOpacity onPress={() => {
                        this.readFile()
                    }}>
                        <Text> 读取本地txt文件 result=({this.state.readTxtResult})</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
