import React,{Component} from 'react';
import {Select,Card} from 'antd';
import SinsMap from './SinsMap';
import './index.css';

const Option = Select.Option;

class Map extends Component {
    constructor(props){
        super(props);
        this.state={
            selection:''
        };
        
        this.changeSelectValue= this.changeSelectValue.bind(this);
     }
    render(){
        let selection=this.state.selection;
        return (
            <div>
                <p></p>
                <div className='title'>7 Deadly Sins and Crime Rate Analysis</div>
                <div className='deadlysins'>
                Option: 
                <Select id="choose" className='select' defaultValue="crimeRate" onChange={this.changeSelectValue} >
                    <Option value="crimeRate">Crime Rate</Option>
                    <Option value="incidents">Incidents</Option>
                    <Option value="lust">Lust</Option>
                    <Option value="gluttony">Gluttony</Option>
                    <Option value="greed">Greed</Option>
                    <Option value="sloth">Sloth</Option>
                    <Option value="wrath">Wrath</Option>
                    <Option value="envy">Envy</Option>
                    <Option value="pride">Pride</Option>
                </Select>
                </div>
                
                <Card>
                    <SinsMap selection={selection} onChange={this.changeSelectValue}/>  
                                
                </Card>
                 
            </div>
        );
    }

   
    changeSelectValue(value){
        this.setState({
            selection:value
        });
    }

}

export default Map;