import React, { Component } from 'react';
import './CalendarApp.css';

class SideFilters extends Component {

    filterTeams(Calendar){

      const teamsList = Calendar.state.teamsList;

      // If option checkbox is checked, add this option
      let checked_checkbox = [];

      for (var i = 0; i < teamsList.length; i++) {
          let checkbox = document.getElementById("team_selection_" + teamsList[i].id);
          if (checkbox.checked) {
              checked_checkbox.push(teamsList[i].id);
          }
      }
      Calendar.setState({selectedTeams: checked_checkbox});
    }

    render() {

        const Calendar = this.props.Calendar;

        return(

          <div id={"general_teams_filter"}>
              Equipes
              <hr/>

                {Calendar.state.teamsList.map(team => (
                        <label>
                            <div>
                                <input type={"checkbox"} id={"team_selection_"+ team.id}
                                       onChange={event => this.filterTeams(Calendar)}/>
                                {team.name}
                            </div>
                        </label>
                ))}
            </div>

        );

  }


}

export default SideFilters;
