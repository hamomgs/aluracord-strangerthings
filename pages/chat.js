import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { ButtonSendSticker } from "../src/components/ButtonSendSticker";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import { red } from "@mui/material/colors";

export default function ChatPage() {
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);
    const [carregando, setCarregando] = React.useState(true);
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzY0Mzg5NywiZXhwIjoxOTU5MjE5ODk3fQ.dpd5_3exl3z7RUQ4JeTYYEqiGT4OLvZNuW1fcKwNpaU';
    const SUPABASE_URL = 'https://jzzpcsmfnygqefszgyfg.supabase.co';
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


    function escutaMensagensEmTempoReal(attMensagens) {

        supabaseClient
            .from("mensagens")
            .on("INSERT", attMensagens)
            .on("DELETE", attMensagens)
            .subscribe();
    }

    function attMensagens() {

        supabaseClient
            .from("mensagens")
            .select("*")
            .order("id", { ascending: false })
            .then(({ data }) => {
                setListaDeMensagens(data);
                setCarregando(false);
            });
    }

    React.useEffect(() => {
        attMensagens();
        escutaMensagensEmTempoReal(attMensagens);
    }, []);

    function handleDeleteMensagem(id) {
        supabaseClient
            .from("mensagens")
            .delete()
            .match({ id: id })
            .then(() => {
                setListaDeMensagens(
                    listaDeMensagens.filter((element) => {
                        return element.id !== id;
                    })
                );
            });
    }

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            de: usuarioLogado,
            texto: novaMensagem,
        };

        if (novaMensagem.length < 1) {
            Swal.fire({
                title: "Mensagem muito curta!",
                text: "Essa mensagem é muito curta para ser enviada.",
                icon: "warning",
                color: "white",
                background: "rgba(227, 81, 79, 0.8)",
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                button: false,
                footer: "<a></a>",
            });
        } else {
            supabaseClient
                .from("mensagens")
                .insert([mensagem])
                .then(({ data }) => {
                    setListaDeMensagens([data[0], ...listaDeMensagens]);
                });

            setMensagem("");
        }
    }

    return (
        <Box
            styleSheet={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(1, 1, 1,0.5)',
                backgroundImage: `url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8e21660c-4b2a-4d0b-96f4-eeb989cf3f46/dbsls43-4b862a0d-288b-48f7-a39a-9ba3eaf5e1ab.jpg/v1/fill/w_1286,h_621,q_70,strp/welcome_to_hawkins_by_tornadoeyesart_dbsls43-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzczIiwicGF0aCI6IlwvZlwvOGUyMTY2MGMtNGIyYS00ZDBiLTk2ZjQtZWViOTg5Y2YzZjQ2XC9kYnNsczQzLTRiODYyYTBkLTI4OGItNDhmNy1hMzlhLTliYTNlYWY1ZTFhYi5qcGciLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.lADgwAZSybL7lCbEnnZBASKNg_MO5fUvVIS1UgWU0xA)`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: {
                        xs: '0px',
                        sm: '10px',
                        md: '10px',
                        lg: '10px',
                        xl: '10px',
                    },
                    backgroundColor: 'rgba(1,1,1,0)',
                    height: '100%',
                    maxWidth: '100%',
                    maxHeight: '100vh',
                    padding: {
                        xs: "0px",
                        sm: "20px",
                        md: "25px",
                        lg: "32px",
                        xl: "60px",
                    },
                }}
            >
                <Header usuarioLogado={usuarioLogado} carregando={carregando} />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: 'rgba(1,1,1,0.5)',
                        flexDirection: 'column',
                        borderRadius: {
                            xs: '0px',
                            sm: '10px',
                            md: '10px',
                            lg: '10px',
                            xl: '10px',
                        },
                        padding: '16px',
                    }}
                >
                    <MessageList
                        mensagens={listaDeMensagens}
                        carregando={carregando}
                        setMensagens={setListaDeMensagens}
                        username={usuarioLogado}
                        onDelete={handleDeleteMensagem}
                    />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const value = event.target.value;
                                setMensagem(value);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[900],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.neutrals[300],
                                    backgroundColor: appConfig.theme.colors.neutrals[100],
                                },
                                width: '100%',
                                border: '0',
                                alignItems: 'center',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                marginRight: '10px',
                                marginTop: '10px',
                            }}
                        />
                        <>  </>
                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                handleNovaMensagem(':sticker: ' + sticker);
                            }}
                        />
                        <>ﾠﾠ</>
                        <Button
                            disabled={!mensagem}
                            onClick={(event) => {
                                event.preventDefault();
                                handleNovaMensagem(mensagem);
                            }}
                            className="btnSend"
                            label="Enviar"
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header(props) {
    return (
        <>
            <Box styleSheet={{
                width: '100%',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
            >
                {props.carregando ? (
                    <Box>
                        <CircularProgress color="error" size="20px" />
                    </Box>
                ) : (
                    <Box
                        className="perfilLogado"
                        styleSheet={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            justifyContent: "space-between",
                            boxShadow: "5px 5px 25px rgba(0, 0, 0, 1)",
                            borderRadius: {
                                xs: "0px",
                                sm: "10px",
                                md: "10px",
                                lg: "10px",
                                xl: "10px",
                            },
                        }}
                    >
                        <Box
                            styleSheet={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                    display: "inline-block",
                                    marginRight: "8px",
                                    transition: "ease .2s",
                                    hover: {
                                        width: "36px",
                                        height: "36px",
                                    },
                                }}
                                src={`https://github.com/${props.usuarioLogado}.png`}
                            />
                            <Text
                                styleSheet={{
                                    color: "#FFFFFF",
                                    fontWeight: "bold",
                                }}
                            >
                                {props.usuarioLogado}
                            </Text>
                        </Box>
                        <Button
                            className="btnLogout"
                            label="Logout"
                            iconName="arrowLeft"
                            href="/"
                        />
                    </Box>
                )}
            </Box>
        </>
    );
}

function MessageList(props) {
    const roteamento = useRouter();

    function generateDate(string) {
        var time = new Date(string).toLocaleTimeString().substring(0, 5);
        var date;
        switch (new Date().getDate() - new Date(string).getDate()) {
            case 0:
                date = "Hoje";
                break;
            case 1:
                date = "Ontem";
                break;
            case 2:
                date = "Anteontem";
                break;
            default:
                time = time;
                date = new Date(string).toLocaleDateString();
        }
        return `${date} ${time}`;
    }

    return (
        <Box
            className="boxMsg"
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.carregando && (
                <Box
                    styleSheet={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <Box>
                        <CircularProgress color="error" />
                    </Box>
                </Box>
            )}

            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        className="textNick"
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems:
                                mensagem.de == props.username
                                    ? "flex-end"
                                    : "flex-start",
                            position: "relative",
                            borderRadius: "10px",
                            padding: "20px",
                            marginBottom: "12px",
                            backgroundColor: "rgba(1,1,1,0.3)",
                            background:
                                mensagem.de == props.username
                                    ? "linear-gradient( 270deg, rgba(115, 10, 10, 0.2), rgba(0, 0, 0, 0.5))"
                                    : "rgba(1,1,1,0.3)",

                            hover: {
                                background:
                                    mensagem.de == props.username
                                        ? "linear-gradient( 270deg, rgba(115, 10, 10, 0.2), rgba(245,245,245,0.1))"
                                        : "linear-gradient( 270deg, rgba(245,245,245,0.1), rgba(245,245,245,0.1))",
                            },
                        }}
                    >
                        <Box
                            className="nickAnimation"
                            styleSheet={{
                                alignItems: "center",
                                display: "flex",
                                flexDirection: "row !important",
                                marginBottom: "8px",
                            }}
                        >
                            <Image
                                className="imgNick"
                                onClick={() => {
                                    roteamento.push(
                                        `https://github.com/${mensagem.de}/`
                                    );
                                }}
                                styleSheet={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                    display: "inline-block",
                                    marginRight: "8px",
                                    transition: "all 0.2s",
                                    hover: {
                                        transform: "scale(2)",
                                        margin: "10px 40px 20px 10px",
                                        transition: "all 0.5s",
                                        cursor: "pointer",
                                    },
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text
                                tag="strong"
                                styleSheet={{
                                    color:
                                        mensagem.de == props.username
                                            ? "#ffffff"
                                            : "#E0E2DB",
                                    fontWeight: "bold",
                                }}
                            >
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: "10px",
                                    marginLeft: "8px",
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            ></Text>
                            {mensagem.de == props.username ? (
                                <Button
                                    onClick={(event) => {
                                        event.preventDefault();

                                        props.onDelete(mensagem.id); //% Remover mensagem com o id selecionado
                                    }}
                                    colorVariant="neutral"
                                    label="X"
                                    styleSheet={{
                                        background: "#ba181b",
                                        borderRadius: "100%",
                                        right: "-10px",

                                        hover: {
                                            backgroundColor: "#e5383b",
                                        },
                                    }}
                                />
                            ) : (
                                ""
                            )}
                        </Box>
                        {mensagem.texto.startsWith(":sticker:") ? (
                            <>
                                <Image
                                    src={mensagem.texto.replace(":sticker:", "")}
                                    styleSheet={{
                                        maxWidth: "150px",
                                        marginTop: "10px",
                                    }}
                                />
                                <Text
                                    styleSheet={{
                                        fontSize: "12px",
                                        color: "rgba(255,255,255,0.4)",
                                        marginTop: "20px",
                                    }}
                                >
                                    {generateDate(mensagem.created_at)}
                                </Text>
                            </>
                        ) : (
                            <>
                                <Text
                                    styleSheet={{
                                        marginTop: "10px",
                                    }}
                                >
                                    {mensagem.texto}
                                </Text>
                                <Text
                                    styleSheet={{
                                        fontSize: "12px",
                                        color: "rgba(255,255,255,0.4)",
                                        marginTop: "15px",
                                    }}
                                >
                                    {generateDate(mensagem.created_at)}
                                </Text>
                            </>
                        )}
                    </Text>
                );
            })}
        </Box>
    );
}
