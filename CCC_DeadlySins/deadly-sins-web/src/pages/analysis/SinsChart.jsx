import React, { PureComponent } from 'react';
import emitter from '../../util/events';
import { Menu, Icon, Dropdown, Button, message } from 'antd';
import { BarChart, Bar, XAxis, YAxis, LabelList, Tooltip, ResponsiveContainer } from 'recharts';
import { sins } from './DataInput'
import { sinsData } from './CorrelationAnalysis';

const sds_item = [];
for (const [index, value] of sins.entries()) {
    sds_item.push(<Menu.Item key = { index }><Icon type = 'bulb' />{ value }</Menu.Item>)
};

var sin_select = [];
export { sin_select };

export default class SinsChart extends PureComponent {

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
        var sin = this.state.selectValue;
        var mainData = [];
        for(var i = 0, len = arr.length; i < len; i++){
            var dict = arr[i];
            
            mainData.push({'lga':dict['lga'], 'sinsAmt': dict[sin.toLowerCase()]});
            // } 
        }
        sin_select = mainData;
        emitter.emit('sinSelection', e.item.props.children[1]);
        message.info('Update ' + e.item.props.children[1] + ' data');
        console.log('click', e);
    };

    render() {
        this.setState({mainData: sinsData})
        // this.requestData()
        return(
            <div>
            <div id = 'components-dropdown-demo-dropdown-button'>
                <Dropdown 
                    overlay = 
                    {<Menu onClick = { this.handleMenuClick }>
                        { sds_item }
                    </Menu>}
                >
                    <Button>
                        Seven Deadly Sins <Icon type = 'down' />
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
                    <Bar dataKey = { this.state.selectValue.toLowerCase() } fill = '#F9423A' >
                        <LabelList dataKey = { this.state.selectValue.toLowerCase() } position = 'right' />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            </div>
        );
    }
}


