export default async function post(name, action, x0, y0, v0x, v0y, omega, XFunc, YFunk, VdotX, VdotY) {
    let url = "https://coriolis-force-default-rtdb.firebaseio.com/.json";
    let date = new Date()
    let data = {
        cookie: document.cookie,
        name: name,
        time: (date.toLocaleString() + " " + String(date.getMilliseconds() - 10) + " ms"),
        action: action,
        x0: x0,
        y0: y0,
        v0x: v0x,
        v0y: v0y,
        omega: omega,
        XFunc: XFunc,
        YFunc: YFunk,
        VdotX: VdotX,
        VdotY: VdotY,

    };

    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        // .catch(error => console.error('Error'))
        // .then(response => console.log('Success'));


}