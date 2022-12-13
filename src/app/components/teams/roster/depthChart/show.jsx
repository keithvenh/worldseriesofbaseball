
export default function ShowDepthChart(props) {

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
                    <td>{props.team.roster.depthChart.catcher['1']}</td>
                    <td>{props.team.roster.depthChart.catcher['2']}</td>
                    <td>{props.team.roster.depthChart.catcher['3']}</td>
                    <td>{props.team.roster.depthChart.catcher['4']}</td>
                    <td>{props.team.roster.depthChart.catcher['5']}</td>
                </tr>

                <tr className='first'>
                    <td>{props.team.roster.depthChart.firstBase['1']}</td>
                    <td>{props.team.roster.depthChart.firstBase['2']}</td>
                    <td>{props.team.roster.depthChart.firstBase['3']}</td>
                    <td>{props.team.roster.depthChart.firstBase['4']}</td>
                    <td>{props.team.roster.depthChart.firstBase['5']}</td>
                </tr>

                <tr className='second'>
                    <td>{props.team.roster.depthChart.secondBase['1']}</td>
                    <td>{props.team.roster.depthChart.secondBase['2']}</td>
                    <td>{props.team.roster.depthChart.secondBase['3']}</td>
                    <td>{props.team.roster.depthChart.secondBase['4']}</td>
                    <td>{props.team.roster.depthChart.secondBase['5']}</td>
                </tr>

                <tr className='third'>
                    <td>{props.team.roster.depthChart.thirdBase['1']}</td>
                    <td>{props.team.roster.depthChart.thirdBase['2']}</td>
                    <td>{props.team.roster.depthChart.thirdBase['3']}</td>
                    <td>{props.team.roster.depthChart.thirdBase['4']}</td>
                    <td>{props.team.roster.depthChart.thirdBase['5']}</td>
                </tr>

                <tr className='short'>
                    <td>{props.team.roster.depthChart.shortstop['1']}</td>
                    <td>{props.team.roster.depthChart.shortstop['2']}</td>
                    <td>{props.team.roster.depthChart.shortstop['3']}</td>
                    <td>{props.team.roster.depthChart.shortstop['4']}</td>
                    <td>{props.team.roster.depthChart.shortstop['5']}</td>
                </tr>

                <tr className='left'>
                    <td>{props.team.roster.depthChart.leftField['1']}</td>
                    <td>{props.team.roster.depthChart.leftField['2']}</td>
                    <td>{props.team.roster.depthChart.leftField['3']}</td>
                    <td>{props.team.roster.depthChart.leftField['4']}</td>
                    <td>{props.team.roster.depthChart.leftField['5']}</td>
                </tr>

                <tr className='center'>
                    <td>{props.team.roster.depthChart.centerField['1']}</td>
                    <td>{props.team.roster.depthChart.centerField['2']}</td>
                    <td>{props.team.roster.depthChart.centerField['3']}</td>
                    <td>{props.team.roster.depthChart.centerField['4']}</td>
                    <td>{props.team.roster.depthChart.centerField['5']}</td>
                </tr>

                <tr className='right'>
                    <td>{props.team.roster.depthChart.rightField['1']}</td>
                    <td>{props.team.roster.depthChart.rightField['2']}</td>
                    <td>{props.team.roster.depthChart.rightField['3']}</td>
                    <td>{props.team.roster.depthChart.rightField['4']}</td>
                    <td>{props.team.roster.depthChart.rightField['5']}</td>
                </tr>

            </tbody>
        </table>
    )
}