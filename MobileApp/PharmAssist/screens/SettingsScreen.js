import React from 'react';
import {
  Image,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Picker,
  TouchableOpacity,
  View,
} from 'react-native';
import { CheckBox } from 'react-native-elements'
// From https://www.npmjs.com/package/react-native-modal-datetime-picker
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import LogoTitle from '../components/LogoTitle';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#d8d8d8',
    }
  };

  constructor(props){
    super(props);
    // Settings array with defaults
    this.settings = [false,false,10,'9:00 am','1:00 pm','6:00 pm','10:00 pm'];
    this.state = {
      ring:false,
      vibrate:false,
      snooze:"",
      morning:"",
      afternoon:"",
      evening:"",
      bedtime:"",
      isDateTimePickerVisibleMorning: false,
      isDateTimePickerVisibleAfternoon: false,
      isDateTimePickerVisibleEvening: false,
      isDateTimePickerVisibleBedtime: false,
    }
  }


  // These are parameters for the time pickers (morning, afternoon, evening, bedtime)
  _showDateTimePickerMorning = () => this.setState({ isDateTimePickerVisibleMorning: true });

  _hideDateTimePickerMorning = () => this.setState({ isDateTimePickerVisibleMorning: false });

  _handleDatePickedMorning = (date) => {
    this.morningSelect(date)
    this._hideDateTimePickerMorning();
  };

  _showDateTimePickerAfternoon = () => this.setState({ isDateTimePickerVisibleAfternoon: true });

  _hideDateTimePickerAfternoon = () => this.setState({ isDateTimePickerVisibleAfternoon: false });

  _handleDatePickedAfternoon = (date) => {
    this.afternoonSelect(date)
    this._hideDateTimePickerAfternoon();
  };

  _showDateTimePickerEvening = () => this.setState({ isDateTimePickerVisibleEvening: true });

  _hideDateTimePickerEvening = () => this.setState({ isDateTimePickerVisibleEvening: false });

  _handleDatePickedEvening = (date) => {
    this.eveningSelect(date)
    this._hideDateTimePickerEvening();
  };

  _showDateTimePickerBedtime = () => this.setState({ isDateTimePickerVisibleBedtime: true });

  _hideDateTimePickerBedtime = () => this.setState({ isDateTimePickerVisibleBedtime: false });

  _handleDatePickedBedtime = (date) => {
    this.bedtimeSelect(date)
    this._hideDateTimePickerBedtime();
  };

  // These functions set values in settings array
  ringCheckbox()
  {
    this.setState({
      ring:!this.state.ring
    })
    this.settings[0] = !this.settings[0]
    // console.log(this.settings);

  }
  vibrateCheckbox()
  {
    this.setState({
    vibrate:!this.state.vibrate
    })
    this.settings[1] = !this.settings[1]
    // console.log(this.settings);
  }
  snoozeSelect(itemValue)
  {
    this.settings[2] = parseInt(itemValue)
    // console.log(this.settings);
  }


  // this.props.navigation.dispatch(navigateAction);
  morningSelect(date)
  {
    morningtime = moment(date).format('h:mm a');
    this.settings[3] = morningtime
    // console.log(this.settings);
  }
  afternoonSelect(date)
  {
    afternoontime = moment(date).format('h:mm a');
    this.settings[4] = afternoontime
    // console.log(this.settings);
  }
  eveningSelect(date)
  {
    eveningtime = moment(date).format('h:mm a');
    this.settings[5] = eveningtime
    // console.log(this.settings);
  }
  bedtimeSelect(date)
  {
    bedtimetime = moment(date).format('h:mm a');
    this.settings[6] = bedtimetime
    // console.log(this.settings);
  }

  render() {
  	return (
      <View style={styles.contentContainer}>
        <Text style={styles.subheaderfont}>
        Notifications alert
        </Text>
        <CheckBox textStyle={styles.boxFont} containerStyle={styles.checkBox} size={15} title="Ring" checked={this.state.ring} onPress={() => this.ringCheckbox()}/>
        <CheckBox textStyle={styles.boxFont} containerStyle={styles.checkBox} size={15} title="Vibrate" checked = {this.state.vibrate} onPress={() => this.vibrateCheckbox()}/>

        <Text style={styles.subheaderfont}>
        Set snooze time
        </Text>
        <View style={styles.picker}>
        <Picker
          selectedValue={this.state.snooze}
          style={{ height: 30, width: 100}}
          onValueChange={(itemValue, itemIndex) => this.setState({snooze: itemValue},this.snoozeSelect(itemValue))}>
          <Picker.Item label="10" value="10" />
          <Picker.Item label="15" value="15" />
          <Picker.Item label="30" value="30" />
        </Picker>
        </View>
        <Text style={styles.subheaderfont}>
        Update medication times
        </Text>
        <Text style={styles.currenttimefont}>Morning reminder time: {this.settings[3]}</Text>
        <View style={styles.timebutton1}>
          <TouchableOpacity onPress={this._showDateTimePickerMorning}>
          <Text style={styles.boxFont}>Set new morning time</Text>
          </TouchableOpacity>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisibleMorning}
            onConfirm={this._handleDatePickedMorning}
            onCancel={this._hideDateTimePickerMorning}
            mode={'time'}
          />
        </View>
        <Text style={styles.currenttimefont}>Afternoon reminder time: {this.settings[4]}</Text>
        <View style={styles.timebutton2}>
          <TouchableOpacity onPress={this._showDateTimePickerAfternoon}>
            <Text style={styles.boxFont}>Set new afternoon time</Text>
          </TouchableOpacity>
          <DateTimePicker style={styles.timebutton}
            isVisible={this.state.isDateTimePickerVisibleAfternoon}
            onConfirm={this._handleDatePickedAfternoon}
            onCancel={this._hideDateTimePickerAfternoon}
            mode={'time'}
          />
        </View>
        <Text style={styles.currenttimefont}>Evening reminder time: {this.settings[5]}</Text>
        <View style={styles.timebutton3}>
          <TouchableOpacity onPress={this._showDateTimePickerEvening}>
            <Text style={styles.boxFont}>Set new evening time</Text>
          </TouchableOpacity>
          <DateTimePicker style={styles.timebutton}
            isVisible={this.state.isDateTimePickerVisibleEvening}
            onConfirm={this._handleDatePickedEvening}
            onCancel={this._hideDateTimePickerEvening}
            mode={'time'}
          />
        </View>
        <Text style={styles.currenttimefont}>Before bed reminder time: {this.settings[6]}</Text>
        <View style={styles.timebutton4}>
          <TouchableOpacity onPress={this._showDateTimePickerBedtime}>
            <Text style={styles.boxFont}>Set new before bed time </Text>
          </TouchableOpacity>
          <DateTimePicker style={styles.timebutton}
            isVisible={this.state.isDateTimePickerVisibleBedtime}
            onConfirm={this._handleDatePickedBedtime}
            onCancel={this._hideDateTimePickerBedtime}
            mode={'time'}
          />
        </View>
        <Button
              title="Save Settings"
              color="#19a319"
              onPress={() => this.props.navigation.navigate('Home', {
                Settings: this.settings,
              })}/>
      </View>
  	)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfffc',
  },
  picker: {
    borderColor:'black',
    borderWidth:1,
    width: 100,
    backgroundColor: '#fcfffc',
    marginLeft: 5,
    marginTop: 5,
  },
  checkBox:{
    borderColor:'black',
    borderWidth:1,
    padding:5,
    backgroundColor: '#fcfffc',
    width: 150,
  },
  boxFont: {
    fontFamily:'Roboto',
    color:'black',
    fontWeight: '200',
  },
  currenttimefont: {
    fontSize: 16,
    marginLeft: 5,
  },
  contentContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  subheaderfont: {
    fontSize: 20,
    paddingTop:15,
  },
  timebutton1: {
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: '#fcfffc',
    width: 200,
  },
  timebutton2: {
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: '#fcfffc',
    width: 200,
  },
  timebutton3: {
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: '#fcfffc',
    width: 200,
  },
  timebutton4: {
    padding: 5,
    margin: 5,
    marginBottom:20,
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: '#fcfffc',
    width: 200,
  },
});
