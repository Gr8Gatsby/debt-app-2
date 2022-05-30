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
      url: 'https://debt-api.p.rapidapi.com/v2/references/toptier_agencies/',
      headers: {
        'X-RapidAPI-Host': 'debt-api.p.rapidapi.com',
        'X-RapidAPI-Key': 'dca14eb7efmshd997aeb7daee381p1529e4jsnc928f6c6b4c8',
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