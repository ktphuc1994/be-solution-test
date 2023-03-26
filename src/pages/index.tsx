import { useState } from 'react';

// import MUI components
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import List from '@mui/material/List';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`task-tabpanel-${index}`}
      aria-labelledby={`task-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `task-tab-${index}`,
    'aria-controls': `task-tabpanel-${index}`
  };
};

const HomePage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label='task-tabs-control'>
          <Tab label='Task 01' {...a11yProps(0)} />
          <Tab label='Task 02' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <h3 style={{ fontWeight: 700 }}>Login Page</h3>
        <List
          sx={{
            '& li ul li': { ml: '2rem' },
            '&>li': { mb: '1rem' }
          }}
        >
          <li>
            Validate Form Login
            <ul>
              <li>Email format</li>
              <li>Required input</li>
            </ul>
          </li>
          <li>
            When click button login
            <ul>
              <li>Generate Token : Save Token to LocalStorage</li>
            </ul>
          </li>
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h3 style={{ fontWeight: 700 }}>Users Page</h3>
        <List
          sx={{
            listStyleType: '',
            '& li ul li': { ml: '2rem' },
            '&>li:not(:last-child)': { mb: '0.5rem' }
          }}
        >
          <li>Config Router with Path '/User' for page User</li>
          <li>
            When access to User Page
            <ul>
              <li>If Token null in LocalStorage : Redirect to LoginPage</li>
            </ul>
          </li>
          <li>
            Prepare List User:
            <ul>
              <li>ID</li>
              <li>Full Name</li>
              <li>Age</li>
            </ul>
          </li>
          <li>Save list User to LocalStorage</li>
          <li>Show list 10 User in table</li>
          <li>
            Add function search for table
            <ul>
              <li>Search by Id</li>
              <li>Search by Name</li>
              <li>Search by Age</li>
            </ul>
          </li>
          <li>Function: Add New User</li>
          <li>Function: Edit User</li>
          <li>
            Request "Optional":
            <ul>
              <li>Form Add/Edit User</li>
              <li>Use Calendar Component for input Age</li>
            </ul>
          </li>
        </List>
      </TabPanel>
    </Box>
  );
};

export default HomePage;
