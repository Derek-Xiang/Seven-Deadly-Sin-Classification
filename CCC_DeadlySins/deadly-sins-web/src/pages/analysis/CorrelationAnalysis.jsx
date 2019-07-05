import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';
import axios from './../../axios/index';
import CrimeChart from './CrimeChart';
import SinsChart from './SinsChart';
import CompareChart from './CompareChart';
// import { crime_data, sins_data } from './DataInput';


var crimeData = [];
var sinsData = [];
export { crimeData, sinsData };

class CorrelationAnalysis extends Component {


    requestData = () => {
        axios.ajax({
            url:'/offence_division',
        }).then((res)=>{
            if(res){
                crimeData = res;
            }
        })
        axios.ajax({
            url:'/sins_data',
        }).then((res)=>{
            if(res){
                sinsData = res;
            }
        })
        // crimeData = crime_data;
        // sinsData = sins_data;
    }


    render() {
        this.requestData();
        return(
            
            <div style={{ textAlign: 'center' }}>
                <Row gutter = { 16 }>
                    <Col className = 'gutter-row' md = { 12 }>
                        <div className = 'gutter-box'>
                        <Card title = 'Offence Count' bordered = { false } >
                            <CrimeChart />
                        </Card> 
                        </div>
                    </Col>
                    <Col className = 'gutter-row' md = { 12 }>
                        <div className = 'gutter-box'>
                        <Card title = 'Sins Count' bordered = { false } >
                            <SinsChart />
                        </Card>
                        </div>
                    </Col>
                    <Col className = 'gutter-row' md = { 24 } style = {{marginTop: '12px'}}>
                        <div className = 'gutter-box'>
                        <Card title = 'Comparison Chart' bordered = { false } >
                            <CompareChart />
                        </Card>
                        </div>
                    </Col>
                </Row>
            </div>
            
        )
    }
}

export default CorrelationAnalysis;