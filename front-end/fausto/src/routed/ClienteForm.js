import { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import InputMask from 'react-input-mask'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory, useParams } from 'react-router-dom'
import ConfirmDialog from '../ui/ConfirmDialog'

const useStyles = makeStyles(() => ({
    form: {
        maxWidth: '80%',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        '& .MuiFormControl-root': {
            minWidth: '200px',
            maxWidth: '500px',
            marginBottom: '24px',
        }
    },
    toolbar: {
        marginTop: '36px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around'
    },
    checkbox: {
        alignItems: 'center'
    }
}))

const formatNumber = {
    '0': '[0-9]'
}

// Máscara para CPF: '000.000.000-00'
const cpfMask = '000.000.000-00'

// Máscara para tel: '(00) 00000-0000'
const telMask = '(00) 00000-0000'

export default function ClientesForm() {
    const classes = useStyles()

    const [cliente, setCliente] = useState({
        id: null,
        nome: '',
        cpf: '',
        rg: '',
        logradouro: '',
        num_imovel: '',
        complemento: '',
        bairro: '',
        municipio: '',
        uf: '',
        telefone: '',
        email: ''
    })

    const [snackState, setSnackState] = useState({
        open: false,
        severity: 'success',
        message: 'Cliente salvo com sucesso'
    })

    const [btnSendState, setBtnSendState] = useState({
        disabled: false,
        label: 'Enviar'
    })

    const [error, setError] = useState({
        nome: '',
        cpf: '',
        rg: '',
        logradouro: '',
        num_imovel: '',
        complemento: '',
        bairro: '',
        municipio: '',
        uf: '',
        telefone: '',
        email: ''
    })

    const [UF, setUF] = useState([])

    const [isModified, setIsModified] = useState(false)

    const [dialogOpen, setDialogOpen] = useState(false)

    const [title, setTitle] = useState('Cadastrar Novo Cliente')

    const history = useHistory()
    const params = useParams()

    useEffect(() => {
        // Verifica se tem o parâmetro id na rota. Se tiver, temos que buscar
        // os dados do registro no back-end para edição
        if (params.id) {
            setTitle('Editando Cliente')
            getData(params.id)
        }
        getEstados()
    }, [params.id])

    async function getData(id) {
        try {
            let response = await axios.get(`https://api.faustocintra.com.br/clientes/${id}`)
            setCliente(response.data)
        }
        catch (error) {
            setSnackState({
                open: true,
                severity: 'error',
                message: 'Não foi possível carregar os dados para edição.'
            })
        }
    }

    async function getEstados(idBrasil = 3469034) {

        /* vamos obter de uma API pública os estados do Brasil */
        try {
            let response = await axios.get(`http://www.geonames.org/childrenJSON?geonameId=${idBrasil}`)
            response.data.geonames.map(estado => setUF(old => [...old, (estado.adminCodes1.ISO3166_2)]))
        }
        catch (error) {
            setSnackState({
                open: true,
                severity: 'error',
                message: 'Erro ao obter estados do Brasil, tente novamente mais tarde!'
            })
        }
    }

    function handleInputChange(event, property) {

        const clienteTemp = { ...cliente }

        // Se houver id no event.target, ele será o nome da propriedade
        // senão, usaremos o valor do segundo parâmetro
        if (event.target.id) property = event.target.id

        clienteTemp[property] = event.target.value

        setCliente(clienteTemp)
        setIsModified(true)   // O formulário foi modificado
        validate(clienteTemp)     // Dispara a validação
    }

    function validate(data) {

        const errorTemp = {
            nome: '',
            cpf: '',
            rg: '',
            logradouro: '',
            num_imovel: '',
            complemento: '',
            bairro: '',
            municipio: '',
            uf: '',
            telefone: '',
            email: ''
        }
        let isValid = true

        // trim(): retira espaços em branco do início e do final de uma string

        // Validação do campo nome
        if (data.nome.trim() === '') {
            errorTemp.nome = 'O nome deve ser preenchido'
            isValid = false
        }

        // Validação do campo cpf
        if (data.cpf.trim() === '' || data.cpf.includes('_')) {
            errorTemp.cpf = 'O CPF deve ser preenchido'
            isValid = false
        }

        // Validação do campo rg
        if (data.rg.trim() === '') {
            errorTemp.rg = 'O RG deve ser preenchido'
            isValid = false
        }

        // Validação do campo logradouro
        if (data.logradouro.trim() === '') {
            errorTemp.logradouro = 'O logradouro deve ser preenchido'
            isValid = false
        }

        // Validação do campo num_imovel
        if (data.num_imovel.trim() === '') {
            errorTemp.num_imovel = 'O número do imóvel deve ser preenchido'
            isValid = false
        }

        // Validação do campo complemento
        if (data.complemento.trim() === '') {
            errorTemp.complemento = 'O complemento deve ser preenchido'
            isValid = false
        }

        // Validação do campo bairro
        if (data.bairro.trim() === '') {
            errorTemp.bairro = 'O bairro deve ser preenchido'
            isValid = false
        }

        // Validação do campo municipio
        if (data.municipio.trim() === '') {
            errorTemp.municipio = 'O municipio deve ser preenchido'
            isValid = false
        }

        // Validação do campo uf
        if (data.uf.trim() === '') {
            errorTemp.uf = 'Escolha uma UF'
            isValid = false
        }

        // Validação do campo telefone
        if (data.telefone.trim() === '') {
            errorTemp.telefone = 'O telefone deve ser preenchido'
            isValid = false
        }

        // Validação do campo email
        if (data.email.trim() === '') {
            errorTemp.email = 'O email deve ser preenchido'
            isValid = false
        }

        setError(errorTemp)
        return isValid

    }

    async function saveData() {
        try {
            // Desabilitar o botão Enviar
            setBtnSendState({ disabled: true, label: 'Enviando...' })

            // Se o registro já existe (edição, verbo HTTP PUT)
            if (params.id) await axios.put(`https://api.faustocintra.com.br/clientes/${params.id}`, cliente)
            // Registro não existe, cria um novo (verbo HTTP POST)
            else await axios.post('https://api.faustocintra.com.br/clientes', cliente)

            setSnackState({
                open: true,
                severity: 'success',
                message: 'Cliente salvo com sucesso!'
            })

        }
        catch (error) {
            setSnackState({
                open: true,
                severity: 'error',
                message: 'ERRO: ' + error.message
            })
        }
        // Reabilitar o botão Enviar
        setBtnSendState({ disabled: false, label: 'Enviar' })
    }

    function handleSubmit(event) {

        event.preventDefault() // Evita o recarregamento da página

        // Só salva os dados se eles forem válidos
        if (validate(cliente)) saveData()

    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    function handleSnackClose(event, reason) {
        // Evita que a snackbar seja fechada clicando-se fora dela
        if (reason === 'clickaway') return
        setSnackState({ ...snackState, open: false }) // Fecha a snackbar

        // Retorna à página de listagem
        history.push('/list')   // Retorna à página de listagem
    }

    function handleDialogClose(result) {
        setDialogOpen(false)

        // Se o usuário concordou em voltar
        if (result) history.push('/list')
    }

    function handleGoBack() {
        // Se o formulário estiver modificado, mostramos o diálogo de confirmação
        if (isModified) setDialogOpen(true)
        // Senão, voltamos diretamente à página de listagem
        else history.push('/list')
    }

    return (
        <>
            <ConfirmDialog isOpen={dialogOpen} onClose={handleDialogClose}>
                Há dados não salvos. Deseja realmente voltar?
            </ConfirmDialog>

            <Snackbar open={snackState.open} autoHideDuration={6000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity={snackState.severity}>
                    {snackState.message}
                </Alert>
            </Snackbar>

            <h1>{title}</h1>
            <form className={classes.form} onSubmit={handleSubmit}>

                <TextField
                    id="nome"
                    label="Nome"
                    variant="filled"
                    value={cliente.nome}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    error={error.nome !== ''}
                    helperText={error.nome}
                />

                <InputMask
                    formatChars={formatNumber}
                    mask={cpfMask}
                    id="cpf"
                    value={cliente.cpf}
                    onChange={event => handleInputChange(event, 'cpf')}
                >
                    {() => <TextField
                        label="CPF"
                        variant="filled"
                        fullWidth
                        required
                        error={error.cpf !== ''}
                        helperText={error.cpf}
                    />}
                </InputMask>

                <TextField
                    label="RG"
                    id="rg"
                    variant="filled"
                    fullWidth
                    required
                    value={cliente.rg}
                    onChange={event => handleInputChange(event, 'rg')}
                    error={error.rg !== ''}
                    helperText={error.rg}
                />

                <TextField
                    id="logradouro"
                    label="Logradouro"
                    variant="filled"
                    value={cliente.logradouro}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    error={error.logradouro !== ''}
                    helperText={error.logradouro}
                />

                <TextField
                    id="num_imovel"
                    label="Número Imóvel"
                    variant="filled"
                    value={cliente.num_imovel}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    error={error.num_imovel !== ''}
                    helperText={error.num_imovel}
                />

                <TextField
                    id="complemento"
                    label="Complemento"
                    variant="filled"
                    value={cliente.complemento}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    error={error.complemento !== ''}
                    helperText={error.complemento}
                />

                <TextField
                    id="bairro"
                    label="Bairro"
                    variant="filled"
                    value={cliente.bairro}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    error={error.bairro !== ''}
                    helperText={error.bairro}
                />

                <TextField
                    id="municipio"
                    label="Município"
                    variant="filled"
                    value={cliente.municipio}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    error={error.municipio !== ''}
                    helperText={error.municipio}
                />

                <TextField
                    id="uf"
                    label="UF"
                    fullWidth
                    required
                    select
                    variant="filled"
                    value={cliente.uf}
                    onChange={event => handleInputChange(event, 'uf')}
                    error={error.uf !== ''}
                    helperText={error.uf}
                >
                    {UF.map(estado => <MenuItem value={estado} key={estado}>{estado}</MenuItem>)}
                </TextField>

                <InputMask
                    formatChars={formatNumber}
                    id="telefone"
                    mask={telMask}
                    value={cliente.telefone}
                    onChange={event => handleInputChange(event, 'telefone')}
                >
                    {() => <TextField
                        label="Telefone (Celular)"
                        variant="filled"
                        fullWidth
                        error={error.telefone !== ''}
                        helperText={error.telefone}
                        required />}
                </InputMask>

                <TextField
                    id="email"
                    label="Email"
                    type="email"
                    variant="filled"
                    value={cliente.email}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    error={error.email !== ''}
                    helperText={error.email}
                />

                <Toolbar className={classes.toolbar}>
                    <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        disabled={btnSendState.disabled}
                    >
                        {btnSendState.label}
                    </Button>
                    <Button variant="contained" onClick={handleGoBack}>
                        Voltar
          </Button>
                </Toolbar>

                {/* <div>{JSON.stringify(cliente)}<br />currentId: {currentId}</div> */}
            </form>
        </>
    )
}