async function requestRandomNames() {
    const response = await fetch('https://uinames.com/api/?region=united%20states&gender=male');
    const json = await response.json();
    console.log(json);
    return json
}

requestRandomNames()