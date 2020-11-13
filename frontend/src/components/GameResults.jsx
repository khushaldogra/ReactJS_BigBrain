import React, { useState, useEffect } from 'react';
import { BarChart, Tooltip, Legend, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useParams } from 'react-router-dom';
import { Table } from 'semantic-ui-react'
import config from '../config'

function GameResults() {
  const sessionID = useParams().id;
  const [results, setResults] = useState([]);

  // Fetch session results
  useEffect(() => {
    const token = localStorage.getItem('token');
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    const path = `${config.basePath}/admin/session/${sessionID}/results`;
    fetch(path, options)
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(json => {
        console.log(json);
        setResults(json.results);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const data = [
    {
      "name": "Page A",
      "uv": 4000,
    },
    {
      "name": "Page B",
      "uv": 3000,
    },
    {
      "name": "Page C",
      "uv": 2000,
    },
    {
      "name": "Page D",
      "uv": 2780,
    },
    {
      "name": "Page E",
      "uv": 1890,
    },
    {
      "name": "Page F",
      "uv": 2390,
    },
    {
      "name": "Page G",
      "uv": 3490,
    }
  ]
  return (
    <>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Header</Table.HeaderCell>
            <Table.HeaderCell>Header</Table.HeaderCell>
            <Table.HeaderCell>Header</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </>
  )
}

export default GameResults;