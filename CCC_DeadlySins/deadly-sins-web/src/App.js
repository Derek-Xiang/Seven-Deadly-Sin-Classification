import React, { Component } from 'react';
import Header from './components/header'
import './App.css';
import { Layout,Row } from 'antd';


const { Footer } = Layout;

class App extends Component {
  render(){
    return(
    <Layout className="layout">
      <Header />
      <Row className='content'>
        {this.props.children}

      </Row>
      <Footer style={{ textAlign: 'center' }}>
        Twitter Deadly Sins and Crime Rate Analysis Created by Team 50
      </Footer>
    </Layout>
    )};
}

export default App;
