import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { Text, View, StyleSheet, Pressable, FlatList, TouchableOpacity, Alert, Modal, Button, ScrollView, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Label, { Orientation } from "react-native-label";
import AsyncStorage from '@react-native-community/async-storage';;
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-elements/dist/icons/Icon';
import { ToastAndroid } from 'react-native';
import { TicketEntry } from '../../../service/api/apiservice';
import Loader from '../../Components/Loader';
import Modalcostcentre from '../../Components/modalcostcentre';
import Modalasset from '../../Components/modalasset';
import { AssetList } from '../../../service/api/apiservice';

const MaintenanceTicket = (props) => {

    const [ClientId, setClientId] = useState('');
    const [UserId, setUserId] = useState('');
    const [listItems, setlistItems] = useState([]);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [listItemsasset, setlistItemsasset] = useState([]);
    const [dataasset, setDataasset] = useState([]);
    const [searchasset, setSearchasset] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleAsset, setModalVisibleAsset] = useState(false);
    const [loading, setLoading] = useState(false);
    const [remarks, onChangeText] = React.useState("");
    const [qty, onChangeNumber] = React.useState("1");
    const [stock, setStock] = React.useState("");
    const [maintenanceType, setMaintenanceType] = useState("1");
    const [priority, setPriority] = useState('N');
    const [idle, setIdle] = useState('0');
    const pickerRef = useRef();
    const [CmpName, setCpmName] = useState('');
    const [AssetName, setAssetName] = useState('');
    const [CostcentreId, setCostcentreId] = useState('0');
    const [AssetId, setAssetId] = useState('0');
    const [BulkAsset, setBulkAsset] = useState('0');

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
        setLoading(true);
        retrieveData();

    }, [ClientId, UserId]);

    const retrieveData = async () => {
        try {
            const valueString = await AsyncStorage.getItem('clientId');
            setClientId(valueString);
            const userid = await AsyncStorage.getItem('userId');
            setUserId(userid);
            let data = {
                ClientId: 1009,
                UserId: "1",
                //UserId: UserId
                type: "getdata",
            };
            const response = await TicketEntry(data)
            const datas = await response.json();
            const pendingList = datas;
            setlistItems(datas.CostCentreList);
            setData(datas.CostCentreList);
        } catch (error) {
            console.log(error)
        }
    }
    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }
    const onChangeSearch = (query) => {
        try {
            if (query) {
                const newData = listItems.filter(
                    function (item) {
                        const itemData = item.CostCentreName
                            ? item.CostCentreName.toUpperCase()
                            : ''.toUpperCase();
                        const textData = query.toUpperCase();
                        return itemData.indexOf(textData) > -1;
                    }
                );
                setData(newData);
                setSearch(query);
            } else {
                setData(listItems);
                setSearch(query);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const onChangeSearchAsset = (query) => {
        try {
            if (query) {
                const newData = listItemsasset.filter(
                    function (item) {
                        const itemData = item.AssetName
                            ? item.AssetName.toUpperCase()
                            : ''.toUpperCase();
                        const textData = query.toUpperCase();
                        return itemData.indexOf(textData) > -1;
                    }
                );
                setDataasset(newData);
                setSearchasset(query);
            } else {
                setDataasset(listItems);
                setSearchasset(query);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const actionOnRow = async (item) => {
        console.log(item, 'test');
        setCpmName(item.CostCentreName);
        setModalVisible(false);
        var CostcentreId = item.CostCentreId;
        setCostcentreId(item.CostCentreId);
        let getAssetList = {
            ClientId: '1009',
            // UserId: UserId,
            CostCentreId: CostcentreId,
        };
        console.log(getAssetList, 'testcc');
        const response = await AssetList(getAssetList);
        var dataa = await response.json();
        setlistItemsasset(dataa);
        setDataasset(dataa);
        console.log(dataa);
    }
    const actionOnRowAsset = (item) => {
        setAssetName(item.AssetName);
        setModalVisibleAsset(false);
        setAssetId(item.AssetId);
        if (item.TrackType == 'B') setBulkAsset(1);
        else setBulkAsset(0);
        setStock(item.Qty);
    }
    function handleChange() {
        // Here, we invoke the callback with the new value
        setModalVisible(false)
    }
    function handleChangeAsset() {
        // Here, we invoke the callback with the new value
        setModalVisibleAsset(false)
    }
    function submitform() {
        // console.log(CostcentreId,AssetId,maintenanceType,priority,idle,remarks);
        if (CostcentreId == 0) {
            alert("Select Costcentre");
            return;
        }
        if (AssetId == 0) {
            alert("Select Asset");
            return;
        }
        updateData();
    }

    const updateData = async () => {
        //console.log(CostcentreId,AssetId,maintenanceType,priority,idle,remarks);
        try {
            const valueString = await AsyncStorage.getItem('clientId');
            setClientId(valueString);
            const userid = await AsyncStorage.getItem('userId');
            setUserId(userid);
            let data = {
                ClientId: 1009,
                UserId: "1",
                CostcentreId: CostcentreId,
                AssetId: AssetId,
                MaintenanceType: maintenanceType,
                Priority: priority,
                Idle: idle,
                Remarks: remarks,
                Qty: 1,
                BulkAsset: BulkAsset,
                type: "update",
            };
            const response = await TicketEntry(data);
            const datas = await response.json();
            if (datas.Status === "Success") {
                alert("Updated Sucessfully");
                props.navigation.navigate({ name: 'MaintenanceDashboard' });

            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Loader loading={loading} />
            <View style={styles.mtop}>
                <ScrollView>
                    {/* <Picker
                    ref={pickerRef}
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker> */}
                    <View style={styles.mtxttop}>
                        <Text style={styles.labeltxt}>CostCentre Name</Text>
                        <View style={styles.centeredView}>
                            <Modalcostcentre visible={modalVisible} data={data} onChange={handleChange} onChangeSearch={onChangeSearch} search={search} actionOnRow={actionOnRow} />
                            <Pressable
                                style={[styles.button, styles.buttonOpen]}
                                onPress={() => setModalVisible(true)}
                            >
                                <Text style={styles.textStyle}>{CmpName ? CmpName : 'Select CostCentre'}</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.mtxttop}>
                        <Text style={styles.labeltxt}>Asset Name</Text>
                        <View style={styles.centeredView}>
                            <Modalasset visible={modalVisibleAsset} data={dataasset} onChange={handleChangeAsset} onChangeSearchAsset={onChangeSearchAsset} searchasset={searchasset} actionOnRowAsset={actionOnRowAsset} />
                            <Pressable
                                style={[styles.button, styles.buttonOpen]}
                                onPress={() => setModalVisibleAsset(true)}
                            >
                                <Text style={styles.textStyle}>{AssetName ? AssetName : 'Select Asset'}</Text>
                            </Pressable>
                        </View>
                    </View>
                    {/* <View style={styles.mtxttop}>
                    <Text style={styles.labeltxt}>CostCentre Name</Text>
                    <Picker
                        selectedValue={selectedValue}
                        style={{ height: 50, width: '100%' }}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="Maintenance" value="Maintenance" />
                        <Picker.Item label="Inspection" value="Inspection" />
                        <Picker.Item label="Not working" value="Notworking" />
                    </Picker>
                </View> */}
                    {/* <View style={styles.mtxttop}>
                        <Text style={styles.labeltxt}>Asset Name</Text>
                        <Picker
                            selectedValue={selectedValue}
                            style={{ height: 50, width: '100%' }}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item label="Maintenance" value="Maintenance" />
                            <Picker.Item label="Inspection" value="Inspection" />
                            <Picker.Item label="Not working" value="Notworking" />
                        </Picker>
                    </View> */}
                    <View style={styles.row1.mtxttop}>
                        <View style={styles.Flatlistview}>
                            <View style={BulkAsset == 1 ? styles.inputContainer2 : styles.inputContainer}>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.labeltxt}>Maintenance Type</Text>
                                    <Picker
                                        selectedValue={maintenanceType}
                                        style={{ height: 50, width: '100%' }}
                                        onValueChange={(itemValue, itemIndex) => setMaintenanceType(itemValue)}
                                    >
                                        <Picker.Item label="Maintenance" value="1" />
                                        <Picker.Item label="Inspection" value="2" />
                                        <Picker.Item label="Not working" value="3" />
                                    </Picker>
                                </View>
                            </View>
                            <View style={BulkAsset == 1 ? styles.inputContainer2 : styles.inputContainerhide2}>
                                <Text style={styles.labeltxt} style={{ marginLeft: 10, color: 'black' }} >Qty</Text>
                                <TextInput
                                    style={styles.input}
                                    // onChangeText={onChangeNumber}
                                    value={qty}
                                    placeholder="1"
                                    keyboardType="numeric"
                                    maxLength={10}
                                    onChangeText={() => { stock > onChangeNumber ? onChangeNumber : alert("Qty Greater than Stock Qty") }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.row1.mtxttop}>
                        <View style={styles.Flatlistview}>
                            <View style={priority == 'C' ? styles.inputContainer2 : styles.inputContainer}>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.labeltxt}>Priority</Text>
                                    <Picker
                                        selectedValue={priority}
                                        style={{ height: 50, width: '100%' }}
                                        onValueChange={(itemValue, itemIndex) => setPriority(itemValue)}
                                    >
                                        <Picker.Item label="Non-Critical" value="N" />
                                        <Picker.Item label="Critical" value="C" />
                                    </Picker>
                                </View>
                            </View>
                            <View style={ priority == 'C' ? styles.inputContainer2 : styles.inputContainerhide2}>
                                <Text style={styles.labeltxt} style={{ marginLeft: 10, color: 'black' }}>Does it goes to Idle?</Text>
                                <Picker
                                    selectedValue={idle}
                                    style={{ height: 50, width: '100%' }}
                                    onValueChange={(itemValue, itemIndex) => setIdle(itemValue)}
                                >
                                    <Picker.Item label="No" value="0" />
                                    <Picker.Item label="Yes" value="1" />
                                </Picker>
                            </View>
                        </View>
                    </View>
                    <View style={styles.mtxttop}>
                        <Text style={styles.labeltxt}>Remarks</Text>
                        <TextInput
                            label="Remarks"
                            style={styles.input}
                            onChangeText={onChangeText}
                            value={remarks}
                        />
                    </View>
                    {/* <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumber}
                    value={number}
                    placeholder="useless placeholder"
                    keyboardType="numeric"
                /> */}

                </ScrollView>
            </View>

            <View style={styles.btnContainer}>
                <Text onPress={() => submitform()} style={styles.previewtxt}>Submit</Text>
            </View>

        </>
    );
}
export default MaintenanceTicket;
const styles = StyleSheet.create({
    mtop: {
        marginTop: 30,
    },
    mtxttop: {
        margin: 10,
    },
    labeltxt: {
        color: 'black'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },

    modalView: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 5,
        width: '90%',
        alignItems: "center",
        shadowColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: '5%',
        marginBottom: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: 'transparent',
    },
    searchview: {
        flex: 0,
        marginTop: 22,
    },
    modeltouch: {
        backgroundColor: 'white',
        marginTop: '40%',
        margin: '2%',
        marginBottom: 10,
        padding: 10,
        justifyContent: 'flex-start',
        borderLeftWidth: 2,
        borderLeftColor: "#03509c",
        borderRightWidth: 2,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderTopColor: '#cad4e8',
        borderRightColor: '#cad4e8',
        borderBottomColor: '#cad4e8',
        fontSize: 24,
        fontWeight: 'bold',
        borderRadius: 15,
        shadowColor: "#000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    touch: {
        flexDirection: 'column',
        backgroundColor: 'white',
        marginTop: '1%',
        marginBottom: 10,
        padding: 5,
        justifyContent: 'flex-start',
        borderLeftWidth: 4,
        borderLeftColor: "#03509c",
        borderRightWidth: 2,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderTopColor: '#cad4e8',
        borderRightColor: '#cad4e8',
        borderBottomColor: '#cad4e8',
        fontSize: 24,
        fontWeight: 'bold',
        shadowColor: "#000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    itemTitle: {
        color: 'black',
        paddingBottom: 10,
        fontWeight: 'bold',
    },
    flatlist: {
        fontSize: 20,
        padding: 20,
        fontWeight: 'bold',
        color: 'blue',
    },
    itemTitle1: {
        flex: 0,
        color: 'black',
        // height: 30,
        fontWeight: 'bold',
        paddingLeft: 5,
        textAlign: 'left'
    },
    duedate: {
        flex: 0,
        color: 'black',
        fontWeight: 'bold',
        paddingLeft: 5,
    },
    itemTitle3: {
        color: 'red',
        paddingBottom: 10,
        fontWeight: 'bold',
        fontSize: 16
    },
    Flatlistview:
    {
        margin: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 5,
    },
    Flatlistview1:
    {
        margin: 0,
        flexDirection: 'row',
        width: '100%',
        alignContent: 'space-between',
        padding: 0,

    },
    RejectButton: {
        marginRight: 12,
        marginLeft: 12,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#dbdad7',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    ApproveButton: {
        marginRight: 10,
        marginLeft: '20%',
        marginTop: 10,
        paddingTop: 2,
        paddingBottom: 2,
        backgroundColor: '#4CB962',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#fff'
    },
    closeButton:
    {
        marginRight: 20,
        marginLeft: 20,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'red',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    ApproveText: {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 35,
        paddingRight: 35,
        fontSize: 18,
    },
    RejectText: {
        color: '#66635c',
        textAlign: 'center',
        paddingLeft: 40,
        paddingRight: 40,
        fontSize: 18,
    },
    previewtxt:
    {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    btnContainer: {
        flexDirection: 'row',
        backgroundColor: '#0e3c7d',
        marginRight: 0,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        borderRadius: 5,
        maxWidth: '30%',
        marginTop: '5%',
        marginLeft: '35%',
        alignItems: "center",
        justifyContent: "center",
    },
    btnIcon: {
        marginTop: 4, height: 20, width: 20,
    },
    previewmodaltext:
        { color: 'black', height: 30, fontWeight: 'bold', fontSize: 18, },

    closeText:
    {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 40,
        paddingRight: 40,
        fontSize: 18,
    },
    filteEmpty: {
        color: 'red',
        textAlign: 'center',
        padding: 10,
        fontSize: 20
    },
    itemtittle:
    {
        color: 'black',
        textAlign: 'left',
        padding: 2,
        fontSize: 15
    },
    row1: {

        marginTop: 2,

        flexDirection: "row",
        flexWrap: "wrap",
        shadowColor: "#000",
        shadowOpacity: 0.8,
        shadowRadius: 2,

        PaddingBottom: 10,
    },
    Flatlistview1:
    {
        margin: 0,
        flexDirection: 'row',
        width: '100%',
        alignContent: 'space-between',
        padding: 0,
    },

    inputContainer2: {
        paddingTop: 1,
        width: "49%",
        margin: 1,
        padding: 1,
        // marginLeft: '2%',
        //  backgroundColor: 'red',

    },
    inputContainerhide2: {
        paddingTop: 1,
        width: "49%",
        margin: 1,
        padding: 1,
        display: 'none'
        // marginLeft: '2%',
        //  backgroundColor: 'red',

    },
    inputContainer: {
        paddingTop: 1,
        width: "98%",
        margin: 1,
        padding: 1,
        marginLeft: '2%',
        // backgroundColor: 'red',

    },
})