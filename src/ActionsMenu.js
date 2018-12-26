import React, { Component } from 'react';
import './App.css';

class ActionsMenu extends Component {

  render() {

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

          {/*/!*Seasons Filter*!/*/}
          {/*<select onChange={e => this.getApiClubSeasonMemberList(e.target.value, ClubMembersList)}*/}
                {/*className={"select_season"}>*/}
                {/*<option value='all'>{ClubMembersList.props.translations.all}</option>*/}
                {/*{ClubMembersList.state.seasons_list.map(season => (*/}
                    {/*<option value={season.id}>{season.slug_name}</option>*/}
                {/*))}*/}
          {/*</select>*/}

          {/*/!*Teams Checkbox Filter*!/*/}
          {/*<div onClick={() => this.showTeamsFilter()} className={"button_general_teams_filter"}>*/}
            {/*<div id={"general_teams_filter"}>*/}
                {/*{options.map(option => (*/}
                        {/*<label>*/}
                            {/*<div className={"checkbox_filter_choice"}>*/}
                                {/*<input type={"checkbox"} id={"team_selection_"+ option} onChange={event => this.getSelectedTeams(ClubMembersList)}/>*/}
                                {/*{option}*/}
                            {/*</div>*/}
                        {/*</label>*/}
                {/*))}*/}
            {/*</div>*/}
          {/*</div>*/}


      </div>



    );

  }


}

export default ActionsMenu;
