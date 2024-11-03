import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import Firstpg from './assets/pages/Firstpg';
import Layout from './assets/components/Layout';
import Projects from './assets/pages/Projects';
import ProjectDeitals from './assets/pages/ProjectDeitals';
import ProjectsMain from './assets/pages/ProjectsMain';
import Categories from './assets/pages/Categories';
import Addproject from './assets/pages/Addproject';
import Addproject1 from './assets/pages/AddProject1';
import Addproject2 from './assets/pages/AddProject2';
import Users from './assets/pages/Users';
import Roles from './assets/pages/Roles';
import Zhanrs from './assets/pages/Zhanrs';
import Ages from './assets/pages/Ages';
import Register from './assets/pages/Register';

function App() {
  return (
      <div>
        <HelmetProvider>
        <Routes>
            <Route path='/' element={<Firstpg/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route element={<Layout/>}>
             <Route index path='/project' element={<Projects/>}/>
             <Route path='/project/deital' element={<ProjectDeitals/>}/>
             <Route path='/project/main' element={<ProjectsMain/>}/>
             <Route path='/categories' element={<Categories/>}/>
             <Route path='/project/add/step1' element={<Addproject/>}/>
             <Route path='/project/add/step2' element={<Addproject1/>}/>
             <Route path='/project/add/step3' element={<Addproject2/>}/>
             <Route path='/users' element={<Users/>}/>
             <Route path='/roles' element={<Roles/>}/>
             <Route path='/zhanrs' element={<Zhanrs/>}/>
             <Route path='/ages' element={<Ages/>}/>
            </Route>
        </Routes>
        </HelmetProvider>
      </div>
  );
}

export default App;
