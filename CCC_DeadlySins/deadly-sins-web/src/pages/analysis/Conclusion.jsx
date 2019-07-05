import React, { PureComponent } from 'react';
import { Row, Col, Card } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import axios from './../../axios/index';


var crimerate_correlation=[];
var offence_correlation=[];

export default class ConclusionCharts extends PureComponent {

    requestData = () => {
        axios.ajax({
            url:'/crimerate_correlation',
        }).then((res)=>{
            if(res){
                crimerate_correlation = res;
            }
        });
        axios.ajax({
            url:'/offence_correlation',
        }).then((res)=>{
            if(res){
                offence_correlation = res;
            }
        })
    }

    render() {
        this.requestData()
        return (
            <div style={{ textAlign: 'center' }}>
                <Row gutter = { 16 }>
                    
                    <Col className = 'gutter-row' md = { 24 } style = {{marginTop: '12px'}}>
                        <div className = 'gutter-box'>
                        <Card title = 'Correlation Between Offence and Sins' bordered = { false } >
                        <ResponsiveContainer width = '95%' height = { 400 } >
                            <BarChart data={offence_correlation}>
                                <CartesianGrid strokeDasharray="5 5" />
                                <XAxis dataKey="offence" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Pride" fill="#9CDBD9" />
                                <Bar dataKey="Greed" fill="#64CCC9" />
                                <Bar dataKey="Lust" fill="#00B2A9" />
                                <Bar dataKey="Envy" fill="#008675" />
                                <Bar dataKey="Gluttony" fill="#007367" />
                                <Bar dataKey="Wrath" fill="#00685E" />
                                <Bar dataKey="Sloth" fill="#00534C" />
                            </BarChart>
                        </ResponsiveContainer>
                        </Card>
                        </div>
                    </Col>

                    <Col className = 'gutter-row' md = { 24 } style = {{marginTop: '12px'}}>
                        <div className = 'gutter-box'>
                        <Card title = 'Correlation Between Crime Rates and Sins' bordered = { false } >
                        <ResponsiveContainer width = '95%' height = { 400 } >
                            <RadarChart outerRadius={150} data={crimerate_correlation}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="name" />
                                <PolarRadiusAxis angle={90} domain={[0, 0.75]} />
                                <Radar name="Crime Rate" dataKey="correlation" stroke="#FFB500" fill="#FFB500" fillOpacity={0.6} />
                                <Legend />
                                <Tooltip />
                            </RadarChart>
                        </ResponsiveContainer>
                        </Card>
                        </div>
                    </Col>
                </Row>
            </div>

        );
    }
}
