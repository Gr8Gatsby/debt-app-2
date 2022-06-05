import React from 'react';
import axios from 'axios';
import {Select} from 'antd';
const {Option} = Select;



export default class AgencyList extends React.Component {
  state = {
    agencies: [],
    selectedId:null,
  };

  handleChange = (value) => {
    this.props.onChange (value);
  };
  componentDidMount () {
    const options = {
      method: 'GET',
      url: 'https://debt-api.p.rapidapi.com/api/v2/references/toptier_agencies/',
      params: {order: 'desc', sort: 'percentage_of_total_budget_authority'},
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'X-RapidAPI-Host': 'debt-api.p.rapidapi.com',
        'X-RapidAPI-Key': 'b9da0a05c7mshe3449d418b185eep1245d5jsn97e247009966',
      },
    };

    axios
      .request (options)
      .then (response => {
        const agencies = response.data.results;
        this.setState ({agencies});
      })
      .catch (function (error) {
        console.error (error);
      });
  }

  render () {
    //let hasAgencies = this.state.agencies.length > 0;

    return (
      <Select
        defaultValue="Select an Agency"
        style={{
          width: 400,
        }}
        onChange={this.handleChange}
      >
        {this.state.agencies.map (agency => (
          <Option key={agency.agency_id} value={agency.agency_id}>
            {agency.agency_name}
          </Option>
        ))}
      </Select>
    );
  }
}
