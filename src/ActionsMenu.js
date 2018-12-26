import React, { Component } from 'react';
import './CalendarApp.css';

class ActionsMenu extends Component {

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

          </div>

        );

  }


}

export default ActionsMenu;
