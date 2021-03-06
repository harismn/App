/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableHighlight,
  ScrollView
} from 'react-native';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      apiData: [],
      naData: []
    }
    this.dataId = null;
    this.name = null;
    this.email = null;
    this.phone_number = null;
  }

  getButton = () => {
    fetch('http://192.168.8.100:3000/users',{
      method: 'GET'
    }).then((responseData) => {
      return responseData.json();
    }).then((jsonData) => {
      // console.log(jsonData);
      this.setState({apiData: jsonData})
      console.log(this.state.apiData)
    }).done();
    this.dataId = null;
  }

  saveButton = () => {
    let bee = { name: this.name, email: this.email, phone_number: this.phone_number}
    fetch('http://192.168.8.100:3000/users',{
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bee),
    }).then((responseData) => {
      return responseData.json();
    }).then((jsonData) => {
      // console.log(jsonData);
      this.setState({naData: jsonData})
      console.log(this.state.naData)
    }).done();
    this.dataId = null;
    this.name = null;
    this.email = null;
    this.phone_number = null;
  }


  render() {
    const data = this.state.apiData;
    let dataDisplay = data.map(function(jsonData){
        return (
          <View key={jsonData.id}>
              <View style={{flexDirection: 'row'}}>
                <Text style= {{color: '#511099'}}> {jsonData.id} | </Text>
                <Text style= {{color: '#FF5722'}}> {jsonData.name} | </Text>
                <Text style= {{color: '#511099'}}> {jsonData.email} | </Text>
                <Text style= {{color: '#FF5722'}}> {jsonData.phone_number} | </Text>
              </View>
          </View>
        )
    })
    return (
      <View style={styles.container}>
        <Text style={styles.text}> App Users </Text>
        <View style={styles.view}/>

        <TextInput style={styles.input}
          placeholder = 'id'
          onChange = {(text) => {this.dataId = text}}
          value = {this.dataId}
          underlineColorAndroid = 'transparent'
        />
        <TextInput style={styles.input}
          placeholder = 'Name'
          onChange = {(text) => {this.name = text}}
          value = {this.name}
          underlineColorAndroid = 'transparent'
        />
        <TextInput style={styles.input}
          placeholder = 'email'
          onChange = {(text) => {this.email = text}}
          value = {this.email}
          underlineColorAndroid = 'transparent'
        />
        <TextInput style={styles.input}
          placeholder = 'phone number'
          onChange = {(text) => {this.phone_number = text}}
          value = {this.phone_number}
          underlineColorAndroid = 'transparent'
        />
        <TouchableHighlight style = {styles.button} onPress = {this.getButton}>
            <Text style = {styles.texthiglight}> view data </Text>
        </TouchableHighlight>

        <TouchableHighlight style = {styles.button} onPress = {this.saveButton}>
            <Text style = {styles.texthiglight}> Save </Text>
        </TouchableHighlight>

        <ScrollView contentContainerStyle={styles.container}>
          {dataDisplay}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  view: {
    height: 2,
    backgroundColor: '#CCCCCC',
    marginBottom: 10,
    width: '90%'
  },
  input: {
    textAlign: 'center',
    height: 30,
    width: '90%',
    padding: 4,
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#48afdb',
    borderRadius: 5,
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 3,
    width: '90%',
    backgroundColor: '#00BCD4',
  },
  texthiglight: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  }
});
