import { Alert, Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios';


const CardValidation = () => {
    const [cardNumber, setCardNumber] = useState("")
    const [type, setType] = useState("");
    const [msg, setMsg] = useState("");
    let regex = /^[0-9]*$/
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");
    let url = "http://localhost:5000/api/v1/credit-card/validate"


    const resetData = () => {
        setError(false)
        setErrorText("")
        setType('')
        setMsg('')
        setCardNumber('')
    }
    const checkvalidation = async () => {
        if (cardNumber !== "" && cardNumber.length >= 13 && cardNumber.length <= 19 && regex.test(cardNumber)) {
            setError(false)
            setErrorText("")
            let payload = {
                "card_number": cardNumber
            }
            axios.post(url, payload)
                .then(function (response) {
                    if (response?.data?.is_card_valid) {
                        setType('success')
                        setMsg('Card Number is Valid')
                    }
                    else {
                        setType('error')
                        setMsg('Card Number is not Valid')
                    }
                })
                .catch(function (error) {
                    setType('error')
                    setMsg('Error')
                });
        }
        else {
            setError(true)
            if (cardNumber === "") {
                setErrorText("Card Number should not be Empty")
            }
            if (!regex.test(cardNumber)) {
                setErrorText("Only Numbers Allowed")
            }
            else {
                setErrorText(
                    "Card Number length should be between 13 to 19"
                );
            }
        }
    }
    return (
        <>
            <Container component="main" maxWidth="md">
                <Box
                    sx={{
                        marginTop: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: "2px solid black",
                        borderRadius: 5,
                        padding: 8
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Card Validation
                    </Typography>
                    <Box sx={{ mt: 1, width: "100%" }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Card Number"
                            autoFocus
                            value={cardNumber}
                            helperText={errorText}
                            error={error}
                            name='card_number'
                            onChange={(event) => setCardNumber(event.target.value)}
                        />
                        <Grid item container xs={12} sm={12} md={12} lg={12} spacing={1}>
                            <Grid item xs={12} sm={6} md={6} lg={6} >
                                <Button
                                    fullWidth
                                    onClick={() => { checkvalidation() }}
                                    variant="contained"
                                    sx={{
                                        mt: 2, mb: 2, backgroundColor: "#ffcc00", color: 'black',
                                        ':hover': {
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                        },
                                    }}

                                >
                                    submit
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6} >
                                <Button
                                    fullWidth
                                    onClick={() => { resetData() }}
                                    variant="contained"
                                    sx={{
                                        mt: 2, mb: 2, backgroundColor: "#ffcc00", color: 'black',
                                        ':hover': {
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                        },
                                    }}
                                >
                                    Reset
                                </Button>
                            </Grid>
                        </Grid>

                    </Box>
                    {type && <Alert severity={type} sx={{ marginTop: 2 }}>{msg}</Alert>}
                </Box>
            </Container>
        </>
    )
}

export default CardValidation