import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';

function Titulo(props) {
    const Tag = props.tag || 'h1';
    return (
        <div>
            <Tag>{props.children}</Tag>
            <style jsx>{`
              ${Tag} {
                color: ${appConfig.theme.colors.neutrals['000']};
                padding: 1.5rem 0rem;
                text-align: left;
                font-size: 22px;
                margin: 0;
                text-transform: uppercase;
              }
              `}</style>
        </div>
    );
}

export default function HomePage() {
    const [username, setUsername] = React.useState(''); // Setar username
    const [bioUser, setBioUser] = React.useState(""); // setar bio
    const [disable, setDisable] = React.useState(true); // controle para verificar se existe ou não o usuário
    const roteamento = useRouter(); // Fazer rota para página de chat

    fetch(`https://api.github.com/users/${username}`) // Requisição da API do Github
        .then((response) => response.json())
        .then((json) => setBioUser(json.bio));

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary['000'],
                    backgroundImage: 'url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8e21660c-4b2a-4d0b-96f4-eeb989cf3f46/dbsls43-4b862a0d-288b-48f7-a39a-9ba3eaf5e1ab.jpg/v1/fill/w_1286,h_621,q_70,strp/welcome_to_hawkins_by_tornadoeyesart_dbsls43-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzczIiwicGF0aCI6IlwvZlwvOGUyMTY2MGMtNGIyYS00ZDBiLTk2ZjQtZWViOTg5Y2YzZjQ2XC9kYnNsczQzLTRiODYyYTBkLTI4OGItNDhmNy1hMzlhLTliYTNlYWY1ZTFhYi5qcGciLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.lADgwAZSybL7lCbEnnZBASKNg_MO5fUvVIS1UgWU0xA)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    // className='boxBlur' // Deixa embaçado
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: disable || username.length < 1 ? 'column' : 'column',
                            md: disable || username.length < 1 ? 'column' : 'row',
                            lg: disable || username.length < 1 ? 'column' : 'row',
                            xl: disable || username.length < 1 ? 'column' : 'row',
                        },
                        width: '100%',
                        maxWidth: '700px',
                        border: '1px ridge',
                        backgroundColor: 'rgba(24,31,37,0.4)',
                        borderColor: appConfig.theme.colors.primary[400],
                        borderRadius: {
                            xs: '0px',
                            sm: '30px',
                            md: '30px',
                            lg: '30px',
                            xl: '30px',
                        },
                        padding: '32px',
                        margin: {
                            xs: '0px',
                            sm: '20px',
                            md: '25px',
                            lg: '32px',
                            xl: '60px',
                        },
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (infosDoEvento) {
                            // Quando submeter algo irá acontecer:
                            infosDoEvento.preventDefault(); // Vai prevenir o carregamento da página
                            roteamento.push(`/chat?username=${username}`); // Vai para a página chat.js sem carregar a página
                        }}
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: {
                                xs: "100%",
                                sm: disable || username.length < 1 ? '80%' : '60%',
                                md: disable || username.length < 1 ? '80%' : '60%',
                                lg: disable || username.length < 1 ? '80%' : '60%',
                                xl: disable || username.length < 1 ? '80%' : '60%',
                            },
                            textAlign: 'left',
                            marginBottom: '22px',
                        }}
                    >
                        <Titulo tag="h2">Boas vindas de volta!</Titulo>
                        <Text
                            variant="body3"
                            styleSheet={{
                                marginBottom: '32px',
                                color: appConfig.theme.colors.neutrals["300"]
                            }}
                        >
                            {appConfig.name}
                        </Text>

                        <TextField
                            value={username.toLowerCase()}
                            placeholder="Informe seu usuário do Github"
                            fullWidth
                            onChange={(event) => {
                                // cada vez que o usuário digitar vai acontecer algo
                                const valor = event.target.value; // Onde está o valor?
                                setUsername(valor); // Trocar valor da váriavel
                                if (disable) {
                                    // Se não existir usúario falso
                                    setDisable(false);
                                }
                            }}
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals['000'],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[400],
                                    backgroundColor: 'rgba(24,31,37,0.9)',
                                },
                            }}
                        />
                        <Button
                            type='submit'
                            label='ENTRAR'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals['000'],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                            styleSheet={{
                                marginTop: "12px",
                                fontWeight: "900",
                            }}
                            disabled={username.length < 1 || disable} // Vai desabilitar o botão caso user < 3 caracteres e caso não exista
                        />
                        <Button
                            type='submit'
                            label='CRIAR CONTA NO GITHUB'
                            href='https://github.com/signup?source=login'
                            iconName='github'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals['100'],
                                mainColor: appConfig.theme.colors.neutrals[900],
                                mainColorLight: appConfig.theme.colors.primary[800],
                                mainColorStrong: appConfig.theme.colors.neutrals[800],
                            }}
                            styleSheet={{
                                marginTop: '12px',
                                fontWeight: '900',
                            }}
                        />
                    </Box>  {/* Formulário */}
                    {/* Photo Area */}

                    {disable || username.length < 1 ? (
                        ''
                    ) : (
                        <Box
                        className='boxImgBack'
                        styleSheet={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          maxWidth: '250px',
                          padding: '10px 10px',
                          background:
                            'linear-gradient(90deg,rgba(245,245,245,0),rgba(245,245,245,0))',
                          border: '0px solid',
                          boxShadow: '0 10px 90px 0 rgb(0 0 0 / 20%)',
                          borderRadius: '10%',
                          flex: 1,
                          minHeight: '240px',
                        }}
                      >
                        <Image
                          className='boxImg'
                          styleSheet={{
                            borderRadius: '100%',
                            marginBottom: '16px',
                            boxShadow: '0 5px 5px 0 rgb(0 0 0 / 10%)',
                          }}
                          src={
                            // Verificação se o nome de usuário é valido para ter imagem
                            username.length >= 1
                              ? `https://github.com/${username}.png`
                              : ``
                          }
                          onError={() => {
                            // Se houver erro (não achar imagem de usuário) caso seja falso vai se tornar true (vai desabilitar o botão)
                            if (!disable) {
                              setDisable(true);
                            }
                          }}
                        />
                        <Text
                          variant='body4'
                          styleSheet={{
                            color: appConfig.theme.colors.neutrals[200],
                            backgroundColor: appConfig.theme.colors.neutrals[900],
                            padding: '3px 10px',
                            borderRadius: '1000px',
                          }}
                        >
                          {disable || username.length < 1 // caso disable = true e o usuário tiver menos de 3 caracteres vai informar 'Usuário Inválido', caso contrário mostra o nome de usuário
                            ? 'Usuário Inválido'
                            : `${username}`}
                        </Text>
                        <p>
                          {bioUser}
                          <style jsx>{`
                            p {
                              color: black;
                              font-size: 12px;
                              font-weight: bold;
                              text-align: center;
                              margin-top: 8px;
                            }
                          `}</style>
                        </p>
                      </Box>
                    )}

                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}