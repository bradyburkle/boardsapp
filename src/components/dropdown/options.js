const options = [
    { value: 1, label: 'One' },
    { value: 2, label: 'Two', className: 'myOptionClassName' },
    {
        type: 'group', name: 'group1', items: [
            { value: 3, label: 'Three', className: 'myOptionClassName' },
            { value: 4, label: 'Four' }
        ]
    },
    {
        type: 'group', name: 'group2', items: [
            { value: 5, label: 'Five' },
            { value: 6, label: 'Six' }
        ]
    }
];

const setOptions = (n) => {
    for (let i = 0; i < n; i++) {
        options.push({
            value: n,
            label: n
        })
    }
}

export default options;