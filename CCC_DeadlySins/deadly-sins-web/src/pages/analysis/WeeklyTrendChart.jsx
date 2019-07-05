import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import axios from './../../axios/index';


class WeeklyChart extends Component {
    constructor(props){
        super(props);
        this.state={
            series: [],
        };
    }

    requestData = () => {
        axios.ajax({
            url: '/weekday',
        }).then((res)=>{
            if(res){

                var series = [];
                for (var [index, value] of res.entries()) {
                    var dict = {
                        name: value['name'],
                        type:'line',
                        stack: 'Total',
                        areaStyle: {},
                        data: value['data']
                    }
                    series.push(dict)
                };
                this.setState({series: series});
            }
        })
    }

    defineOption() {
        var option = {
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                },
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            legend: {
                data: ['pride', 'greed', 'lust', 'envy', 'gluttony', 'wrath', 'sloth']
            },
            
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            
            series : this.state.series
        };
        return option;        
    }
    

    render() {
        this.requestData();
        return (
            <ReactEcharts
                option={this.defineOption()}
                style={{height: '450px', width: '100%'}}
                className={'react_for_echarts'}
            />
        )
    }
}
export default WeeklyChart;