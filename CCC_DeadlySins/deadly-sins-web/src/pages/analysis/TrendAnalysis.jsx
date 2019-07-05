import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';
import WeeklyChart from './WeeklyTrendChart';
import AnnualChart from './AnnualTrendChart';
import DailyChart from './DailyTrendChart';


class AnnualTrendAnalysis extends Component {
    render() {
        return(
            <div style={{ textAlign: 'center' }}>
                <Row gutter = { 16 }>
                    <Col className = 'gutter-row' md = { 24 } style = {{marginTop: '12px'}}>
                        <div className = 'gutter-box'>
                        <Card title = 'Annual Chart' bordered = { false } >
                            <AnnualChart />
                        </Card>
                        </div>
                    </Col>
                </Row>
            </div>
            
        )
    }
}
export { AnnualTrendAnalysis };

class WeeklyTrendAnalysis extends Component {
    render() {
        return(
            <div style={{ textAlign: 'center' }}>
                <Row gutter = { 16 }>
                    <Col className = 'gutter-row' md = { 24 } style = {{marginTop: '12px'}}>
                        <div className = 'gutter-box'>
                        <Card title = 'Weekly Chart' bordered = { false } >
                            <WeeklyChart />
                        </Card>
                        </div>
                    </Col>
                </Row>
            </div>
            
        )
    }
}
export { WeeklyTrendAnalysis };

class DailyTrendAnalysis extends Component {
    render() {
        return(
            <div style={{ textAlign: 'center' }}>
                <Row gutter = { 16 }>
                    <Col className = 'gutter-row' md = { 24 } style = {{marginTop: '12px'}}>
                        <div className = 'gutter-box'>
                        <Card title = 'Daily Chart' bordered = { false } >
                            <DailyChart />
                        </Card>
                        </div>
                    </Col>
                </Row>
            </div>
            
        )
    }
}
export { DailyTrendAnalysis };