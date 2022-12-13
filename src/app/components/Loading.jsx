import { useEffect } from 'react';

export default function Loading() {

    let teams = [
        'egy', 'nig', 'mor', 'saf', 'ken', 
        'spa', 'ita', 'eeu', 'ukg', 'neu', 
        'usa', 'car', 'mex', 'cam', 'can', 
        'aus', 'mic', 'pol', 'mel', 'nze', 
        'per', 'bra', 'col', 'arg', 'ven', 
        'jap', 'uae', 'chi', 'ind', 'rus'
    ]
    function animateFlags(flagID, direction) {
        let id = null;
        const flags = document.getElementById(flagID);
        let pos = 0;
        clearInterval(id);
        if (direction === 'left') {
            id = setInterval(scrollLeft, 5);
        } else if (direction === 'right') {
            pos = -4600;
            id = setInterval(scrollRight, 5);
        }
        function scrollLeft() {
            if(pos < -4600) {
                clearInterval(id);
            } else {
                pos--;
                flags.style.left = pos + 'px';
            }
        }
        function scrollRight() {
            if(pos > 0) {
                clearInterval(id);
            } else {
                pos++;
                flags.style.left = pos + 'px';
            }
        }
    }

    function myMove() {
        let id = null;
        const elem = document.getElementById("animate");
        let pos = 0;
        clearInterval(id);
        id = setInterval(frame, 5);
        function frame() {
          if (pos > 350 || pos < -350) {
            clearInterval(id);
          } else {
            pos++;
            elem.style.top = pos + 'px';
            elem.style.left = pos + 'px';
          }
        }
      }

    let flags = teams.map(t => {
        let flag = require('../assets/images/' + t + '.webp')
            return (
                <div key={t} className='flag'>
                    <img src={flag} alt={`${t} Flag`} />
                </div>
            )
    })

    useEffect(() => {
        animateFlags('flagsTop', 'left');
        animateFlags('flagsBottom', 'right');
    },[])

    return (
        <div className='Loading'>
            <div className='flagsContainer'>
                <div id='flagsTop' className='flags flagsTop'>
                    {flags}
                </div>
            </div>
            {/* <div className='flags flagsTop'>
                {flagsTop}
            </div> */}
            <h1 className='appTitle'>World Series of Baseball</h1>

            <div className='flagsContainer'>
                <div id='flagsBottom' className='flags flagsBottom'>
                    {flags}
                </div>
            </div>
            {/* <div className='flags'>
                {flagsBottom}
            </div> */}
        </div>
    )
}