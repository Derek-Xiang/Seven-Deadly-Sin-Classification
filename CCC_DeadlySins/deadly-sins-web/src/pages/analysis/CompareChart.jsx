import React, { PureComponent } from 'react';
import emitter from '../../util/events';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from 'recharts';
import { crimeData, sinsData } from './CorrelationAnalysis';

export default class CompareChart extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            mainData: [],
            crime_select: '',
            sin_select: ''
        };
    }

    mergeData = () => {
        var mainData = crimeData
        for (var i = 0; i < sinsData.length; i++) {
            var dict = sinsData[i];
            for (var j = 0; j < mainData.length; j++) {
                if (dict['lga'] == mainData[j]['lga']) {
                    mainData[j] = Object.assign(mainData[j],dict);
                    break;
                }
            }
        }
        this.setState({mainData:mainData});
    }

    componentDidMount() {
        this.eventEmitterforcrime = emitter.addListener('crimeSelection', (message) => {
            this.setState({ crime_select: message });
        });
        this.eventEmitterforsin = emitter.addListener('sinSelection', (message) => {
            this.setState({ sin_select: message });
        });
    }

    // componentWillUnmount() {
    //     emitter.removeListener(this.eventEmitterforsin);
    //     emitter.removeListener(this.eventEmitterforcrime);
    // }


    render() {
        this.mergeData();
        return(
            <ResponsiveContainer width = '100%' height = { 500 } >
                <LineChart 
                    data = { this.state.mainData }
                    margin = {{
                        top: 20, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray = '5 5' />
                    <XAxis dataKey = 'lga' type = 'category' />
                    <YAxis />

                    <Tooltip />
                    <Legend />

                    <Line dataKey = {this.state.crime_select} stroke = '#8884d8' />
                    <Line dataKey = {this.state.sin_select.toLowerCase()} stroke = '#F9423A' />
                </LineChart>
            
            </ResponsiveContainer>
        );
    }
}