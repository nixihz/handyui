import React from 'react';
import {Grid, TextField} from "@mui/material";

function App2() {

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

    function replaceWork(line: string): string {
        if (line == "工作同步") {
            return "1、工作同步："
        }

        line = line.replace(/(^[\s]*[一]+)([ ）、]*)/, `1）`);
        line = line.replace(/(^[\s]*[二]+)([ ）、]*)/, `2）`);
        line = line.replace(/(^[\s]*[三]+)([ ）、]*)/, `3）`);
        line = line.replace(/(^[\s]*[四]+)([ ）、]*)/, `4）`);
        line = line.replace(/(^[\s]*[五]+)([ ）、]*)/, `5）`);
        line = line.replace(/(^[\s]*[六]+)([ ）、]*)/, `6）`);

        line = line.replace(/(^[\s]*[0-9]+)([ .）、]*)/, `$1）`);

        line = line.replace(/(^[\s]*[a-z]+)([ .）、]*)/, `$1）`);
        line = line.replace(/。$/, `；`);
        line = line.replace(/([^；])$/, `$1；`);


        line = line.replace(/^(\d)/, `        $1`);
        line = line.replace(/^([a-z])/, `            $1`);
        return line
    }

    function replaceFeedback(line: string): string {
        if (line == "问题反馈") {
            return "2、问题反馈："
        }
        line = line.replace(/(^[\s]*[0-9]+)([ .）、]*)/, `$1）`);
        line = line.replace(/(^[\s]*[a-z]+)([ .）、]*)/, `$1）`);
        line = line.replace(/。$/, `；`);
        line = line.replace(/([^；])$/, `$1；`);

        line = line.replace(/^(\d)/, `        $1`);
        line = line.replace(/^([a-z])/, `            $1`);
        return line
    }


    function replaceval(str: string) {
        var func = replaceWork
        var strList = str.split("\n")
        strList = strList.flatMap(function (line: string): string {
            if (line == "01") {
                func = replaceWork;
            }
            if (line == "02") {
                func = replaceFeedback;
            }

            var isMatchAuthor = line.search(/）：$/);
            if (isMatchAuthor >= 0) {
                return line
            }


            var isMatch = line.search(/([\s]*)(\d)([\s]*)$/);
            console.log(isMatch)
            if (isMatch >= 0) {
                return ""
            }

            line = func(line)
            return line;
        })


        var output = "会议内容：\n一、每周工作汇报以及问题反馈并讨论解决方案\n"

        return output + strList.join("\n")
    }


    function change(value: string) {
        setInfo({
            val1: value,
            val2: ""
        })
        let value1 = replaceval(value)

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

export default App2;
