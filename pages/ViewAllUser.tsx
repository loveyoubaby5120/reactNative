/*Screen to view all the user*/
import * as React from 'react';
import { FlatList, Text, View } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
const db: any = openDatabase({ name: 'UserDatabase.db', location: 'default' });

export class ViewAllUser extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            FlatListItems: [],
        };
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));
                }
                this.setState({
                    FlatListItems: temp,
                });
            });
        });
    }
    ListViewItemSeparator = () => {
        return (
            <View style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }} />
        );
    };
    render() {
        return (
            <View>
                <FlatList
                    data={this.state.FlatListItems}
                    ItemSeparatorComponent={this.ListViewItemSeparator}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }: any) => (
                        <View key={item.user_id} style={{ backgroundColor: 'white', padding: 20 }}>
                            <Text>Id: {item.user_id}</Text>
                            <Text>Name: {item.user_name}</Text>
                            <Text>Contact: {item.user_contact}</Text>
                            <Text>Address: {item.user_address}</Text>
                        </View>
                    )}
                />
            </View>
        );
    }
}
