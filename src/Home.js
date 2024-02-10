import './App.css'
import { SearchIcon} from '@chakra-ui/icons'
import { Divider, Stack, Flex, Spacer, Box, Heading,ButtonGroup, Button, Tabs, TabList, Tab, Input, InputGroup, InputLeftElement, Text, Card, CardHeader, CardBody, CardFooter, Center } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Cards } from './components/Cards'
import { useNavigate} from 'react-router-dom'

function Home() {
  const [cursos, setCurso] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
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
        console.log(data);
      })
      .catch((err) => console.log(err))
  }, [])

  const filteredCursos = cursos.filter((curso) =>
    curso.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <Flex minWidth='max-content' alignItems='center' justify='center' gap='2'>
        <Box pl='7'>
          <Image src='educacao.png' boxSize='25px'></Image>
        </Box>

        <Box>
          <Heading size='md'>Cursos Online</Heading>
        </Box>

        <Spacer />

        <Tabs p='7' colorScheme='teal'>
          <TabList>
            <Tab onClick={() => navigate('/')}>Home</Tab>
            <Tab onClick={() => navigate('/')}>Cursos</Tab>
            <Tab onClick={() => navigate('/form')}>Cadastro</Tab>
          </TabList>
        </Tabs>

        <Spacer />

        <ButtonGroup p='7'>
          <Button w='40' colorScheme='teal' onClick={() => navigate('/form')}>Matricule-se</Button>
        </ButtonGroup>
      </Flex>

      <Flex justify='center' alignItems='center'>
        <Box p='2' w='35%'>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <SearchIcon color='gray.300' />
            </InputLeftElement>

            <Input
              focusBorderColor='teal.300'
              type='search'
              placeholder='Pesquisar Cursos'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Box>
      </Flex>

      <Box pl='10' pb='4'>
        <Text fontSize='4xl'>Cursos de Tecnologia</Text>
      </Box> 

      <Flex pl='10' pr='10' w='100%' gap='5'>
        {filteredCursos.map((curso) => (
          <Box minH='50%' className='card' border='1px' borderRadius='10' borderColor='teal.300' p='5' w='25%' key={curso.id}>
            <Box bg='white' className='image'>
              <Image src={curso.image.url} w='120px' h='120px'></Image>
            </Box>

            <Box display='flex' justifyContent='center' pt='2'>
              <Heading size='md' pb='2' color='teal.300'>
                {curso.header}
              </Heading>
            </Box>

            <Text className='descricao' pb='2'>{curso.text}</Text>

            <Box className='containerDuracao' gap='7' alignItems='center' pt='2'>
              <Text className='duracao' color='teal.300'>{curso.hours}</Text>
              <Button colorScheme='teal' size='md' onClick={() => navigate('/form')}>
                Matricular
              </Button>
            </Box>
          </Box>
        ))}
      </Flex>
    </div>
  );
}

export default Home