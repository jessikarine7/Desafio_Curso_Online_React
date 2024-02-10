import React from 'react'
import { useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Menu from '../components/Menu'
import { 
  Alert, 
  AlertIcon, 
  AlertTitle, 
  FormControl, 
  FormLabel, 
  FormHelperText, 
  Select, 
  Input, 
  Flex, 
  ButtonGroup, 
  Button, 
  Stack 
} from '@chakra-ui/react'

const Form = () => {
  const navigate = useNavigate()
  const [cursos, setCurso] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [idPessoa] = useState('')
  const [password, setPassword] = useState('')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [mostrarAlerta, setMostrarAlerta] = useState(false)
  const [mensagemAlerta, setMensagemAlerta] = useState('')

  useEffect(() => {
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

  const handleConfirmar = () => {
    const alunoData = {
      Aluno: [
        {
          idPessoa: idPessoa,
          password: password,
          cursos: searchTerm,
          nome: nome, 
          email: email
        }
      ],
    }

    fetch('http://localhost:5000/aluno', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(alunoData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('Dados armazenados com sucesso:', data)
        setMensagemAlerta('Matrícula realizada com sucesso!')
        setMostrarAlerta(true)
        setTimeout(() => {
          setMostrarAlerta(false)
          navigate('/')
        }, 3000)
      })
      .catch((err) => {
        console.log('Erro ao armazenar dados:', err)
        setMensagemAlerta('Erro ao realizar a matrícula. Tente novamente.')
        setMostrarAlerta(true)
        setTimeout(() => {
          setMostrarAlerta(false)
        }, 3000)
      })
  }
  
  return (
    <div>
     <Menu />

      { mostrarAlerta && (
        <Alert status={mensagemAlerta.includes('sucesso') ? 'success' : 'error'}>
          <AlertIcon />

          <AlertTitle>
            {mensagemAlerta}
          </AlertTitle>
        </Alert>
      )}

      <Flex 
        justifyContent='center' 
        pt='4' 
        pb='2'
        className="form"
      >
        <Stack maxW='500px' flexBasis='50%'>
          <FormControl>
            <FormLabel>Nome Completo</FormLabel>
            <Input 
              placeholder='Digite seu nome' 
              size='sm'  
              type='text'
              value={nome} 
              onChange={(e) => setNome(e.target.value)}
            />
            <FormHelperText textAlign='right'> 
              Nome completo sem acento 
            </FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input 
              placeholder='Digite seu email' 
              size='sm' 
              type='email'
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormHelperText textAlign='right'> 
              Email que deseja receber informações 
            </FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Senha</FormLabel>
            <Input 
              placeholder='Digite sua senha' 
              size='sm' 
              type='password'
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormHelperText textAlign='right'> 
              Senha de 4 dígitos, só números 
            </FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Escolha o curso</FormLabel>
            <Select 
              size='sm' 
              placeholder='Selecione um curso' 
              onChange={(e) => setSearchTerm(e.target.value)}
            >
              {cursos.map((curso) => (
                <option 
                  key={curso.id} 
                  value={curso.name}
                >
                  {curso.name}
                </option>
              ))}
            </Select>
            <FormHelperText textAlign='right'>
              Escolha um curso para se matricular
            </FormHelperText>
          </FormControl>

          <ButtonGroup pt='4' justifyContent='right'>
            <Button 
              w='40' 
              size='sm' 
              colorScheme='red' 
              onClick={() => navigate('/')}
            >Cancelar</Button>

            <Button 
              w='40' 
              colorScheme='teal' 
              size='sm' 
              onClick={handleConfirmar}
            >Confirmar</Button>
          </ButtonGroup>
        </Stack>
      </Flex>
    </div>
  )
}

export default Form