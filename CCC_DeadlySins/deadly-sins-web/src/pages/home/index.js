import React, { Component } from 'react';
import { Row,Col,Card, Icon, Layout } from 'antd';
import './index.css';
import DejunXiang from './../../picture/DejunXiang.jpg'
import xinwu from './../../picture/xinwu.jpg'
import liwang from './../../picture/liwang.jpg'
import miaoqin from './../../picture/miaoqin.jpg'
import yuanliang from './../../picture/yuanliang.jpg'


const { Meta } = Card;
const { Content } = Layout;

class Home extends Component {
    render(){
        return(
            // <Layout style={{ padding: '12px 0', background: '#fff' }}>
            <Content style={{ padding: '0 50px' }}>
            <div style={{ textAlign: 'center' }}>
                <p></p>
                <Card title = 'Group 50 Team Members' bordered = { false } >
                {/* <Row className='home'>Group 50 Team Members' Information</Row> */}
                <div>
                <Row className='introduction' gutter={16}>
                    <Col className="gutter-row" span={5}>
                        <div className="gutter-box">
                        <Card
                            style={{ width: 210, textAlign: 'left'}}
                            cover={<img alt="example" src={xinwu} />}
                            >
                            <Meta
                            avatar={<Icon type="user" />}
                            title="Xin Wu"
                            description="Front End Developer"
                            />
                        </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <div className="gutter-box">
                        <Card
                            style={{ width: 210, textAlign: 'left'}}
                            cover={<img alt="example" src={liwang} />}
                            >
                            <Meta
                            avatar={<Icon type="user" />}
                            title="Li Wang"
                            description="Front End Developer"
                            />
                        </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <div className="gutter-box">
                        <Card
                            style={{ width: 210, textAlign: 'left'}}
                            cover={<img alt="example" src={DejunXiang} />}
                    
                            >
                            <Meta
                            avatar={<Icon type="user" />}
                            title="Dejun Xiang"
                            description="Back End Developer"
                            />
                        </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <div className="gutter-box"><Card
                            style={{ width: 210, textAlign: 'left'}}
                            cover={<img alt="example" src={miaoqin} />}
    
                            >
                            <Meta
                            avatar={<Icon type="user" />}
                            title="Miaoqin Li"
                            description="Back End Developer"
                            />
                        </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <div className="gutter-box"><Card
                            style={{ width: 210, textAlign: 'left'}}
                            cover={<img alt="example" src={yuanliang} />}
                
                            >
                            <Meta
                            avatar={<Icon type="user" />}
                            title="Yuan Liang"
                            description="Cloud Administrator"
                            />
                        </Card>
                        </div>
                    </Col>
                </Row>
                </div>
                </Card>

            </div>
            </Content>
            // </Layout>
        )
    }
}

export default Home;



