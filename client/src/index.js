import React, { useEffect, useState } from "react"
import { createRoot } from "react-dom/client"
import App from "./pages/Router"

const container = document.getElementById('root');
const root = createRoot(container); 
root.render(<App/>);
