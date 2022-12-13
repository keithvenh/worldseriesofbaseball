import { useState } from 'react';

import ShowDepthChart from './show';
import EditDepthChart from './edit';

export default function DepthChart(props) {

    const [mode, setMode] = useState('edit');

    if(mode === 'edit') {
        return (<EditDepthChart team={props.team} appView={props.appView} setMode={setMode} />)
    }
    return (
        <div className='DepthChart'>
            <ShowDepthChart team={props.team} appView={props.appView} setMode={setMode} />
        </div>
    )
}