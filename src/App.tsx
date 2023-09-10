import { useState } from "react";

import Header from "./components/Header/Header";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
			<Header />
			<div style={{float: "right"}}>
				<h1>Vite + React</h1>	
				<div className="card">
					<button onClick={() => setCount((num) => num + 1)}>
						count is {count}
					</button>
					<p>
						Edit <code>src/App.tsx</code> and save to test HMR
					</p>
				</div>
			</div>

        </>
    );
}

export default App;
