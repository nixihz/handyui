import React from 'react';
import {Grid, TextField} from "@mui/material";

function App() {

    interface TextInfo {
        val1: string,
        val2: string,
    }

    const [info, setInfo] = React.useState<TextInfo>({
        val1: "",
        val2: "",
    })

    function stripslashes(str: string) {
        str = str.replace(/(^"*)|("$)/g, "");
        return (str + '')
            .replace(/\\(.?)/g, function (s, n1) {
                switch (n1) {
                    case '\\':
                        return "\\"
                    case '':
                        return ''
                    default:
                        return n1
                }
            })
    }

    function change(value: string) {
        setInfo({
            val1: value,
            val2: ""
        })
        let value1 = eval(value)
        value1 = decodeURIComponent(escape(value1))

        setInfo({
            val1: value,
            val2: value1
        })
    }

    return (
        <div className="App">
            <header className="App-header">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="filled-textarea"
                            label="input"
                            placeholder="Placeholder"
                            multiline
                            value={info.val1}
                            rows={30}
                            variant="filled"
                            onChange={(event) => change(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="filled-textarea"
                            label="output"
                            placeholder="Placeholder"
                            multiline
                            value={info.val2}
                            rows={30}
                            variant="filled"
                        />
                    </Grid>
                </Grid>

            </header>
        </div>
    );
}

export default App;
