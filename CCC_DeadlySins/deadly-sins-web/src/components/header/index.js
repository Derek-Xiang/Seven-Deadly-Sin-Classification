import React,{Component} from 'react';
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom';
import './index.css';


class Header extends Component{
    state = {
        current: 'home',
      }
    
      handleClick = (e) => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
      }
    render(){
        return (
            <div>              
                <Menu 
                theme='dark'
                mode="horizontal"
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                style={{ lineHeight: '64px' }}
                >
                    <Menu.Item className='logo' key='logo'>
                        Deadly Sins Analysis
                    </Menu.Item>
                    <Menu.Item key='home'>
                        <Link to='/app/home' >
                            <Icon type='home' />Home
                        </Link>
                    </Menu.Item>
                    <Menu.Item key='map'>
                        <Link to='/app/map' >
                        <Icon type='environment' />7 Deadly Sins & Crime Rate
                        </Link>                    
                    </Menu.Item>
                    <Menu.Item key='analysis'>
                        <Link to='/app/analysis' >
                        <Icon type='dashboard' />Data Analysis
                        </Link>                       
                    </Menu.Item>

                </Menu>
                
            </div>
        )
    }
}

export default Header;