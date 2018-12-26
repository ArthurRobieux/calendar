import React, { Component } from "react";
import events from "./events";
import BigCalendar from "react-big-calendar";
import './CalendarApp.css';
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ActionsMenu from './ActionsMenu';
import SideFilters from './SideFilters';
import clubEvents from "./clubEvents.json"

moment.locale("en");

const localizer = BigCalendar.momentLocalizer(moment) ;

class CalendarApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            activePopup: false,
            selectedSlots: {slots: []},
            teamsList: [],
            eventTypesList: [],
            selectedTeams: [],
            selectedEventTypes: [],
            calendarView: "grid",
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

    // Teams events functions

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
        console.log(json_response);

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
              hexColor: 'lightsalmon',
            };
            events.push(newEvent);
        }
        this.setState({events: events});
    }

    // Club Events functions

    createClubEventsFromJson() {
        console.log(clubEvents);

        var newEvent;
        var events = [];

        const colors = ["lightskyblue", "lightseagreen", "lightcoral", "lightpink", "lightsalmon", "lightgreen", "lightblue"];

        for (var i = 0; i < clubEvents.teams.length; i++) {
            for (var j = 0; j < clubEvents.teams[i].events.length; j++) {

                newEvent = {
                    allDay: true,
                    endDate: new Date(clubEvents.teams[i].events[j].start_at),
                    startDate: new Date(clubEvents.teams[i].events[j].start_at),
                    title: <div>
                                <div className={"event"}>Event {clubEvents.teams[i].events[j].id}</div>
                                <div className={"info_popup"}>{clubEvents.teams[i].events[j].name}
                                ({clubEvents.teams[i].id})</div>
                            </div>,
                    hexColor: colors[i],
                    teamId: clubEvents.teams[i].id,
                    type: clubEvents.teams[i].events[j].name
                };
                events.push(newEvent);
            }
            this.setState({events: events});
        }
    }

    // Get teams list in state.teamsList
    getTeamsList(){
        var teamsList = [];

        var newTeam = {};

        for (var i = 0; i < clubEvents.teams.length; i++) {
            console.log(clubEvents.teams[i].id);
            newTeam = {id:clubEvents.teams[i].id, name: clubEvents.teams[i].name};
            teamsList.push(newTeam);
        }
        this.setState({teamsList: teamsList});
    }

    // Get teams list in state.teamsList
    getEventTypesList(){
        var eventTypesList = [];

        var newType = {};

        for (var i = 0; i < clubEvents.teams.length; i++) {
            console.log(clubEvents.teams[i]);
            for(var j=0; j<clubEvents.teams[i].events.length; j++) {
                newType = clubEvents.teams[i].events[j].name;
                if (!eventTypesList.includes(newType)){
                    eventTypesList.push(newType);
                }
            }
        }
        this.setState({eventTypesList: eventTypesList});
        console.log(eventTypesList)
    }

    // Filter events if there is a filter
    filteredEvents(){

        var filteredEvents = [];

        // If 2 filters (teams + types)
        if(this.state.selectedTeams.length > 0 && this.state.selectedEventTypes.length > 0){
            for(var i=0; i<this.state.events.length; i++){
                if(this.state.selectedTeams.includes(this.state.events[i].teamId) && this.state.selectedEventTypes.includes(this.state.events[i].type)){
                    filteredEvents.push(this.state.events[i]);
                }
            }
            return(filteredEvents);
        }
        // If only team filter
        else if(this.state.selectedTeams.length > 0){
            for(var j=0; j<this.state.events.length; j++){
                if(this.state.selectedTeams.includes(this.state.events[j].teamId)){
                    filteredEvents.push(this.state.events[j]);
                }
            }
            return(filteredEvents);
        }
        else if(this.state.selectedEventTypes.length > 0){
            for(var k=0; k<this.state.events.length; k++){
                if(this.state.selectedEventTypes.includes(this.state.events[k].type)){
                    filteredEvents.push(this.state.events[k]);
                }
            }
            return(filteredEvents);
        }
        return(this.state.events);
    }

    showCalendar(){

        if(this.state.calendarView === "grid") {
            return (
                <div id={"grid_calendar"}>
                    <BigCalendar
                        localizer={localizer}
                        events={this.filteredEvents()}
                        startAccessor="startDate"
                        endAccessor="endDate"
                        eventPropGetter={(this.eventStyleGetter)}
                        selectable={true}
                        onSelectEvent={event => console.log(event)}
                        onSelectSlot={(slot) => this.setState({activePopup: true, selectedSlots: slot})}
                    />
                    {this.showSlot()}
                </div>
            )
        }
        else{
            return(
                <div id={"list_calendar"}>
                    Liste des événements
                </div>
            )
        }
    }

    showSlot(){
        // http://as-rocknroll.local.sporteasy.net:8000/event/new/all/?date=2018-12-20
        // window.location.reload();

        if(this.state.selectedSlots.slots.length > 0) {
            const slot = String(this.state.selectedSlots.slots[0]).split(" ");
            const day = slot[2];
            const month = slot[1];
            const year = slot[3];
            return (
                <div>
                    Click : {day} {month} {year}
                </div>
            )
        }
    }

    componentDidMount(){
        // this.getApiEventsList();
        this.getTeamsList();
        this.getEventTypesList();
        this.createClubEventsFromJson();
    }


    render() {

        // console.log(this.state.events);
        // console.log(this.state.selectedTeams);

        return (
            <div id={"calendarApp"}>

                <h3 id={"events_title"}>Evénements</h3>

                <ActionsMenu Calendar={this}/>

                <div id={"side_filters"}>
                    <SideFilters Calendar={this}/>
                </div>

                <div id={"calendar"}>
                    {this.showCalendar()}
                </div>



            </div>
        );
    }
}

export default CalendarApp;