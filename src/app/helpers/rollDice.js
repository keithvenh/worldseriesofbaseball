function roll(num) {

    return Math.floor(Math.random() * num + 1)

}

export default function rollDice() {
    let result = []
    for (var i = 0; i < arguments.length; i++) {
        
        let dice = arguments[i].split('d');
        let sum = 0;
        let res = [];

        for (var d = 0;  d <  dice[0]; d++) {
            let rollRes = roll(dice[1])
            sum += rollRes;
            res.push(rollRes);
        }

        result.push({'results': res, 'total': sum})
    }

    console.log(result);
    return result;

}
