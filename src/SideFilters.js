import React, { Component } from 'react';
import './CalendarApp.css';

class SideFilters extends Component {

    filterTeams(Calendar){

      const options = Calendar.state.teamsList;

      // If option checkbox is checked, add this option
      let checked_checkbox = [];

      for (var i = 0; i < options.length; i++) {
          let checkbox = document.getElementById("team_selection_" + options[i]);
          if (checkbox.checked) {
              checked_checkbox.push(options[i]);
          }
      }
      Calendar.setState({selectedTeams: checked_checkbox});
    }

    render() {

        const Calendar = this.props.Calendar;

        return(

          <div id={"general_teams_filter"}>
              Equipes :<br/><br/>

                {Calendar.state.teamsList.map(option => (
                        <label>
                            <div>
                                <input type={"checkbox"} id={"team_selection_"+ option}
                                       onChange={event => this.filterTeams(Calendar)}/>
                                {option}
                            </div>
                        </label>
                ))}
            </div>

        );

  }


}

export default SideFilters;
