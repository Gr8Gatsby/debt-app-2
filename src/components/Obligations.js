import React from 'react';
import axios from 'axios';
import {Table} from 'antd';

const dollarUS = Intl.NumberFormat ('en-US', {
  style: 'currency',
  currency: 'USD',
});

const columns = [
  {
    title: 'Account',
    dataIndex: 'account_title',
    key: 'id',
  },
  {
    title: 'Account Number',
    dataIndex: 'account_number',
    key: 'account_number',
  },
  {
    title: 'Obligated Amount',
    dataIndex: 'obligated_amount',
    key: 'id',
    render: text => {
      text = dollarUS.format (text);
      return text;
    },
    align: 'right',
  },
];
export default class Obligations extends React.Component {
  state = {
    obligations: [],
  };

  componentDidUpdate (prevProps) {
    const options = {
      method: 'GET',
      url: 'https://debt-api.p.rapidapi.com/api/v2/federal_obligations/',
      params: {
        fiscal_year: this.props.year,
        funding_agency_id: this.props.agencyId,
        limit: '1000',
        page: '1',
      },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'X-RapidAPI-Host': 'debt-api.p.rapidapi.com',
        'X-RapidAPI-Key': 'b9da0a05c7mshe3449d418b185eep1245d5jsn97e247009966',
      },
    };
    if (prevProps.agencyId !== this.props.agencyId || prevProps.year !== this.props.year) {
      axios
        .request (options)
        .then (response => {
          const obligations = response.data.results;
          this.setState ({obligations});
        })
        .catch (function (error) {
          console.error (error);
        });
    }
  }

  render () {
    return <Table columns={columns} dataSource={this.state.obligations} />;
  }
}
