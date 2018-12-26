import React, { Component } from 'react';
import './CalendarApp.css';

class ActionsMenu extends Component {

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

          <div id={"actions_menu"}>

              {/*Add an event*/}
              <a className={"action_link"} href={"/members/invite/"}>
                <button className={"action_button add_a_member_button"}>
                    Ajouter un évenement
                </button>
              </a>

              {/*Export members list*/}
              <a href={"/members/export/"}>
                <button className={"action_button"}>
                    Export
                </button>
              </a>

              {/*General Filter*/}
              <input className={"action_filter"} type={"text"} placeholder={"Rechercher.."}/>

              {/*Teams Checkbox Filter*/}
              <div id={"general_teams_filter"}>
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
          </div>

        );

  }


}

export default ActionsMenu;
