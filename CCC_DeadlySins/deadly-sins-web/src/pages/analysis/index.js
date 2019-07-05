import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';
import { Link, Route, Switch, Redirect } from 'react-router-dom';


import CorrelationAnalysis from './CorrelationAnalysis';
import ConclusionCharts from './Conclusion';
import { AnnualTrendAnalysis, WeeklyTrendAnalysis, DailyTrendAnalysis } from './TrendAnalysis';

const { Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;
class Analysis extends Component {
    render() {
        return(
            <Layout>
            <Content style={{ padding: '0 50px' }}>
            <p></p>
            <Layout style={{ padding: '12px 0', background: '#fff' }}>
            <Sider width={220} style={{ background: '#fff' }}>
            <Menu mode='inline' defaultSelectedKeys={['1']} style={{ height: '100%' }}>
                {/* <Menu.Item key = '1'>
                    <Link to = '/app/analysis/correlation' />
                    <Icon type = 'bar-chart' />
                    <span>Correlation Analysis</span>
                </Menu.Item> */}
                <SubMenu key = '1' title={<span><Icon type='bar-chart' />Correlation Analysis</span>}>
                    <Menu.Item key = 'location'>
                        <Link to = '/app/analysis/correlation' />
                        <Icon type = 'environment' />
                        <span>By Location</span>
                    </Menu.Item>
                    <Menu.Item key = 'conclusion'>
                        <Link to = '/app/analysis/conclusion' />
                        <Icon type = 'radar-chart' />
                        <span>Conclusion</span>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="2" title={<span><Icon type='rise' />Trend Analysis</span>}>
                    <Menu.Item key="annual">
                        <Link to = '/app/analysis/annual-trend' />
                        <Icon type = 'calendar' />
                        <span>Annual Trend</span>
                    </Menu.Item>
                    <Menu.Item key="weekly">
                        <Link to = '/app/analysis/weekly-trend' />
                        <Icon type = 'calendar' />
                        <span>Weekly Trend</span>
                    </Menu.Item>
                    <Menu.Item key="daily">
                        <Link to = '/app/analysis/daily-trend' />
                        <Icon type = 'calendar' />
                        <span>Daily Trend</span>
                    </Menu.Item>
                </SubMenu>
            </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Route exact path="/app/analysis" render={() => <Redirect to="/app/analysis/correlation" push />} />   
            <Switch>
                <Route exact path='/app/analysis/correlation' component={ CorrelationAnalysis }/>
                <Route exact path='/app/analysis/conclusion' component={ ConclusionCharts }/>
                <Route path='/app/analysis/annual-trend' component={ AnnualTrendAnalysis }/>
                <Route path='/app/analysis/weekly-trend' component={ WeeklyTrendAnalysis }/>
                <Route path='/app/analysis/daily-trend' component={ DailyTrendAnalysis }/>
            </Switch>
            </Content>
            </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Twitter Deadly Sins and Crime Rate Analysis ©2019 Created by Team 50
            </Footer>
            </Layout>
        )
    }
}

export default Analysis;