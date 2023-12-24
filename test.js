
let counter = 0;
const initialState = [
    {
        id: Date.now() + counter++ ,
        info: 'Morning breakfast',
        isCompleted: false
    },
    {
        id: Date.now() + counter++,
        info: 'Afternoon lunch',
        isCompleted: false
    },
    {
        id: Date.now() + counter++,
        info: 'Night lunch',
        isCompleted: false
    }
]
console.log(initialState);
