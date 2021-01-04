import React from "react"
import ReactDOM from "react-dom"
import { SpeechProvider } from "@speechly/react-client"

import "./index.css"
import App from "./App"
import { Provider } from "./context/context"

ReactDOM.render(
    <SpeechProvider appId="cb5a6cdc-a3f4-4156-b946-921052ee2d2c" language="en-US">
        <Provider>
            <App />
        </Provider>
    </SpeechProvider>,
    document.getElementById("root")
)