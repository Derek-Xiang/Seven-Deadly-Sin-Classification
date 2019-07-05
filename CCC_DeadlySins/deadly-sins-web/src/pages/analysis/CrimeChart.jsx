import React, { PureComponent } from 'react'
import emitter from '../../util/events';
import { Menu, Icon, Dropdown, Button, message } from 'antd';
import { BarChart, Bar, XAxis, YAxis, LabelList, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { crimes } from './DataInput'
import { crimeData } from './CorrelationAnalysis';

const crime_item = [];
for (const [index, value] of crimes.entries()) {
    crime_item.push(<Menu.Item key = { index }><Icon type = 'bulb' />{ value }</Menu.Item>)
};

var crime_select = [];
export { crime_select };

export default class CrimeChart extends PureComponent {

    constructor(props){
        super(props);
        this.state={
            mainData: [],
            selectValue: ''
        };
    }

    handleMenuClick = (e) => {
        // Request data
        
        this.setState({selectValue: e.item.props.children[1]});
        var arr = this.state.mainData;
        var crime_type = this.state.selectValue;
        var mainData = [];
        for(var i = 0, len = arr.length; i < len; i++){
            var dict = arr[i];
            
            mainData.push({'lga':dict['lga'], 'crimeAmt': dict[crime_type.toLowerCase()]});
        }
        crime_select = mainData;
        emitter.emit('crimeSelection', e.item.props.children[1]);
        message.info('Update ' + e.item.props.children[1] + ' data');
        console.log('click', e);
    };

    render() {
        this.setState({mainData: crimeData})
        return(
            <div>
            <div id = 'components-dropdown-demo-dropdown-button'>
                <Dropdown overlay = { 
                    <Menu onClick = { this.handleMenuClick }>
                        { crime_item }
                    </Menu>
                 }>
                    <Button>
                        Crime Type <Icon type = 'down' />
                    </Button>
                </Dropdown>
            </div>
            <p></p>
            <ResponsiveContainer width = '100%' height = { 1200 } >
                <BarChart width = { 600 } height = { 1100 } data = { this.state.mainData } layout = 'vertical' >
                    <XAxis type = 'number' domain = { [0, 'dataMax + 50'] } />
                    <YAxis dataKey = 'lga' type = 'category' />
                    <Tooltip />
                    {/* <Legend /> */}
                    <Bar dataKey = { this.state.selectValue } fill = '#8884d8' >
                        <LabelList dataKey = { this.state.selectValue } position = 'right' />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
             </div>
        );
    }
}


