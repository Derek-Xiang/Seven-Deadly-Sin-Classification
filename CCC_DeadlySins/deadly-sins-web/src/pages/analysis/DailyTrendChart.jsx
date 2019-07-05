import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import axios from './../../axios/index';

class DailyChart extends Component {
    constructor(props){
        super(props);
        this.state={
            series: [],
        };
    }

    requestData = () => {
        axios.ajax({
            url: '/24h',
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
                    data : ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
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
export default DailyChart;