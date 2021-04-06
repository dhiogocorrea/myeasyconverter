import React from 'react';
import ROUTES, {RenderRoutes} from './routes';
import {BrowserRouter} from 'react-router-dom';

import {Button, Layout} from 'antd';

const {Header, Content, Footer} = Layout;

function App() {
  const goToHome = () => {
    window.location = '/';
  };

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{padding: 0}}>
          <Button type="text" style={{color: 'white'}} onClick={() => goToHome()}>
            MY EASY CONVERTER
          </Button>
        </Header>
        <Content style={{margin: '0 16px'}}>
          <BrowserRouter>
            <RenderRoutes routes={ROUTES} />
          </BrowserRouter>
        </Content>

        <Footer style={{textAlign: 'center'}}>MyEasyConverter ©2021 | By Dhiogo Corrêa</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
