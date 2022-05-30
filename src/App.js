import './App.css';
import 'antd/dist/antd.css';
import useStore from './states';
import AgencyList from './components/AgencyList';
import Obligations from './components/Obligations';
import {Layout, Typography, Space, Select} from 'antd';

const {Header, Footer, Content} = Layout;
const {Text} = Typography;
const {Option} = Select;

function App () {
  const agencyId = useStore (state => state.agencyId);
  const setAgencyId = useStore (state => state.setAgencyId);
  const year = useStore (state => state.year);
  const setYear = useStore (state => state.setYear);

  const handleChange = value => {
    setAgencyId (value);
  };

  const handleYearChange = (value) => {
    setYear (value);
  };

  return (
    <div>
      <Layout>
        <Header>
          <Space>
            <Text Style="color:white">Agency List</Text>
            <AgencyList onChange={handleChange} />
            <Text Style="color:white">Budget Year</Text>
            <Select 
            defaultValue="2021"
            style={{
              width: 100,
            }}
            onChange={handleYearChange}>
              <Option value="2021">2021</Option>
              <Option value="2020">2020</Option>
              <Option value="2019">2019</Option>
              <Option value="2018">2018</Option>
              <Option value="2017">2017</Option>
            </Select>
          </Space>
        </Header>
        <Content>
          <Obligations agencyId={agencyId} year={year} />
        </Content>
        <Footer>Made with 💛 by RapidAPI</Footer>
      </Layout>
    </div>
  );
}

export default App;
