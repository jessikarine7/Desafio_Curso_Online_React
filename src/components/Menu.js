import React from 'react';
import './Menu.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  Flex, 
  Heading, 
  Image, 
  TabList, 
  Box, 
  Tabs, 
  Tab, 
  ButtonGroup, 
  Button 
} from '@chakra-ui/react'

const Menu = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const buttonText = location.pathname === "/" ? "Matricule-se" : "Sair"
  const destination = location.pathname === "/" ? "/form" : "/"

  const handleButtonClick = () => {
    navigate(destination);
  };

  return(
    <div>
      <Flex 
        alignItems='center' 
        justify='center' 
        gap='2' 
        bg='#00002E'
        className='contMenu'
        justifyContent='space-between'
      >
        <Box 
          pl='7' 
          gap='2' 
          flexDirection='row' 
          display='flex'
        >
          <Image 
            src='./img/educacao.png' 
            boxSize='25px'
          ></Image>
          <Heading 
            size='md' 
            color='white'
          > Cursos Online </Heading>
        </Box>
        
        <Tabs p='4' colorScheme='teal'>
          <TabList color='white'>
            <Tab 
              onClick={() => navigate('/')}
            > Home </Tab>

            <Tab 
              onClick={() => navigate('/')}
            > Cursos </Tab>

            <Tab 
              onClick={() => navigate('/form')}
            > Cadastro </Tab>
          </TabList>
        </Tabs>        

        <ButtonGroup p='4' className='buttonMenu'>
          <Button 
            w='40'
            colorScheme='teal' 
            onClick={handleButtonClick}
          > {buttonText} </Button>
        </ButtonGroup>
      </Flex>
    </div>
  )
}

export default Menu