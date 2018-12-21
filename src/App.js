import React, { Component } from "react";
import events from "./events";
import BigCalendar from "react-big-calendar";
import './App.css';
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {Popover, OverlayTrigger, Button} from 'react-bootstrap';

moment.locale("en");

const localizer = BigCalendar.momentLocalizer(moment) ;

const myEvents = [
{
  allDay: true,
  endDate: new Date('2018-06-02'),
  startDate: new Date('2018-06-02'),
  title: 'Event en juin',
},
{
  allDay: false,
  startDate: new Date('December 09, 2018 11:30:00'),
  endDate: new Date('December 09, 2018 14:30:00'),
  title: 'Match foot',
},
];

const popoverHoverFocus = (
          <Popover id="popover-trigger-hover-focus" title="Popover bottom">
            <strong>Holy guacamole!</strong>
          </Popover>
        );



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: myEvents,
        }
    }

    eventStyleGetter(event, start, end, isSelected) {
        // console.log(event);
        var backgroundColor = event.hexColor;
        var style = {
            backgroundColor: backgroundColor,
            borderRadius: '3px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        };
    }


    // Get members data from API and save them in state
    getApiEventsList(){

        const API_URL = 'http://api.local.sporteasy.net:8000/v2.1/teams/6/events/';

        fetch(API_URL, {
            method: "GET",
            credentials: 'include',
        })
        .then(response =>
            response.json()
        )
        .then(json_response =>
            this.createEventsFromJson(json_response)
        )
    }

    createEventsFromJson(json_response){
        // console.log(json_response);

        var newEvent;
        var events = [];

        for(var i=0; i<json_response.results.length; i++){
            // console.log(json_response.results[i]);

            newEvent = {
              allDay: true,
              endDate: new Date(json_response.results[i].start_at),
              startDate: new Date(json_response.results[i].start_at),
              title: <div>
                         <div className={"event"}>Event {json_response.results[i].id}</div>
                         <div className={"info_popup"}>{json_response.results[i].category.localized_name}</div>
                     </div>,
              hexColor: 'lightsalmon'
            };
            events.push(newEvent);
        }
        this.setState({events: events});
    }

    componentDidMount(){
        this.getApiEventsList();
    }


    render() {

    return (
        <div style={{ height: 600, width: 900 }}>
            <BigCalendar
                localizer={localizer}
                events={this.state.events}
                startAccessor="startDate"
                endAccessor="endDate"
                eventPropGetter={(this.eventStyleGetter)}
                selectable={true}
                onSelectEvent={event => console.log(event)}
                onSelectSlot={(slot) => console.log(slot)}
            />
        </div>
    );
    }
}

export default App;