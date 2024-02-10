import React from 'react'
import './Home.css'
import Menu from '../components/Menu'
import { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'
import { SearchIcon} from '@chakra-ui/icons'
import { 
  Flex, 
  Box, 
  Heading,
  Button, 
  Input, 
  InputGroup, 
  InputLeftElement, 
  Text, 
  Image,
  ButtonGroup
} from '@chakra-ui/react'

function Home() {
  const [cursos, setCurso] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  useEffect(()=> {
    fetch('http://localhost:5000/cursos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCurso(data)
        console.log(data)
      })
      .catch((err) => console.log(err))
  }, [])

  const filteredCursos = cursos.filter((curso) =>
    curso.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  )

  return (
    <div className="App">
      <Menu />

      <Flex justify='center' alignItems='center' pt='2'>
        <Box p='2' w='35%'>
          <InputGroup >
            <InputLeftElement pointerEvents='none'>
              <SearchIcon color='gray.300' />
            </InputLeftElement>

            <Input
              focusBorderColor='teal.300'
              type='search'
              placeholder='Pesquisar Cursos'
              minW='140px'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Box>
      </Flex>

      <Box 
        pl='10' 
        pb='4' 
        pt='2' 
        className="title"
      >
        <Heading 
          size='lg' 
          className="title"
        >Cursos de Tecnologia</Heading>
      </Box> 

      <Flex 
        pl='10' 
        pr='10' 
        w='100%' 
        gap='5' 
        className="card" 
        pb='5'
      >
        {filteredCursos.map((curso) => (
          <Box 
            border='1px' 
            borderRadius='10' 
            borderColor='teal.300' 
            p='4' 
            flexBasis='20%'
            key={curso.id}
          >
            <Box                 
              h='260px'
            >
              <Box 
                bg='white'                 
                display='flex'
                justifyContent='center'
              >
                <Image 
                  src={curso.image.url} 
                  w='120px' 
                  h='120px'
                ></Image>
              </Box>

              <Box 
                display='flex' 
                justifyContent='center' 
                pt='2'
              >
                <Heading 
                  size='md' 
                  pb='2' 
                  color='teal.300'
                >
                  {curso.header}
                </Heading>
              </Box>
            
              <Text 
                textAlign='justify'
                pb='2'
              >{curso.text}</Text>          
            </Box>

            <Box 
              display='flex' 
              justifyContent='end' 
              alignSelf='end' 
              pt='2' 
              className="button"
            >
              <ButtonGroup 
                display='flex'
                alignItems='center'
                justifyContent='right'
                gap='5' 
                className="buttonGroup"
                pt='2'
                pl='5'
              >
                <Text 
                  color='teal.300'
                  fontWeight='600'
                  whiteSpace='nowrap'
                >{curso.hours}</Text>

                <Button 
                  colorScheme='teal' 
                  size='md' 
                  onClick={() => navigate('/form')}
                >Matricular</Button>
              </ButtonGroup>
            </Box>
          </Box>
        ))}
      </Flex>
    </div>
  )
}

export default Home