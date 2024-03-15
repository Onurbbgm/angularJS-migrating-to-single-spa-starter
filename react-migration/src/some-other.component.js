import { useEffect, useState } from "react";


export default function SomeOther({rootVariables}) {
    console.log(rootVariables);
    const helloText = rootVariables?.helloText || 'TEST';
    const [helloVariable, setHelloVariable] = useState(helloText);

    //TODO: Improve this
    //This need to be done in a general way so all rootScope variable are properly updated
    useEffect(() => {
        const helloVariableChanged = (event) => {
            setHelloVariable(event.detail);
        };

        window.addEventListener('helloTextChanged', helloVariableChanged);

        return () => {
            window.removeEventListener('helloTextChanged', helloVariableChanged);
        }
    }, []);

    return <div>
        <h1>I am another react component</h1>
        <span>Who called me was: {helloVariable}</span>
    </div>;
}
