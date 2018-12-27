import React, { Component } from 'react';
import checkboxHOC from "react-table/lib/hoc/selectTable";
import ReactTable from "react-table";

import './CalendarApp.css';
import 'react-table/react-table.css'


const CheckboxTable = checkboxHOC(ReactTable);

class CalendarList extends Component {

    render() {

        const Calendar = this.props.Calendar;
        const pageSize = Calendar.filteredEvents().length;

        return(

            <div>

                <ReactTable
                  data={Calendar.filteredEvents()}
                  columns={[
                        {
                          Header: "Date",
                          accessor: "date"
                        },
                        {
                          Header: "Type",
                          accessor: "type",
                          width: 150,
                        },
                        {
                          Header: "ID",
                          accessor: "number",
                          width: 50,
                        },
                        {
                          Header: "Equipe",
                          accessor: "team",
                          width: 125,
                          Cell: team => (<div className={"team_name"} style={{background: team.value.color}}>{team.value.name}</div>),
                        },
                        {
                          Header: "Evénements",
                          accessor: "events"
                        },
                        {
                          Header: "Saison",
                          accessor: "seasonName",
                          width: 100,
                        },
                      ]
                    }
                  pageSize={pageSize} showPagination={false}
                  className="-highlight"
                />

            </div>

        );

  }


}

export default CalendarList;
