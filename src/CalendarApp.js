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
            selectedTeams: [],
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
                    teamId: clubEvents.teams[i].id
                };
                events.push(newEvent);
            }
            this.setState({events: events});
        }
    }

    // Get teams list in state.teamsList
    getTeamsList(){
        var teamsList = [];

        for (var i = 0; i < clubEvents.teams.length; i++) {
            console.log(clubEvents.teams[i].id);
            teamsList.push(clubEvents.teams[i].id);
        }
        this.setState({teamsList: teamsList});
    }

    // Filter events if there is a filter
    filteredEvents(){
        if(this.state.selectedTeams.length > 0){
            var filteredEvents = [];
            for(var i=0; i<this.state.events.length; i++){
                // console.log(this.state.events[i].teamId);
                if(this.state.selectedTeams.includes(this.state.events[i].teamId)){
                    filteredEvents.push(this.state.events[i]);
                }
            }
            return(filteredEvents);
        }
        return(this.state.events);
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
                    <BigCalendar
                        localizer={localizer}
                        events={this.filteredEvents()}
                        startAccessor="startDate"
                        endAccessor="endDate"
                        eventPropGetter={(this.eventStyleGetter)}
                        selectable={true}
                        onSelectEvent={event => console.log(event)}
                        onSelectSlot={(slot) => this.setState({activePopup:true, selectedSlots:slot})}
                    />
                    {this.showSlot()}
                </div>



            </div>
        );
    }
}

export default CalendarApp;