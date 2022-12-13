import { useState } from 'react';

export default function EditDepthChart(props) {

    console.log(typeof props.team.roster.depthChart);
    console.log(typeof props.team.roster.depthChart !== 'undefined')
    const roster = props.team.roster.active;
    const [depthChart, setDepthChart] = useState(typeof props.team.roster.depthChart !== 'undefined' ? props.team.roster.depthChart : {});

    function updateDepthChart(event) {
        console.log(event);
        let updateKey = event.target.id.split('-');
        setDepthChart({
            ...depthChart,
            [updateKey[0]]: {
                ...depthChart[updateKey[0]],
                [updateKey[1]]: event.target.value
            }
        })
    }

    console.log(depthChart);
    return (
        <table className='depthChart'>
            <thead>
                <tr>
                    <th>Pos</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                </tr>
            </thead>

            <tbody>

                <tr className='catcher'>
                    <td>Catchers</td>
                    <td>
                        <select id='catcher-1' value={typeof depthChart.catcher !== 'undefined' ? depthChart.catcher['1'] : 'select'} onChange={updateDepthChart}>
                            <option value='select'>Select Player</option>
                            {Object.keys(roster).map(p => {
                                return (
                                    <option key={p} value={p}>{roster[p].nameDisplayLastFirst}</option>
                                )
                            })}
                        </select>
                    </td>
                    <td>
                        <select id='catcher-2' value={typeof depthChart.catcher !== 'undefined' ? depthChart.catcher['2'] : 'select'} onChange={updateDepthChart}>
                            <option value='select'>Select Player</option>
                            {Object.keys(roster).map(p => {
                                return (
                                    <option key={p} value={p}>{roster[p].nameDisplayLastFirst}</option>
                                )
                            })}
                        </select>
                    </td>
                    <td>
                        <select id='catcher-3' value={typeof depthChart.catcher !== 'undefined' ? depthChart.catcher['3'] : 'select'} onChange={updateDepthChart}>
                            <option value='select'>Select Player</option>
                            {Object.keys(roster).map(p => {
                                return (
                                    <option key={p} value={p}>{roster[p].nameDisplayLastFirst}</option>
                                )
                            })}
                        </select>
                    </td>
                    <td>
                        <select id='catcher-4' value={typeof depthChart.catcher !== 'undefined' ? depthChart.catcher['4'] : 'select'} onChange={updateDepthChart}>
                            <option value='select'>Select Player</option>
                            {Object.keys(roster).map(p => {
                                return (
                                    <option key={p} value={p}>{roster[p].nameDisplayLastFirst}</option>
                                )
                            })}
                        </select>
                    </td>
                    <td>
                        <select id='catcher-5' value={typeof depthChart.catcher !== 'undefined' ? depthChart.catcher['5'] : 'select'} onChange={updateDepthChart}>
                            <option value='select'>Select Player</option>
                            {Object.keys(roster).map(p => {
                                return (
                                    <option key={p} value={p}>{roster[p].nameDisplayLastFirst}</option>
                                )
                            })}
                        </select>
                    </td>
                </tr>

            </tbody>
        </table>
    )
}