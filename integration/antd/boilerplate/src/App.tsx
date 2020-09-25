import React, { useState, useEffect } from 'react';
import { Layout, Breadcrumb } from 'antd';
import Table from './table';
import './App.css';


const { Header, Content, Footer } = Layout;

function App() {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    fetch('./api/list')
      .then(resp => resp.json())
      .then(({list}) => setData(list));
  }, []);
  return <Layout className="layout">
    <Header>
      <div className="logo">Midway</div>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Api Response List</Breadcrumb.Item>
      </Breadcrumb>
      <Table data={data} />
    </Content>
    <Footer style={{ textAlign: 'center' }}>Powered by <a href="https://github.com/midwayjs/midway" target="_blank" rel="noopener noreferrer">Midway</a> & <a href="https://ant.design/" target="_blank" rel="noopener noreferrer">Ant.Design</a></Footer>
  </Layout>;
}

export default App;
