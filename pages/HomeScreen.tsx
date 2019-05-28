import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Mybutton } from './components/Mybutton';
import { Mytext } from './components/Mytext';
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

        db.transaction((txn) => {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
                [],
                (tx, res) => {
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
                            []
                        );
                    }
                }
            );
        });
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
                <Mytext text="SQLite Example" />
                <Mybutton
                    title="Register"
                    customClick={() => this.props.navigation.navigate('Register')}
                />
                <Mybutton
                    title="Update"
                    customClick={() => this.props.navigation.navigate('Update')}
                />
                <Mybutton
                    title="View"
                    customClick={() => this.props.navigation.navigate('View')}
                />
                <Mybutton
                    title="View All"
                    customClick={() => this.props.navigation.navigate('ViewAll')}
                />
                <Mybutton
                    title="Delete"
                    customClick={() => this.props.navigation.navigate('Delete')}
                />
            </View>
        );
    }
}
